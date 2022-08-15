import { Button } from '../components/Button'
import { Div_Styled } from '../HomePage'
import { delay, shuffleArray, uniqueId } from '../utils/util'
import Helmet from 'react-helmet'
import React, { useState } from 'react'
import img1 from './pictures/img1.png'
import img2 from './pictures/img2.png'
import img3 from './pictures/img3.png'
import img4 from './pictures/img4.png'
import img5 from './pictures/img5.png'
import img6 from './pictures/img6.png'
import img7 from './pictures/img7.png'
import img8 from './pictures/img8.png'
import questionMark from './pictures/question-mark.png'
import styled from '@emotion/styled'

type CardType = ReturnType<typeof createBoard>[number]

const cards = [img1, img2, img3, img4, img5, img6, img7, img8]

const createBoard = () =>
  [...cards, ...cards].map(card => ({
    id: uniqueId(),
    flipped: false,
    backImage: questionMark,
    frontImage: card,
    frozen: true,
  }))

const Card = (props: { card: CardType; callback: (card: CardType) => void }) => {
  const handleClick = () => {
    if (props.card.frozen) props.callback(props.card)
  }
  return (
    <Div_Wrapper onClick={handleClick}>
      <Img_FrontImg flipped={props.card.flipped} src={props.card.frontImage} />
      <Img_BackImg flipped={props.card.flipped} src={props.card.backImage} />
    </Div_Wrapper>
  )
}

export const MemoryGame = () => {
  const [cards, setCards] = useState(shuffleArray(createBoard()))
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [clickedCardImg, setClickedCardImg] = useState(
    undefined as undefined | CardType['frontImage']
  )

  const handleCardClick = async (currentlyClickedCard: CardType) => {
    setCards(prev =>
      prev.map(card =>
        card.id === currentlyClickedCard.id ? { ...card, flipped: true, frozen: false } : card
      )
    )
    if (!clickedCardImg) {
      const currentlyClickedCardCopy = { ...currentlyClickedCard }
      const imgCopy = currentlyClickedCardCopy.frontImage
      setClickedCardImg(imgCopy)
      return
    }
    if (clickedCardImg === currentlyClickedCard.frontImage) {
      setMatchedPairs(prev => prev + 1)
      setCards(prev =>
        prev.map(card =>
          card.frontImage === clickedCardImg || card.frontImage === currentlyClickedCard.frontImage
            ? { ...card, frozen: false }
            : card
        )
      )
      setClickedCardImg(undefined)
      return
    }
    await delay(500)
    setCards(prev =>
      prev.map(card =>
        card.frontImage === clickedCardImg || card.id === currentlyClickedCard.id
          ? { ...card, flipped: false, frozen: true }
          : card
      )
    )
    setClickedCardImg(undefined)
  }

  const handleReset = () => {
    setCards(shuffleArray(createBoard()))
    setMatchedPairs(0)
    setClickedCardImg(undefined)
  }

  return (
    <Div_Styled>
      <Helmet>
        <title>Eva Janouskova - JS History</title>
      </Helmet>
      <h1>Memory Game</h1>
      <Div_Grid>
        {cards.map(card => (
          <Card key={card.id} card={card} callback={handleCardClick} />
        ))}
      </Div_Grid>
      <Div_Won>{matchedPairs === cards.length / 2 ? 'Congratulation! You won!' : ''}</Div_Won>
      <Button onClick={() => handleReset()}>Reset Game</Button>
    </Div_Styled>
  )
}

const Div_Grid = styled.div`
  width: 450px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 0.5rem;
  margin: auto;
`
const Div_Wrapper = styled.div`
  position: relative;
  perspective: 1000px;
`

const Img_FrontImg = styled.img<{ flipped: boolean }>`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  transition: all 0.5s;
  backface-visibility: hidden;
  cursor: pointer;
  transform-style: preserve-3d;
  z-index: ${props => (props.flipped ? 2 : 1)};
  transform: ${props => (props.flipped ? 'rotate(0deg)' : 'rotateY(180deg)')};
`
const Img_BackImg = styled(Img_FrontImg)`
  z-index: ${props => (props.flipped ? 1 : 2)};
  transform: ${props => (props.flipped ? 'rotateY(180deg)' : 'rotate(360deg)')};
  position: absolute;
  top: 0px;
  left: 0px;
`
const Div_Won = styled.div`
  padding: 25px;
  font-size: 25px;
`
