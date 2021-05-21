import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, TextareaHTMLAttributes} from 'react'
import styled from 'styled-components/macro'
import {InputMixin} from '../../../styles/Mixins'

export const Input: React.FC<InputTextPropsT> = (props) => {

    const {
        type, // ignore
        onChange,
        onChangeText,
        onKeyPress,
        onEnter,
        error,
        ...restProps
    } = props

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange
        && onChange(e)

        onChangeText && onChangeText(e.currentTarget.value)
    }

    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e)

        e.key === 'Enter'
        && onEnter
        && onEnter()
    }

    return (
        <InputTextWrapper>
            <StyledInput
                type='text'
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                {...restProps}
            />
            <StyledError>
                {error && <span>{error}</span>}
            </StyledError>
        </InputTextWrapper>
    )
}

const InputTextWrapper = styled.div`
  position: relative;

  width: 100%;
`

const StyledInput = styled.input<any>` // Styled-Component cannot infer type ...restProps. Only any can be used

  ${({theme}) => InputMixin({
    fontSize: theme.font.size.default,
    fontFamily: theme.font.family.default
  })}

  margin-bottom: 1.5rem;
`

const StyledTextarea = styled.textarea<any>`
  
  ${({theme}) => InputMixin({
    fontSize: theme.font.size.default,
    fontFamily: theme.font.family.default
  })}

  margin-bottom: 1.1rem;
`

const StyledError = styled.div`
  position: absolute;
  bottom: 1px;

  & > span {
    font-size: ${({theme}) => theme.font.size.s1};
    color: red;
  }
`

// Types
type DefaultInputPropsT = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputTextPropsT = DefaultInputPropsT & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
}