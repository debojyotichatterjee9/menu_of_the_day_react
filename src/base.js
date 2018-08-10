import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    
        apiKey: "AIzaSyAc4ey9VcqvcjWD-sYk85En9ctVJIIWzsE",
        authDomain: "catch-of-the-day-debojyoti.firebaseapp.com",
        databaseURL: "https://catch-of-the-day-debojyoti.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

//a named export
export { firebaseApp };

//default export
export default base;