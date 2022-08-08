import { Div_Styled } from '../HomePage'
import { codeSample } from './codeSample'
import { theme } from '../theme'
import { themeHackerTyper } from './theme'
import { useEffect, useState } from 'react'
import React from 'react'
import styled from '@emotion/styled'

export const HackerTyper = () => {
  const [positionNumber, setPositionNumber] = useState(0)
  const [popup, setPopup] = useState(false)

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePopup()
    }
  }
  const handlePopup = () => {
    setPopup(true)
    setTimeout(() => {
      setPopup(false)
    }, 1500)
  }

  return (
    <Div_Styled>
      <h1>Hacker typer</h1>
      <form>
        <Textarea_Container
          onKeyPress={handleKeyPress}
          value={
            positionNumber === 0
              ? 'Click and start... then press Enter!'
              : codeSample.slice(0, positionNumber)
          }
          onChange={() =>
            setPositionNumber(positionNumber > codeSample.length ? 0 : positionNumber + 4)
          }
          spellCheck={false}
        />
        <PopUp unhacked={popup}></PopUp>
      </form>
    </Div_Styled>
  )
}

const PopUp = (props: { unhacked: boolean }) => {
  return props.unhacked ? (
    <Div_StyledPopUpBackdrop>
      <Div_StyledPopUp>Access denied!</Div_StyledPopUp>
    </Div_StyledPopUpBackdrop>
  ) : (
    <div></div>
  )
}

const Textarea_Container = styled.textarea`
  box-sizing: border-box;
  width: 80%;
  height: 60vh;
  textalign: left;
  margin: auto;
  background: ${themeHackerTyper.tertiaryColor};
  resize: none;
  color: ${themeHackerTyper.quarterlyColor};
  box-shadow: ${theme.boxShadow};
  over-flow: scroll;
`
const Div_StyledPopUpBackdrop = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${themeHackerTyper.secondaryColor};
  left: 0;
  top: 0;
`
const Div_StyledPopUp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  height: 10rem;
  width: 30rem;
  font-size: 35px;
  font-weight: bold;
  background: ${themeHackerTyper.primaryColor};
  box-shadow: ${themeHackerTyper.boxShadow};
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`
