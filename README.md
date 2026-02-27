# StitchUp 🪡

**Tailoring at your doorstep.** 

StitchUp is a modern web application connecting customers with skilled local tailors. Whether you need a quick button fix, hemming, or heavy custom tailoring like a perfectly fitted suit or lehenga, StitchUp provides a seamless end-to-end platform for finding, booking, and tracking tailoring services.

---

## 🚀 Features

### 👤 For Customers
* **OTP Authentication**: Secure and fast login using mobile OTPs powered by Firebase Authentication.
* **Smart Search & Filters**: Find tailors nearby using advanced filters (availability, price range, distance, and rating).
* **Detailed Profiles**: View a tailor's portfolio, verified reviews, working hours, and an explicit rate card before booking.
* **Service Categories**: Easily navigate between **Quick Fixes** (buttons, hemming, zipper) and **Heavy Custom Tailoring** (sherwanis, suits, lehengas).
* **Live Order Tracking**: Real-time status updates (Requested ➔ Accepted ➔ In Progress ➔ Ready ➔ Delivered) complete with assigned rider details and delivery ETAs.
* **Quality Assurance**: When an order is marked ready, customers can review proof photos and choose to either "Approve & Schedule Delivery" or "Request Revisions" if not satisfied.
* **Direct Chat/Enquiries**: Communicate directly with tailors to discuss custom requirements.

### ✂️ For Tailors
* **Business Management Dashboard**: A central hub to manage active orders, track lifetime earnings, and view incoming customer requests.
* **Profile Customization**: Tailors can set their profile banner (via Firebase Storage), update their master bio, and set customizable prices for different clothing items/services.
* **Real-time Availability Toggle**: Go "Online" or "Offline" with a single click from the navbar to immediately reflect status to customers.
* **Proof of Completion**: Use the device camera or file upload directly in the browser to snap photos of completed garments and send them for customer approval.
* **Instant SMS Alerts**: Never miss a lead. Tailors instantly receive an SMS notification as soon as a customer sends a new enquiry message.

### 👑 For Admins (Internal)
* **Tailor Approvals**: Review and approve KYC details of new tailors wanting to join the platform.
* **Platform Overview**: Monitor all active users, tailor accounts, and ongoing platform orders.

---

## 🛠️ Technology Stack

* **Frontend Framework**: React 19 (Vite.js)
* **Styling & UI**: Tailwind CSS v4, Framer Motion (for fluid animations and micro-interactions), React Icons
* **Backend as a Service (BaaS)**: Firebase
  * **Authentication**: For secure Phone/OTP login.
  * **Firestore Database**: For real-time syncing of chats, orders, and user profile data.
  * **Cloud Storage**: For storing shop banners and completion proof photos.
  * **Hosting**: For deploying the web app fast and securely.
* **Serverless / Background**: Firebase Cloud Functions (Node.js)
* **Third-Party Integrations**: Fast2SMS API (for SMS notifications)

---

## 💻 Local Setup & Installation

### Prerequisites
* Node.js (v18+)
* A Firebase Project (with Auth, Firestore, and Storage enabled)

### 1. Clone the repository
```bash
git clone https://github.com/Devam759/StitchUp-Firebase.git
cd StitchUp-Firebase
```

### 2. Install Dependencies
You can install dependencies from the root directory which will automatically proxy to the Frontend folder:
```bash
npm run install:frontend
```

### 3. Environment Variables
Create a `.env` file inside the `Frontend` directory:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Set to 'false' to connect to the live database, or 'true' to use local emulators
VITE_USE_EMULATOR=false

# Your API key for the SMS service (Fast2SMS)
VITE_SMS_API_KEY=your_fast2sms_api_key
```

### 4. Run the Application
Start the Vite development server:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

---

## 📦 Deployment

The application is configured to deploy to **Firebase Hosting**.

To build and deploy:
```bash
# Build the production bundle
npm run build

# Deploy to Firebase Hosting
npx firebase deploy --only hosting
```

---

*Designed and built to bring convenience to the unorganized tailoring sector.*
