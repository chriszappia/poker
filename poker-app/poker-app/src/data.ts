export interface PersonVote {
    username: string,
    vote: number,
}

export interface Game {
    gameName: string,
    gameId: string,
    cardsShowing: boolean,
    players: object,
}