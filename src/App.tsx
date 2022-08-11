import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'
import { theme } from './theme'
import { urls } from './urls'
import React, { useState } from 'react'
import styled from '@emotion/styled'

export const App = () => {
  const [toggle, setToggle] = useState(false)

  const handleToggle = () => {
    setToggle(!toggle)
  }
  return (
    <Div_styled>
      <Div_Nav>
        <NavLogo to='/'>Eva Janouskova</NavLogo>
        <Bars onClick={handleToggle}>{toggle ? <FaChevronUp /> : <FaChevronDown />}</Bars>
        <NavMenu prop={toggle}>
          <LinkStyled
            style={{
              color: theme.quaternaryColor,
              backgroundColor: theme.primaryColor,
            }}
            urls={urls.homePageUrl}
          >
            Home
          </LinkStyled>
          <LinkStyled
            style={{
              color: theme.primaryColor,
            }}
            urls={urls.jsHistoryUrl}
          >
            JsHistory
          </LinkStyled>
          <LinkStyled
            style={{
              color: theme.primaryColor,
            }}
            urls={urls.counterUrl}
          >
            Counter
          </LinkStyled>
          <LinkStyled
            style={{
              color: theme.primaryColor,
            }}
            urls={urls.toDoUrl}
          >
            ToDo
          </LinkStyled>
          <LinkStyled
            style={{
              color: theme.primaryColor,
            }}
            urls={urls.hackertyper}
          >
            HackerTyper
          </LinkStyled>
        </NavMenu>
      </Div_Nav>
    </Div_styled>
  )
}

type Prop = {
  prop: boolean
}
const NavMenu = styled.div<Prop>`
  box-sizing: border-box;
  display: flex;
  align-items: center;

  @media screen and ${theme.mediaMax} {
    display: ${props => (props.prop ? 'block' : 'none')};
    position: absolute;
    top: 90px;
    left: 0px;
    padding: 1.5rem;
    flex-direction: column;
    width: 100%;
    background-color: white;
    border-top: 1px solid black;
  }
`
const NavLogo = styled(Link)`
  cursor: pointer;
  color: black;
  font-size: 2rem;
  text-decoration: none;
`
const Div_Nav = styled.div`
  border-bottom: solid 2px;
  padding-bottom: 1rem;
  text-decoration: none;
  height: 85px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem calc((100vw - 1000px) / 2);
  z-index: 14;
`
const Bars = styled.div`
  display: none;
  color: black;
  @media screen and ${theme.mediaMax} {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`
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
        display: 'flex',
        alignItems: 'center',
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

const Div_styled = styled.div`
  text-align: ${theme.textAlign};
  font-family: ${theme.fontFamily};
  font-size: ${theme.fontSize};
`
