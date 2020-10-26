
// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyDVHEnX-lE7wAyq860durzWlMpRgbUjtCw',
    authDomain: 'table-org.firebaseapp.com',
    projectId: 'table-org'
});

function submitName() {
    var name = document.getElementById('inputName').value
    var collection = firebase.firestore().collection('buzzerboys');

    nameRef = collection.doc(name);
    nameRef.get()
        .then((docSnapshot) => {
            if (docSnapshot.exists) {
                alert(name + ' is already taken.')
            }
            else {
                nameRef.set({
                    buzzed:false
                })
                .then(() => {
                    document.getElementById('nameForm').style.display = 'none'
                    document.getElementById('buzzer').style.display = 'block'
                })
            }
        });
}

function bongo() {
    src = 'assets/bongos.wav'
    new Audio(src).play();
}

function buzz() {
    var collection = firebase.firestore().collection('buzzerboys');

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