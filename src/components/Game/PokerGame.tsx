import React, { useEffect, useState } from 'react';
import "firebase/database";
import { Game, PersonVote } from '../../data/data';

import { Container, Grid } from 'semantic-ui-react';

import { PlayerVoteDisplay } from './PlayerVoteDisplay';
import { CardDisplay } from './CardDisplay';
import { useAppSelector } from '../../app/hooks';
import { setUserName } from '../../app/UserSlice';
import { useDispatch } from 'react-redux';
import { addVoteToGame, firebaseInit, listenForGameEvents, toggleCardsInGame } from '../../data/database';


interface PokerGameProps {
  gameId: string,
}

function PokerGame(props: PokerGameProps): JSX.Element {
  const [players, setPlayers] = useState<PersonVote[]>([]);
  const [game, setGame] = useState<Game>();
  const [gameExists, setGameExists] = useState<boolean>(false);

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
        ([_, val]) => {
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


  const userId = useAppSelector((state) => state.user.userId);
  const userName = useAppSelector((state) => state.user.userName);

  return (
    <>
    <Container>
      {gameExists && game ? <GameView votes={players}
                              game={game}
                              cardFlipHandler={toggleCards} 
                              username={userName} 
                              userId={userId} />
                  : <GameNotFound />}
                  <p>{userId}</p>
    </Container>
    </>
  );
}


interface GameViewProps {
  votes: PersonVote[],
  game: Game,
  cardFlipHandler: () => void,
  username: string,
  userId: string,
}

function GameView(props: GameViewProps) {
  
  const [name, setName] = useState<string>(props.username);
  // const [vote, setVote] = useState<string>("0");

  function voteHandler(vote: string) {
    // setVote(vote);
    addVote(name, vote);
  }

  function addVote(name: string, vote: string) {
    addVoteToGame(props.game.gameId, props.userId, name, vote);
  } 

  const dispatch = useDispatch();


  return (
    <>
    <div>
        <Grid divided='vertically'>

        <Grid.Row columns="3">
          <Grid.Column />
          <Grid.Column>
            <h1>{props.game.gameName}</h1>
          </Grid.Column>
          <Grid.Column>
      <input type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onBlur={_ => dispatch(setUserName(name))}/>
          </Grid.Column>
        </Grid.Row>
      <Grid.Row columns="1">
      <PlayerVoteDisplay playerVotes={props.votes}  cardsShowing={props.game.cardsShowing} />
      </Grid.Row>
      <Grid.Row columns="1">
      <CardDisplay cardType={props.game.cardType} 
                   voteHandler={voteHandler} />
      <button onClick={props.cardFlipHandler}>REVEAL</button>
      </Grid.Row>
      </Grid>
      </div>
    </>
  );
}


function GameNotFound(): JSX.Element {
  return (
    <>
      <h1>Game not found</h1>
    </>
  );
}

export default PokerGame;