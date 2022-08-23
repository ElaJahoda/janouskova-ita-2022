import { BlogContext } from './BlogContextProvider'
import { Button } from '../components/Button'
import { Div_Styled } from '../HomePage'
import { Helmet } from 'react-helmet'
import { concatUrls, urls } from '../urls'
import { convertToSlug, uniqueId, useLocalStorage } from '../utils/util'
import { css } from '@emotion/css'
import { genericHookContextBuilder } from '../utils/genericHookContextBuilder'
import { useNavigate } from 'react-router-dom'
import React, { useContext, useState } from 'react'

export const Blog = () => {
  const logic = useContext(BlogContext)
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
        {logic.articles.map(item => (
          <div key={item.id}>
            <Button className={styles.styledButton} onClick={() => navigate(concatUrls(item.url))}>
              {item.title}
            </Button>
          </div>
        ))}
      </div>
    </Div_Styled>
  )
}
const styles = {
  styledButton: css`
    width: 200px;
  `,
}
