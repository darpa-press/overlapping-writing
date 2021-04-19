import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import queryString from "query-string";
import { Link } from "gatsby";
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

const HeadLinks = styled.div`
    display: flex;
    > * {
        margin-right: 0.5rem;
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
    }
`;

export default ({
    data: {
        googleDocs: {
            name: title,
            document: { documentId },
            childMarkdownRemark: { html },
        },
    },
    location,
}) => {
    const pageTitleA = "Overlapping writing";
    const pageTitleB = title;
    let pageTitle = "";
    for (let i = 0; i <= pageTitleA.length; i += 2) {
        pageTitle += pageTitleA.substr(i, 2) + pageTitleB.substr(i / 2, 1);
    }
    console.log(
        `https://docs.google.com/document/d/e/${documentId}/pub?embedded=true`
    );
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
                    {/* <IframeSourceContainerDesktop>
                        <iframe
                            title="Source"
                            frameBorder="0"
                            src={`https://docs.google.com/document/d/${documentId}/pub`}
                        ></iframe>
                    </IframeSourceContainerDesktop> */}
                </Content>
            </Page>
        </>
    );

    //src={`https://docs.google.com/document/d/${documentId}/edit`}
};
