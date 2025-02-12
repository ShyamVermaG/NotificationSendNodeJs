const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.sendNotification = functions.https.onCall((data, context) => {
  const token = data.token;
  const payload = {
    notification: {
      title: data.title,
      body: data.body,
    },
  };

  console.log("FCM Token(s):", token);
  if (!token || token.length === 0) {
    console.error("Error: Empty registration tokens.");
    // return res.status(400).send("Invalid registration tokens");
  }

  return admin.messaging().sendToDevice(token, payload)
      .then((response) => {
        console.log("Notification sent successfully:", response);
        return {success: true};
      })
      .catch((error) => {
        console.error("Error sending notification:", error);
        throw new functions.https.HttpsError("internal", "Unable toSendNotification");
      });
});
