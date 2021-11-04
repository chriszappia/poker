import React, { useState } from "react";
import { CardType } from "../../data/types";
import { getCardsForType } from "../../gameutil/CardGenerator";
import {
    PokerCardButton,
    PokerCardButtonContent,
    PokerCardButtonContentWrapper,
} from "./Style";

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
                <PokerCardButton
                    active={currentVote === cardValue.dbValue}
                    onClick={() => {
                        voteHandler(cardValue.dbValue);
                    }}
                    key={cardValue.dbValue}
                >
                    <PokerCardButtonContentWrapper>
                        <PokerCardButtonContent>
                            {cardValue.displayValue}
                        </PokerCardButtonContent>
                    </PokerCardButtonContentWrapper>
                </PokerCardButton>
            ))}
        </>
    );
}
