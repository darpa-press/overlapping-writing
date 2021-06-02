module.exports = {
    plugins: [
        `gatsby-plugin-react-helmet`,
        "gatsby-plugin-styled-components",
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sitemap",
        {
            resolve: "./gatsby-source-google-docs",
            options: {
                // https://drive.google.com/drive/folders/FOLDER_ID
                folder: "1DHdC-U8OikPFyKnXKq7z2YD80OK1MHZ_",
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                // The property ID; the tracking code won't be generated without it
                trackingId: "UA-6339735-3",
                // Defines where to place the tracking script - `true` in the head and `false` in the body
                head: false,
            },
        },
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: [
                    {
                        resolve: "gatsby-remark-embed-video",
                        options: {
                            width: 800,
                            ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
                            related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
                            noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
                            urlOverrides: [
                                {
                                    id: "youtube",
                                    embedURL: (videoId) =>
                                        `https://www.youtube-nocookie.com/embed/${videoId}`,
                                },
                            ], //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
                            containerClass: "embedVideo-container", //Optional: Custom CSS class for iframe container, for multiple classes separate them by space
                        },
                    },
                    "gatsby-remark-images",
                ],
            },
        },
        {
            resolve: `gatsby-plugin-sharp`,
            options: {
                base64Width: 20,
                useMozJpeg: process.env.GATSBY_JPEG_ENCODER === `MOZJPEG`,
                stripMetadata: true,
                defaultQuality: 80,
                failOnError: true,
            },
        },
    ],
    siteMetadata: {
        siteUrl: "https://overlapping.acca.melbourne",
    },
};
