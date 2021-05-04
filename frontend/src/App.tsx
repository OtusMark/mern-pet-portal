import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {Users} from './feature/user/pages/Users';
import {NewPlace} from "./feature/places/pages/NewPlace";
import {MainNavigation} from "./feature/shared/components/navigation/MainNavigation";

function App() {
    return (
        <BrowserRouter>
            <MainNavigation/>
            <main>
                <Switch>
                    <Route path="/" exact>
                        <Users/>
                    </Route>
                    <Route path="/places/new" exact>
                        <NewPlace/>
                    </Route>
                    <Redirect to="/"/>
                </Switch>
            </main>
        </BrowserRouter>
    );
}

export default App;
