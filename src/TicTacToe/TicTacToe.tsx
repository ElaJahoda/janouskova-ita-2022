import { BOARD_SIZE, BoardState, SQUARE_SIZE, Value, useGameState } from './GameState'
import { Button } from '../components/Button'
import { Div_Styled } from '../HomePage'
import { Helmet } from 'react-helmet'
import { keyframes } from '@emotion/react'
import { theme } from '../theme'
import React from 'react'
import styled from '@emotion/styled'

export const TicTacToe = () => {
  const useGameStateResult = useGameState()
  return (
    <Div_Styled>
      <Helmet>
        <title>Eva Janouskova - Tic-Tac-Toe</title>
      </Helmet>
      <h1>Tic-Tac-Toe</h1>
      <P_Styled>
        The first player to get 5 of her marks in a row (up, down, across, or diagonally) is the
        winner.
      </P_Styled>
      {useGameStateResult.winner ? <Winner_Div winner={useGameStateResult.winner} /> : ''}
      <Row_Styled gap={20}>
        <Player_Styled>
          {useGameStateResult.winner ? (
            <>
              Next Player:
              <Reset onClick={useGameStateResult.handleResetClick} />
            </>
          ) : (
            `Next Player: ${useGameStateResult.xIsNext ? 'X' : 'O'}`
          )}
        </Player_Styled>
        <Column gap={20}>
          <Board board={useGameStateResult.current} onClick={useGameStateResult.handleClick} />
        </Column>
        <Log log={useGameStateResult.gameState.log} jumpTo={useGameStateResult.jumpTo} />
      </Row_Styled>
    </Div_Styled>
  )
}

type BoardProps = {
  board: BoardState
  onClick: (square: number) => void
}
const Board = (props: BoardProps) => {
  return (
    <ColumnBoard gap={0}>
      {props.board.map((square, index) => (
        <Square key={index} value={square} onClick={() => props.onClick(index)} />
      ))}
    </ColumnBoard>
  )
}

type LogProps = {
  log: BoardState[]
  jumpTo: (step: number) => void
}
const Log = (props: LogProps) => {
  return (
    <Ul_Styled>
      Log history:
      {props.log.map((_, index) => {
        return (
          <li key={index}>
            <Button_Styled onClick={() => props.jumpTo(index)}>
              Go to {index === 0 ? 'start' : `move #${index}`}
            </Button_Styled>
          </li>
        )
      })}
    </Ul_Styled>
  )
}

type SquareProps = {
  value: Value
  onClick: () => void
}
const Square = (props: SquareProps) => {
  return <Square_Styled onClick={() => props.onClick()}>{props.value}</Square_Styled>
}

const Square_Styled = styled.button`
  width: ${SQUARE_SIZE}px;
  height: ${SQUARE_SIZE}px;
  background: ${theme.opacityLightQuaternaryColor};
  border: 1px solid ${theme.basicColor};
  padding: 0px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.15s ease-in-out, background-color 0.2s ease-in-out;
  :hover {
    background-color: ${theme.opacityQuaternaryColor};
  }
`
const Button_Styled = styled(Button)`
  font-size: 14px;
  width: 120px;
`

type ResetProps = {
  onClick: () => void
}

const Reset = (props: ResetProps) => {
  return <Reset_Button onClick={props.onClick}>Reset Game</Reset_Button>
}
const Reset_Button = styled(Button_Styled)`
  background-color: ${theme.primaryColor};
`

type LayoutProps = {
  gap?: number
  count?: number
}
const Row_Styled = styled.div<LayoutProps>`
  display: flex;
  flex-direction: row;
  gap: ${props => props.gap}px;
  width: ${BOARD_SIZE * SQUARE_SIZE + 380}px;
  height: ${BOARD_SIZE * SQUARE_SIZE}px;
  margin: auto;
  @media ${theme.mediaLMax} {
    width: 95%;
    height: auto;
    flex-direction: column;
  }
`
const Column = styled.div<LayoutProps>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.gap}px;
`
const ColumnBoard = styled.div<LayoutProps>`
  margin: auto;
  padding: 2px;
  border: solid 2px ${theme.quaternaryColor};
  border-radius: 5px;
  max-width: ${BOARD_SIZE * SQUARE_SIZE}px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${SQUARE_SIZE}px, 1fr));
  gap: ${props => props.gap}px;
`
const Ul_Styled = styled.ul`
  list-style-type: none;
  width: 160px;
  margin: 0;
  padding: 0;
  overflow: auto;
  @media ${theme.mediaLMax} {
    width: 95%;
    height: 350px;
    overflow: auto;
  }
`
const Player_Styled = styled.div`
  width: 160px;
  @media ${theme.mediaLMax} {
    width: 95%;
  }
`
const P_Styled = styled.p`
  font-size: 14px;
`

const Winner_Div = (props: { winner: Value }) => {
  const text = `Winner: ${props.winner}`
  return (
    <Wavy_Div>
      {Array.from(text).map((char, index) => (
        <Wavy_Span key={index} count={index + 1}>
          {char}
        </Wavy_Span>
      ))}
    </Wavy_Div>
  )
}

const Wavy_Div = styled.div`
  margin: 40px 60px 60px 60px;
  position: relative;
  -webkit-box-reflect: below -12px linear-gradient(transparent, ${theme.opacity});
`
const Animate = keyframes`
0% {
  transform: translateY(0px);
}
20% {
  transform: translateY(-20px);
}
40%,
100% {
  transform: translateY(0px);
}
`
const Wavy_Span = styled.span<LayoutProps>`
  font-weight: bold;
  padding: 10px;
  position: relative;
  display: inline-block;
  font-size: 2rem;
  animation: ${Animate} 1s ease-in-out infinite;
  animation-delay: calc(0.1s * ${props => props.count});
`
