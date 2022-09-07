import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { theme } from './theme'
import { urls } from './utils/urls'
import React, { MouseEventHandler, useState } from 'react'
import logo from './images/logo.jpg'
import styled from '@emotion/styled'

export const App = () => {
  const [toggle, setToggle] = useState(false)
  const handleToggle = () => {
    setToggle(!toggle)
  }
  return (
    <Div_styled>
      <Img_styled src={logo} width='73px'></Img_styled>
      <Div_Nav>
        <Bars onClick={handleToggle}>{toggle ? <FaChevronUp /> : <FaChevronDown />}</Bars>
        <NavMenu prop={toggle}>
          <LinkStyledHover to={urls.homePage} onClick={handleToggle}>
            Home
          </LinkStyledHover>
          <LinkStyledHover to={urls.projectsPage} onClick={handleToggle}>
            Projects
          </LinkStyledHover>
          <LinkStyledHover to={urls.cvPage} onClick={handleToggle}>
            CV
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
    top: 84px;
    left: 0px;
    padding: 1.5rem;
    flex-direction: column;
    width: 100%;
    background-color: ${theme.opacityQuaternaryColor};
    box-shadow: ${theme.boxShadow};
    z-index: 5;
  }
`
const Div_Nav = styled.div`
  background-color: ${theme.opacityQuaternaryColor};
  padding-bottom: 1rem;
  text-decoration: none;
  height: 85px;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  align-items: center;
  padding-right: 15px;
  z-index: 14;
`
const Img_styled = styled.img`
  position: absolute;
  padding-left: 10px;
  margin: 7px;
  display: flex;
  justify-content: flex-start;
`
const Bars = styled.div`
  display: none;
  color: ${theme.backgroundColor};
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
  onClick: MouseEventHandler<HTMLAnchorElement>
  className?: string
}) => {
  return (
    <NavLink
      className={props.className}
      style={({ isActive }) => ({
        textDecoration: 'none',
        display: 'flex',
        fontSize: '1.5rem',
        alignItems: 'center',
        marginLeft: '0.5rem',
        marginRight: '0.5rem',
        padding: '3px 20px 6px 20px',
        border: 'solid 3px transparent',
        borderColor: isActive ? theme.backgroundColor : 'transparent',
        borderRadius: '5px',
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
    color: ${theme.quaternaryColor};
  }
  :visited {
    color: ${theme.quaternaryColor};
  }
  :hover {
    color: ${theme.basicColor};
  }
  :visit {
    color: ${theme.quaternaryColor};
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
