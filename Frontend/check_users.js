import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAgUiNQ5pk3jyEtqRn_dCzwCaEcA0So-lg",
    authDomain: "stitchup-1af69.firebaseapp.com",
    projectId: "stitchup-1af69",
    storageBucket: "stitchup-1af69.firebasestorage.app",
    messagingSenderId: "737451232990",
    appId: "1:737451232990:web:926dfb10cd8a620cdffc4f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkTailors() {
    const snapshot = await getDocs(collection(db, 'users'));
    const allUsers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    console.log("ALL USERS:");
    allUsers.forEach(u => console.log(JSON.stringify(u)));
}

checkTailors().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
