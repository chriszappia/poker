import React from "react";
import NewGame from "../NewGame/NewGame";
import { HomeWrapper } from "./Style";

function Home(): JSX.Element {
    return (
        <HomeWrapper>
            <label>Get Started!</label>
            <NewGame />
        </HomeWrapper>
    );
}
export default Home;
