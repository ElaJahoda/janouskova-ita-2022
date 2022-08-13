import { theme } from '../theme'
import styled from '@emotion/styled'

export const Button = styled.button`
  border: transparent;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${theme.primaryColor};
    transform: scale(1.1);
  }
`
