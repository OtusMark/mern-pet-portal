import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react'
import styled from 'styled-components/macro'
import {TextInputMixin} from '../../../app/styles/Mixins'

export const InputText: React.FC<InputTextPropsT> = (props) => {

    const {
        type, // ignore. To prevent assigment of other types
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
        <ComponentWrapper>
            <StyledInput
                type='text'
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                {...restProps}
            />
            <StyledError>
                {error && <span>{error}</span>}
            </StyledError>
        </ComponentWrapper>
    )
}

// Styles
const ComponentWrapper = styled.div`
  position: relative;

  width: 100%;
`

const StyledInput = styled.input<any>` // Styled-Component cannot infer types for ...restProps. Only any can be used

  ${({theme}) => TextInputMixin({
    fontSize: theme.font.size.default,
    fontFamily: theme.font.family.default
  })}

  margin-bottom: 1.5rem;
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