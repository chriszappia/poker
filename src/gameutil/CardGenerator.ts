import { CardType } from "../data";


export interface DisplayCard {
    displayValue: string,
    dbValue: string,
}

const MODIFIED_FIBONACCI_CARDS: DisplayCard[] = [
    "0", "0.5", "1", "2", "3", "5", "8", "13", "20", "40", "100", "?"].map(toDisplayCard);

const FIBONACCI_CARDS: DisplayCard[] = [
    "0", "0.5", "1", "2", "3", "5", "8", "13", "21", "34", "55", "89", "?"].map(toDisplayCard);

const T_SHIRT_SIZE_CARDS: DisplayCard[] = [
    "XS", "S", "M", "L", "XL", "?"].map(toDisplayCard);


export function getCardsForType(cardType: CardType): DisplayCard[] {
    switch(cardType) {
        case(CardType.FIBONACCI): {
            return FIBONACCI_CARDS
        }
        case(CardType.FIBONACCI_MODIFIED): { 
            return MODIFIED_FIBONACCI_CARDS;
        }
        case(CardType.T_SHIRT_SIZES): {
            return T_SHIRT_SIZE_CARDS;
        }
    }
}

function toDisplayCard(cardValue: string): DisplayCard {
    return {dbValue: cardValue, displayValue: cardValue} as DisplayCard;
}