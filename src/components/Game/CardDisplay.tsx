import React from 'react';
import { Button } from 'semantic-ui-react';
import { CardType } from '../../data';
import { getCardsForType } from '../../gameutil/CardGenerator';


export interface CardDisplayProps {
    cardType: CardType;
    voteHandler: (newVote: string) => void,
}


export function CardDisplay(props: CardDisplayProps) {
    return (
        <>
        {getCardsForType(props.cardType).map((cardValue) => (
            <Button content={cardValue.displayValue}
                    onClick={(evt: any) => { 
                        props.voteHandler(cardValue.dbValue);
                    }} />
        ))}
        </>
    );
}