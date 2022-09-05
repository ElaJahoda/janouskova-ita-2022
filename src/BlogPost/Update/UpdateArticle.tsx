import { BlogUpdateContext } from './UpdateArticleContext'
import { Button } from '../../components/Button'
import {
  Div_Container,
  Div_Form_Item,
  Input_Styled,
} from '../../MortgageCalculator/MortgageCalculator'
import { Div_Styled } from '../../HomePage'
import { Link, useNavigate } from 'react-router-dom'
import { css } from '@emotion/css'
import { theme } from '../../theme'
import { urls } from '../../utils/urls'
import React, { useContext } from 'react'

export const UpdateArticle = () => {
  const logic = useContext(BlogUpdateContext)
  const navigate = useNavigate()
  return (
    <Div_Styled>
      <h1>Update article</h1>

      {logic.error.length > 0 ? (
        <div>{logic.error}</div>
      ) : logic.loading ? (
        <p>...Loading</p>
      ) : (
        <form
          onSubmit={async e => {
            e.preventDefault()
            const isValid = await logic.validate(logic.title, logic.content)
            if (!isValid) return
            logic.updateArticle(logic.title, logic.content)
            navigate(urls.blogPost)
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
            </div>
          </Div_Container>
        </form>
      )}
      <Link to={urls.blogPost}>
        <Button className={styles.button}>Go back</Button>
      </Link>
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
    :focus {
      outline-color: ${theme.primaryColor};
    }
  `,
}
