import { Helmet } from 'react-helmet'
import { theme } from './theme'
import React from 'react'
import styled from '@emotion/styled'

export const Home = () => {
  return (
    <Div_Styled>
      <Helmet>
        <title>Eva Janouskova - Home</title>
        <meta name='description' content='Home page of React portfolio' />
      </Helmet>
      <h1>Welcome</h1>
      <p>Welcome to my React portfolio.</p>
    </Div_Styled>
  )
}
export const Div_Styled = styled.div`
  background-color: ${theme.primaryColor};
  height: 91vh;
  text-align: ${theme.textAlign};
  font-family: ${theme.fontFamily};
  font-size: ${theme.fontSize};

  margin: -26px 0px 0px 0px;
`
