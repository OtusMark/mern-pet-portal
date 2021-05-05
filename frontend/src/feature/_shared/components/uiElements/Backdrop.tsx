import ReactDOM from "react-dom";
import React from "react";
import styled from "styled-components/macro";
import {StyledComponentProps} from "styled-components";

export const Backdrop: React.FC<PropsT> = props => {

    const {
        isActive,
        onClick
    } = props

    const content = <BackDropMain isActive={isActive} onClick={onClick}>{props.children}</BackDropMain>
    const container = document.getElementById('backdrop-portal') as HTMLElement

    return ReactDOM.createPortal(content, container)
}

// Styles
const BackDropMain = styled.div<StyledComponentProps<any, any, any, any>>`
  position: absolute;
  z-index: 4;

  display: ${({isActive}) => isActive ? 'block' : 'none'};
  
  height: 100vh;
  width: 100vw;
  
  background-color: ${({theme}) => theme.color.transparent.black};
`

// Types
type PropsT = {
    isActive: boolean
    onClick: () => void
}