import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import queryString from "query-string";
import { Link } from "gatsby";
import Menu from "./Menu";

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
        font-family: "Folio";
    }
    h1 {
        font-weight: 300;
        margin: 0 0 7rem 0;
        font-family: "Century Supra T3";
    }

    a { 
        color: blue;
        text-underline-position: under;
        text-decoration: none;
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
    console.log("hello");
    return (
        <>
            <BasicStyle />
            <Page>
                <Menu />
                <Content>
                    <PageHead>
                        <HeadLinks>
                            <Link to={pathname}>Article</Link>{" "}
                            <Link to={`${pathname}?source=1`}>Source</Link>
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
