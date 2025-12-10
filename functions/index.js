const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Initialize the backend app
admin.initializeApp();

exports.getCompanyData = functions.https.onCall(async (data, context) => {
  try {
    console.log("Attempting to fetch document..."); // Log 1

    // 1. Reference the document
    const docRef = admin.firestore().collection("companies").doc("tomo_corp");
    
    // 2. Fetch it
    const docSnap = await docRef.get();

    // 3. Return data or throw specific error
    if (docSnap.exists) {
      console.log("Document found!"); // Log 2
      return docSnap.data();
    } else {
      console.log("Document does NOT exist."); // Log 3
      throw new functions.https.HttpsError("not-found", "Company document 'tomo_corp' does not exist.");
    }

  } catch (error) {
    // --- THIS IS THE IMPORTANT PART ---
    // Log the EXACT error to your terminal so you can see it
    console.error("DETAILED ERROR:", error);

    // If it's already a specific error (like not-found), throw it as is
    if (error.code === "not-found") {
      throw error;
    }

    // Otherwise, throw internal
    throw new functions.https.HttpsError("internal", "Unable to connect to Database", error);
  }
});