import firebase from 'firebase';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyB_bRrdaCJeLBH9F8qRqP9FsSx1XmrseN0",
  authDomain: "pocfirebase-470e9.firebaseapp.com",
  projectId: "pocfirebase-470e9",
  storageBucket: "pocfirebase-470e9.appspot.com",
  messagingSenderId: "916652745295",
  appId: "1:916652745295:web:05b53a52ff3376f6b6c03a",
  measurementId: "G-494G9828VB"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const variablesCollection = db.collection('Variables');

export const createVariable = variable => {
    return variablesCollection.add(variable);
}

export const getVariable = async id => {
    const variable = await variablesCollection.doc(id).get();
    return variable.exists ? variable.data() : null;
}

export const updateVariable = (id, variable) => {
    return variablesCollection.doc(id).update(variable);
}

export const deleteVariable = id => {
    return variablesCollection.doc(id).delete();
}
