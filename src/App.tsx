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
          <LinkStyledHover primary='primary' to={urls.homePage} onClick={handleToggle}>
            Home
          </LinkStyledHover>
          <LinkStyledHover to={urls.jsHistory} onClick={handleToggle}>
            JsHistory
          </LinkStyledHover>
          <LinkStyledHover to={urls.counter} onClick={handleToggle}>
            Counter
          </LinkStyledHover>
          <LinkStyledHover to={urls.toDo} onClick={handleToggle}>
            ToDo
          </LinkStyledHover>
          <LinkStyledHover to={urls.hackertyper} onClick={handleToggle}>
            HackerTyper
          </LinkStyledHover>
          <LinkStyledHover to={urls.mortgageCalculator} onClick={handleToggle}>
            MortgageCalculator
          </LinkStyledHover>
          <LinkStyledHover to={urls.memoryGame} onClick={handleToggle}>
            MemoryGame
          </LinkStyledHover>
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
    top: 65px;
    left: 0px;
    padding: 1.5rem;
    flex-direction: column;
    width: 100%;
    background-color: white;
    border-top: 1px solid black;
    box-shadow: ${theme.boxShadow};
    z-index: 5;
  }
`
const Div_Nav = styled.div`
  padding-bottom: 1rem;
  text-decoration: none;
  height: 85px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
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
  style?: React.CSSProperties
  children: React.ReactNode
  to: string
  primary?: string
  onClick: MouseEventHandler<HTMLAnchorElement>
  className?: string
}) => {
  return (
    <NavLink
      className={props.className}
      style={({ isActive }) => ({
        textDecoration: 'none',
        borderRadius: '5px',
        display: 'flex',
        fontSize: '1.5rem',
        alignItems: 'center',
        marginLeft: '1rem',
        marginRight: '1rem',
        padding: '1px 6px',
        border: 'solid 2px transparent',
        backgroundColor: props.primary ? theme.primaryColor : 'transparent',
        borderColor: isActive ? theme.primaryColor : 'transparent',
      })}
      to={props.to}
      onClick={props.onClick}
    >
      {props.children}
    </NavLink>
  )
}

const LinkStyledHover = styled(LinkStyled)`
  :link {
    color: ${theme.secondaryColor};
  }
  :visited {
    color: ${theme.secondaryColor};
  }
  :hover {
    color: ${theme.basicColor};
  }
  :visit {
    color: ${theme.secondaryColor};
  }
  :active {
    color: ${theme.quaternaryColor};
  }
`

const Div_styled = styled.div`
  text-align: ${theme.textAlign};
  font-family: ${theme.fontFamily};
  font-size: ${theme.fontSize};
`
