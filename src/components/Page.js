import React, { useEffect, useState, useRef } from "react";
import useCookie from "react-use-cookie";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Menu from "./Menu";

import BasicStyle from "./BasicStyle";

import foyer from "../sounds/foyer.mp3";
import mimosa from "../sounds/mimosa.mp3";
import sam from "../sounds/sam.mp3";
import robert from "../sounds/robert.mp3";
import isadora from "../sounds/isadora.mp3";
import sidney from "../sounds/sidney.mp3";
import singing from "../sounds/singing.mp3";

const sounds = {
    "/1-foyer/00-foyer": foyer,
    "/2-mimosas-room/00-mimosa": mimosa,
    "/3-sams-room/00-sam": sam,
    "/4-roberts-room/00-robert": robert,
    "/4-roberts-room/02-the-singing-alphabet": singing,
    "/5-sidney-and-isadoras-room/00-sidney-and-isadora": isadora,
    "/6-after-hours/00-after-hours": sidney,
};

const Page = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const Content = styled.div`
    flex: 1;
    padding: 0;
    height: 100%;
    overflow: hidden;
    position: relative;
`;

const IframeSourceContainer = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    background: transparent;
    border-bottom-width: 2px;
    iframe {
        position: absolute;
        width: 100%;
        height: 100%;
        @media screen and (max-width: 768px) {
            width: 200%;
            height: 200%;
            transform: scale(0.5);
            transform-origin: top left;
        }
    }
`;

const SoundConsent = styled.div`
    padding: 1rem;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
    line-height: 1.4;
    height: 20vh;
    width: 20vh;
    border-radius: 50%;
    border: 2px solid red;
    margin-left: ${(props) => props.m}vw;
    margin-top: ${(props) => props.h}vh;
`;

const SoundButton = styled.a`
    line-height: 1.1;
    margin: 0 0.5rem 0 0;
    cursor: pointer;
    &:hover {
        //color: red;
    }
`;

export default ({
    data: {
        googleDocs: {
            description,
            name: title,
            document: { documentId },
            childMarkdownRemark: { html },
        },
    },
    location,
}) => {
    const [pageTitle, setPageTitle] = useState("");
    const audioRef = useRef();
    const [acceptsSound, setAcceptsSound] = useCookie("okWithSound", "0");
    const [hasAcceptedSound, setHasAcceptedSound] = useState(false);

    var d = new Date();
    var hPercent = ((d.getHours() + 1) / 24) * 50;
    var mPercent = ((d.getMinutes() + 1) / 60) * 50;
    console.log(hPercent, mPercent);

    useEffect(() => {
        const pageTitleA = "Overlapping writing";
        const pageTitleB = description
            ? description.split("/").slice(-1)[0]
            : title.replace(/[0-9 ]/g, "");
        let interimPageTitle = "";
        for (let i = 0; i <= pageTitleA.length; i += 1) {
            interimPageTitle +=
                pageTitleA.substr(i, 2) + pageTitleB.substr(i / 2, 1);
        }
        setPageTitle(interimPageTitle);
    }, [description, title]);

    useEffect(() => {
        if (acceptsSound === "1" && sounds[location.pathname]) {
            console.log("playing", location.pathname);
            audioRef.current.src = sounds[location.pathname];
            audioRef.current.play().catch((e) => console.log(e));
        }
    }, [acceptsSound, location.pathname]);

    return (
        <>
            <audio ref={audioRef} />
            <BasicStyle />
            <Helmet>
                <meta charSet="utf-8" />
                <title>{pageTitle}</title>
            </Helmet>
            <Page>
                <Menu location={location} />
                <Content>
                    {location.pathname === "/home" ? (
                        <div>
                            {hasAcceptedSound === false && (
                                <SoundConsent h={hPercent} m={mPercent}>
                                    <div>
                                        This publication also sings. Would you
                                        like to hear it?
                                    </div>
                                    <div>
                                        <SoundButton
                                            onClick={() => {
                                                setAcceptsSound("1");
                                                setHasAcceptedSound(true);
                                            }}
                                        >
                                            Yes
                                        </SoundButton>
                                        <SoundButton
                                            onClick={() => {
                                                setAcceptsSound("2");
                                                setHasAcceptedSound(true);
                                            }}
                                        >
                                            No
                                        </SoundButton>
                                    </div>
                                </SoundConsent>
                            )}
                        </div>
                    ) : (
                        <IframeSourceContainer>
                            <iframe
                                title="Source"
                                frameBorder="0"
                                src={`https://docs.google.com/document/d/${documentId}/preview`}
                            ></iframe>
                        </IframeSourceContainer>
                    )}
                </Content>
            </Page>
        </>
    );
};
