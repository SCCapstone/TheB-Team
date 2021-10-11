<template>
  <div>
    <div>
         <form id="form" class="form-inline" v-on:submit.prevent="addNote">
          <div class="form-group">
            <!-- Creates space to add note title -->
            <label for="noteTitle">Title:</label>
            <input type="text" id="noteTitle" class="form-control" v-model="newNote.title">
          </div>
          <!-- creates button to sumbit note title -->
          <input type="submit" class="btn btn-primary" value="Add Note">
        </form>
    </div>
  </div>
</template> 

<script>
//imports needed
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
const db = app.database();
const notesRef = db.ref('notes');

export default {
  name: 'app',
  //links the database
  firebase: {
    notes: notesRef
  },
  data () {
    return {
      //stores note
      newNote: {
        title: ''
      }
    }
  },
      methods: {
        //adds note to firebase
        addNote: function() {
        notesRef.push(this.newNote);
        this.newNote.title = '';
        }
        
      }
    }
    


</script>
