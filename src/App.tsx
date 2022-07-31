import { NavLink, Outlet } from 'react-router-dom'
import { theme } from './theme'
import { urls } from './urls'
import React, { Children } from 'react'
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
          style={{
            color: theme.quaternaryColor,
            backgroundColor: theme.primaryColor,
          }}
          urls={urls.homePageUrl}
        >
          Home
        </LinkStyled>
        |
        <LinkStyled
          style={{
            color: theme.primaryColor,
          }}
          urls={urls.jsHistoryUrl}
        >
          JsHistory
        </LinkStyled>
        |
        <LinkStyled
          style={{
            color: theme.primaryColor,
          }}
          urls={urls.counterUrl}
        >
          Counter
        </LinkStyled>
      </nav>
      <Outlet />
      <Footer>
        All rights reserved
        <a href='mailto: 3la.jah0da@gmail.com'> 3la.jah0da</a>
      </Footer>
    </Div_styled>
  )
}

const LinkStyled = (props: {
  style: React.CSSProperties
  children: React.ReactNode
  urls: string
}) => {
  return (
    <NavLink
      style={({ isActive }) => ({
        textDecoration: 'none',
        borderRadius: '5px',
        padding: '1px 6px',
        ...props.style,
        color: isActive ? props.style.color : '#000',
      })}
      to={props.urls}
    >
      {props.children}
    </NavLink>
  )
}

const Footer = styled.div`
  background: ${theme.secondaryColor};
  margin: 0px;
  z-index: 1;
`
const Div_styled = styled.div`
  text-align: ${theme.textAlign};
  font-family: ${theme.fontFamily};
  font-size: ${theme.fontSize};
`
