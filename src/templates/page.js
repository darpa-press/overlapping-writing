import { graphql } from "gatsby";
import React from "react";
import Page from "./../components/Page";

export default ({ data, location }) => <Page data={data} location={location} />;

export const pageQuery = graphql`
    query Page($path: String!) {
        googleDocs(fields: { slug: { eq: $path } }) {
            name
            document {
                documentId
            }
            childMarkdownRemark {
                html
            }
        }
    }
`;
