const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();

// SMS Service Configuration
// Provide the service key via environment variables securely.
const apiKey = process.env.SMS_PROVIDER_KEY || "";

exports.sendEnquirySMS = onDocumentCreated("enquiries/{enquiryId}", async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
        console.log("No snapshot data");
        return null;
    }

    const data = snapshot.data();
    const tailorId = data.tailorId;

    if (!tailorId) {
        console.log("No tailorId found in enquiry");
        return null;
    }

    try {
        // Fetch tailor phone number from users collection
        const userDoc = await admin.firestore().collection("users").doc(tailorId).get();
        if (!userDoc.exists) {
            console.log("Tailor user document not found:", tailorId);
            return null;
        }

        const tailorData = userDoc.data();
        const phone = tailorData.phone;

        if (!phone) {
            console.log("No phone number found for tailor:", tailorId);
            return null;
        }

        // Clean phone number (remove +91 if present, Fast2SMS expects 10 digits or comma-separated)
        const cleanPhone = phone.replace(/\D/g, "").slice(-10);

        if (!apiKey) {
            console.warn("API Key is not set. SMS won't be sent.");
            return null;
        }

        console.log(`Sending SMS to ${cleanPhone} for new enquiry`);

        // Send SMS via Fast2SMS
        const response = await axios.get("https://www.fast2sms.com/dev/bulkV2", {
            params: {
                authorization: apiKey,
                route: "q", // Quick Message route
                message: "new enquiry",
                language: "english",
                flash: "0",
                numbers: cleanPhone
            }
        });

        if (response.data.return) {
            console.log("SMS sent successfully:", response.data.message);
        } else {
            console.error("Fast2SMS Error:", response.data.message);
        }

    } catch (error) {
        console.error("Error in sendEnquirySMS function:", error);
    }

    return null;
});
