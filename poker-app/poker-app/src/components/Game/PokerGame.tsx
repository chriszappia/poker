import React, { useEffect, useState } from 'react';
import firebase from "firebase/app";
import "firebase/database";
import { Game, PersonVote } from '../../data';

import { addVoteToGame, firebaseInit, listenForGameEvents, toggleCardsInGame } from '../../database';

function PokerGame() {

    const id = 1;
    const gameId = 'b06a6b50-5356-4165-a05e-59b3a9873a54';
    const [name, setName] = useState<string>("t");
    const [vote, setVote] = useState<number>(0);
    const [players, setPlayers] = useState<PersonVote[]>([]);
    const [game, setGame] = useState<Game>();
  

    const handleSubmit = (evt:any) => { // TODO fix this
      addVote(id, name, vote);
      evt.preventDefault();
    }
  

    function initFirebase() {
      firebaseInit();
    }

    function initGame() {
    }

    function addVote(id: number, name: string, vote: number) {
      addVoteToGame(gameId, name, vote);
    }
  
    function toggleCards()
    {
      if (game)
      {
        toggleCardsInGame(gameId, game.cardsShowing);
      }
    }

    const gameUpdateHandler = (updatedGame: Game) =>
    {
      setGame(updatedGame);

      if (updatedGame.players)
      {
        const votes: PersonVote[]  = [];
        Object.entries(updatedGame.players).forEach(
          ([key, val]) => {
            votes.push(val as PersonVote);
          });
        setPlayers(votes);
      }
      // console.log(game);
    }

    useEffect(
      () => {
        // Future: Landing page does "create game" when you hit a button.
        initFirebase();
        initGame(); // TODO remove
        listenForGameEvents(gameId, gameUpdateHandler);
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