import { BlogNewContext } from './CreateBlogContext'
import { Button } from '../../components/Button'
import {
  Div_Container,
  Div_Form_Item,
  Input_Styled,
} from '../../MortgageCalculator/MortgageCalculator'
import { Div_Styled } from '../../HomePage'
import { Link, useNavigate } from 'react-router-dom'
import { css } from '@emotion/css'
import { urls } from '../../urls'
import React, { useContext, useState } from 'react'

export const NewArticle = () => {
  const logic = useContext(BlogNewContext)

  return (
    <Div_Styled>
      <h1>New article</h1>
      <form
        onSubmit={async e => {
          e.preventDefault()
          logic.addArticle(logic.title, logic.content)
        }}
      >
        <Div_Container>
          <Div_Form_Item>
            <label>Title input:</label>
            {logic.titleError}
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
            {logic.contentError}
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
            <Link to={urls.blogPost}>
              <Button className={styles.button}>Go back</Button>
            </Link>
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
