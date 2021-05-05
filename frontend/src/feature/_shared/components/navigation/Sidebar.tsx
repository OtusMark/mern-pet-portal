import React from "react";
import ReactDOM from 'react-dom'
import styled from "styled-components/macro";
import {StyledComponentProps} from "styled-components";
import {Backdrop} from "../uiElements/Backdrop";

export const Sidebar: React.FC<PropsT> = (props) => {

    const {
        isOpen,
        onClick
    } = props

    const content = (
        <StyledAside isOpen={isOpen}>
            {props.children}
            <Backdrop isActive={isOpen} onClick={onClick}/>
        </StyledAside>
    )

    const container = document.getElementById('sidebar-portal') as HTMLElement

    return ReactDOM.createPortal(content, container)
}

// Styles
const StyledAside = styled.aside<StyledComponentProps<any, any, any, any>>`
  position: absolute;
  top: 0;
  z-index: 5;

  display: ${({isOpen}) => isOpen ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 20rem;
  height: 100vh;

  background-color: ${({theme}) => theme.color.white};

`

// Types
type PropsT = {
    isOpen: boolean
    onClick: () => void
}