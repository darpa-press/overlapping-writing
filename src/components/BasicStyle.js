import { createGlobalStyle } from "styled-components";
import "../fonts/fonts.css";

const BasicStyle = createGlobalStyle`
    html, body {
        padding: 0;
        margin:0;
        background: #f8f9fa;
    }

    * { 
        box-sizing: border-box;
    }
    html {
        font-size: 150%;
        line-height: 1.2;
        font-family: "folio";

        @media (max-width:768px) {
            font-size: 120%;
        }

        @media (min-width: 769px) and (max-width:1280px) {
            font-size: 130%;
        }
    }

    b, strong {
        font-weight: 500;
    }

    sup {
        font-size: 0.4em;
        vertical-align: inherit;
        position:relative;
        top: -0.6em;
    }
    
    p {
        margin: 0;
    }
    25
    h1 {
        font-weight: 500;
        margin: 0 0 6rem 0;
        //font-family: "century_supra";
    }

    h2,h3,h4,h5,h6 {
        font-weight: 500;
        //font-family: "century_supra";
        letter-spacing: 0.5px;
        margin: 4rem 0 1.5rem 0;
    }

    em, i {
        font-family: verdigris;
    }

    pre, code {
        font-family: inherit;
        font-style: inherit;
        font-size: inherit;
        color: inherit;
        white-space: pre-wrap;
    }

    a { 
        color: blue;
        text-underline-position: under;
        text-decoration: none;
        text-shadow: 0 0 0px rgba(0, 0, 255, 0.0);
        transition: 0.2s all ease;
        &:hover {
            text-decoration: underline;
        }
    }

    a.active, a[aria-current="page"] {
        text-shadow: 0 0 2px rgba(0, 0, 255, 0.9);
       // text-shadow: 0 0 7px rgba(0, 0, 255, 0.3);
    }
    
    a.inactive {
        text-shadow: 0 0 0px rgba(0, 0, 255, 0.0) !important;
    }

    span.gatsby-resp-image-wrapper {
        margin: 1.5rem 0 !important;
    }
    /*
    span + span {
        margin-left: 0.25rem;
    } */

    .embedVideo-container {
        position: relative;
        padding-bottom: 56.25%; /* 16:9 */
        height: 0;
        margin: 2rem 0;
        iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
`;

export default BasicStyle;
