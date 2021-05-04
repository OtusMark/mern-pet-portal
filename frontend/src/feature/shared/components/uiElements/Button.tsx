import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import styled, {StyledComponentProps} from "styled-components/macro";

export const Button: React.FC<PropsT> = props => {

    return (
        <StyledButton{...props}/>
    );
}

// Styles
const StyledButton = styled.button<StyledComponentProps<any, any, any, any>>`
  border: none;
  border-radius: 3px;
  cursor: ${({ disabled }) => disabled ? "default" : "pointer"};
  background-color: ${({ theme, disabled }) => disabled ? theme.color.grey["300"] : theme.color.primary.main};
  color: ${({ theme, disabled }) => disabled ? theme.color.black : theme.color.white};
  padding: 0.5rem 1rem;
  
  box-shadow: ${({ theme }) => theme.shadow['1']};

  font-family: ${({ theme }) => theme.font.family.default}; // Make a default font actually default
  font-size: ${({ theme }) => theme.font.size.default}; // Default font size
  
  transition: all .1s ease-in-out;

  &:hover {
    background-color: ${({ theme, disabled }) => disabled ? 'none' : theme.color.primary.dark};
    transform: ${({ disabled }) => disabled ? 'none' : 'translateY(-0.1em)'};
    box-shadow: ${({ theme, disabled }) => disabled ? theme.shadow['1'] : theme.shadow['4']};
  }
  
  &:active {
    background-color: ${({ theme, disabled }) => disabled ? 'none' : theme.color.primary.light};
    transform: ${({ disabled }) => disabled ? 'none' : 'translateY(0)'};
    box-shadow: ${({ theme, disabled }) => disabled ? theme.shadow['1'] : theme.shadow['1']};
  }
`;

// Types
type DefaultButtonPropsT = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type PropsT = DefaultButtonPropsT