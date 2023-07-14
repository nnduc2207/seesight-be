const firebase = require('firebase/app');
const { getDatabase } = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyAvmzT2gJ3enucsF7po9Bxp7Thcb8BJSDA",
  authDomain: "mai-phuong-assignment.firebaseapp.com",
  databaseURL: "https://mai-phuong-assignment-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mai-phuong-assignment",
  storageBucket: "mai-phuong-assignment.appspot.com",
  messagingSenderId: "641660001554",
  appId: "1:641660001554:web:a21c815b04099817d0a7cb",
  measurementId: "G-WJ8DGX8GBV"
};

const app = firebase.initializeApp(firebaseConfig);
const db = getDatabase(app);

module.exports = db;