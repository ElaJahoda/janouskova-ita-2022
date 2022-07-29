import { NavLink, Outlet } from 'react-router-dom'
import React from 'react'
import styled from '@emotion/styled'

export function App() {
  const active = {}
  return (
    <Div>
      <h1>Eva Janouskova</h1>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? 'grey' : '',
              backgroundColor: '#ecd540',
              textDecoration: 'none',
              border: 'solid 1px #ecd540',
              borderRadius: '5px',
              padding: '1px 6px',
            }
          }}
          to='/'
        >
          Home
        </NavLink>{' '}
        |{' '}
        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? '#ecd540' : '',
              textDecoration: 'none',
            }
          }}
          to='/jshistory'
        >
          JsHistory
        </NavLink>{' '}
        |{' '}
        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? '#ecd540' : '',
              textDecoration: 'none',
            }
          }}
          to='/counter'
        >
          Counter
        </NavLink>
      </nav>

      <Outlet />
      <Footer>
        All rights reserved
        <a href='mailto: 3la.jah0da@gmail.com'> 3la.jah0da</a>
      </Footer>
    </Div>
  )
}
const Footer = styled.div`
  background: grey;
  margin: 0px;
  width: 100%;
  z-index: 1;
`
const Div = styled.div`
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 20px;
  text-align: center;
`
