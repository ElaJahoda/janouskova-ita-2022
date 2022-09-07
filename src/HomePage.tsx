import { Helmet } from 'react-helmet'
import { theme } from './theme'
import GitHubImg from './images/GitHub.png'
import React from 'react'
import styled from '@emotion/styled'

export const Home = () => {
  return (
    <Div_Styled>
      <Helmet>
        <title>Eva Janouskova - Home</title>
        <meta name='description' content='Home page of React portfolio' />
      </Helmet>
      <Div_container>
        <h1>Welcome</h1>
        <p>Welcome to my React portfolio.</p>
        <p>
          My name is <Span_styled>&#060;Eva&#062;</Span_styled>. I am from Czechia.
        </p>
        <p>
          Source code for this webside, and some of the projects I have been working on while
          practicing my skills, can be found on Github. Just click on the GitHub logo.
        </p>
        <a href='https://github.com/ElaJahoda/janouskova-ita-2022'>
          <img src={GitHubImg} width='300px' />
        </a>
        <p>
          Contact me: <A_Styled href='mailto: 3la.jah0da@gmail.com'> 3la.jah0da@gmail.com</A_Styled>
        </p>
      </Div_container>
    </Div_Styled>
  )
}
const Div_container = styled.div`
  margin: auto;
  max-width: 650px;
  padding: 0px 10px;
`
const Span_styled = styled.span`
  color: ${theme.quaternaryColor};
  font-weight: bold;
`
export const Div_Styled = styled.div`
  box-sizing: border-box;
  background-color: white;
  height: 91vh;
  text-align: ${theme.textAlign};
  font-family: ${theme.fontFamily};
  font-size: ${theme.fontSize};
  margin: -17px 0px 0px 0px;
  padding-top: 15px;
`
const A_Styled = styled.a`
  color: ${theme.quaternaryColor};
  text-decoration: none;
`
