import React from "react";
import ReactDOM from 'react-dom'
import styled from "styled-components/macro";
import {StyledComponentProps} from "styled-components";

export const Sidebar: React.FC<PropsT> = props => {

    const {
        isOpen
    } = props

    const content = <StyledAside isOpen={isOpen}>{props.children}</StyledAside>
    const container = document.getElementById('sidebar-portal') as HTMLElement

    return ReactDOM.createPortal(content, container)
}

// Styles
const StyledAside = styled.aside<StyledComponentProps<any, any, any, any>>`
  position: absolute;
  top: 0;
  z-index: 1000;
  
  display: ${({isOpen}) => isOpen ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: center;

  height: 100vh;
  
  background-color: ${({theme}) => theme.color.grey[500]};
  
`

// Types
type PropsT = {
    isOpen: boolean
}