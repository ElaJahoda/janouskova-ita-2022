import { NavLink, Outlet } from 'react-router-dom'
import React from 'react'

export default function App() {
  const active = {}
  return (
    <div className='App'>
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
              color: isActive ? 'red' : '',
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
              color: isActive ? 'red' : '',
            }
          }}
          to='/jshistory'
        >
          JsHistory
        </NavLink>{' '}
        |{' '}
      </nav>
      <Outlet />
    </div>
  )
}
