import { BOARD_SIZE, BoardState, Value, useGameState } from './GameState'
import { Button } from '../components/Button'
import { Div_Styled } from '../HomePage'
import { Helmet } from 'react-helmet'
import { theme } from '../theme'
import React from 'react'
import styled from '@emotion/styled'

type BoardProps = {
  board: BoardState
  onClick: (square: number) => void
}
type LogProps = {
  history: BoardState[]
  jumpTo: (step: number) => void
}
type SquareProps = {
  value: Value
  onClick: () => void
}
type LayoutProps = {
  gap: number
}

export const TicTacToe = () => {
  const { gameState, current, xIsNext, winner, handleClick, jumpTo } = useGameState()
  return (
    <Div_Styled>
      <Helmet>
        <title>Eva Janouskova - Tic-Tac-Toe</title>
      </Helmet>
      <h1>Tic-Tac-Toe App</h1>
      <P_Styled>
        The first player to get 5 of her marks in a row (up, down, across, or diagonally) is the
        winner.
      </P_Styled>
      <Row_Styled gap={20}>
        <Player_Styled>
          {winner ? `Winner ${winner}` : `Next Player: ${xIsNext ? 'X' : 'O'}`}
        </Player_Styled>
        <Column gap={20}>
          <Board board={current} onClick={handleClick} />
        </Column>
        <Log history={gameState.history} jumpTo={jumpTo} />
      </Row_Styled>
    </Div_Styled>
  )
}

const Board = ({ board, onClick }: BoardProps) => {
  return (
    <ColumnBoard gap={0}>
      {board.map((square, index) => (
        <Square key={index} value={square} onClick={() => onClick(index)} />
      ))}
    </ColumnBoard>
  )
}

const Log = (props: LogProps) => {
  return (
    <Ul_Styled>
      Log history:
      {props.history.map((_, index) => {
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

const Square = (props: SquareProps) => {
  return <Square_Styled onClick={props.onClick}>{props.value}</Square_Styled>
}

const Square_Styled = styled.button`
  width: 34px;
  height: 34px;
  background: ${theme.opacityLightQuaternaryColor};
  border: 1px solid #999;
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
const Row_Styled = styled.div<LayoutProps>`
  display: flex;
  flex-direction: row;
  gap: ${props => props.gap}px;
  width: ${BOARD_SIZE * 34 + 380}px;
  height: ${BOARD_SIZE * 34}px;
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
  max-width: ${BOARD_SIZE * 34}px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(34px, 1fr));
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
