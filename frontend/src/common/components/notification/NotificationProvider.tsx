import React from "react";
import styled from "styled-components/macro";
import {Notification} from "./Notification";
import {NotificationT} from "../../../app/redux/app-reducer";

export const NotificationProvider: React.FC<PropsT> = props => {

    const {
        notifications
    } = props


    return (
            <NotificationWrapper>
                {notifications.map(note => {
                    return <Notification key={note.id} id={note.id} message={note.message} type={note.type}/>
                })}
            </NotificationWrapper>
    )
}

// Styles
const NotificationWrapper = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  
  width: 300px;

  z-index: 1000;
`

// Types
type PropsT = {
    notifications: Array<NotificationT>
}