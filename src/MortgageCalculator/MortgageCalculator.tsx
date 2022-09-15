import { A_Styled, Div_Styled } from '../HomePage'
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
import { Helmet } from 'react-helmet'
import { css } from '@emotion/css'
import { theme } from '../theme'
import React, { MouseEventHandler, useState } from 'react'
import styled from '@emotion/styled'

const calculateMonthlyPayment = (amount: number, rate: number, years: number) => {
  const dataAmount = amount
  const monthlyRate = rate / 100 / 12
  const months = years * 12

  return (
    (dataAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1)
  )
}

const amountFormat = (item: number) => {
  return new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
  }).format(item)
}

const formatDecimals = (item: number) => {
  return Number(item.toFixed(2))
}

const getLinearMonthInflation = (yearInflation: number) => {
  return Math.pow(1 + -yearInflation / 100, 1 / 12) - 1
}

type DataCalculateMortgage = ReturnType<typeof calculateMortgage>

const calculateMortgage = (arg: {
  amount: number
  rate: number
  years: number
  inflation: number
}) => {
  const monthlyPayment = calculateMonthlyPayment(arg.amount, arg.rate, arg.years)
  const monthInflation = getLinearMonthInflation(arg.inflation)
  let remain = arg.amount
  let inflationCoefficient = 1

  const rowsData = Array.from({ length: arg.years * 12 }, (v, i) => i + 1).map(i => {
    const year = Math.floor((i - 1) / 12) + 1
    const month = ((i - 1) % 12) + 1
    const monthlyInterestPayment = (arg.rate / 100 / 12) * remain
    const monthlyPrincipalPayment = monthlyPayment - monthlyInterestPayment
    remain -= monthlyPrincipalPayment

    const inflationInterestPaid = monthlyInterestPayment * inflationCoefficient
    const inflationPrincipalPaid = monthlyPrincipalPayment * inflationCoefficient
    const inflationRemain = remain * inflationCoefficient

    inflationCoefficient = inflationCoefficient * (1 + monthInflation)

    return {
      year,
      month,
      monthlyInterestPayment,
      monthlyPrincipalPayment,
      remain,
      inflationInterestPaid,
      inflationPrincipalPaid,
      inflationRemain,
    }
  })

  return {
    monthlyPayment,
    rowsData,
  }
}
type DataCalculatePropertyValue = ReturnType<typeof calculatePropertyValue>

const calculatePropertyValue = (arg: { amount: number; inflation: number; years: number }) => {
  let value = arg.amount
  const propertyValue = Array.from({ length: arg.years }, (v, i) => i + 1).map(i => {
    const amountInflation = (value / 100) * arg.inflation
    return (value += amountInflation)
  })
  return propertyValue
}

export const MortgageCalculator = () => {
  const [amount, setAmount] = useState(1_000_000)
  const [rate, setRate] = useState(5)
  const [years, setYears] = useState(30)
  const [inflation, setInflation] = useState(3)

  const dataCalculateMortgage = calculateMortgage({ amount, rate, years, inflation })
  const dataCalculatePropertyValue = calculatePropertyValue({ amount, inflation, years })
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
            onChange={e => setAmount(parseFloat(e.target.value))}
            value={amount || 0}
          />
        </Div_Form_Item>
        <Div_Form_Item>
          <label>Interest Rate (%)</label>
          <Input_Styled
            type='number'
            placeholder='0'
            step='.1'
            required
            onChange={e => setRate(parseFloat(e.target.value))}
            value={rate || 0}
          />
        </Div_Form_Item>
        <Div_Form_Item>
          <label>Lenght of loan (Years)</label>
          <Input_Styled
            type='number'
            placeholder='0'
            required
            onChange={e => setYears(parseFloat(e.target.value))}
            value={years || 0}
          />
        </Div_Form_Item>
        <Div_Form_Item>
          <label>Inflation (%)</label>
          <Input_Styled
            type='number'
            placeholder='0'
            step='.1'
            required
            onChange={e => setInflation(parseFloat(e.target.value))}
            value={inflation || 0}
          />
        </Div_Form_Item>
        <Charts calculatedMortgage={dataCalculateMortgage} />
        <blockquote>
          How Does Inflation Affect Property Value? In terms of the housing market, inflation causes
          house prices to increase over and above where the average might sit due to simple supply
          and demand. This often leads to many potential buyers being priced out of buying a
          property...
          <A_Styled href='https://www.housebuyerbureau.co.uk/blog/how-does-inflation-affect-property-prices/'>
            - Source -
          </A_Styled>
        </blockquote>
        <ChartPropertuValue calculatedPropertyValue={dataCalculatePropertyValue} />
        <Table calculatedMortgage={dataCalculateMortgage} />
      </Div_Container>
    </Div_Styled>
  )
}

