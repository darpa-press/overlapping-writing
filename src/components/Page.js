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
    padding: 1rem;
    height: 100%;
    overflow: auto;
`;

const PageContent = styled.div`
    max-width: 40rem;
    padding-bottom: 30vh;
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
                            <Link to={"/about"}>Writing</Link>
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
                                __html: html,
                            }}
                        />
                    )}
                </Content>
            </Page>
        </>
    );
};
