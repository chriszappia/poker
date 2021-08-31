import React, { useEffect, useState } from 'react';
import { PersonVote } from '../../data';


export interface PlayerVoteDisplayProps {
    playerVotes: PersonVote[],
    cardsShowing: Boolean,
}

export function PlayerVoteDisplay(props: PlayerVoteDisplayProps) {

  return (
      <>
        <div>
        DATA HERE
        <table>
            <tbody>
            {props.playerVotes.map((playerVote, index) => (
            <tr key={playerVote.username}>
                <td>{playerVote.username}</td>
                <td>{props.cardsShowing ? playerVote.vote.toString() : "?"}</td>
            </tr>
            ))}
            </tbody>
        </table>
        </div>
    </>
  );
}