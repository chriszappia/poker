import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { CardType } from "../../data/types";
import { getCardsForType } from "../../gameutil/CardGenerator";

export interface CardDisplayProps {
    cardType: CardType;
    voteHandler: (newVote: string) => void;
}

export function CardDisplay(props: CardDisplayProps): JSX.Element {
    const [currentVote, setCurrentVote] = useState<string>("");

    function voteHandler(newVote: string) {
        setCurrentVote(newVote);
        props.voteHandler(newVote);
    }

    return (
        <>
            {getCardsForType(props.cardType).map((cardValue) => (
                <Button
                    basic
                    color={currentVote === cardValue.dbValue ? "red" : "black"}
                    content={cardValue.displayValue}
                    onClick={(_) => {
                        voteHandler(cardValue.dbValue);
                    }}
                    key={cardValue.dbValue}
                />
            ))}
        </>
    );
}
