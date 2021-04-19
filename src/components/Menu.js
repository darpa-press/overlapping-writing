import React, { useState } from "react";
import styled from "styled-components";
import { useStaticQuery, graphql, Link } from "gatsby";

const MobileWritingLink = styled(Link)`
    display: none;
    position: fixed;
    right: 1rem;
    bottom: 1rem;
`;

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0 0 30vw;
    max-width: 400px;
    padding: 1rem;
    overflow: auto;
    z-index: 10;
    line-height: 1.1;

    ::-webkit-scrollbar {
        display: none;
    }

    @media (max-width: 768px) {
        position: fixed;
        bottom: 0;
        left: 0;
        flex-basis: auto;
        width: 100%;
        height: ${(props) => (props.isMobileMenuOpen ? "100%" : "auto")};
        background: rgba(252, 252, 252, 0.95);
        padding: 0.75rem 1rem;
        max-width: none;
        overflow: auto;
    }

    ${MobileWritingLink} {
        display: ${(props) => (props.isMobileMenuOpen ? "block" : "none")};
    }
`;

const MenuItems = styled.div`
    > * {
        display: block;
    }

    padding-bottom: 4rem;

    @media (max-width: 768px) {
        /* display: flex;
        flex-direction: column; */
        display: ${(props) => (props.isMobileMenuOpen ? "block" : "none")};
        margin-top: 0.5rem;
        padding-bottom: 1rem;

        > * {
            margin-bottom: 0.25rem;
        }
    }
`;

const MenuLink = styled(Link)`
    @media (max-width: 768px) {
        display: none;
    }
`;

const TopLink = styled(Link)`
    margin-bottom: 0.333rem;
`;

const Sublink = styled(Link)`
    margin-left: 1rem;
    margin-bottom: 0.333rem;
`;

const MobileActivate = styled.button`
    font-family: inherit;
    border: 0;
    background: none;
    font-size: 1rem;
    color: blue;
    display: none;
    padding: 0;
    @media screen and (max-width: 768px) {
        position: fixed;
        bottom: 1rem;
        left: 1rem;
        display: block;
    }
`;

const MenuHeader = styled.div`
    margin-bottom: 4rem;
    @media (max-width: 768px) {
        margin-bottom: 0;
    }
`;

const WritingLinkDesktop = styled(Link)`
    display: none;
    @media (min-width: 761px) {
        display: block;
        position: fixed;
        bottom: 1rem;
        left: 1rem;
    }
`;

export default ({ location }) => {
    const {
        allGoogleDocs: { edges },
    } = useStaticQuery(graphql`
        query AllDocsQuery {
            allGoogleDocs(sort: { fields: path, order: ASC }) {
                edges {
                    node {
                        path
                        name
                        description
                    }
                }
            }
        }
    `);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    let pages = {};

    edges.map(({ node }) => {
        const slugSplit = node.path.split("/");
        const descriptionSplit =
            node.description && typeof node.description == "string"
                ? node.description.split("/")
                : false;

        //node.description = descriptionSplit || node.description;

        if (slugSplit.length > 2) {
            // it is a subpage
            if (!pages[slugSplit[1]]) {
                // first child node
                pages[slugSplit[1]] = {
                    name: slugSplit[1],
                    description: descriptionSplit[0],
                    subpage: true,
                    pages: [{ ...node, description: descriptionSplit[1] }],
                };
            } else {
                // second child node
                pages[slugSplit[1]].pages.push({
                    ...node,
                    description: descriptionSplit[1],
                });
            }
        } else {
            // is not a subpage node
            pages[slugSplit[1]] = node;
        }
        return true;
    });
    const locationTop = location.pathname.split("/")[1];

    return (
        <Menu isMobileMenuOpen={isMobileMenuOpen}>
            <MenuHeader>
                <MenuLink
                    to="/"
                    className={location.pathname === "/home" ? "active" : ""}
                >
                    Overlapping
                </MenuLink>
                <MobileActivate
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    Overlapping
                </MobileActivate>
                <MobileWritingLink
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    to="/about"
                >
                    Writing
                </MobileWritingLink>
            </MenuHeader>
            <MenuItems isMobileMenuOpen={isMobileMenuOpen}>
                {isMobileMenuOpen && (
                    <Link to="/home" style={{ marginBottom: "1rem" }}>
                        Home
                    </Link>
                )}
                {Object.keys(pages).map((id) => {
                    const page = pages[id];
                    if (page.name === "Home" || page.name === "About") {
                        return false;
                    }
                    if (!page.subpage) {
                        return (
                            <Link to={page.path} key={page.path}>
                                {page.description}
                            </Link>
                        );
                    }
                    if (page.subpage) {
                        return (
                            <React.Fragment key={page.name}>
                                <TopLink to={page.pages[0].path}>
                                    {page.description}
                                </TopLink>
                                {locationTop === page.name &&
                                    page.pages.map(
                                        (subpage) =>
                                            subpage.description !== "Intro" && (
                                                <Sublink
                                                    to={subpage.path}
                                                    key={subpage.path}
                                                >
                                                    {subpage.description}
                                                </Sublink>
                                            )
                                    )}
                            </React.Fragment>
                        );
                    } else {
                        return false;
                    }
                })}
            </MenuItems>
            <WritingLinkDesktop to="/about">Writing</WritingLinkDesktop>
        </Menu>
    );
};
