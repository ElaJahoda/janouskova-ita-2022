import { BoardState, Value, useGameState } from './GameState'
import { Div_Styled } from '../HomePage'
import { Helmet } from 'react-helmet'
import React from 'react'
import styled from '@emotion/styled'

export const TicTacToe = () => {
  const { gameState, current, xIsNext, winner, handleClick, jumpTo } = useGameState()
  return (
    <Div_Styled>
      <Helmet>
        <title>Eva Janouskova - Tic-Tac-Toe</title>
      </Helmet>
      <Row gap={20}>
        <Column gap={20}>
          <div>{winner ? `Winner ${winner}` : `Next Player ${xIsNext ? 'X' : 'O'}`}</div>
          <Board board={current} onClick={handleClick} />
        </Column>
        <Log history={gameState.history} jumpTo={jumpTo} />
      </Row>
    </Div_Styled>
  )
}

type BoardProps = {
  board: BoardState
  onClick: (square: number) => void
}
const Board = ({ board, onClick }: BoardProps) => {
  const createProps = (square: number): SquareProps => {
    return {
      value: board[square],
      onClick: () => onClick(square),
    }
  }
  return (
    <Column gap={0}>
      <Row gap={0}>
        <Square {...createProps(0)}></Square>
        <Square {...createProps(1)}></Square>
        <Square {...createProps(2)}></Square>
      </Row>
      <Row gap={0}>
        <Square {...createProps(3)}></Square>
        <Square {...createProps(4)}></Square>
        <Square {...createProps(5)}></Square>
      </Row>
      <Row gap={0}>
        <Square {...createProps(6)}></Square>
        <Square {...createProps(7)}></Square>
        <Square {...createProps(8)}></Square>
      </Row>
    </Column>
  )
}

type LogProps = {
  history: BoardState[]
  jumpTo: (step: number) => void
}

const Log = (props: LogProps) => {
  return (
    <ol>
      {props.history.map((_, index) => {
        return (
          <li key={index}>
            <button onClick={() => props.jumpTo(index)}>
              Go to {index === 0 ? 'start' : `move #${index}`}
            </button>
          </li>
        )
      })}
    </ol>
  )
}

type SquareProps = {
  value: Value
  onClick: () => void
}

const Square = (props: SquareProps) => {
  return <StyledSquare onClick={props.onClick}>{props.value}</StyledSquare>
}

const StyledSquare = styled.button`
  width: 34px;
  height: 34px;
  backgroung: #fff;
  border: 1px solid #999;
  padding: 0px;
  font-size: 24px;
  font-weight: bold;
`

type LayoutProps = {
  gap: number
}

const Row = styled.div<LayoutProps>`
  display: flex;
  flex-direction: row;
  gap: ${props => props.gap}px;
`

const Column = styled.div<LayoutProps>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.gap}px;
`
