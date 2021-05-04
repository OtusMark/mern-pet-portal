import ReactDOM from "react-dom";
import React from "react";
import styled from "styled-components/macro";

const Backdrop: React.FC<PropsT> = props => {

    const {
        onClick
    } = props

    const content = <BackDropMain onClick={onClick}>{props.children}</BackDropMain>
    const container = document.getElementById('backdrop-portal') as HTMLElement

    return ReactDOM.createPortal(content, container)
}

// Styles
const BackDropMain = styled.div`
  position: absolute;
  
  height: 100vh;
  width: 100vw;
  
  background-color: ${({theme}) => theme.color.grey[700]};
`

// Types
type PropsT = {
    onClick: () => void
}