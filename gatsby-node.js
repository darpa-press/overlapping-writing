const path = require(`path`);
const resolve = path.resolve;

exports.createPages = async ({ graphql, actions }) => {
    const { createRedirect, createPage } = actions;

    await graphql(
        `
            {
                allGoogleDocs {
                    nodes {
                        path
                    }
                }
            }
        `
    ).then((result) => {
        createRedirect({
            fromPath: "/",
            toPath: "/home",
            isPermanent: true,
            redirectInBrowser: true,
        });
        result.data.allGoogleDocs.nodes.forEach(({ path }) => {
            createPage({
                path,
                component: resolve(`src/templates/page.js`),
            });
        });
    });
};
