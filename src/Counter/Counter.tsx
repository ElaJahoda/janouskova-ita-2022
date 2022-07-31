import { Div_Styled } from '../HomePage'
import React, { useState } from 'react'
import styled from '@emotion/styled'

type Props = {}
type State = {
  counter: number
}
export class Counter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      counter: 0,
    }
  }
  render() {
    return (
      <Div_Styled>
        <h1>Counter App</h1>

        <button
          onClick={() => {
            this.setState(prevstate => ({ counter: prevstate.counter - 1 }))
          }}
        >
          -
        </button>
        <span> {this.state.counter} </span>
        <button
          onClick={() => {
            this.setState(prevstate => ({ counter: prevstate.counter + 1 }))
          }}
        >
          +
        </button>
      </Div_Styled>
    )
  }
}
