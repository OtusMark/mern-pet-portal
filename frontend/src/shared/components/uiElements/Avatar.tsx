import styled from 'styled-components/macro';

const handleSize = (size: 'small' | 'big' | undefined) => {
  switch (size) {
    case 'small': return '4rem'
    case 'big': return '14rem'
    default: return '8rem'
  }
}

export const Avatar = styled.img<{size?: 'small' | 'big'}>`
  width: ${({size}) => handleSize(size)};
  height: ${({size}) => handleSize(size)};
  
  object-fit: cover;
  
  border-radius: 100%;
  border: .2rem solid ${({theme}) => theme.color.primary.main};
`