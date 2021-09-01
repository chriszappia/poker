import React, { useEffect, useState } from 'react';
import { Statistic }  from 'semantic-ui-react';
import { PersonVote } from '../../data';


export interface PlayerVoteDisplayProps {
    playerVotes: PersonVote[],
    cardsShowing: Boolean,
}

export function PlayerVoteDisplay(props: PlayerVoteDisplayProps) {

  return (
      <>
        <div>
          {props.playerVotes.map((playerVote, index) => (
            <Statistic value={props.cardsShowing ? playerVote.vote.toString() : "?"}
                        label={playerVote.username} />
          ))}
        </div>
    </>
  );
}