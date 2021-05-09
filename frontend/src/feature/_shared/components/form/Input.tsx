import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, TextareaHTMLAttributes} from "react";
import styled, {StyledComponentProps} from "styled-components/macro";

export const Input: React.FC<InputTextPropsT> = (props) => {

    const {
        onChange,
        onChangeText,
        onKeyPress,
        onEnter,
        error,
        isTextarea = false,
        ...restProps
    } = props

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange
        && onChange(e);

        onChangeText && onChangeText(e.currentTarget.value);
    }

    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        e.key === "Enter"
        && onEnter
        && onEnter();
    }

    const element = isTextarea ? (
        <StyledTextarea
            onChange={onChangeCallback}
            onKeyPress={onKeyPressCallback}
            {...restProps}
        />

    ) : (
        <StyledInput
            onChange={onChangeCallback}
            onKeyPress={onKeyPressCallback}
            {...restProps}
        />
    )

    return (
        <InputTextWrapper>
            {element}
            <StyledError>
                {error && <span>{error}</span>}
            </StyledError>
        </InputTextWrapper>
    );
}

const InputTextWrapper = styled.div`
  position: relative;

  width: 100%;
`

const StyledInput = styled.input<StyledComponentProps<any, any, any, any>>`
  padding: .5rem .5rem;
  margin-bottom: 1.5rem;

  width: 100%;

  font-size: ${({theme}) => theme.font.size.default};
  font-family: ${({theme}) => theme.font.family.default};

  border: 1px solid rgb(109, 109, 109);
`

const StyledTextarea = styled.textarea<StyledComponentProps<any, any, any, any>>`
  padding: .5rem .5rem;
  margin-bottom: 1.1rem;

  width: 100%;

  font-size: ${({theme}) => theme.font.size.default};
  font-family: ${({theme}) => theme.font.family.default};

  border: 1px solid rgb(109, 109, 109);
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
type DefaultTextareaT = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

type InputTextPropsT = DefaultInputPropsT & DefaultTextareaT & {
    isTextarea?: boolean
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
};