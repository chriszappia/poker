import React, { useEffect, useState } from 'react';
import "firebase/database";
import { Game, PersonVote } from '../../data';

import { addVoteToGame, firebaseInit, listenForGameEvents, toggleCardsInGame } from '../../database';
import { PlayerVoteDisplay } from './PlayerVoteDisplay';


interface PokerGameProps {
  gameId: string,
}

function PokerGame(props: PokerGameProps) {
  const [players, setPlayers] = useState<PersonVote[]>([]);
  const [game, setGame] = useState<Game>();
  const [gameExists, setGameExists] = useState<Boolean>(false);

  function initFirebase() {
    firebaseInit();
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
    setGameExists(true);
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

  function gameNotFoundHandler() {
    setGameExists(false);
  }

  useEffect(
    () => {
      initFirebase();
      listenForGameEvents(props.gameId, gameUpdateHandler, gameNotFoundHandler);
    }, [props.gameId]);


  return (
    <>
      {gameExists ? <GameView votes={players}
                              game={game!} // If game exists this won't be undefined
                              cardFlipHandler={toggleCards} /> 
                  : <GameNotFound />}
    </>
  );
}


interface GameViewProps {
  votes: PersonVote[],
  game: Game,
  cardFlipHandler: () => void,
};

function GameView(props: GameViewProps) {
  
  const [name, setName] = useState<string>("Test");
  const [vote, setVote] = useState<string>("0");

  const handleSubmit = (evt:any) => { // TODO fix this
    addVote(name, vote);
    evt.preventDefault();
  }

  function addVote(name: string, vote: string) {
    addVoteToGame(props.game.gameId, name, vote);
  }


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
  
      <PlayerVoteDisplay playerVotes={props.votes}  cardsShowing={props.game.cardsShowing} />

      <button onClick={props.cardFlipHandler}>REVEAL</button>
    </>
  );
}



function GameNotFound() {
  return (
    <>
      <h1>Game not found</h1>
    </>
  );
}

export default PokerGame;