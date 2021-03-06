import React, { useLayoutEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useStaticQuery, graphql, Link } from "gatsby";
import snarkdown from "snarkdown";

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
        min-height: 3rem;
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
    margin-bottom: 0.75rem;
`;

const RegLink = styled(Link)`
    margin-top: 1rem;
    font-size: 0.85rem;
    padding: 0.15rem 0;
    &.regLink + .regLink {
        margin-top: 0;
    }
`;

const LinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    //padding-bottom: 1rem;
`;

const Sublink = styled(Link)`
    margin-left: 1rem;
    margin-bottom: 0.75rem;
    :last-child {
        margin-bottom: 1.5rem;
    }
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

export default ({ location, menuPosition, setMenuPosition }) => {
    const menuRef = useRef();
    //const locationTop = location.pathname.split("/")[1];
    useLayoutEffect(() => {
        menuRef.current.scrollTop = menuPosition;
    }, []);

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

    return (
        <Menu
            ref={menuRef}
            isMobileMenuOpen={isMobileMenuOpen}
            onScroll={(e) => {
                console.log("scroll");
                setMenuPosition(e.target.scrollTop);
            }}
        >
            <MenuHeader>
                <MenuLink
                    to="/"
                    className={location.pathname === "/home" ? "active" : ""}
                >
                    Overlapping
                    <br />
                    Writing
                </MenuLink>
                <MobileActivate
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    Overlapping Writing
                </MobileActivate>
            </MenuHeader>
            <MenuItems isMobileMenuOpen={isMobileMenuOpen}>
                {isMobileMenuOpen && (
                    <Link to="/home" style={{ marginBottom: "1rem" }}>
                        Home
                    </Link>
                )}
                {Object.keys(pages).map((id) => {
                    const page = pages[id];
                    const renderedDescription =
                        page.description &&
                        page.description.replace("\\n", "<br/>");
                    if (page.name === "Home" || page.name === "About") {
                        return false;
                    }
                    if (!page.subpage) {
                        return (
                            <RegLink
                                className="regLink"
                                to={page.path}
                                key={page.path}
                                dangerouslySetInnerHTML={{
                                    __html: snarkdown(
                                        renderedDescription || ""
                                    ),
                                }}
                            />
                        );
                    }

                    if (page.subpage) {
                        return (
                            <LinkContainer key={page.name}>
                                <TopLink
                                    to={page.pages[0].path}
                                    dangerouslySetInnerHTML={{
                                        __html: snarkdown(
                                            renderedDescription || ""
                                        ),
                                    }}
                                />
                                {page.pages.map(
                                    (subpage) =>
                                        subpage.description !== "Intro" && (
                                            <Sublink
                                                to={subpage.path}
                                                key={subpage.path}
                                                dangerouslySetInnerHTML={{
                                                    __html: snarkdown(
                                                        subpage.description &&
                                                            subpage.description.replace(
                                                                "\\n",
                                                                "<br/>"
                                                            )
                                                    ),
                                                }}
                                            />
                                        )
                                )}
                            </LinkContainer>
                        );
                    } else {
                        return false;
                    }
                })}
            </MenuItems>
        </Menu>
    );
};
