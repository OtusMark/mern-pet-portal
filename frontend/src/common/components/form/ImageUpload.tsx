import React, {DetailedHTMLProps, InputHTMLAttributes, useEffect, useRef} from 'react'
import styled from 'styled-components/macro'

type DefaultInputT = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const ImageUpload: React.FC<PropsT> = props => {

    const {
        type,
        id,
        error,
        text,
        formImage, // The value of the image from form data must be passed here. if the image is empty undefined the image upload will be cleared.
        ...restProps
    } = props

    const filePickerRef = useRef<any>(null) // !I! HTMLInput element is not working here...

    useEffect(() => {
        if (formImage === undefined) {
            filePickerRef.current.value = ''
        }
    })


    return (
        <ImageUploadMain>
            <StyledInput type='file' id={id} ref={filePickerRef} hidden {...restProps} />
            <StyledLabel htmlFor={id}>{text}</StyledLabel>
            <StyledError>
                {error && <span>{error}</span>}
            </StyledError>
        </ImageUploadMain>
    )
}

// Styles
const ImageUploadMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-bottom: 2rem;
`

// !I! Replace any
const StyledInput = styled.input<{ ref: any }>`
  height: 20px;
`

const StyledLabel = styled.label`
  display: inline-block;
  border: none;
  cursor: pointer;
  background-color: ${({theme}) => theme.color.primary.main};
  color: ${({theme}) => theme.color.white};
  padding: 0.5rem 1rem;

  box-shadow: ${({theme}) => theme.shadow['1']};

  font-family: ${({theme}) => theme.font.family.default};
  font-size: ${({theme}) => theme.font.size.default};

  transition: all .1s ease-in-out;

  &:hover {
    background-color: ${({theme}) => theme.color.primary.dark};
    transform: translateY(-0.1em);
    box-shadow: ${({theme}) => theme.shadow['3']};
  }

  &:active {
    background-color: ${({theme}) => theme.color.primary.light};
    transform: translateY(0);
    box-shadow: ${({theme}) => theme.shadow['1']};
  }
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
type PropsT = DefaultInputT & {
    text: string
    error?: string
    formImage: any
}