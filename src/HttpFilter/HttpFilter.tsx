import { Div_Styled } from '../HomePage'
import { theme } from '../theme'
import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

type Data = { id: string; name: string }[]

export const HttpFilter = () => {
  const [value, setValue] = useState('')
  const [data, setData] = useState([] as Data)

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    const response = await fetch(`http://localhost:1234/?search=${value}`)
    setData(await response.json())
  }

  return (
    <Div_Styled>
      <h1>Http Filter</h1>
      <input type='text' value={value} onChange={handleChange} placeholder='Search...'></input>
      <Div_List data={data} />
    </Div_Styled>
  )
}

const Div_List = (props: { data: Data }) => {
  return (
    <div>
      {props.data.map(i => (
        <div key={i.id}>{i.name}</div>
      ))}
    </div>
  )
}
