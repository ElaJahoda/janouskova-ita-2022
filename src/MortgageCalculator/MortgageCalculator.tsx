import { Div_Styled } from '../HomePage'
import { Helmet } from 'react-helmet'
import { theme } from '../theme'
import React, { useState } from 'react'
import styled from '@emotion/styled'

const payment = (dataAmount: number, monthlyRate: number, time: number) => {
  return (
    Math.round(
      ((dataAmount * monthlyRate * Math.pow(1 + monthlyRate, time)) /
        (Math.pow(1 + monthlyRate, time) - 1)) *
        100
    ) / 100
  )
}

export const MortgageCalculator = () => {
  const [amount, setAmount] = useState(0)
  const [rate, setRate] = useState(0)
  const [years, setYears] = useState(0)

  const dataAmount = amount ? amount : 0
  const monthlyRate = rate ? rate / 100 / 12 : 0
  const time = years ? years * 12 : 0

  const dataPayment = payment(dataAmount, monthlyRate, time)
    ? payment(dataAmount, monthlyRate, time)
    : 0

  return (
    <Div_Styled>
      <Helmet>
        <title>Eva Janouskova - Mortgage Calculator</title>
      </Helmet>
      <h1>Mortgage Calculator</h1>
      <Div_Container>
        <label>
          <Input_Styled
            type='number'
            placeholder='Loan Amount'
            step='5000'
            required
            onChange={e => setAmount(parseInt(e.target.value))}
            value={amount}
          />
        </label>
        <br />
        <label>
          <Input_Styled
            type='number'
            placeholder='Interest Rate'
            required
            onChange={e => setRate(parseInt(e.target.value))}
            value={rate}
          />
        </label>
        <br />
        <label>
          <Input_Styled
            type='number'
            placeholder='Lenght of loan'
            required
            onChange={e => setYears(parseInt(e.target.value))}
            value={years}
          />
        </label>
        <div>Your estimated monthly payment is {dataPayment} CZK</div>
      </Div_Container>
    </Div_Styled>
  )
}
const Div_Container = styled.div`
  padding: 10px;
  box-sizing: border-box;
  margin: auto;
  width: 50%;
  font-size: inherit;
  font-family: inherit;
  border: solid 2px transtarent;
  border-radius: 5px;
  box-shadow: ${theme.boxShadow};
  @media screen and ${theme.mediaMax} {
    width: 95%;
  }
`
const Input_Styled = styled.input`
  padding: 3px;
  margin: 0.5rem;
`