const Table = (props: { calculatedMortgage: DataCalculateMortgage }) => {
  const [visibleYear, setVisibleYear] = useState(1)
  return (
    <Table_Styled>
      <thead>
        <tr>
          <Th_Styled>Month/Year</Th_Styled>
          <Th_Styled>Payment Amount</Th_Styled>
          <Th_Styled>Interest Paid</Th_Styled>
          <Th_Styled>Principal Paid</Th_Styled>
          <Th_Styled>Remain</Th_Styled>
          <Th_Styled>Inf. Interest Paid</Th_Styled>
          <Th_Styled>Inf. Principal Paid</Th_Styled>
          <Th_Styled>Inf. Remain</Th_Styled>
        </tr>
      </thead>
      <tbody>
        {props.calculatedMortgage.rowsData.map((item, index) => (
          <Tr_Styled
            key={index}
            visibility={item.month === 1 || visibleYear === item.year}
            month={item.month}
            year={item.year}
            onClick={() => {
              setVisibleYear(item.year)
            }}
            visibleYear={visibleYear}
          >
            <Td_Styled>{`${item.month}/${item.year}`}</Td_Styled>
            <Td_Styled>{amountFormat(props.calculatedMortgage.monthlyPayment)}</Td_Styled>
            <Td_Styled>{amountFormat(item.monthlyInterestPayment)}</Td_Styled>
            <Td_Styled>{amountFormat(item.monthlyPrincipalPayment)}</Td_Styled>
            <Td_Styled>{amountFormat(item.remain)}</Td_Styled>
            <Td_Styled>{amountFormat(item.inflationInterestPaid)}</Td_Styled>
            <Td_Styled>{amountFormat(item.inflationPrincipalPaid)}</Td_Styled>
            <Td_Styled>{amountFormat(item.inflationRemain)}</Td_Styled>
          </Tr_Styled>
        ))}
      </tbody>
    </Table_Styled>
  )
}

const Charts = (props: { calculatedMortgage: DataCalculateMortgage }) => {
  const chartData = props.calculatedMortgage.rowsData.map((item, index) => ({
    xAxis: `${index + 1}`,
    'Interest Paid': formatDecimals(item.monthlyInterestPayment),
    'Principal Paid': formatDecimals(item.monthlyPrincipalPayment),
    Remain: formatDecimals(item.remain),
    'Inflation Interest Paid': formatDecimals(item.inflationInterestPaid),
    'Inflation Principal Paid': formatDecimals(item.inflationPrincipalPaid),
    'Inflation Remain': formatDecimals(item.inflationRemain),
  }))

  return (
    <div style={{ height: '600px' }}>
      <ResponsiveContainer width='100%' height='50%'>
        <LineChart
          width={390}
          height={300}
          data={chartData}
          margin={{
            top: 15,
            right: 30,
            left: 30,
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
            dataKey='Remain'
            stroke={theme.quaternaryColor}
            activeDot={{ r: 8 }}
          />
          <Line
            type='monotone'
            dataKey='Inflation Remain'
            stroke={theme.darkQuaternaryColor}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width='100%' height='50%'>
        <LineChart
          width={390}
          height={300}
          data={chartData}
          margin={{
            top: 15,
            right: 30,
            left: 30,
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
            dataKey='Interest Paid'
            stroke={theme.quaternaryColor}
            strokeWidth={1}
            activeDot={{ r: 8 }}
          />
          <Line
            type='monotone'
            dataKey='Principal Paid'
            stroke={theme.primaryColor}
            strokeWidth={1}
            activeDot={{ r: 8 }}
          />
          <Line
            type='monotone'
            dataKey='Inflation Interest Paid'
            stroke={theme.darkQuaternaryColor}
            strokeWidth={1}
            activeDot={{ r: 8 }}
          />
          <Line
            type='monotone'
            dataKey='Inflation Principal Paid'
            stroke={theme.darkPrimaryColor}
            strokeWidth={1}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

const ChartPropertuValue = (props: { calculatedPropertyValue: DataCalculatePropertyValue }) => {
  const chartData = props.calculatedPropertyValue.map((item, index) => ({
    xAxis: `${index + 1}`,
    'Appreciation per Year': formatDecimals(item),
  }))
  return (
    <div style={{ height: '300px' }}>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart
          width={690}
          height={300}
          data={chartData}
          margin={{
            top: 15,
            right: 30,
            left: 30,
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
            dataKey='Appreciation per Year'
            stroke={theme.quaternaryColor}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

const Div_Grid = styled.div`
  display: flex;
  flex-flow: row wrap;
  @media screen and ${theme.mediaSMax} {
    flex-flow: column wrap;
  }
`

export const Div_Form_Item = styled.div`
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
export const Div_Container = styled.div`
  padding: 10px;
  box-sizing: border-box;
  margin: auto;
  max-width: 800px;
  font-size: inherit;
  font-family: inherit;
  text-align: left;

  @media screen and ${theme.mediaSMax} {
    width: 95%;
  }
`
export const Input_Styled = styled.input`
  padding: 3px;
  margin: 10px 0px;
  width: 200px;
  :focus {
    outline-color: ${theme.primaryColor};
  }
`
const Tr_Styled = (props: {
  visibility: boolean
  month: number
  year: number
  visibleYear: number
  children: React.ReactNode
  onClick: MouseEventHandler<HTMLTableRowElement>
}) => {
  return (
    <tr
      onClick={props.onClick}
      style={{
        cursor: 'pointer',
        backgroundColor:
          props.month === 1
            ? props.visibleYear === props.year
              ? theme.opacityQuaternaryColor
              : theme.opacityLightQuaternaryColor
            : 'transparent',
        display: props.visibility ? '' : 'none',
      }}
    >
      {props.children}
    </tr>
  )
}
