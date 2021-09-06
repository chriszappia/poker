import React, { useEffect, useState } from 'react';
import "firebase/database";
import { Game, PersonVote } from '../../data';

import { addVoteToGame, firebaseInit, listenForGameEvents, toggleCardsInGame } from '../../database';
import { PlayerVoteDisplay } from './PlayerVoteDisplay';
import { CardDisplay } from './CardDisplay';


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
      {gameExists && game ? <GameView votes={players}
                              game={game}
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

  function voteHandler(vote: string) {
    setVote(vote);
    addVote(name, vote);
  }

  function addVote(name: string, vote: string) {
    addVoteToGame(props.game.gameId, name, vote);
  }


  return (
    <>
  
      <PlayerVoteDisplay playerVotes={props.votes}  cardsShowing={props.game.cardsShowing} />
      <span>
      <CardDisplay cardType={props.game.cardType} 
                   voteHandler={voteHandler} />
      </span>
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