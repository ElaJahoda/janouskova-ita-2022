import { useState } from 'react'

export type Value = 'X' | 'O' | null

export type BoardState = Value[]

const calculateWinnerX = (boardState: BoardState, dimension: number) => {
  const rows = new Array(dimension).fill(0)
  const cols = new Array(dimension).fill(0)
  const diag = new Array(2).fill(0)
  const diagAnti = new Array(2).fill(0)

  for (let row = 0; row < dimension; row++) {
    for (let col = 0; col < dimension; col++) {
      const square = boardState[row * dimension + col]
      if (square === 'X') {
        rows[row]++
        cols[col]++
      } else if (square === 'O') {
        rows[row]--
        cols[col]--
      }
      if (row === col && square === 'X') {
        diag[0] += 1
      }
      if (row === col && square === 'O') {
        diag[1] += -1
      }
      if (row === dimension - 1 - col && square === 'X') {
        diagAnti[0] += 1
      }
      if (row === dimension - 1 - col && square === 'O') {
        diagAnti[1] += -1
      }
    }
  }

  for (let i = 0; i < dimension; i++) {
    if (rows[i] === dimension || cols[i] === dimension) {
      return 'X'
    } else if (rows[i] === -dimension || cols[i] === -dimension) {
      return 'O'
    }
  }

  if (
    diag[0] === dimension ||
    diag[1] === dimension ||
    diagAnti[0] === dimension ||
    diagAnti[1] === dimension
  ) {
    return 'X'
  } else if (
    diag[0] === -dimension ||
    diag[1] === -dimension ||
    diagAnti[0] === -dimension ||
    diagAnti[1] === -dimension
  ) {
    return 'O'
  }

  return null
}

const createBoardState = () => Array<Value>(100).fill(null)

export type GameState = {
  history: BoardState[]
  step: number
}

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({ history: [createBoardState()], step: 0 })

  const current = gameState.history[gameState.step]
  const xIsNext = gameState.step % 2 === 0
  const winner = calculateWinnerX(current, 10)

  const handleClick = (square: number) => {
    const history = gameState.history.slice(0, gameState.step + 1)
    const boardState = history[history.length - 1]
    if (calculateWinnerX(boardState, 10) || boardState[square]) {
      return
    }
    const newBoardState = boardState.slice()
    newBoardState[square] = gameState.step % 2 === 0 ? 'X' : 'O'
    history.push(newBoardState)
    setGameState({
      history: history,
      step: history.length - 1,
    })
  }

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
