/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onCall} = require("firebase-functions/v2/https");
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { increment } = require("firebase/firestore");
const cors = require('cors')({origin: true});
admin.initializeApp();



// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
 
  /* exports.createUserDocument = functions.auth.user().onCreate((user) => {
    const userData = {
      email: user.email,
      name: user.displayName,
      orders: 0,
    };

    return admin.firestore().collection('users').doc(user.uid).set(userData)
      .then(() => {
      
        console.log('User document created successfully')
      })
      .catch((error) => {
        console.error(error)
      })
  })   */

  /* exports.updateDisplayNameInUserDocument = functions.auth.user().onUpdate(async (change) => {
    const newUser = change.after; 
    const previousUser = change.before; 
  
    if (newUser.displayName !== previousUser.displayName) {
      const displayName = newUser.displayName;
  
      try {
        const userDocRef = admin.firestore().collection('users').doc(newUser.uid);
        await userDocRef.update({ name: displayName });
        console.log(`User document updated with new display name: ${displayName}`);
      } catch (error) {
        console.error('Error updating user document:', error);
      }
    }
  }); */
 
  
    /* exports.createUserDocumentCall = functions.https.onCall(async (data, context) => {
    cors(context.req, context.res, async () => {
    context.res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
      const { uid, displayName } = data;
  
      const userData = {
        email: context.auth.token.email,
        name: displayName,
        orders: 0,
      };
  
      try {
        await admin.firestore().collection('users').doc(uid).set(userData);
        console.log('User document created successfully with display name');
      } catch (error) {
        console.error(error);
      }
    });
  });   */

  exports.createUserDocumentCall = functions.https.onCall(async (data, context) => {
    
  
    try {
        const userDocRef = admin.firestore().collection('users').doc(data.uid);
        await userDocRef.set({
            email: data.email,
            name: data.name,
            orders: 0,
        })

        console.log('User document created successfully');

    return Promise.resolve(`Sucessfully created user`);
    }
    catch(err) {
        console.error(err)
        return Promise.resolve(`Failed to create user`);}
  })

  exports.createOrder = functions.https.onCall(async (data, context) => {
    try {
        const orderDocRef = admin.firestore().collection('orders').doc();
        await orderDocRef.set({
            userInfo: data.userInfo,
            propertieId: data.id,
        })
        console.log('Order document created successfully');

    return `Sucessfully created order`;
    }
    catch(err) {
        console.error(err)
        return `Failed to create order`;} 


  })

  
  exports.updateOrders = functions.firestore.document('orders/{orderId}').onCreate(async (snapshot, context) => {
    try {
        const orderData = snapshot.data();
        const userId = orderData.userInfo.id;

        const userDocRef = admin.firestore().collection('users').doc(userId);
        const userDoc = await userDocRef.get(); // Fetch the user document

        if (userDoc.exists) {
            const userData = userDoc.data();
            const currentOrders = userData.orders || 0; // If orders field doesn't exist, default to 0

            const newValueOrders = currentOrders + 1;
            console.log('New value for orders field:', newValueOrders);
            await userDocRef.update({ orders: newValueOrders });

            console.log('User document updated with new order count');
        } else {
            console.log('User document not found');
        }
    } catch (err) {
        console.log("ERROR:", err);
    }
});


    exports.updateAvailable = onDocumentCreated("orders/{orderId}", async (event) => {
      const snapshot = event.data;
      if (!snapshot) {
        console.log("No data associated with the event");
        return;
    }
      try {
        const data = snapshot.data();
        const soldPropertieId = data.propertieId;
    
        const propertieDocRef = admin.firestore().collection('properties').doc(soldPropertieId);
        await propertieDocRef.update({ available: false });
    
      }
      catch(err) {
        console.log("ERROR:", err)
      }

    

  })
  /* exports.updateOrdersInUserDocument = functions.firestore.document('orders/{orderId}').onCreate(async (snap, context) => {
    const order = snap.data();
    const soldPropertieId = order.propertieId;
    const propertieDocRef = admin.firestore().collection('properties').doc(soldPropertieId);
    await propertieDocRef.update({ available: false });
    const userId = order.userInfo.id;
    const userDocRef = admin.firestore().collection('users').doc(userId);
    await userDocRef.update({ orders: admin.firestore.FieldValue.increment(1) });
    console.log('User document updated with new order count');

    return Promise.resolve(`Sucessfully updated user`);
  }) */