import React, {useEffect, useState} from 'react'
import styled from 'styled-components/macro'
import avatarDefault from '../../../assets/image/avatarDefault.png'

export const ImagePreview: React.FC<PropsT> = props => {

    const {
        imageFile,
        width,
        height
    } = props

    const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null | undefined>(avatarDefault)

    useEffect(() => {
        if (!imageFile) {
            setPreviewUrl(avatarDefault)
            return
        }
        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(imageFile)
    }, [imageFile])

    return (
        <ImagePreviewMain width={width} height={height}>
            <img src={previewUrl as string} alt=''/>
        </ImagePreviewMain>
    )
}

// Styles
const ImagePreviewMain = styled.div<{ width?: string, height?: string }>`
  margin: 0 auto 2rem;

  width: ${props => props.width ? props.width : '100%'};
  height: ${props => props.height ? props.height : '200px'};

  border: 2px solid ${({theme}) => theme.color.primary.main};

  & img {
    width: 100%;
    height: 100%;

    object-fit: cover;
  }
`

// Types
type PropsT = {
    imageFile: File | undefined
    width?: string
    height?: string
}