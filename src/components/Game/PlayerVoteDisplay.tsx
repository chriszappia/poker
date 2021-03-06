import React from "react";
import { Statistic } from "semantic-ui-react";
import { PersonVote } from "../../data/types";

export interface PlayerVoteDisplayProps {
    playerVotes: PersonVote[];
    cardsShowing: boolean;
}

export function PlayerVoteDisplay(props: PlayerVoteDisplayProps): JSX.Element {
    return (
        <>
            <div>
                {props.playerVotes.map((playerVote, index) => (
                    <Statistic key={playerVote.username + index}>
                        <Statistic.Value>
                            {props.cardsShowing
                                ? playerVote.vote.toString()
                                : "?"}
                        </Statistic.Value>
                        <Statistic.Label>{playerVote.username}</Statistic.Label>
                    </Statistic>
                ))}
            </div>
        </>
    );
}
