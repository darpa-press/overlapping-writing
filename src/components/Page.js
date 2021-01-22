import React from "react";
import { Helmet } from "react-helmet";
import styled, { createGlobalStyle } from "styled-components";
import queryString from "query-string";
import { Link } from "gatsby";
import Menu from "./Menu";

import "../fonts/fonts.css";

const BasicStyle = createGlobalStyle`
    html, body {
        padding: 0;
        margin:0;
        background: #fcfcfc;
    }

    * { 
        box-sizing: border-box;
    }
    html {
        font-size: 200%;
        line-height: 1.2;
        font-family: "folio";
    }
    h1 {
        font-weight: 400;
        margin: 0 0 7rem 0;
        font-family: "century_supra";
    }

    h2,h3,h4,h5,h6 {
        font-weight: 400;
        font-family: "century_supra";
        letter-spacing: 0.5px;
        margin: 2.5rem 0 1rem 0;
    }

    a { 
        color: blue;
        text-underline-position: under;
        text-decoration: none;
        text-shadow: 0 0 0px rgba(0, 0, 255, 0.0);
        transition: 0.2s all ease;
    }

    a.active, a[aria-current="page"] {
        text-shadow: 0 0 7px rgba(0, 0, 255, 0.4);
    }
    
    a.inactive {
        text-shadow: 0 0 0px rgba(0, 0, 255, 0.0) !important;
    }

    span.gatsby-resp-image-wrapper {
        margin: 1.5rem 0 !important;
    }
    /*
    span + span {
        margin-left: 0.25rem;
    } */

    .embedVideo-container {
        position: relative;
        padding-bottom: 56.25%; /* 16:9 */
        height: 0;
        margin: 2rem 0;
        iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
`;

const Page = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const HeadLinks = styled.div`
    display: flex;
    > * {
        margin-right: 0.5rem;
    }
`;

const Content = styled.div`
    flex: 1;
    padding: 1rem;
    height: 100%;
    overflow: auto;
`;

const PageContent = styled.div`
    max-width: 40rem;
`;

const PageHead = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 3.8rem;
`;

const IframeSourceContainer = styled.div`
    position: relative;
    width: 100%;
    height: 80vh;
    border: 1px solid #dedede;
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
    const { search, pathname } = location || { search: false, pathname: "/" };
    const searchParsed = queryString.parse(search);

    const pageTitleA = "Overlapping writing";
    const pageTitleB = title;
    let pageTitle = "";
    for (let i = 0; i <= pageTitleA.length; i += 2) {
        pageTitle += pageTitleA.substr(i, 2) + pageTitleB.substr(i / 2, 1);
    }

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
                    <PageHead>
                        <HeadLinks>
                            <Link
                                className={
                                    searchParsed.source !== "1"
                                        ? "active"
                                        : "inactive"
                                }
                                to={pathname}
                            >
                                Article
                            </Link>{" "}
                            <Link
                                className={
                                    searchParsed.source === "1"
                                        ? "active"
                                        : "inactive"
                                }
                                to={`${pathname}?source=1`}
                            >
                                Source
                            </Link>
                        </HeadLinks>
                        <div>
                            <Link to={"/about"}>About</Link>
                        </div>
                    </PageHead>
                    {searchParsed.source === "1" ? (
                        <IframeSourceContainer>
                            <iframe
                                title="Source"
                                frameBorder="0"
                                src={`https://docs.google.com/document/d/${documentId}/edit`}
                            ></iframe>
                        </IframeSourceContainer>
                    ) : (
                        <PageContent
                            dangerouslySetInnerHTML={{
                                __html: html.replace(`\u000b`, "<br/>"),
                            }}
                        />
                    )}
                </Content>
            </Page>
        </>
    );
};
