import React from "react";
import { Icon } from "semantic-ui-react";
import { FooterContent, FooterWrapper } from "./Style";

/**
 * https://codepen.io/NotLogo/pen/WOdEmy
 */
const SVG_WAVE: JSX.Element = (
    <svg
        viewBox="0 -20 700 110"
        width="100%"
        height="110"
        preserveAspectRatio="none"
    >
        <path
            transform="translate(0, -20)"
            d="M0,10 c80,-22 240,0 350,18 c90,17 260,7.5 350,-20 v50 h-700"
            fill="#CEB964"
        />
        <path
            d="M0,10 c80,-18 230,-12 350,7 c80,13 260,17 350,-5 v100 h-700z"
            fill="#1a2935"
        />
    </svg>
);

/**
 * Footer component in Poker.
 */
function Footer(): JSX.Element {
    return (
        <FooterWrapper>
            {SVG_WAVE}
            <FooterContent>
                Copyright (c) 2021 chriszappia/poker
                <span className={"report-issue"}>
                    <a href={"https://github.com/chriszappia/poker"}>
                        <Icon name={"github"} color={"grey"} size={"large"} />
                    </a>
                    <a
                        href={
                            "https://github.com/chriszappia/poker/issues/new/choose"
                        }
                    >
                        <Icon
                            name={"warning circle"}
                            color={"red"}
                            size={"large"}
                        />
                    </a>
                </span>
            </FooterContent>
        </FooterWrapper>
    );
}

export default Footer;
