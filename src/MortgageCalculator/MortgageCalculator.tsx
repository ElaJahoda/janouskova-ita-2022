import 'c3/c3.css'
import { Button } from '../components/Button'
import { Div_Styled } from '../HomePage'
import { Helmet } from 'react-helmet'
import { theme } from '../theme'
import LoanJS from 'loanjs'
import React, { useState } from 'react'
import styled from '@emotion/styled'

export const MortgageCalculator = () => {
  const [amount, setAmount] = useState(300000)
  const [rate, setRate] = useState(3.5)
  const [years, setYears] = useState(30)
  const [installments, setInstallments] = useState([])

  const calculate = (amount: number, years: number, rate: number) => {
    var loan = new LoanJS.Loan(amount, years * 12, rate)
    setInstallments(loan.installments)
  }

  const amountFormat = (amount: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
    }).format(amount)
  }

  return (
    <Div_Styled>
      <Helmet>
        <title>Eva Janouskova - Mortgage Calculator</title>
      </Helmet>
      <h1>Mortgage Calculator</h1>
      <form
        onSubmit={e => {
          e.preventDefault()
          calculate(amount, years, rate)
        }}
      >
        <Div_Container>
          <Div_Form_Item>
            <label>Loan Amount</label>
            <Input_Styled
              type='number'
              placeholder='0'
              step='5000'
              required
              onChange={e => setAmount(parseInt(e.target.value))}
              value={amount}
            />
          </Div_Form_Item>
          <Div_Form_Item>
            <label>Interest Rate (%)</label>
            <Input_Styled
              type='number'
              placeholder='0'
              required
              onChange={e => setRate(parseInt(e.target.value))}
              value={rate}
            />
          </Div_Form_Item>
          <Div_Form_Item>
            <label>Lenght of loan (Years)</label>
            <Input_Styled
              type='number'
              placeholder='0'
              required
              onChange={e => setYears(parseInt(e.target.value))}
              value={years}
            />
          </Div_Form_Item>
          <Div_Form_Action>
            <Button_Styled type='submit'>Calculate</Button_Styled>
          </Div_Form_Action>
          {!!installments?.length && (
            <Table installments={installments} amountFormat={amountFormat} />
          )}
        </Div_Container>
      </form>
    </Div_Styled>
  )
}

const Table = (props: { installments: never[]; amountFormat: (amount: number) => string }) => {
  return (
    <Table_Styled>
      <thead>
        <tr>
          <Th_Styled>Month</Th_Styled>
          <Th_Styled>Payment Amount</Th_Styled>
          <Th_Styled>Interest Paid</Th_Styled>
          <Th_Styled>Principal Paid</Th_Styled>
          <Th_Styled>Remain</Th_Styled>
        </tr>
      </thead>
      <tbody>
        {props.installments.map((item: any, index: number) => (
          <tr key={index}>
            <Td_Styled>{index + 1}</Td_Styled>
            <Td_Styled>{props.amountFormat(item.installment)}</Td_Styled>
            <Td_Styled>{props.amountFormat(item.interest)}</Td_Styled>
            <Td_Styled>{props.amountFormat(item.capital)}</Td_Styled>
            <Td_Styled>{props.amountFormat(item.remain)}</Td_Styled>
          </tr>
        ))}
      </tbody>
    </Table_Styled>
  )
}

const Div_Form_Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid gray;
  padding: 2px;
`
const Div_Form_Action = styled.div`
  text-align: center;
  font-weight: 600;
`
const Button_Styled = styled(Button)`
  width: 200px;
`
const Table_Styled = styled.table`
  text-align: center;
  display: block;
  width: 100%;
  height: 60vh;
  overflow: auto;
  margin: 0.5rem auto;
  position: relative;
  border-collapse: collapse;
`
const Th_Styled = styled.th`
  padding: 5px 12.5px;
  position: sticky;
  background-color: white;
  top: 0px;
  font-weight: normal;
`

const Td_Styled = styled.td`
  border-bottom: 1px solid ${theme.primaryColor};
  padding: 5px;
`
const Div_Container = styled.div`
  padding: 10px;
  box-sizing: border-box;
  margin: auto;
  width: 600px;
  font-size: inherit;
  font-family: inherit;
  text-align: left;

  @media screen and ${theme.mediaMax} {
    width: 95%;
  }
`
const Input_Styled = styled.input`
  padding: 3px;
  margin: 10px 0px;
  width: 200px;
`
