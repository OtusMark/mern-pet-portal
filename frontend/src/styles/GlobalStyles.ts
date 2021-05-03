import {createGlobalStyle} from "styled-components/macro";
import {ThemeType} from "./theme";

export const GlobalStyles = createGlobalStyle<{ theme: ThemeType}>`
  // Import the main style from theme
  @import url('${({theme}) => theme.font.source}');

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    // Removes the default mobile highlight when holding down the finger on the component
    -webkit-tap-highlight-color: rgba(0,0,0,0);

    margin: 0;
    padding: 0;
  }

  *:focus {
    // Removes the default outline
    outline: none;
  }

  html {
    overflow-x: hidden;
    
    //scroll-behavior: smooth;

    // Default global font style
    font-family: ${({theme}) => theme.font.family.default};
    color: ${({theme}) => theme.color.black};
    line-height: 1.5;
    font-weight: 400;

    // Default font size
    font-size: ${({theme}) => theme.font.size.defaultXL};

    // Switch to laptop default font size
    @media (max-width: ${({theme}) => theme.mediaQuery.desktopMax}) {
      font-size: ${({theme}) => theme.font.size.defaultL};
    }

    // Switch to tablet default font size
    @media (max-width: ${({theme}) => theme.mediaQuery.tabletMax}) {
      font-size: ${({theme}) => theme.font.size.defaultM};
    }

    // Switch to mobile default font size
    @media (max-width: ${({theme}) => theme.mediaQuery.mobileMax}) {
      font-size: ${({theme}) => theme.font.size.defaultS};
    }
  }

  body {
    background-color: ${({theme}) => theme.color.white};
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
    padding: 0;
  }
  
  h1 {
    font-family: ${({theme}) => theme.font.family.montserrat};
    font-size: ${({theme}) => theme.font.size.b5};
    font-weight: 700;
  }
  
  h2 {
    font-size: ${({theme}) => theme.font.size.b2};
    font-weight: 300;
  }

  a {
    text-decoration: none;
    color: ${({theme}) => theme.color.black};
  }

  textarea {
    resize: none;
  }
  
`
