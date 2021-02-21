import React, { useState } from "react";
import { sentenceCase } from "sentence-case";
import styled from "styled-components";
import { useStaticQuery, graphql, Link } from "gatsby";

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0 0 25vw;
    max-width: 320px;
    padding: 1rem;
    overflow: auto;
    z-index: 10;

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
        margin-top: 2rem;
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

const Sublink = styled(Link)`
    margin-left: 1rem;
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
        display: block;
    }
`;

const MenuHeader = styled.div`
    margin-bottom: 4rem;
    @media (max-width: 768px) {
        margin-bottom: 0;
    }
`;

export default ({ location }) => {
    const {
        allGoogleDocs: { edges },
    } = useStaticQuery(graphql`
        query AllDocsQuery {
            allGoogleDocs {
                edges {
                    node {
                        path
                        name
                    }
                }
            }
        }
    `);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    let pages = {};

    edges
        .sort((a, b) =>
            a.node.name < b.node.name ? -1 : a.node.name > b.node.name ? 1 : 0
        )
        .map(({ node }) => {
            const slugSplit = node.path.split("/");

            if (slugSplit.length > 2) {
                if (!pages[slugSplit[1]]) {
                    pages[slugSplit[1]] = {
                        name: slugSplit[1],
                        subpage: true,
                        pages: [node],
                    };
                } else {
                    pages[slugSplit[1]].pages.push(node);
                }
            } else {
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
            </MenuHeader>
            <MenuItems isMobileMenuOpen={isMobileMenuOpen}>
                {Object.keys(pages).map((id) => {
                    const page = pages[id];
                    if (page.name === "Home" || page.name === "About") {
                        return false;
                    }
                    if (!page.subpage) {
                        return (
                            <Link to={page.path} key={page.path}>
                                {page.name}
                            </Link>
                        );
                    }
                    if (page.subpage) {
                        return (
                            <React.Fragment key={page.name}>
                                <Link to={page.pages[0].path}>
                                    {sentenceCase(page.name)}
                                </Link>
                                {locationTop === page.name &&
                                    page.pages.map((subpage) => (
                                        <Sublink
                                            to={subpage.path}
                                            key={subpage.path}
                                        >
                                            {subpage.name}
                                        </Sublink>
                                    ))}
                            </React.Fragment>
                        );
                    } else {
                        return false;
                    }
                })}
            </MenuItems>
        </Menu>
    );
};
