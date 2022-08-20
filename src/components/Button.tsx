import { theme } from '../theme'
import styled from '@emotion/styled'

export const Button = styled.button`
font-family: ${theme.fontFamily}
font-size: ${theme.fontSize};
  border: transparent;
  border-radius: 5px;
  padding: 7px;
  cursor: pointer;
  transition: opacity 0.15s ease-in-out, background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${theme.primaryColor};
  }
`
