import { useState } from 'react'

export const BOARD_SIZE = 10
const SQUARE_COUNT = BOARD_SIZE ** 2
const COUNT_TO_WIN = 5

export type Value = 'X' | 'O' | null
export type BoardState = Value[]
type CheckProps = { i: number; square: string }
export type GameState = {
  history: BoardState[]
  step: number
}

/**
 * source: https://github.com/Solomka12/tic-tac-toe/blob/main/src/utils/index.js
 * */
const calculateWinner = (board: BoardState, player: Value) => {
  const fitsVertically = (i: number) => i + BOARD_SIZE * (COUNT_TO_WIN - 1) < SQUARE_COUNT
  const fitsHorizontally = (i: number) => (i % BOARD_SIZE) + COUNT_TO_WIN <= BOARD_SIZE
  const fitsBackHorizontally = (i: number) => (i % BOARD_SIZE) - (COUNT_TO_WIN - 1) >= 0

  const getHorizontalRow = (props: CheckProps) => {
    if (!fitsHorizontally(props.i)) return null
    let currRowCount = 1
    for (let j = props.i + 1; currRowCount < COUNT_TO_WIN; j++) {
      if (board[j] === props.square) {
        currRowCount++
      } else {
        break
      }
    }
    return currRowCount >= COUNT_TO_WIN ? player : null
  }

  const getVerticalRow = (props: CheckProps) => {
    if (!fitsVertically(props.i)) return null
    let currRowCount = 1
    for (let j = props.i + BOARD_SIZE; currRowCount < COUNT_TO_WIN; j += BOARD_SIZE) {
      if (board[j] === props.square) {
        currRowCount++
      } else {
        break
      }
    }
    return currRowCount >= COUNT_TO_WIN ? player : null
  }

  const getDiagonalLTRRow = (props: CheckProps) => {
    if (!fitsHorizontally(props.i) || !fitsVertically(props.i)) return null
    let currRowCount = 1
    for (let j = props.i + BOARD_SIZE + 1; currRowCount < COUNT_TO_WIN; j += BOARD_SIZE + 1) {
      if (board[j] === props.square) {
        currRowCount++
      } else {
        break
      }
    }
    return currRowCount >= COUNT_TO_WIN ? player : null
  }

  const getDiagonalRTLRow = (props: CheckProps) => {
    if (!fitsVertically(props.i) || !fitsBackHorizontally(props.i)) return null
    let currRowCount = 1
    for (let j = props.i + BOARD_SIZE - 1; currRowCount < COUNT_TO_WIN; j += BOARD_SIZE - 1) {
      if (board[j] === props.square) {
        currRowCount++
      } else {
        break
      }
    }
    return currRowCount >= COUNT_TO_WIN ? player : null
  }

  for (let i = 0; i < board.length; i++) {
    const square = board[i]
    if (square) {
      const horizontalRow = getHorizontalRow({ i, square })
      if (horizontalRow) return horizontalRow

      const verticalRow = getVerticalRow({ i, square })
      if (verticalRow) return verticalRow

      const diagonalLTRRow = getDiagonalLTRRow({ i, square })
      if (diagonalLTRRow) return diagonalLTRRow

      const diagonalRTLRow = getDiagonalRTLRow({ i, square })
      if (diagonalRTLRow) return diagonalRTLRow
    }
  }
}

const createBoardState = () => Array<Value>(SQUARE_COUNT).fill(null)

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({ history: [createBoardState()], step: 0 })
  const [turn, setTurn] = useState<'X' | 'O' | null>('X')

  const current = gameState.history[gameState.step]
  const xIsNext = gameState.step % 2 === 0

  const handleClick = (square: number) => {
    const history = gameState.history.slice(0, gameState.step + 1)
    const boardState = history[history.length - 1]
    const newBoardState = boardState.slice()
    newBoardState[square] = xIsNext ? 'X' : 'O'
    if (calculateWinner(boardState, turn) || boardState[square]) {
      return
    }
    history.push(newBoardState)
    setGameState({
      history: history,
      step: history.length - 1,
    })
    setTurn(newBoardState[square])
  }
  const winner = calculateWinner(current, turn)
  const jumpTo = (step: number) => {
    setGameState({
      history: gameState.history,
      step,
    })
  }

  return {
    gameState,
    current,
    xIsNext,
    winner,
    handleClick,
    jumpTo,
  }
}
