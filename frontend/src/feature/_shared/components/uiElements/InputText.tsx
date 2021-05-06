import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from "react";
import styled, {StyledComponentProps} from "styled-components/macro";

export const InputText: React.FC<InputTextPropsT> = (props) => {

    const {
        type,
        onChange,
        onChangeText,
        onKeyPress,
        onEnter,
        error,
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

    return (
        <InputTextWrapper>
            <StyledInput
                type={type}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                {...restProps}
            />
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
  padding: 1rem .5rem;
  margin-bottom: 20px;
  
  height: 20px;
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
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type InputTextPropsT = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    type: 'text' | 'password'
};