import { Div_Styled } from '../HomePage'
import { Helmet } from 'react-helmet'
import { theme } from '../theme'
import React, { useState } from 'react'
import styled from '@emotion/styled'

const calculateMonthlyPayment = (amount: number, rate: number, years: number) => {
  const dataAmount = amount ? amount : 0
  const monthlyRate = rate ? rate / 100 / 12 : 0
  const months = years ? years * 12 : 0
  if (amount && rate && years) {
    return (
      Math.round(
        ((dataAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1)) *
          100
      ) / 100
    )
  } else {
    return 0
  }
}

const amountFormat = (item: number) => {
  return new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
  }).format(item)
}

const calculateMortgage = (amount: number, rate: number, years: number) => {
  const monthlyPayment = calculateMonthlyPayment(amount, rate, years)
  let remain = amount
  let rowData: {
    monthlyInterestPayment: string
    monthlyPrincipalPayment: string
    remain: string
  }[] = []
  Array.from({ length: years * 12 }, (v, i) => i++).map(() => {
    const monthlyInterestPayment = (rate / 100 / 12) * remain
    const monthlyPrincipalPayment = monthlyPayment - monthlyInterestPayment
    remain -= monthlyPrincipalPayment

    const row = {
      monthlyInterestPayment: amountFormat(monthlyInterestPayment),
      monthlyPrincipalPayment: amountFormat(monthlyPrincipalPayment),
      remain: amountFormat(remain),
    }
    rowData = [...rowData, row]
  })

  return {
    monthlyPayment: amountFormat(monthlyPayment),
    rowData: rowData,
  }
}

export const MortgageCalculator = () => {
  const [amount, setAmount] = useState(30_0000)
  const [rate, setRate] = useState(3.5)
  const [years, setYears] = useState(30)

  const dataCalculateMortgage = calculateMortgage(amount, rate, years)
  return (
    <Div_Styled>
      <Helmet>
        <title>Eva Janouskova - Mortgage Calculator</title>
      </Helmet>
      <h1>Mortgage Calculator</h1>
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
        <Table calculatedMortgage={dataCalculateMortgage} />
      </Div_Container>
    </Div_Styled>
  )
}

const Table = (props: {
  calculatedMortgage: {
    monthlyPayment: string
    rowData: {
      monthlyInterestPayment: string
      monthlyPrincipalPayment: string
      remain: string
    }[]
  }
}) => {
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
        {props.calculatedMortgage.rowData.map(
          (item: typeof props.calculatedMortgage.rowData[number], index: number) => (
            <tr key={index}>
              <Td_Styled>{index + 1}</Td_Styled>
              <Td_Styled>{props.calculatedMortgage.monthlyPayment}</Td_Styled>
              <Td_Styled>{item.monthlyInterestPayment}</Td_Styled>
              <Td_Styled>{item.monthlyPrincipalPayment}</Td_Styled>
              <Td_Styled>{item.remain}</Td_Styled>
            </tr>
          )
        )}
      </tbody>
    </Table_Styled>
  )
}

const Div_Form_Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${theme.secondaryColor};
  padding: 2px;
`
const Table_Styled = styled.table`
  border: solid 1px ${theme.secondaryColor};
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
  background-color: ${theme.backgroundColor};
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
