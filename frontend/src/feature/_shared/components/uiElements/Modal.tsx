import ReactDOM from "react-dom"
import React, {useEffect, useState} from "react";
import {Backdrop} from "./Backdrop";
import {Card} from "../layout/Card";
import styled from "styled-components/macro";
import {StyledComponentProps} from "styled-components";
import {Button} from "./Button";

const ModalOverlay: React.FC<ModalOverlay> = (props) => {

    const {
        isActive,
        toggleModal
    } = props


    const content = (
        <ModalMain isActive={isActive}>
            <Card id="modal">
                {props.children}
                <Button onClick={toggleModal}>Close</Button>
            </Card>
        </ModalMain>
    )

    const container = document.getElementById('modal-portal') as HTMLElement

    return ReactDOM.createPortal(content, container)
}

export const Modal: React.FC<ModalPropsT> = (props) => {

    const {
        show,
        toggleModal,
        ...restProps
    } = props

    return (
        <>
            <Backdrop isActive={show} onClick={toggleModal}/>
            {show && <ModalOverlay isActive={show} toggleModal={toggleModal} {...restProps}/>}
        </>
    )
}

// Styles
const ModalMain = styled.div<StyledComponentProps<any, any, any, any>>`

  align-items: center;
  justify-content: center;

  position: absolute;
  top: 20rem;
  left: 10%;
  z-index: 5;

  width: 80%;
`

// Types
type ModalOverlay = {
    isActive: boolean
    toggleModal: () => void
}

type ModalPropsT = {
    show: boolean
    toggleModal: () => void
}