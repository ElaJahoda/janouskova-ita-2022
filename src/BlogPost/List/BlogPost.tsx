import { BlogPageContext } from './BlogContextProvider'
import { Button } from '../../components/Button'
import { Div_Styled } from '../../HomePage'
import { Helmet } from 'react-helmet'
import { Input_Styled } from '../../MortgageCalculator/MortgageCalculator'
import { concatUrls, urls } from '../../urls'
import { convertToSlug, uniqueId, useLocalStorage } from '../../utils/util'
import { css } from '@emotion/css'
import { genericHookContextBuilder } from '../../utils/genericHookContextBuilder'
import { useNavigate } from 'react-router-dom'
import React, { useContext, useState } from 'react'

export const Blog = () => {
  const logic = useContext(BlogPageContext)
  const navigate = useNavigate()
  return (
    <Div_Styled>
      <Helmet>
        <title>Eva Janouskova - Blog post</title>
      </Helmet>
      <h1>Blog Post</h1>
      <nav>
        <Button
          className={styles.styledButton}
          onClick={() => {
            navigate(urls.blogNewArticle)
          }}
        >
          Create New Article
        </Button>
      </nav>
      <div>
        <h2>List of Articles:</h2>
        <Input_Styled
          type='text'
          value={logic.valueInput}
          onChange={logic.handleChange}
          placeholder='Search...'
        />

        {logic.errorMessage.length > 0 ? (
          <div>{logic.errorMessage}</div>
        ) : logic.loading ? (
          <p>Loading...</p>
        ) : logic.articles.length < 1 ? (
          <p>Create your first blog post</p>
        ) : (
          logic.articles.map(item => (
            <div key={item.id}>
              <Button
                className={styles.styledButton}
                onClick={() => navigate(concatUrls(item.url))}
              >
                {item.title} - {item.id}{' '}
              </Button>
            </div>
          ))
        )}
      </div>
    </Div_Styled>
  )
}
const styles = {
  styledButton: css`
    width: 210px;
  `,
}
