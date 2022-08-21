import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
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
      (dataAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
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

type DataCalculateMortgage = ReturnType<typeof calculateMortgage>

const calculateMortgage = (amount: number, rate: number, years: number) => {
  const monthlyPayment = calculateMonthlyPayment(amount, rate, years)
  let remain = amount
  const rowsData = Array.from({ length: years * 12 }, (v, i) => (i = i + 1)).map(() => {
    const monthlyInterestPayment = (rate / 100 / 12) * remain
    const monthlyPrincipalPayment = monthlyPayment - monthlyInterestPayment
    remain -= monthlyPrincipalPayment

    return {
      monthlyInterestPayment,
      monthlyPrincipalPayment,
      remain,
    }
  })

  return {
    monthlyPayment,
    rowsData,
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
        <Charts calculatedMortgage={dataCalculateMortgage} />
        <Table calculatedMortgage={dataCalculateMortgage} />
      </Div_Container>
    </Div_Styled>
  )
}

const Table = (props: { calculatedMortgage: DataCalculateMortgage }) => {
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
        {props.calculatedMortgage.rowsData.map(
          (item: typeof props.calculatedMortgage.rowsData[number], index: number) => (
            <tr key={index}>
              <Td_Styled>{index + 1}</Td_Styled>
              <Td_Styled>{amountFormat(props.calculatedMortgage.monthlyPayment)}</Td_Styled>
              <Td_Styled>{amountFormat(item.monthlyInterestPayment)}</Td_Styled>
              <Td_Styled>{amountFormat(item.monthlyPrincipalPayment)}</Td_Styled>
              <Td_Styled>{amountFormat(item.remain)}</Td_Styled>
            </tr>
          )
        )}
      </tbody>
    </Table_Styled>
  )
}

const Charts = (props: { calculatedMortgage: DataCalculateMortgage }) => {
  const chartData = props.calculatedMortgage.rowsData.map((item, index) => {
    const xAxis = { index }
    const interestPaid = Number(
      props.calculatedMortgage.rowsData[index].monthlyInterestPayment.toFixed(2)
    )
    const principalPaid = Number(
      props.calculatedMortgage.rowsData[index].monthlyPrincipalPayment.toFixed(2)
    )
    const remain = Number(props.calculatedMortgage.rowsData[index].remain.toFixed(2))

    return {
      xAxis,
      interestPaid,
      principalPaid,
      remain,
    }
  })
  return (
    <div>
      <LineChart
        width={600}
        height={300}
        data={chartData}
        margin={{
          top: 15,
          right: 30,
          left: 10,
          bottom: 15,
        }}
      >
        <CartesianGrid stroke='#eee' strokeDasharray='3 3' />
        <XAxis dataKey='xAxis' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type='monotone'
          dataKey='remain'
          stroke={theme.quaternaryColor}
          activeDot={{ r: 8 }}
        />
      </LineChart>
      <LineChart
        width={600}
        height={300}
        data={chartData}
        margin={{
          top: 15,
          right: 30,
          left: 10,
          bottom: 15,
        }}
      >
        <CartesianGrid stroke='#eee' strokeDasharray='3 3' />
        <XAxis dataKey='xAxis' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type='monotone'
          dataKey='interestPaid'
          stroke={theme.primaryColor}
          strokeWidth={1}
          activeDot={{ r: 8 }}
        />
        <Line
          type='monotone'
          dataKey='principalPaid'
          stroke={theme.quaternaryColor}
          strokeWidth={1}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
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
