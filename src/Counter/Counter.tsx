import { Button } from '../components/Button'
import { Div_Styled } from '../HomePage'
import { Helmet } from 'react-helmet'
import { theme } from '../theme'
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
        <Helmet>
          <title>Eva Janouskova - Counter App</title>
        </Helmet>
        <h1>Counter App</h1>
        <Div_Container>
          <Button
            onClick={() => {
              this.setState(prevstate => ({ counter: prevstate.counter - 1 }))
            }}
          >
            -
          </Button>
          <span> {this.state.counter} </span>
          <Button
            onClick={() => {
              this.setState(prevstate => ({ counter: prevstate.counter + 1 }))
            }}
          >
            +
          </Button>
        </Div_Container>
      </Div_Styled>
    )
  }
}

const Div_Container = styled.div`
  font-size: 25px;
  @media screen and ${theme.mediaMax} {
    widht: 95%;
  }
`
