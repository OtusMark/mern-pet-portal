import React, {useEffect, useState} from "react";
import styled from "styled-components/macro";
import avatarDefault from '../../../assets/image/avatarDefault.png'

export const ImagePreview: React.FC<PropsT> = props => {

    const {
        imageFile
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
        <ImagePreviewMain>
            <img src={previewUrl as string} alt=''/>
        </ImagePreviewMain>
    )
}

// Styles
const ImagePreviewMain = styled.div`
  margin: 0 auto 2rem;

  width: 200px;
  height: 200px;

  & img {
    width: 100%;
    height: 100%;

    object-fit: cover;
  }
`

// Types
type PropsT = {
    imageFile: File | undefined
}