import { theme } from './theme'
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
  background-color: ${theme.primaryColor};
  height: 82.9vh;
  text-align: ${theme.textAlign};
  font-family: ${theme.fontFamily};
  font-size: ${theme.fontSize};

  margin: -26px 0px 0px 0px;
`
