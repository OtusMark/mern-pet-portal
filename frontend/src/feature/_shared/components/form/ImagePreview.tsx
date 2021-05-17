import React, {useEffect, useState} from "react";
import styled from "styled-components/macro";

export const ImagePreview: React.FC<PropsT> = props => {

    const {
        imageFile
    } = props

    const [previewUrl, setPreviewUrl] = useState<any>()

    console.log(imageFile)

    useEffect(() => {
        if (!imageFile) {
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
            <img src={previewUrl} alt=''/>
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
    imageFile: any
}