import React from "react";
import styled from "styled-components";
import { useStaticQuery, graphql, Link } from "gatsby";

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0 0 25vw;
    max-width: 320px;
    padding: 1rem;
`;

const MenuItems = styled.div`
    display: flex;
    flex-direction: column;
    > * {
        display: block;
    }
`;

const MenuHeader = styled.div`
    margin-bottom: 4rem;
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
    return (
        <Menu>
            <MenuHeader>
                <Link
                    to="/"
                    className={location.pathname === "/home" ? "active" : ""}
                >
                    Overlapping
                </Link>
            </MenuHeader>
            <MenuItems>
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
