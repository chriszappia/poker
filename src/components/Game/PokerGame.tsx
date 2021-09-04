import React, { useEffect, useState } from 'react';
import firebase from "firebase/app";
import "firebase/database";
import { Game, PersonVote } from '../../data';

import { addVoteToGame, firebaseInit, listenForGameEvents, toggleCardsInGame } from '../../database';
import { PlayerVoteDisplay } from './PlayerVoteDisplay';


interface PokerGameProps {
  gameId: string,
}

function PokerGame(props: PokerGameProps) {
  
  const id = 1;
  const [name, setName] = useState<string>("t");
  const [vote, setVote] = useState<string>("0");
  const [players, setPlayers] = useState<PersonVote[]>([]);
  const [game, setGame] = useState<Game>();


  const handleSubmit = (evt:any) => { // TODO fix this
    addVote(id, name, vote);
    evt.preventDefault();
  }

  function initFirebase() {
    firebaseInit();
  }

  function addVote(id: number, name: string, vote: string) {
    addVoteToGame(props.gameId, name, vote);
  }

  function toggleCards()
  {
    if (game)
    {
      toggleCardsInGame(props.gameId, game.cardsShowing);
    }
  }

  function gameUpdateHandler(updatedGame: Game)
  {
    setGame(updatedGame);

    if (updatedGame.players)
    {
      const votes: PersonVote[]  = [];
      // TODO cast this so the game object works properly
      Object.entries(updatedGame.players).forEach(
        ([key, val]) => {
          votes.push(val as PersonVote);
        });
      setPlayers(votes);
    }
  }

  useEffect(
    () => {
      initFirebase();
      listenForGameEvents(props.gameId, gameUpdateHandler);
    }, [props.gameId]);


  return (
    <>
      <div>
        FORM HERE
        <form onSubmit={handleSubmit}>
          <input type="text"
                  value={name} 
                  onChange={e => setName(e.target.value)}/>
          <input type="text"
                  value={vote} 
                  onChange={e => setVote(e.target.value)}/>
          <input type="submit" value="Submit" />
        </form>
      </div>
  
      <PlayerVoteDisplay playerVotes={players}  cardsShowing={game?.cardsShowing ?? false} />

      <button onClick={toggleCards}>REVEAL</button>
    </>
  );
}
export default PokerGame;