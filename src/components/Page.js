import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Menu from "./Menu";

import BasicStyle from "./BasicStyle";

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

    return (
        <>
            <BasicStyle />
            <Helmet>
                <meta charSet="utf-8" />
                <title>{pageTitle}</title>
            </Helmet>
            <Page>
                <Menu location={location} />
                <Content>
                    <IframeSourceContainer>
                        <iframe
                            title="Source"
                            frameBorder="0"
                            src={`https://docs.google.com/document/d/${documentId}/preview`}
                        ></iframe>
                    </IframeSourceContainer>
                </Content>
            </Page>
        </>
    );
};
