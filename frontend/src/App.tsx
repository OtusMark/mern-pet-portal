import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {Users} from './feature/user/pages/Users';
import {AddPlacePage} from "./feature/places/pages/AddPlacePage";
import {MainNavigation} from "./feature/_shared/components/navigation/MainNavigation";
import {UserPlacesPage} from "./feature/places/pages/UserPlacesPage";
import {AuthPage} from "./feature/user/pages/AuthPage";
import {Container} from "./feature/_shared/components/layout/Container";
import styled from "styled-components/macro";
import {Loader} from "./feature/_shared/components/uiElements/Loader";
import {useSelector} from "react-redux";
import {AppRootStateT} from "./bll/store";
import {AppStatusT} from "./bll/reducers/app-reducer";
import {Alerts} from "./feature/_shared/components/helpers/Alerts";

function App() {

    const appStatus = useSelector<AppRootStateT, AppStatusT>(state => state.app.status)
    const appAlert = useSelector<AppRootStateT, string | null>(state => state.app.alert)
    const appError = useSelector<AppRootStateT, string | null>(state => state.app.error)

    return (
        <BrowserRouter>
            <MainNavigation/>
            <Container>
                <StyledMain>
                    {appStatus === 'loading' && <Loader/>}
                    <Switch>
                        <Route path="/" exact>
                            <Users/>
                        </Route>
                        <Route path="/:userId/places">
                            <UserPlacesPage/>
                        </Route>
                        <Route path="/places/new" exact>
                            <AddPlacePage/>
                        </Route>
                        <Route path="/auth">
                            <AuthPage/>
                        </Route>
                        <Redirect to="/"/>
                    </Switch>
                    <Alerts alert={appAlert} error={appError}/>
                </StyledMain>
            </Container>
        </BrowserRouter>
    );
}

export default App;

// Styles
const StyledMain = styled.main`
  height: calc(100vh - ${({theme}) => theme.variable.headerHeight});
`

// Types
export type ParamsT = {
    userId: string
}
