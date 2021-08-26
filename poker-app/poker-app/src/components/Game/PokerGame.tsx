import React, { useEffect, useState } from 'react';
import firebase from "firebase/app";
import "firebase/database";
import { Game, PersonVote } from '../../data';

function PokerGame() {

    const id = 1;
    const gameId = 'b06a6b50-5356-4165-a05e-59b3a9873a54';
    const [name, setName] = useState<string>("t");
    const [vote, setVote] = useState<number>(0);
    const [players, setPlayers] = useState<PersonVote[]>([]);
    const [game, setGame] = useState<Game>();
  
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
  
    function initGame() {
      let game: Game = {
        gameId: gameId,
        cardsShowing: false,
        gameName: "Test Game!",
        players: new Map<string, PersonVote>(),
      }
      firebase.database().ref('game/' + gameId).set(game);
    }
  
    function addVote(id: number, name: string, vote: number) {
      firebase.database().ref('game/' + gameId + '/players/' + name).set({
        username: name,
        vote: vote,
      });
    }
  
    function toggleCards()
    {
      if (game)
      {
        firebase.database().ref('game/' + gameId + '/cardsShowing/').set(!game.cardsShowing);
      }
    }
  
    useEffect(() => {
      // Future: Landing page does "create game" when you hit a button.
      initGame(); // TODO remove
      firebase.database().ref('game/'+gameId).on('value', (snapshot: firebase.database.DataSnapshot) => {
        const snap = snapshot.val();
  
        let game = snap as Game;
        setGame(game);
  
        if (game.players)
        {
          const votes: PersonVote[]  = [];
          Object.entries(game.players).forEach(
            ([key, val]) => {
              votes.push(val as PersonVote);
            });
          setPlayers(votes);
            
        }
        // console.log(game);
      });
    }, []);
  
  
    return (
      <>
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
            <tbody>
            {players.map((playerVote, index) => (
              <tr key={playerVote.username}>
                <td>{playerVote.username}</td>
                <td>{game?.cardsShowing ? playerVote.vote.toString() : "?"}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <button onClick={toggleCards}>REVEAL</button>
      </>
    );
  }
export default PokerGame;