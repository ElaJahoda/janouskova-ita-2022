import { theme } from './Theme'
import React from 'react'
import styled from '@emotion/styled'

export const Home = () => {
  return (
    <Div_Styled>
      <h1>Welcome</h1>
      <p>Welcome to my React portfolio.</p>
    </Div_Styled>
  )
}
export const Div_Styled = styled.div`
  box-sizing: ${theme.boxSizing};
  background-color: ${theme.primaryColor};
  width: ${theme.widthFull};
  height: ${theme.minHeight};
  text-align: ${theme.textAlign};
  font-family: ${theme.fontFamily};
  font-size: ${theme.fontSize};

  margin: ${theme.marginMinus};
`
