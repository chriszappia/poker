import React from 'react';

function Home() {

    function initGame(): void {
        // TODO
    }

    return (
        <>
            <h1>Poker App</h1>
            <button onClick={initGame}>New Game</button>
        </>
    );

}
export default Home;