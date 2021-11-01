import styled from "styled-components";
import { Icon, Popup } from "semantic-ui-react";

export const headerRed = "#db2828";

export const GameH1 = styled.h1`
    color: ${headerRed};
`;

export const RedIcon = styled(Icon)`
    color: ${headerRed};
`;

export const MenuPopup = styled(Popup.Content)`
    width: 20vw;
`;
