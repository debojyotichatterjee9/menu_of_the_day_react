import Rebase from 're-base';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyD-eDAaxxl96kCqge0uyoAWcsPLpIKEi8g",
    authDomain: "menu-of-the-day-7d3f2.firebaseapp.com",
    databaseURL: "https://menu-of-the-day-7d3f2.firebaseio.com",
}
const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database());

export default base;