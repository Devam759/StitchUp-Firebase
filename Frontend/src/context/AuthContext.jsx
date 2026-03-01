import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut as firebaseSignOut, setPersistence, browserLocalPersistence } from 'firebase/auth'
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { auth, db } from '../firebase'

const AuthContext = createContext(null)

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
    return ctx
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem('currentUser')
            return saved ? JSON.parse(saved) : null
        } catch { return null }
    })
    const [firebaseUser, setFirebaseUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const findUserDoc = async (uid, phone) => {
        let userDoc = await getDoc(doc(db, 'users', uid))
        if (!userDoc.exists() && phone) {
            // Find by phone number
            const cleanPhone = phone.replace(/\D/g, '')
            const q = query(collection(db, 'users'), where('phone', '==', cleanPhone))
            const qs = await getDocs(q)
            if (!qs.empty) {
                userDoc = qs.docs[0]
            }
        }
        return userDoc
    }

    useEffect(() => {
        // Ensure local persistence is set
        setPersistence(auth, browserLocalPersistence)

        const unsub = onAuthStateChanged(auth, async (fbUser) => {
            setFirebaseUser(fbUser)

            if (fbUser) {
                try {
                    const userDoc = await findUserDoc(fbUser.uid, fbUser.phoneNumber)
                    const docExists = typeof userDoc.exists === 'function' ? userDoc.exists() : userDoc.exists

                    if (docExists) {
                        const data = userDoc.data()
                        const merged = { id: userDoc.id, uid: fbUser.uid, phone: fbUser.phoneNumber, ...data }
                        setUser(merged)
                        localStorage.setItem('currentUser', JSON.stringify(merged))
                        document.cookie = `st_user=${fbUser.uid}; max-age=31536000; path=/; SameSite=Lax`
                        window.dispatchEvent(new Event('authChange'))
                    } else {
                        // Auth user exists but no Firestore profile yet (mid-signup, or deleted account)
                        setUser({ id: fbUser.uid, uid: fbUser.uid, phone: fbUser.phoneNumber, isNew: true })
                    }
                } catch (err) {
                    console.error('Error loading user profile:', err)
                    setUser({ id: fbUser.uid, uid: fbUser.uid, phone: fbUser.phoneNumber, isNew: true })
                }
            } else {
                setUser(null)
                localStorage.removeItem('currentUser')
                document.cookie = "st_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
                window.dispatchEvent(new Event('authChange'))
            }
            setLoading(false)
        })
        return () => unsub()
    }, [])

    const refreshUser = async () => {
        if (!firebaseUser) return
        try {
            const userDoc = await findUserDoc(firebaseUser.uid, firebaseUser.phoneNumber)
            const docExists = typeof userDoc.exists === 'function' ? userDoc.exists() : userDoc.exists
            if (docExists) {
                const data = userDoc.data()
                const merged = { id: userDoc.id, uid: firebaseUser.uid, phone: firebaseUser.phoneNumber, ...data }
                setUser(merged)
                localStorage.setItem('currentUser', JSON.stringify(merged))
                window.dispatchEvent(new Event('authChange'))
                return merged
            }
        } catch (err) {
            console.error('Error refreshing user profile:', err)
        }
        return null
    }

    const updateProfile = async (updates) => {
        if (!user || !user.id) return false
        try {
            // Must use user.id, because the actual document ID may differ from firebase auth UID
            await updateDoc(doc(db, 'users', user.id), updates)
            const updatedUser = { ...user, ...updates }
            setUser(updatedUser)
            localStorage.setItem('currentUser', JSON.stringify(updatedUser))
            window.dispatchEvent(new Event('authChange'))
            return true
        } catch (err) {
            console.error('Error updating user profile:', err)
            return false
        }
    }

    const signOut = async () => {
        await firebaseSignOut(auth)
        setUser(null)
        localStorage.removeItem('currentUser')
        window.dispatchEvent(new Event('authChange'))
    }

    return (
        <AuthContext.Provider value={{ user, firebaseUser, loading, signOut, refreshUser, updateProfile }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
