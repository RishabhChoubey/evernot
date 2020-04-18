import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
const fire=require('firebase');
require('firebase/firestore');

  // Initialize Firebase
  fire.initializeApp({
    apiKey: "AIzaSyDzlM6JuLqc1cmNquITB7h_EJlQXCuVldg",
    authDomain: "chatuu-98b03.firebaseapp.com",
    databaseURL: "https://chatuu-98b03.firebaseio.com",
    projectId: "chatuu-98b03",
    storageBucket: "chatuu-98b03.appspot.com",
    messagingSenderId: "836815525142",
    appId: "1:836815525142:web:c592b1253f6a43b3496c37"
  });

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
