import { Div_Styled } from './HomePage'
import { Helmet } from 'react-helmet'
import { NavLink } from 'react-router-dom'
import { theme } from './theme'
import { urls } from './utils/urls'
import BlogImg from './images/BlogPost1Screenshot.png'
import GitHubImg from './images/GitHub.png'
import HackerTyperImg from './images/HackerTyperScreenshot.png'
import JsHistoryImg from './images/JsHistoryScreenshot.png'
import MemoryGameImg from './images/MemoryGameScreenshot.png'
import MortgageCalculatorImg from './images/MortgageCalculatorScreenshot.png'
import React from 'react'
import TicTacToeImg from './images/TicTacToeScreenshot.png'
import ToDoImg from './images/ToDoScreenshot.png'
import styled from '@emotion/styled'

export const ProjectsPage = () => {
  return (
    <Div_Styled>
      <Helmet>
        <title>Eva Janouskova - Projects</title>
        <meta name='description' content='Projects' />
      </Helmet>
      <h1>Projects</h1>
      <Div_Grid>
        <Cell_Div
          name='JS History'
          linkToGitHub='https://github.com/ElaJahoda/janouskova-ita-2022/tree/main/src/JShistory'
          routeLink={urls.jsHistory}
          screenshot={JsHistoryImg}
        />
        <Cell_Div
          name='Todo Redux'
          linkToGitHub='https://github.com/ElaJahoda/janouskova-ita-2022/tree/main/src/ToDoRedux'
          routeLink={urls.toDoRedux}
          screenshot={ToDoImg}
        />
        <Cell_Div
          name='Mortgage Calculator'
          linkToGitHub='https://github.com/ElaJahoda/janouskova-ita-2022/tree/main/src/MortgageCalculator'
          routeLink={urls.mortgageCalculator}
          screenshot={MortgageCalculatorImg}
        />
        <Cell_Div
          name='HackerTyper'
          linkToGitHub='https://github.com/ElaJahoda/janouskova-ita-2022/tree/main/src/HackerTyper'
          routeLink={urls.hackertyper}
          screenshot={HackerTyperImg}
        />
        <Cell_Div
          name='Memory Game'
          linkToGitHub='https://github.com/ElaJahoda/janouskova-ita-2022/tree/main/src/MemoryGame'
          routeLink={urls.memoryGame}
          screenshot={MemoryGameImg}
        />
        <Cell_Div
          name='Blog'
          linkToGitHub='https://github.com/ElaJahoda/janouskova-ita-2022/tree/main/src/BlogPost'
          routeLink={urls.blogPost}
          screenshot={BlogImg}
        />
        <Cell_Div
          name='Tic-Tac-Toe'
          linkToGitHub='https://github.com/ElaJahoda/janouskova-ita-2022/tree/main/src/TicTacToe'
          routeLink={urls.ticTacToe}
          screenshot={TicTacToeImg}
        />
      </Div_Grid>
    </Div_Styled>
  )
}

const Cell_Div = (props: {
  name: string
  linkToGitHub: string
  routeLink: string
  screenshot: string
}) => {
  return (
    <Cell_styled>
      <Row_div>
        <Name_div>{props.name}</Name_div>
        <A_styled href={props.linkToGitHub}>
          <Img_styled src={GitHubImg} width='45px' />
        </A_styled>
      </Row_div>
      <Link_styled to={props.routeLink}>
        <img src={props.screenshot} width='300px' />
      </Link_styled>
    </Cell_styled>
  )
}
const Div_Grid = styled.div`
  padding-top: 25px;
  max-width: 950px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 0.5rem;
  margin: auto;
`
const Cell_styled = styled.div`
  width: 300px;
  height: 330px;
  border-radius: 5px;
  margin: 5px auto;
  text-align: left;
  box-shadow: ${theme.boxShadow};
`
const Row_div = styled.div`
  border-radius: 5px 5px 0px 0px;
  padding: 3px;
  display: flex;
  justify-content: space-between;
  background-color: ${theme.opacityQuaternaryColor};
`
const Name_div = styled.div`
  font-size: 20px;
  padding: 10px;
  font-weight: bold;
`
const Link_styled = styled(NavLink)`
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`
const A_styled = styled.a`
  text-align: right;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`
const Img_styled = styled.img`
  margin: 1px 0px -5px 0px;
`
