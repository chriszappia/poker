import React from "react";
import { Button } from "semantic-ui-react";
import { CardType } from "../../data/types";
import { getCardsForType } from "../../gameutil/CardGenerator";

export interface CardDisplayProps {
    cardType: CardType;
    voteHandler: (newVote: string) => void;
}

export function CardDisplay(props: CardDisplayProps): JSX.Element {
    return (
        <>
            {getCardsForType(props.cardType).map((cardValue) => (
                <Button
                    content={cardValue.displayValue}
                    onClick={(_) => {
                        props.voteHandler(cardValue.dbValue);
                    }}
                    key={cardValue.dbValue}
                />
            ))}
        </>
    );
}
