import firebase from "firebase"

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCMAKxdi0FNKhbxjjqrij9BiuZxZsy5tRU",
    authDomain: "cloth-store-7be37.firebaseapp.com",
    projectId: "cloth-store-7be37",
    storageBucket: "cloth-store-7be37.appspot.com",
    messagingSenderId: "475825202281",
    appId: "1:475825202281:web:e4214765175d3a20766ef8",
    measurementId: "G-4KK2ZP22JX"
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// export Firebase so it can be used elsewhere 
const database = firebase.initializeApp(firebaseConfig);
export default database;