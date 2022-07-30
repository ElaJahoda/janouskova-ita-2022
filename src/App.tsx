import { NavLink, Outlet } from 'react-router-dom'
import { theme } from './Theme'
import { urls } from './urls'
import React from 'react'
import styled from '@emotion/styled'

export const App = () => {
  const active = {}
  return (
    <Div_styled>
      <h1>Eva Janouskova</h1>
      <nav
        style={{
          borderBottom: 'solid 2px',
          paddingBottom: '1rem',
          textDecoration: 'none',
        }}
      >
        <LinkStyled
          color='#40adec'
          backgroundColor='#ecd540'
          text='Home'
          pathname='/'
          border='solid 1px #ecd540'
        />
        |
        <LinkStyled
          color='#ecd540'
          backgroundColor='white'
          text='JsHistory'
          pathname='/jshistory'
        />
        |
        <LinkStyled color='#ecd540' backgroundColor='white' text='Counter' pathname='/counter' />
      </nav>
      <Outlet />
      <Footer>
        All rights reserved
        <a href='mailto: 3la.jah0da@gmail.com'> 3la.jah0da</a>
      </Footer>
    </Div_styled>
  )
}
const Footer = styled.div`
  background: ${theme.secondaryColor};
  margin: ${theme.marginZero};
  width: ${theme.widthFull};
  z-index: 1;
`
const Div_styled = styled.div`
  text-align: ${theme.textAlign};
  font-family: ${theme.fontFamily};
  font-size: ${theme.fontSize};
`

const LinkStyled = (props: {
  color: string
  text: string
  backgroundColor: string
  pathname: string
  border?: string
}) => {
  return (
    <NavLink
      style={({ isActive }) => ({
        color: isActive ? props.color : '#000',
        backgroundColor: props.backgroundColor,
        textDecoration: 'none',
        border: props.border,
        borderRadius: '5px',
        padding: '1px 6px',
      })}
      to={{ pathname: props.pathname }}
    >
      {props.text}
    </NavLink>
  )
}
