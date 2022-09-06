import { theme } from '../theme'
import styled from '@emotion/styled'

export const Button = styled.button`
  font-family: inherit;
  font-size: inherit;
  border: solid 1px transparent;
  border-radius: 5px;
  padding: 5px 5px 3px 5px;
  margin: 1px 0.5rem 3px 0.5rem;
  cursor: pointer;
  transition: opacity 0.15s ease-in-out, background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${theme.opacityQuaternaryColor};
  }
`
