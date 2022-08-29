import { BlogUpdateContext } from './UpdateArticleContext'
import { Button } from '../../components/Button'
import {
  Div_Container,
  Div_Form_Item,
  Input_Styled,
} from '../../MortgageCalculator/MortgageCalculator'
import { Div_Styled } from '../../HomePage'
import { css } from '@emotion/css'
import { urls } from '../../urls'
import { useNavigate } from 'react-router-dom'
import React, { useContext, useState } from 'react'

export const UpdateArticle = () => {
  const logic = useContext(BlogUpdateContext)
  const navigate = useNavigate()

  return (
    <Div_Styled>
      <h1>Update article</h1>
      <form
        onSubmit={async e => {
          e.preventDefault()
          if ((await logic.validation(logic.title, logic.content)) === false) return
          logic.updateArticle(logic.title, logic.content)
          navigate(urls.blogPost)
        }}
      >
        {logic.error.length > 0 ? (
          <div>{logic.error}</div>
        ) : logic.loading ? (
          <p>...Loading</p>
        ) : (
          <Div_Container>
            <Div_Form_Item>
              <label>Title input:</label>
              <Input_Styled
                value={logic.title}
                type='text'
                placeholder='Title...'
                onChange={e => {
                  logic.setTitle(e.target.value)
                }}
              />
            </Div_Form_Item>
            <Div_Form_Item>
              <label>Content input:</label>
              <textarea
                value={logic.content}
                className={styles.textarea}
                placeholder='Text content...'
                onChange={e => {
                  logic.setContent(e.target.value)
                }}
              />
            </Div_Form_Item>
            <div className={styles.itemAlign}>
              <Button className={styles.button} type='submit'>
                Save
              </Button>
              <div>{logic.error}</div>
              <Button
                className={styles.button}
                onClick={() => {
                  navigate(urls.blogPost)
                }}
              >
                Go back
              </Button>
            </div>
          </Div_Container>
        )}
      </form>
    </Div_Styled>
  )
}
const styles = {
  button: css`
    width: 200px;
  `,
  itemAlign: css`
    text-align: center;
  `,
  textarea: css`
    padding: 3px;
    margin: 10px 0px;
    width: 200px;
  `,
}
