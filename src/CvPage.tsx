import { A_Styled, Div_Styled } from './HomePage'
import { Helmet } from 'react-helmet'
import { theme } from './theme'
import React from 'react'
import styled from '@emotion/styled'

export const CvPage = () => {
  return (
    <Div_Styled>
      <Helmet>
        <title>Eva Janouskova - CV</title>
        <meta name='description' content='Home page of React portfolio' />
      </Helmet>

      <Container_div>
        <h1>Eva Janoušková</h1>
        <P_styled>
          Křepice (Břeclav district), CZ
          <br />
          +420 728 333 480
          <br />
          <A_Styled href='mailto: e.janouskova123@gmail.com'>e.janouskova123@gmail.com</A_Styled>
        </P_styled>
        <H4_styled>Professional Skills</H4_styled>
        <Ul_styled>
          <li> HTML5, CSS3 </li>
          <li>React.js, JavaScript (ES6+, Node.js, Typescript) </li>
          <li>Git, Jira </li>
        </Ul_styled>
        <H4_styled>Courses</H4_styled>
        <P_styled>Smartbrains - ITAbsolvent</P_styled>
        <Ul_styled>
          <li>07/2022 - 09/2022</li>
          <li>Frontend development using React and Typescript </li>
        </Ul_styled>
        <P_styled> Czechitas - JavaScript</P_styled>
        <Ul_styled>
          <li>02/2022 - 05/2022</li>
          <li>Frontend development using HTML, CSS and mainly JavaScript</li>
        </Ul_styled>
        <P_styled>University of Ostrava - Basics of informatics</P_styled>
        <Ul_styled>
          <li>02/2022 - 05/2022</li>
          <li>
            MS Office application programs, Informatics, Presentation and communication technology,
            Introduction to the creation of web pages
          </li>
        </Ul_styled>
        <H4_styled> Work Experience</H4_styled>
        <P_styled>CBL s.r.o. - NOC operator</P_styled>
        <Ul_styled>
          <li>9/2016–9/2017</li>
          <li>Network Monitoring and Troubleshooting</li>
        </Ul_styled>
        <H4_styled>Language Skills</H4_styled>
        <Ul_styled>
          <li>Czech - native proficiency</li>
          <li>English - C1 proficiency</li>
        </Ul_styled>
      </Container_div>
    </Div_Styled>
  )
}

const Container_div = styled.div`
  padding: 10px;
  box-sizing: border-box;
  margin: auto;
  max-width: 650px;
  font-size: inherit;
  font-family: inherit;
  text-align: left;

  @media screen and ${theme.mediaSMax} {
    width: 95%;
  }
`
const Ul_styled = styled.ul`
  list-style-type: circle;
  margin: 0px;
`
const H4_styled = styled.h4`
  margin: 25px 0px 10px 0px;
`
const P_styled = styled.p`
  margin: 10px 0px 5px 0px;
`
