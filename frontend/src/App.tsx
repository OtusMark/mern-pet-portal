import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {Users} from './feature/user/pages/Users';
import {NewPlace} from "./feature/places/pages/NewPlace";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Users/>
                </Route>
                <Route path="/places/new" exact>
                    <NewPlace/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
