import firebase from 'firebase/app';
import 'firebase/firestore';

import 'firebase/auth';
//const functions = require('firebase-functions');
//const admin = require('firebase-admin')

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
const conditionsCollection = db.collection('Conditions');
const adminsCollection = db.collection('admins');
const auth = firebase.auth(app)
export { auth }
/*exports.AddUserRole = functions.auth.user().onCreate(async (authUser) => {

    if (authUser.email) {
      const customClaims = {
        admin: true,
      };
      try {
        admin.auth().setCustomUserClaims(authUser.uid, customClaims)
  
        return db.collection("roles").doc(authUser.uid).set({
          email: authUser.email,
          role: customClaims
        })
  
      } catch (error) {
        console.log(error)
      }
  
    }
  
  });*/

export const getVariables = async () => {
    const querySnapshot = await variablesCollection.get();
    const variables = [];
    querySnapshot.forEach((doc) => {
        const variable = {
            id: doc.id,
            ...doc.data()
        }
        variables.push(variable);
    });
    return variables;
}

export const getAdmins = async () => {
    const querySnapshot = await adminsCollection.get();
    const admins = [];
    querySnapshot.forEach((doc) => {
        const admin = {
            id: doc.id,
            ...doc.data()
        }
        admins.push(admin);
    });
    return admins;
}

export const getVariablesFiltered = async (list) => {
    const querySnapshot = await variablesCollection.where('name', 'in', list).get();
    const variables = [];
    querySnapshot.forEach((doc) => {
        const variable = {
            id: doc.id,
            ...doc.data()
        }
        variables.push(variable);
    });
    return variables;
}

export const createVariable = (variable) => {
    return variablesCollection.add(variable);
}

export const getVariable = async (id) => {
    const variable = await variablesCollection.doc(id).get();
    return variable.exists ? variable.data() : null;
}

export const updateVariable = async (id, variable) => {
    return await variablesCollection.doc(id).update(variable);
}

export const deleteVariable = (id) => {
    return variablesCollection.doc(id).delete();
}

export const getConditions = async () => {
    const querySnapshot = await conditionsCollection.get();
    const conditions = [];
    querySnapshot.forEach((doc) => {
        const condition = {
            id: doc.id,
            ...doc.data()
        }
        conditions.push(condition);
    });
    return conditions;
}

export const getConditionsByState = async (state) => {
    const querySnapshot = await conditionsCollection.where('state', '==', state).get();
    const conditions = [];
    querySnapshot.forEach((doc) => {
        const condition = {
            id: doc.id,
            ...doc.data()
        }
        conditions.push(condition);
    });
    return conditions;
}

export const getConditionsByStates = async (list) => {
    const querySnapshot = await conditionsCollection.where('state', 'in', list).get();
    const conditions = [];
    querySnapshot.forEach((doc) => {
        const condition = {
            id: doc.id,
            ...doc.data()
        }
        conditions.push(condition);
    });
    return conditions;
}

export const getConditionsByVariable = async (variable) => {
    const querySnapshot = await conditionsCollection.where('variable', '==', variable).get();
    const conditions = [];
    querySnapshot.forEach((doc) => {
        const condition = {
            id: doc.id,
            ...doc.data()
        }
        conditions.push(condition);
    });
    return conditions;
}

export const createCondition = (condition) => {
    return conditionsCollection.add(condition);
}

export const getCondition = async (id) => {
    const condition = await conditionsCollection.doc(id).get();
    return condition.exists ? condition.data() : null;
}

export const updateCondition = async (id, condition) => {
    return await conditionsCollection.doc(id).update(condition);
}

export const deleteCondition = (id) => {
    return conditionsCollection.doc(id).delete();
}