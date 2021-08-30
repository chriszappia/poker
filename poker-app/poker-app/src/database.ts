import firebase from "firebase";
import "firebase/database";
import { Game, PersonVote } from "./data";
import { NIL as NIL_UUID } from 'uuid';


export function firebaseInit()
{
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
}

export function createNewGame(gameName: string): string
{
    const gameId: string = NIL_UUID;
    const game: Game = {
        gameId: gameId,
        cardsShowing: false,
        gameName: gameName,
        players: new Map<string, PersonVote>(),
      }
    firebase.database().ref('game/' + gameId).set(game);
    return gameId;
}

export function addVoteToGame(gameId: string, userId: string, vote: number)
{
    firebase.database().ref('game/' + gameId + '/players/' + userId).set({
        username: userId,
        vote: vote,
      });
}


export function toggleCardsInGame(gameId: string, cardsShowing: boolean)
{
    firebase.database().ref('game/' + gameId + '/cardsShowing/').set(!cardsShowing);
}


export function listenForGameEvents(gameId: string, callback: (game: Game) => void)
{
  firebase.database().ref('game/' + gameId).on('value', (snapshot: firebase.database.DataSnapshot) => {
    const snap = snapshot.val();

    let game = snap as Game;
    callback(game);
  });
}