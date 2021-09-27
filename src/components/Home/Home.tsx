import React from 'react';
import { useHistory } from "react-router-dom";
import { CardType } from '../../data';
import { createNewGame, firebaseInit } from '../../database';

function Home() {

    let history = useHistory();

    function initGame(): void {
        firebaseInit();
        const newGameId = createNewGame("Test Name", CardType.FIBONACCI_MODIFIED);
      
        history.push("game/"+ newGameId);
    }

    return (
        <>
            <h1>Poker App</h1>
            <button onClick={initGame}>New Game</button>
        </>
    );

}
export default Home;
