import styled, {StyledComponentProps} from "styled-components/macro";
import React from "react";
import {ThemeT} from "../../../app/styles/theme";

type DefaultDivType = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

type PropsType = DefaultDivType & {
    isOpen: boolean
}

export const Burger: React.FC<PropsType> = (props) => {

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

const BurgerMain = styled.div<StyledComponentProps<any, ThemeT, any, any>>`
  cursor: pointer;
`

const Line = styled.div<{ theme: ThemeT }>`
  position: relative;
  
  width: 25px;
  height: 3px;
  margin: 5px;

  background-color: ${({theme}) => theme.color.primary.main};

  transition: all ease-in .25s;
`