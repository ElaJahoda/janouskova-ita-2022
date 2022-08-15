import { Button } from '../components/Button'
import { Div_Styled } from '../HomePage'
import { shuffleArray } from '../utils/util'
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

type CardType = {
  id?: string
  flipped?: boolean
  backImage?: string
  frontImage?: string
  frozen?: boolean
  matchingCardId?: string
}

const cards = [img1, img2, img3, img4, img5, img6, img7, img8]

const createBoard = (): CardType[] =>
  [...cards, ...cards].map((card, i) => ({
    id: `${i}`,
    flipped: false,
    backImage: questionMark,
    frontImage: card,
    frozen: true,
    matchingCardId: i < cards.length ? `${i + cards.length}` : `${i - cards.length}`,
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

const delay = (ms: number) => new Promise(resolve => setTimeout(() => resolve(undefined), ms))

export const MemoryGame = () => {
  const [cards, setCards] = useState(shuffleArray(createBoard()))
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [clickedCard, setClickedCard] = useState(
    undefined as undefined | CardType['matchingCardId']
  )
  const handleCardClick = (currentlyClickedCard: CardType) => {
    setCards(prev =>
      prev.map(card =>
        card.id === currentlyClickedCard.id ? { ...card, flipped: true, frozen: false } : card
      )
    )
    if (!clickedCard) {
      const currentlyClickedCardCopy = { ...currentlyClickedCard }
      const matchingCardIdCopy = currentlyClickedCardCopy.matchingCardId
      setClickedCard(matchingCardIdCopy)
      return
    }
    if (clickedCard === currentlyClickedCard.id) {
      setMatchedPairs(prev => prev + 1)
      setCards(prev =>
        prev.map(card =>
          card.id === clickedCard || card.id === currentlyClickedCard.id
            ? { ...card, frozen: false }
            : card
        )
      )
      setClickedCard(undefined)
      return
    }
    const flipBack = async () => {
      await delay(500)
      setCards(prev =>
        prev.map(card =>
          card.matchingCardId === clickedCard || card.id === currentlyClickedCard.id
            ? { ...card, flipped: false, frozen: true }
            : card
        )
      )
    }
    setClickedCard(undefined)
    flipBack()
  }

  const handleReset = () => {
    setCards(shuffleArray(createBoard()))
    setMatchedPairs(0)
    setClickedCard(undefined)
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

const Img_FrontImg = styled.img<CardType>`
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
