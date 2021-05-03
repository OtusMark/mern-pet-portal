import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ThemeProvider} from "styled-components";
import {theme} from "./styles/theme";
import {NormalizeCss} from './styles/NormalizeCss';
import {GlobalStyles} from './styles/GlobalStyles';

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <NormalizeCss/>
        <GlobalStyles/>
        <App/>
    </ThemeProvider>,
    document.getElementById('root')
);
