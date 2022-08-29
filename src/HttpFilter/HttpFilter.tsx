import { Div_Styled } from '../HomePage'
import { filterUrl } from '../urls'
import React, { useState } from 'react'

type Data = { id: string; name: string }[]

export const HttpFilter = () => {
  const [value, setValue] = useState('')
  const [data, setData] = useState([] as Data)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    setValue(e.target.value)
    setErrorMessage('')
    try {
      const response = await fetch(filterUrl(value))
      if (!response.ok) throw Error
      setData(await response.json())
    } catch (err) {
      if (err) setErrorMessage('Server side error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Div_Styled>
      <h1>Http Filter</h1>
      <input type='text' value={value} onChange={handleChange} placeholder='Search...'></input>
      {errorMessage.length > 0 ? (
        <div>{errorMessage}</div>
      ) : loading ? (
        <div>Loading...</div>
      ) : (
        <List data={data} />
      )}
    </Div_Styled>
  )
}

const List = (props: { data: Data }) => {
  return (
    <div>
      {props.data.map(i => (
        <div key={i.id}>{i.name}</div>
      ))}
    </div>
  )
}
