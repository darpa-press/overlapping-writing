import React, { useEffect, useState, useRef } from "react";
import useCookie from "react-use-cookie";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Menu from "./Menu";

import { Link } from "gatsby";

import BasicStyle from "./BasicStyle";

import foyer from "../sounds/foyer.mp3";
import mimosa from "../sounds/mimosa.mp3";
import sam from "../sounds/sam.mp3";
import robert from "../sounds/robert.mp3";
import isadora from "../sounds/isadora.mp3";
import after from "../sounds/after-hours.mp3";
import singing from "../sounds/singing.mp3";
import agree from "../sounds/agree.mp3";

const sounds = {
    "/1/0-foyer": foyer,
    "/2/0-mimosa": mimosa,
    "/3/0-sam": sam,
    "/4/0-robert": robert,
    "/4/2-tina": singing,
    "/5/0-sidney-isadora": isadora,
    "/6/00-after-hours": after,
    agree: agree,
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

        @media screen and (min-width: 1280px) and (max-width: 1559px) {
            position: fixed;
            left: 20%;
            width: 80%;
        }

        @media screen and (min-width: 1560px) {
            position: fixed;
            left: 0;
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
    height: 40vh;
    width: 40vh;
    max-width: 400px;
    max-height: 400px;
    border-radius: 50%;
    border: 2px solid red;
    margin-left: ${(props) => props.m}vw;
    margin-top: ${(props) => props.h}vh;

    @media screen and (max-width: 768px) {
        margin-left: 5vh;
        margin-top: 45vh;
        width: 45vh;
        height: 45vh;
    }

    @media screen and (min-width: 769px) and (max-width: 1280px) {
        height: 40vh;
        width: 40vh;
    }
`;

const SoundButton = styled.a`
    line-height: 1.1;
    margin: 0 0.5rem 0 0;
    cursor: pointer;
    &:hover {
        //color: red;
    }
`;

const TitleDiamond = styled(Link)`
    height: 25vw;
    width: 25vw;
    max-width: 360px;
    max-height: 360px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    //top: 40%;
    //left: 40%;
    text-align: center;
    color: green;

    @media screen and (max-width: 768px) {
        position: fixed;
        top: 10vh;
        left: 10vh;
        width: 35vh;
        height: 35vh;
    }

    right: ${(props) => props.m}vw;
    bottom: ${(props) => props.h}vh;

    :hover {
        text-decoration: none;
        background: rgba(0, 255, 0, 0.1);
    }

    > div {
        max-width: 8rem;
    }

    ::after {
        height: 100%;
        width: 100%;
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        border: 2px solid green;
        transform: rotate(45deg);
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
    const [menuPosition, setMenuPosition] = useCookie("menuPos", 0);
    const audioRef = useRef();
    const [acceptsSound, setAcceptsSound] = useCookie("okWithSound", "0");
    const [hasAcceptedSound, setHasAcceptedSound] = useState(false);

    var d = new Date();
    var hPercent = ((d.getHours() + 1) / 24) * 50;
    var mPercent = ((d.getMinutes() + 1) / 60) * 50;

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

    useEffect(() => {
        document.addEventListener("visibilitychange", function () {
            if (document.hidden) {
                if (audioRef.current) {
                    audioRef.current.pause();
                }
            } else {
                if (audioRef.current) {
                    audioRef.current.play();
                }
            }
        });
    }, [audioRef]);

    return (
        <>
            <audio ref={audioRef} />
            <BasicStyle />
            <Helmet>
                <meta charSet="utf-8" />
                <title>{pageTitle}</title>
            </Helmet>
            <Page>
                <Menu
                    location={location}
                    menuPosition={menuPosition}
                    setMenuPosition={setMenuPosition}
                />
                <Content>
                    {location.pathname === "/home" ? (
                        <div>
                            <TitleDiamond
                                to="/7/about"
                                h={hPercent}
                                m={mPercent}
                            >
                                <div>
                                    <em>
                                        You
                                        <br />
                                        are reading
                                    </em>
                                    <br />
                                    <br />
                                    Writing in the Expanded Field, vol. 3<br />
                                    <br />ⓘ
                                </div>
                            </TitleDiamond>
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
                                                audioRef.current.src =
                                                    sounds["agree"];
                                                console.log(sounds);
                                                audioRef.current
                                                    .play()
                                                    .catch((e) =>
                                                        console.log(e)
                                                    );
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
