import React, { SyntheticEvent, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Button, DropdownProps, Form, Select } from 'semantic-ui-react';
import { createNewGame, firebaseInit } from '../../data/database';
import { CardType } from '../../data/types';
import { FormContainer, GameHeader } from './Style';

function Home(): JSX.Element {

    const history = useHistory();

    const [gameName, setGameName] = useState<string>("Planning Poker Game");
    const [cardType, setCardType] = useState<CardType>(CardType.FIBONACCI_MODIFIED);

    const cardTypes = [
        {key: CardType.FIBONACCI, value: CardType.FIBONACCI, text: "Fibonacci"},
        {key: CardType.FIBONACCI_MODIFIED, value: CardType.FIBONACCI_MODIFIED, text: "Modified Fibonacci"},
        {key: CardType.T_SHIRT_SIZES, value: CardType.T_SHIRT_SIZES, text: "T-Shirt Sizes"},
    ];

    function initGame(): void {
        firebaseInit();
        const newGameId = createNewGame(gameName, cardType);
      
        history.push("game/"+ newGameId);
    }

    function dropDownHandler(event: SyntheticEvent, data: DropdownProps) {
        setCardType(data.value as CardType);
    }

    return (
        <>
            <GameHeader>Planning Poker App</GameHeader>
            <FormContainer>
                <label>Get Started!</label>
                <Form>
                    <Form.Field>
                        <label>Game Name</label>
                        <input defaultValue={gameName} onChange={e => setGameName(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <label>Card Type</label>
                        <Select options={cardTypes} defaultValue={cardType} onChange={dropDownHandler} />
                    </Form.Field>
                    <Button onClick={initGame} type='submit'>New Game</Button>
                </Form>
            </FormContainer>
        </>
    );

}
export default Home;
