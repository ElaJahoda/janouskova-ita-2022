import { Div_Styled } from './HomePage'
import { Helmet } from 'react-helmet'
import { theme } from './theme'
import React from 'react'

export const CvPage = () => {
  return (
    <Div_Styled>
      <Helmet>
        <title>Eva Janouskova - CV</title>
        <meta name='description' content='Home page of React portfolio' />
      </Helmet>
      <h1>CV</h1>
    </Div_Styled>
  )
}
