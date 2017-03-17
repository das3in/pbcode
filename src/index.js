import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAPNugJ6CXzi_gAyx75eaAW6RAKiIQrU-0",
  authDomain: "pb-code-c5ca3.firebaseapp.com",
  databaseURL: "https://pb-code-c5ca3.firebaseio.com",
  storageBucket: "pb-code-c5ca3.appspot.com",
  messagingSenderId: "767088000926"
};

const fb = firebase
           .initializeApp(config)
           .database()
           .ref();

const addPlayer = (data) => fb.child('players').push(data, res => res);
const addTeam = (data) => fb.child('teams').push(data, res => res);
const addMatch = (data) => fb.child('tournaments/2017nxlvegas/matches').push(data, res => res);
const actions = {
  addPlayer,
  addTeam,
  addMatch
}

fb.on('value', snap => {
  const store = snap.val();
  ReactDOM.render(
    <App
      {...store}
      {...actions}
    />,
    document.getElementById('root')
  );
})



