import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import {ThemeProvider} from "styled-components";
import {theme} from "./app/styles/theme";
import {NormalizeCss} from './app/styles/NormalizeCss';
import {GlobalStyles} from './app/styles/GlobalStyles';
import {Provider} from 'react-redux';
import {store} from "./app/redux/store";

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <NormalizeCss/>
        <GlobalStyles/>
        <Provider store={store}>

                <App/>
        </Provider>
    </ThemeProvider>,
    document.getElementById('root')
);
