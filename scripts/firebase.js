
// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyDVHEnX-lE7wAyq860durzWlMpRgbUjtCw',
    authDomain: 'table-org.firebaseapp.com',
    projectId: 'table-org'
});

var playerName;
var buzzerEnabled = false;


function submitName() {
    var name = document.getElementById('inputName').value.toLowerCase();
    document.getElementById('inputName').value = '';
    var db = firebase.firestore();
    var collection = db.collection('buzzerboys');

    // disable the button for the moment
    document.getElementById('nameBtn').disabled = true;

    // save the name locally as a var, may need more robust system
    playerName = name;
    buzzerEnabled = true;

    // save alerts locally
    var alerts = [];
    var playersBuzzed = [];

    if (name.toLowerCase() === 'oohoohahah') {
        // activate admin console

        // hide form
        document.getElementById('nameForm').remove();

        // dynamically build admin console
        
        var title = document.createElement('h1');
        title.innerHTML = 'Secret Admin Console';

        var resetBtn = document.createElement('button');
        resetBtn.innerHTML = 'Reset Buzzers';
        resetBtn.className = "btn btn-primary";
        resetBtn.onclick = function() {
            collection.get().then(function(snapshot) {
                snapshot.forEach(function(doc) {
                    doc.ref.update({
                        buzzed:false,
                        first:false
                    });
                });
            })
            .catch(function(error) {

            });
            for (let i=0; i<alerts.length; i++) {
                let domElement = alerts[i];
                domElement.remove();
            }
            playersBuzzed = [];
        };
        document.body.append(title);
        document.body.append(resetBtn);
        
        collection.onSnapshot(function(querySnapshot) {
            // List of all player docs
            querySnapshot.forEach(function(doc) {
                updates = doc.data();
                name = doc.id;
                if (!playersBuzzed.includes(name) && updates.buzzed == true) {
                    playersBuzzed.push(name);
                    var playerAlert = document.createElement('div');
                    playerAlert.innerHTML = name;
                    if (playersBuzzed[0] === name) {
                        playerAlert.className = 'alert alert-success';

                        // maybe send the first alert here instead of cloud funcs
                        collection.doc(name).update({
                            first:true
                        });
                    }
                    else {
                        playerAlert.className = 'alert alert-secondary';
                    }
                    document.body.append(playerAlert);
                    alerts.push(playerAlert);
                }
                else {
                    // this is probably just an initial query not important
                    console.log('conditions were not met');
                }
            });
        });
    }
    else {
        nameRef = collection.doc(name);
        nameRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    document.getElementById('nameBtn').disabled = false;
                    alert(name + ' is already taken.');
                }
                else {
                    nameRef.set({
                        buzzed:false,
                        first:false
                    })
                    .then(() => {
                        document.getElementById('nameForm').style.display = 'none';
                        document.getElementById('buzzer').style.display = 'block';
                    })
                }

                nameRef.onSnapshot(function(doc) {
                    console.log('data changed ' + doc.data());
                    updates = doc.data();
                    if (updates.buzzed && updates.first) {
                        // They buzzed and won
                        console.log('Winner winner chicken dinner');
                        document.getElementById('mainBody').style.backgroundColor = 'green';
                    }
                    else if (updates.buzzed && !updates.first) {
                        // They buzzed and lost
                        console.log('Almost won');
                        document.getElementById('mainBody').style.backgroundColor = 'white';
                    }
                    else {
                        // They did not buzz
                        console.log('why didnt ya buzz');
                        document.getElementById('mainBody').style.backgroundColor = 'white';
                    }
                })
            });
    }
}

function bongo() {
    src = 'assets/bongos.wav'
    new Audio(src).play();
}

function buzz() {
    var collection = firebase.firestore().collection('buzzerboys');

    if (buzzerEnabled) {
        collection.doc(playerName).update({
            buzzed: true
        })
        .then(function(docRef) {
            buzzerEnabled = false;
            bongo();
        })
        .catch(function(error) {
            buzzerEnabled = true;
        });
    } else {
        alert('You already buzzed this round.')
    }
}

