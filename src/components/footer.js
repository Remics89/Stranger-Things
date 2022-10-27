import React from "react";
import FSA from "./images/FSA.png";
import GIT from "./images/gitlink.png";

const Footer = () => {
    return (
        <footer id='footer' className="container">
            <a className="footlinks" href="https://fullstackacademy.com" target="_blank">
                <img src={FSA} alt="Fullstack Academy" />
            </a>
            <a
                className="footlinks"
                href="https://github.com/Remics89/Stranger-Things"
                target="_blank">
                <img src={GIT} alt="My Repository" />
            </a>
        </footer>
    );
};

export default Footer;
