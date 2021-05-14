import React from 'react'
import {NavLink} from 'react-router-dom'
import styled from "styled-components/macro";
import {useSelector} from "react-redux";
import {AppRootStateT} from "../../../../bll/store";

export const NavLinks: React.FC = () => {

    const loggedInUserId = useSelector<AppRootStateT, string | null>(state => state.auth.loggedInUserId)
    const token = useSelector<AppRootStateT, string>(state => state.auth.loggedInUserToken as string)

    let navLinks

    if (token) {
        navLinks = (
            <ul>
                <StyledLi>
                    <NavLink to="/" exact>All users</NavLink>
                </StyledLi>
                <StyledLi>
                    <NavLink to={`/${loggedInUserId}/places`}>My places</NavLink>
                </StyledLi>
                <StyledLi>
                    <NavLink to="/places/new">Add place</NavLink>
                </StyledLi>
                <StyledLi>
                    <NavLink to="/auth">Authenticate</NavLink>
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