import firebase from 'firebase/app';
import 'firebase/firestore';

const timestamp = firebase.firestore.Timestamp.now()

export function addTrackData(db, track) {
  db.firestore().collection("gpsTracks").add({
    date: timestamp,
    track
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
}