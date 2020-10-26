
// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyDVHEnX-lE7wAyq860durzWlMpRgbUjtCw',
    authDomain: 'table-org.firebaseapp.com',
    projectId: 'table-org'
});


function bongo() {
    src = 'assets/bongos.wav'
    new Audio(src).play();
}

function buzz() {
    var db = firebase.firestore();

    collectionName = 'buzzerboys';

    // db.collection(collectionName).add({
    //     first: 'Harry',
    //     last: 'Wendorff'
    // })
    // .then(function(docRef) {
    //     console.log("Document written with ID: ", docRef.id);
    // })
    // .catch(function(error) {
    //     console.error("Error adding document: ", error);
    // });

    bongo();
}