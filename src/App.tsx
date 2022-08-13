import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { theme } from './theme'
import { urls } from './urls'
import React, { MouseEventHandler, useState } from 'react'
import styled from '@emotion/styled'

export const App = () => {
  const [toggle, setToggle] = useState(false)

  const handleToggle = () => {
    setToggle(!toggle)
  }
  return (
    <Div_styled>
      <Div_Nav>
        <Bars onClick={handleToggle}>{toggle ? <FaChevronUp /> : <FaChevronDown />}</Bars>
        <NavMenu prop={toggle}>
          <LinkStyled
            style={{
              color: theme.quaternaryColor,
              backgroundColor: theme.primaryColor,
              borderColor: theme.quaternaryColor,
            }}
            urls={urls.homePageUrl}
            onClick={handleToggle}
          >
            Home
          </LinkStyled>
          <LinkStyled
            style={{
              borderColor: theme.primaryColor,
            }}
            urls={urls.jsHistoryUrl}
            onClick={handleToggle}
          >
            JsHistory
          </LinkStyled>
          <LinkStyled
            style={{
              borderColor: theme.primaryColor,
            }}
            urls={urls.counterUrl}
            onClick={handleToggle}
          >
            Counter
          </LinkStyled>
          <LinkStyled
            style={{
              borderColor: theme.primaryColor,
            }}
            urls={urls.toDoUrl}
            onClick={handleToggle}
          >
            ToDo
          </LinkStyled>
          <LinkStyled
            style={{
              borderColor: theme.primaryColor,
            }}
            urls={urls.hackertyper}
            onClick={handleToggle}
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

  a {
    text-decoration: none;
    color: grey;
    &:hover {
      color: black;
    }
  }

  @media screen and ${theme.mediaMax} {
    display: ${props => (props.prop ? 'block' : 'none')};
    position: absolute;
    top: 65px;
    left: 0px;
    padding: 1.5rem;
    flex-direction: column;
    width: 100%;
    background-color: white;
    border-top: 1px solid black;
    box-shadow: ${theme.boxShadow};
  }
`
const Div_Nav = styled.div`
  border-bottom: solid 2px ${theme.primaryColor};
  padding-bottom: 1rem;
  text-decoration: none;
  height: 85px;
  display: flex;
  justify-content: space-around;
  align-items: center;
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
  onClick: MouseEventHandler<HTMLAnchorElement>
}) => {
  return (
    <NavLink
      style={({ isActive }) => ({
        textDecoration: 'none',
        borderRadius: '5px',
        display: 'flex',
        fontSize: '1.5rem',
        alignItems: 'center',
        marginLeft: '1rem',
        marginRight: '1rem',
        padding: '1px 6px',
        border: 'solid 1px transparent',
        ...props.style,
        borderColor: isActive ? props.style.borderColor : 'transparent',
      })}
      to={props.urls}
      onClick={props.onClick}
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
