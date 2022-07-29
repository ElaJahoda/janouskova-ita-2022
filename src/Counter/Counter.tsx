import React, { useState } from 'react'
import styled from '@emotion/styled'

export function Counter() {
  const [count, setCount] = useState(0)

  function decrementCount() {
    setCount(prevCount => prevCount - 1)
  }
  function incrementCount() {
    setCount(prevCount => prevCount + 1)
  }
  return (
    <P>
      <h1>Counter App</h1>
      <button onClick={decrementCount}> - </button>
      <span> {count} </span>
      <button onClick={incrementCount}> + </button>
    </P>
  )
}

const P = styled.div`
  box-sizing: border-box;
  background-color: #ecd540;
  width: 100%;
  height: 82vh;
  text-align: center;
  margin: -26px 0px 0px 0px;

  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 20px;
`
