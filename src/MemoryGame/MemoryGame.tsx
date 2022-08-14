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
import styled, { css } from 'styled-components'

type CardType = {
  id: string
  flipped: boolean
  backImage: string
  frontImage: string
  frozen: boolean
  matchingCardId: string
}

const cards: string[] = [img1, img2, img3, img4, img5, img6, img7, img8]

const createBoard = (): CardType[] =>
  [...cards, ...cards].map((card, i) => ({
    id: `${i}`,
    flipped: false,
    backImage: questionMark,
    frontImage: card,
    frozen: true,
    matchingCardId: i < cards.length ? `${i + cards.length}` : `${i - cards.length}`,
  }))

type CardProps = {
  card: CardType
  callback: (card: CardType) => void
}

const Card: React.FC<CardProps> = ({ card, callback }) => {
  const handleClick = () => {
    if (card.frozen) callback(card)
  }
  return (
    <Div_Wrapper onClick={handleClick}>
      <Img_FrontImg flipped={card.flipped} src={card.frontImage} />
      <Img_BackImg flipped={card.flipped} src={card.backImage} />
    </Div_Wrapper>
  )
}

export const MemoryGame = () => {
  const [cards, setCards] = useState<CardType[]>(shuffleArray(createBoard()))
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [clickedCard, setClickedCard] = useState<undefined | CardType>(undefined)
  const handleCardClick = (currentlyClickedCard: CardType) => {
    setCards(prev =>
      prev.map(card =>
        card.id === currentlyClickedCard.id ? { ...card, flipped: true, frozen: false } : card
      )
    )
    if (!clickedCard) {
      setClickedCard({ ...currentlyClickedCard })
      return
    }
    if (clickedCard.matchingCardId === currentlyClickedCard.id) {
      setMatchedPairs(prev => prev + 1)
      setCards(prev =>
        prev.map(card =>
          card.id === clickedCard.id || card.id === currentlyClickedCard.id
            ? { ...card, frozen: false }
            : card
        )
      )
      setClickedCard(undefined)
      return
    }
    setTimeout(() => {
      setCards(prev =>
        prev.map(card =>
          card.id === clickedCard.id || card.id === currentlyClickedCard.id
            ? { ...card, flipped: false, frozen: true }
            : card
        )
      )
    }, 1000)
    setClickedCard(undefined)
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
const Img_FrontImg = styled.img`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  transition: all 0.5s;
  backface-visibility: hidden;
  cursor: pointer;
  transform-style: preserve-3d;
  z-index: ${(props: { flipped: boolean }) => (props.flipped ? 2 : 1)};
  transform: ${(props: { flipped: boolean }) =>
    props.flipped ? 'rotate(0deg)' : 'rotateY(180deg)'};
`
const Img_BackImg = styled(Img_FrontImg)`
  z-index: ${(props: { flipped: boolean }) => (props.flipped ? 1 : 2)};
  transform: ${(props: { flipped: boolean }) =>
    props.flipped ? 'rotateY(180deg)' : 'rotate(360deg)'};
  position: absolute;
  top: 0px;
  left: 0px;
`
const Div_Won = styled.div`
  padding: 25px;
  font-size: 25px;
`
