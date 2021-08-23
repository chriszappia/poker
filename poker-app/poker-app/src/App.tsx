import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/database";
import { PersonVote } from './data';


function App() {

  const id = 1;
  const [name, setName] = useState<string>("t");
  const [vote, setVote] = useState<number>(0);
  const [players, setPlayers] = useState<PersonVote[]>([]);

  const firebaseConfig = {
    apiKey: "AIzaSyBqtocdVqufi9w4DVrnV5cNVRcY6wfk_ic",
    authDomain: "preferential-planning-poker.firebaseapp.com",
    databaseURL: "https://preferential-planning-poker-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "preferential-planning-poker",
    storageBucket: "preferential-planning-poker.appspot.com",
    messagingSenderId: "637733111532",
    appId: "1:637733111532:web:60ffc6730de55e759107c9"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }
  // firebase.initializeApp(firebaseConfig);
  // var database = firebase.database();

  const handleSubmit = (evt:any) => { // TODO fix this
    addVote(id, name, vote);
    evt.preventDefault();
  }

  function addVote(id: number, name: string, vote: number) {
    firebase.database().ref('test/' + id + '/' + name).set({
      username: name,
      vote: vote,
    });
  }



  useEffect(() => {
    firebase.database().ref('test/'+id).on('value', (snapshot: firebase.database.DataSnapshot) => {
      const snap = snapshot.val();
      const t: PersonVote[]  = [];
      Object.entries(snap).forEach(
        ([key, value]) => t.push(value as PersonVote)
      );
      setPlayers(t);
    });
}, []);


  return (
    <div className="App">
      <div>
        FORM HERE
        <form onSubmit={handleSubmit}>
          <input type="text"
                 value={name} 
                 onChange={e => setName(e.target.value)}/>
          <input type="number"
                 value={vote} 
                 onChange={e => setVote(e.target.valueAsNumber)}/>
          <input type="submit" value="Submit" />
        </form>
      </div>
 
      <div>
        DATA HERE
        <table>
        {players.map((playerVote, index) => (
          <tr>
            <td>{playerVote.username}</td>
            <td>{playerVote.vote.toString()}</td>
          </tr>
        ))}
        </table>
      </div>
    </div>
  );
}

export default App;
