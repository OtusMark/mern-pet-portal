import {css} from 'styled-components/macro'

export const TextInputMixin = ({fontSize, fontFamily}: InputMixinT) => css`
  padding: .5rem .5rem;

  width: 100%;

  font-size: ${fontSize};
  font-family: ${fontFamily};

  border: 1px solid rgb(109, 109, 109);
`

// Types
type InputMixinT = {
    fontSize: string
    fontFamily: string
}