import styled, {StyledComponentProps} from "styled-components/macro";
import React from "react";
import {ThemeType} from "../../../../styles/theme";

type DefaultDivType = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

type PropsType = DefaultDivType & {
    isOpen: boolean
}

export const Burger: React.FC<PropsType> = props => {

    const {
        isOpen,
    ...restProps
    } = props

    return (
        <BurgerMain isOpen={isOpen} {...restProps}>
            <Line className='line-top'/>
            <Line className='line-middle'/>
            <Line className='line-bottom'/>
        </BurgerMain>
    )
}

const BurgerMain = styled.div<StyledComponentProps<any, ThemeType, any, any>>`
  cursor: pointer;
  
    & .line-top {
      transform: ${({isOpen}) => isOpen && 'rotate(-45deg) translate(-5px, 6.3px)'};
    }

    & .line-middle {
      opacity: ${({isOpen}) => isOpen && 0};
    }

    & .line-bottom {
      transform: ${({isOpen}) => isOpen && 'rotate(45deg) translate(-5px, -6.3px)'};
    }
`

const Line = styled.div<{ theme: ThemeType }>`
  position: relative;
  z-index: 1001;
  
  width: 25px;
  height: 3px;
  margin: 5px;

  background-color: ${({theme}) => theme.color.primary.main};

  transition: all ease-in .25s;
`