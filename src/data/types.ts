export interface PersonVote {
    username: string;
    vote: string;
}

export interface Game {
    gameName: string;
    gameId: string;
    cardsShowing: boolean;
    players: Record<string, PersonVote>;
    cardType: CardType;
    gameState: GameState;
    createdAt: number;
}

export enum CardType {
    FIBONACCI = "FIBONACCI",
    FIBONACCI_MODIFIED = "FIBONACCI_MODIFIED",
    T_SHIRT_SIZES = "T_SHIRT_SIZES",
}

export enum GameState {
    VOTING = "VOTING",
    SHOWING_CARDS = "SHOWING_CARDS",
}
