import "firebase/database";
import firebase from "firebase/app";
import { CardType, Game, GameState } from "./types";
import { NIL as NIL_UUID } from "uuid";

const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const FIREBASE_AUTH_DOMAIN = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
const FIREBASE_DB_URL = process.env.REACT_APP_FIREBASE_DB_URL;
const FIREBASE_PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const FIREBASE_MESSAGING_SENDER_ID =
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
const FIREBASE_APP_ID = process.env.REACT_APP_FIREBASE_APP_ID;

export function firebaseInit(): void {
    const firebaseConfig = {
        apiKey: FIREBASE_API_KEY,
        authDomain: FIREBASE_AUTH_DOMAIN,
        databaseURL: FIREBASE_DB_URL,
        projectId: FIREBASE_PROJECT_ID,
        messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
        appId: FIREBASE_APP_ID,
    };
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }
}

export function createNewGame(gameName: string, cardType: CardType): string {
    const gameId: string = NIL_UUID;
    const game: Game = {
        gameId: gameId,
        cardsShowing: false,
        gameName: gameName,
        players: {},
        cardType: cardType,
        gameState: GameState.VOTING,
    };
    firebase
        .database()
        .ref("game/" + gameId)
        .set(game);
    return gameId;
}

export function addVoteToGame(
    gameId: string,
    userId: string,
    username: string,
    vote: string
): void {
    firebase
        .database()
        .ref("game/" + gameId + "/players/" + userId)
        .set({
            username: username,
            vote: vote,
        });
}

export function toggleCardsInGame(gameId: string, cardsShowing: boolean): void {
    firebase
        .database()
        .ref("game/" + gameId + "/cardsShowing/")
        .set(!cardsShowing);
}

export function listenForGameEvents(
    gameId: string,
    callback: (game: Game) => void,
    notFoundCallback: () => void
): void {
    firebase
        .database()
        .ref("game/" + gameId)
        .on("value", (snapshot: firebase.database.DataSnapshot) => {
            if (!snapshot.exists()) {
                notFoundCallback();
                return;
            }
            const snap = snapshot.val();

            const game = snap as Game;
            callback(game);
        });
}
