import ReactDOM from "react-dom"
import React, {useEffect, useState} from "react";
import {Backdrop} from "./Backdrop";
import {Card} from "../layout/Card";
import styled from "styled-components/macro";
import {StyledComponentProps} from "styled-components";
import {Button} from "./Button";

const ModalOverlay: React.FC<ModalOverlay> = (props) => {

    const [modalBoundaries, setModalBoundaries] = useState({} as ClientRect)

    const {
        isActive,
        toggleModal
    } = props

    useEffect(() => {
        // @ts-ignore
        setModalBoundaries(document.getElementById('modal').getBoundingClientRect())

    }, [isActive])


    const content = (
        <ModalMain isActive={isActive} modalHeight={modalBoundaries.height} modalWidth={modalBoundaries.width}>
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
            <ModalOverlay isActive={show} toggleModal={toggleModal} {...restProps}/>
        </>
    )
}

// Styles
const ModalMain = styled.div<StyledComponentProps<any, any, any, any>>`
  display: ${({isActive}) => isActive ? 'flex' : 'none'};

  align-items: center;
  justify-content: center;

  position: absolute;
  top: calc(50% - ${({modalHeight}) => modalHeight + 'px'} / 2);
  left: calc(50% - ${({modalWidth}) => modalWidth  + 'px'} / 2);
  z-index: 5;
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