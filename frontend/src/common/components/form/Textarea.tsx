import React, {ChangeEvent, DetailedHTMLProps, KeyboardEvent, TextareaHTMLAttributes} from 'react'
import styled from 'styled-components/macro'
import {TextInputMixin} from '../../../app/styles/Mixins'

export const Textarea: React.FC<TextAreaPropsT> = (props) => {

    const {
        onChange,
        onChangeText,
        onKeyPress,
        onEnter,
        error,
        ...restProps
    } = props

    const onChangeCallback = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange
        && onChange(e)

        onChangeText && onChangeText(e.currentTarget.value)
    }

    const onKeyPressCallback = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        onKeyPress && onKeyPress(e)

        e.key === 'Enter'
        && onEnter
        && onEnter()
    }

    return (
        <ComponentWrapper>
            <StyledTextarea
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

const StyledTextarea = styled.textarea<any>` // Styled-Component cannot infer types for ...restProps. Only any can be used

  ${({theme}) => TextInputMixin({
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
type DefaultTextareaPropsT = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

type TextAreaPropsT = DefaultTextareaPropsT & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
}