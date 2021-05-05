import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {Users} from './feature/user/pages/Users';
import {NewPlace} from "./feature/places/pages/NewPlace";
import {MainNavigation} from "./feature/_shared/components/navigation/MainNavigation";
import {UserPlaces} from "./feature/places/pages/UserPlaces";

function App() {
    return (
        <BrowserRouter>
            <MainNavigation/>
            <main>
                <Switch>
                    <Route path="/" exact>
                        <Users/>
                    </Route>
                    <Route path="/:userId/places">
                        <UserPlaces/>
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

// Route Types
export type ParamsT = {
    userId: string
}
