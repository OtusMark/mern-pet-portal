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
import {AppStatusT, NotificationT} from "./bll/reducers/app-reducer";
import {NotificationProvider} from "./feature/_shared/components/notification/NotificationProvider"

function App() {

    const appStatus = useSelector<AppRootStateT, AppStatusT>(state => state.app.status)
    const notifications = useSelector<AppRootStateT, Array<NotificationT>>(state => state.app.notifications)

    return (
        <BrowserRouter>
            <NotificationProvider notifications={notifications}/>
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
