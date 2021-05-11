import styled, {css, keyframes} from "styled-components/macro";
import React, {useEffect, useState} from "react";
import {StyledComponentProps} from "styled-components";


export const Notification: React.FC<PropsT> = props => {

    const {
        message,
        type,
    } = props

    const [close, setClose] = useState(false)
    const [barWidth, setBarWidth] = useState<number>(0)
    const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null)

    useEffect(() => {
        handleStartTimer()
    }, [])

    const handleStartTimer = () => {
        const id = setInterval(() => {
            setBarWidth(prevState => {
                if (prevState < 100) {
                    return prevState + 0.5
                }
                return prevState
            })
        }, 20)

        setIntervalId(id)
    }

    const handlePauseTimer = () => {
        clearInterval(intervalId as ReturnType<typeof setInterval>)
    }

    const handleCloseNotification = () => {
        handlePauseTimer()
        setClose(true)
        setTimeout(() => {
            // remove state and after remove the component from the dom
        }, 400)
    }

    useEffect(() => {
        if (barWidth === 100) {
            // Close notification
            handleCloseNotification()
        }
    }, [barWidth])

    // The width is inline for better performance!!
    return (
        <NotificationItem type={type} onMouseEnter={handlePauseTimer} onMouseLeave={handleStartTimer} exit={close}>
            <p>{message}</p>
            <Bar barWidth={barWidth} style={{width: `${barWidth}%`}}/>
            {/*<button onClick={handleCloseNotification}>Close</button>*/}
        </NotificationItem>
    )
}

// Animations
const slideLeft = keyframes`
  0% {
    margin-left: 120%;
  }

  100% {
    margin-left: 0;
  }
`

const slideRight = keyframes`
  0% {
    margin-left: 0;
  }

  100% {
    margin-left: 120%;
  }
`

// Styles
const Bar = styled.div<StyledComponentProps<any, any, any, any>>`
  height: .5rem;
`

const NotificationItem = styled.div<StyledComponentProps<any, any, any, any>>`

  overflow: hidden;
  
  margin-bottom: 1rem;

  width: 300px;

  box-shadow: ${({theme}) => theme.shadow["1"]};
  border-radius: 10px;

  background-color: ${({theme}) => theme.color.white};

  animation: ${slideLeft} .5s linear forwards;
  animation: ${({exit}) =>
          exit && css`${slideRight} .5s linear forwards`
  };

  & ${Bar} {
    background-color: ${({theme, type}) =>
            type === 'error' && theme.color.error ||
            type === 'success' && theme.color.success
    };
  }

  & p {
    margin: 0;
    padding: .5rem;
  }
`

// Types
type PropsT = {
    message: string | null
    type: 'success' | 'error'
}