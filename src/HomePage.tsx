import React from 'react'
import styled from '@emotion/styled'

export function Home() {
  return (
    <P>
      <h1>Welcome</h1>
      <p>Welcome to my React portfolio.</p>
    </P>
  )
}
const P = styled.div`
  box-sizing: border-box;
  background-color: #ecd540;
  width: 100%;
  height: 82vh;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 20px;

  margin: -26px 0px 0px 0px;
`
