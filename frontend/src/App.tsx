import React, {useEffect} from 'react'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import {Users} from './feature/user/pages/Users'
import {AddPetPage} from './feature/pets/pages/AddPetPage'
import {MainNavigation} from './shared/components/navigation/MainNavigation'
import {UserPetPage} from './feature/pets/pages/UserPetPage'
import {AuthPage} from './feature/user/pages/AuthPage'
import {Container} from './shared/components/layout/Container'
import styled from 'styled-components/macro'
import {Loader} from './shared/components/uiElements/Loader'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateT} from './bll/store'
import {AppStatusT, NotificationT} from './bll/reducers/app-reducer'
import {NotificationProvider} from './shared/components/notification/NotificationProvider'
import {logout} from './bll/reducers/auth-reducer'

function App() {

    const dispatch = useDispatch()

    const appStatus = useSelector<AppRootStateT, AppStatusT>(state => state.app.status)
    const notifications = useSelector<AppRootStateT, Array<NotificationT>>(state => state.app.notifications)
    const token = useSelector<AppRootStateT, string>(state => state.auth.token as string)
    const tokenExpiration = useSelector<AppRootStateT, string>(state => state.auth.tokenExpiration as string)

    let routes
    let logoutTimer: ReturnType<typeof setTimeout>

    useEffect(() => {
        if (token && tokenExpiration) {
            const remainingTime = Date.parse(tokenExpiration) - new Date().getTime()
            logoutTimer = setTimeout(() => dispatch(logout()), remainingTime)

            // For checking!
            console.log(logoutTimer)
            console.log(remainingTime)
        } else {
            clearTimeout(logoutTimer)
        }
    }, [token, tokenExpiration])

    if (token) {
        routes = (
            <Switch>
                <Route path='/' exact>
                    <Users/>
                </Route>
                <Route path='/:userId/pets' exact>
                    <UserPetPage/>
                </Route>
                <Route path='/pets/new' exact>
                    <AddPetPage/>
                </Route>
                <Route path='/auth'>
                    <AuthPage/>
                </Route>
                <Redirect to='/'/>
            </Switch>
        )
    } else {
        routes = (
            <Switch>
                <Route path='/' exact>
                    <Users/>
                </Route>
                <Route path='/:userId/pets' exact>
                    <UserPetPage/>
                </Route>
                <Route path='/auth'>
                    <AuthPage/>
                </Route>
                <Redirect to='/'/>
            </Switch>
        )
    }

    return (
        <BrowserRouter>
            <NotificationProvider notifications={notifications}/>
            <MainNavigation/>
            <Container>
                <StyledMain>
                    {appStatus === 'loading' && <Loader/>}
                    {routes}
                </StyledMain>
            </Container>
        </BrowserRouter>
    )
}

export default App

// Styles
const StyledMain = styled.main`
  height: calc(100vh - ${({theme}) => theme.variable.headerHeight});
`

// Types
export type ParamsT = {
    userId: string
}