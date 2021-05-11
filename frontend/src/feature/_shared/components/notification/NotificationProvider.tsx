import React from "react";
import styled from "styled-components/macro";
import {Notification} from "./Notification";
import {NotificationT} from "../../../../bll/reducers/app-reducer";

export const NotificationProvider: React.FC<PropsT> = props => {

    const {
        notifications
    } = props


    return (
            <NotificationWrapper>
                {notifications.map(note => {
                    return <Notification key={note.id} message={note.message} type={note.type}/>
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