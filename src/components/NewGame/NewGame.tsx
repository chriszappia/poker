import { Button, DropdownProps, Form, Select } from "semantic-ui-react";
import React, { SyntheticEvent, useState } from "react";
import { CardType } from "../../data/types";
import { createNewGame, firebaseInit } from "../../data/database";
import { useHistory } from "react-router-dom";
import { FormContainer } from "./Style";

const CARD_TYPES = [
    {
        key: CardType.FIBONACCI,
        value: CardType.FIBONACCI,
        text: "Fibonacci",
    },
    {
        key: CardType.FIBONACCI_MODIFIED,
        value: CardType.FIBONACCI_MODIFIED,
        text: "Modified Fibonacci",
    },
    {
        key: CardType.T_SHIRT_SIZES,
        value: CardType.T_SHIRT_SIZES,
        text: "T-Shirt Sizes",
    },
];

function NewGame(): JSX.Element {
    const history = useHistory();

    const [gameName, setGameName] = useState<string>("Planning Poker Game");
    const [cardType, setCardType] = useState<CardType>(
        CardType.FIBONACCI_MODIFIED
    );

    function initGame(): void {
        firebaseInit();
        const newGameId = createNewGame(gameName, cardType);

        history.push("game/" + newGameId);
    }

    function dropDownHandler(event: SyntheticEvent, data: DropdownProps) {
        setCardType(data.value as CardType);
    }

    return (
        <FormContainer>
            <Form>
                <Form.Field>
                    <label>Game Name</label>
                    <input
                        defaultValue={gameName}
                        onChange={(e) => setGameName(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Card Type</label>
                    <Select
                        options={CARD_TYPES}
                        defaultValue={cardType}
                        onChange={dropDownHandler}
                    />
                </Form.Field>
                <Button onClick={initGame} type="submit">
                    New Game
                </Button>
            </Form>
        </FormContainer>
    );
}

export default NewGame;
