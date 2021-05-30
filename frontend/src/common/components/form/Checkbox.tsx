import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import styled from 'styled-components/macro'

export const Checkbox: React.FC<PropsType> = props => {

    const {
        type,
        children,
        value,
        ...restProps
    } = props

    return (
        <StyledLabel>
            <input
                type='checkbox'
                checked={value}
                {...restProps}
            />
            <span>{children}</span>
        </StyledLabel>
    )
}

// Styles
const StyledLabel = styled.label<any>`
  // Main styles
  cursor: pointer;

  display: flex;
  align-items: center;

  // Styles for input element of type="checkbox". Remove default checkbox
  & > input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  // Styles for checkbox text
  & > span {
    display: inline-flex;
    align-items: center;
    user-select: none;
  }

  // Styles for checkbox (button) box
  & > span::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid ${({theme}) => theme.color.grey['500']};
    margin-right: 0.5em;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
  }

  // Styles for cursor hover on the checkbox
  & > input:not(:disabled):not(:checked) + span:hover::before {
    border-color: ${({theme}) => theme.color.grey['500']}; // 183
  }

  // Styles for active checkbox (when clicked)
  & > input:not(:disabled):active + span::before {
    background-color: ${({theme}) => theme.color.grey['500']};
    border-color: ${({theme}) => theme.color.grey['700']};
  }

  // Styles for checkbox in focus
  & > input:focus + span::before {
    box-shadow: ${({theme}) => theme.shadow['0']};
  }

  // Styles for checkbox in focus but unchecked
  & > input:focus:not(:checked) + span::before {
    border-color: ${({theme}) => theme.color.grey['700']};
  }

  // Styles for checked checkbox
  & > input:checked + span::before {
    border-color: ${({theme}) => theme.color.primary.main};
    background-color: ${({theme}) => theme.color.primary.main};
    background-size: 65% 65%;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
  }

  // Styles for disabled checkbox
  & > input:disabled + span::before {
    background-color: ${({theme}) => theme.color.grey['700']};
  }
`

// Types
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type PropsType = DefaultInputPropsType & {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    value: boolean
    children: string // Checkbox text
};
