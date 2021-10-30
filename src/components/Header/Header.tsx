import { GameHeader, MenuPopup } from "./Style";
import React from "react";
import EnterName from "../EnterName/EnterName";
import { Link } from "react-router-dom";
import { PokerRoute } from "../../util/Routes";
import { Icon, Menu, Popup } from "semantic-ui-react";
import { Header as SemanticHeader } from "semantic-ui-react";
import NewGame from "../NewGame/NewGame";

function Header(): JSX.Element {
    return (
        <Menu stackable>
            <Menu.Item as={"a"} haeder>
                <Icon name={"pied piper pp"} color={"red"} size={"huge"} />
                <SemanticHeader.Content>
                    <Link to={PokerRoute.HOME}>
                        <GameHeader>Planning Poker</GameHeader>
                    </Link>
                </SemanticHeader.Content>
            </Menu.Item>
            <Popup
                as={Menu.Item}
                trigger={
                    <Menu.Item className={"enter-player-name"}>
                        <Icon name={"add"} />
                    </Menu.Item>
                }
                on={"click"}
            >
                <MenuPopup>
                    <NewGame />
                </MenuPopup>
            </Popup>
            <Menu.Menu position={"right"}>
                <Popup
                    as={Menu.Item}
                    trigger={
                        <Menu.Item>
                            <Icon name={"user"} />
                        </Menu.Item>
                    }
                    on={"click"}
                    className={"enter-player-name"}
                >
                    <MenuPopup>
                        Name: <EnterName />
                    </MenuPopup>
                </Popup>
            </Menu.Menu>
        </Menu>
    );
}
export default Header;
