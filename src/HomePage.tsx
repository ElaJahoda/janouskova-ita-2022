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
      <p>
        Contact me: <A_Styled href='mailto: 3la.jah0da@gmail.com'> 3la.jah0da@gmail.com</A_Styled>
      </p>
    </Div_Styled>
  )
}
export const Div_Styled = styled.div`
  background-color: white;
  height: 91vh;
  text-align: ${theme.textAlign};
  font-family: ${theme.fontFamily};
  font-size: ${theme.fontSize};

  margin: -26px 0px 0px 0px;
`
const A_Styled = styled.a`
  color: ${theme.quaternaryColor};
  text-decoration: none;
`
