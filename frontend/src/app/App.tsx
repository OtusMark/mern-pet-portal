import React, {useEffect} from 'react'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import {Users} from '../feature/user/pages/Users'
import {AddPetPage} from '../feature/pets/pages/AddPetPage'
import {MainNavigation} from '../common/components/navigation/MainNavigation'
import {UserPetPage} from '../feature/pets/pages/UserPetPage'
import {AuthPage} from '../feature/auth/pages/AuthPage'
import {Container} from '../common/styles/layout/Container'
import styled from 'styled-components/macro'
import {Loader} from '../common/components/uiElements/Loader'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateT} from './redux/store'
import {AppStatusT, NotificationT} from './redux/app-reducer'
import {NotificationProvider} from '../common/components/notification/NotificationProvider'
import {authLogout} from '../feature/auth/redux/auth-reducer'

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
            logoutTimer = setTimeout(() => dispatch(authLogout()), remainingTime)
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