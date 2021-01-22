import React from "react";
import styled from "styled-components";
import { useStaticQuery, graphql, Link } from "gatsby";

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0 0 320px;
    padding: 1rem;
`;

const MenuItems = styled.div`
    display: flex;
    flex-direction: column;
    > * {
        display: block;
    }

    [aria-current="page"] {
        text-shadow: 0 0 7px rgba(0, 0, 255, 0.5);
    }
`;

const MenuHeader = styled.div`
    margin-bottom: 4rem;
`;

export default () => {
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
                <Link to="/">Overlapping</Link>
            </MenuHeader>
            <MenuItems>
                {edges.map(({ node: { path, name } }) =>
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
