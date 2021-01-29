import React, { useState } from "react";
import styled from "styled-components";
import { useStaticQuery, graphql, Link } from "gatsby";

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0 0 25vw;
    max-width: 320px;
    padding: 1rem;

    @media (max-width: 768px) {
        position: fixed;
        bottom: 0;
        left: 0;
        flex-basis: auto;
        width: 100%;
        background: rgba(252, 252, 252, 0.95);
        max-width: none;
    }
`;

const MenuItems = styled.div`
    display: flex;
    flex-direction: column;
    > * {
        display: block;
    }

    @media (max-width: 768px) {
        display: ${(props) => (props.isMobileMenuOpen ? "flex" : "none")};
        margin-top: 2rem;
    }
`;

const MenuLink = styled(Link)`
    @media (max-width: 768px) {
        display: none;
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

    return (
        <Menu>
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
                {edges
                    .sort((a, b) =>
                        a.node.name < b.node.name
                            ? -1
                            : a.node.name > b.node.name
                            ? 1
                            : 0
                    )
                    .map(({ node: { path, name } }) =>
                        name !== "Home" && name !== "About" ? (
                            <Link to={path} key={path}>
                                {name}
                            </Link>
                        ) : null
                    )}
            </MenuItems>
        </Menu>
    );
};
