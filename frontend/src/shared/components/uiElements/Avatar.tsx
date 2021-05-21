import styled, {StyledComponentProps} from "styled-components";

const handleSize = (size: 'small' | 'big' | null) => {
  switch (size) {
    case 'small': return '4rem'
    case 'big': return '14rem'
    default: return '8rem'
  }
}

export const Avatar = styled.img<StyledComponentProps<any, any, any, any>>`
  width: ${({size}) => handleSize(size)};
  height: ${({size}) => handleSize(size)};
  border-radius: 100%;
  border: .2rem solid ${({theme}) => theme.color.primary.main};
`