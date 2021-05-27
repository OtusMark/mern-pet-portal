import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import { Link } from "react-router-dom";
import styled, {StyledComponentProps} from "styled-components/macro";

export const Button: React.FC<PropsT> = (props) => {

    const {
        href,
        to,
        type,
        onClick,
        disabled,
    } = props

    if (href) {
        return (
            <StyledButton disabled={disabled}>
                <a
                    href={href}
                >
                    {props.children}
                </a>
            </StyledButton>
        );
    }
    if (to) {
        return (
            <StyledButton disabled={disabled}>
                <Link
                    to={to}
                >
                    {props.children}
                </Link>
            </StyledButton>
        );
    }
    return (
        <StyledButton
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {props.children}
        </StyledButton>
    );
}

// Styles
const StyledButton = styled.button`
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
    box-shadow: ${({ theme, disabled }) => disabled ? theme.shadow['1'] : theme.shadow['3']};
  }
  
  &:active {
    background-color: ${({ theme, disabled }) => disabled ? 'none' : theme.color.primary.light};
    transform: ${({ disabled }) => disabled ? 'none' : 'translateY(0)'};
    box-shadow: ${({ theme, disabled }) => disabled ? theme.shadow['1'] : theme.shadow['1']};
  }
  
  & a {
    color: inherit;
  }
`;

// Types
type DefaultButtonPropsT = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type PropsT = DefaultButtonPropsT & {
    href?: string
    to?: string
    type?: string
    onClick?: () => void
    disabled?: boolean
}