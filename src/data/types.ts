export interface PersonVote {
    username: string,
    vote: string,
}

export interface Game {
    gameName: string,
    gameId: string,
    cardsShowing: boolean,
    players: Record<string, unknown>,
    cardType: CardType,
    gameState: GameState,
}

export enum CardType {
    FIBONACCI= "FIBONACCI",
    FIBONACCI_MODIFIED = "FIBONACCI_MODIFIED",
    T_SHIRT_SIZES = "T_SHIRT_SIZES",
}

export enum GameState {
    VOTING = "VOTING",
    SHOWING_CARDS = "CARDS_SHOWING",
}