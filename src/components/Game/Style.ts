import styled from "styled-components";
import { Button } from "semantic-ui-react";

export const CenteredDiv = styled.div`
    margin: 0 auto;
`;

export const GameWrapper = styled.div`
    padding-bottom: 30vh;
`;

export const PokerCardButton = styled(Button)`
    &:hover {
        transform: scale(1.1);
    }

    height: 150px;

    ${(props) => (props.active ? ` { transform: scale(1.1);}` : "")};
`;

export const PokerCardButtonContentWrapper = styled(Button.Content)`
    margin: auto;
    padding: 10px;
`;

export const PokerCardButtonContent = styled.span`
    font-size: 1.2rem;
`;