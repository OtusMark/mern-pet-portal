import React from 'react'
import {NavLink} from 'react-router-dom'
import styled from "styled-components/macro";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateT} from "../../../bll/store";
import {Button} from "../uiElements/Button";
import { logout } from '../../../bll/reducers/auth-reducer';

export const NavLinks: React.FC = () => {

    const dispatch = useDispatch()

    const loggedInUserId = useSelector<AppRootStateT, string | null>(state => state.auth.loggedInUserId)
    const token = useSelector<AppRootStateT, string>(state => state.auth.token as string)

    let navLinks

    const userLogout = () => {
        dispatch(logout())
    }

    if (token) {
        navLinks = (
            <ul>
                <StyledLi>
                    <NavLink to="/" exact>All users</NavLink>
                </StyledLi>
                <StyledLi>
                    <NavLink to={`/${loggedInUserId}/pets`}>My pets</NavLink>
                </StyledLi>
                <StyledLi>
                    <NavLink to="/pets/new">Add a pet</NavLink>
                </StyledLi>
                <StyledLi>
                    <NavLink to="/auth">Authenticate</NavLink>
                </StyledLi>
                <StyledLi>
                    <Button onClick={userLogout}>Logout</Button>
                </StyledLi>
            </ul>
        )
    } else {
        navLinks = (
            <ul>
                <StyledLi>
                    <NavLink to="/" exact>All users</NavLink>
                </StyledLi>
                <StyledLi>
                    <NavLink to="/auth">Authenticate</NavLink>
                </StyledLi>
            </ul>
        )
    }

    return (
        <>
            {navLinks}
        </>
    )
}

// Styles
const StyledLi = styled.li`
  padding: 1rem;

  list-style: none;
`