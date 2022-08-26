import { BlogNewContext } from './CreateBlogContext'
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

export const NewArticle = () => {
  const logic = useContext(BlogNewContext)
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  return (
    <Div_Styled>
      <h1>New article</h1>
      <form
        onSubmit={e => {
          e.preventDefault()
          logic.addArticle(title, content)
          navigate(urls.blogPost)
        }}
      >
        <Div_Container>
          <Div_Form_Item>
            <label>Title input:</label>
            <Input_Styled
              type='text'
              placeholder='Title...'
              onChange={e => {
                setTitle(e.target.value)
              }}
            />
          </Div_Form_Item>
          <Div_Form_Item>
            <label>Content input:</label>
            <textarea
              className={styles.textarea}
              placeholder='Text content...'
              onChange={e => {
                setContent(e.target.value)
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
