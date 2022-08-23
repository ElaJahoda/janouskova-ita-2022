import { Button } from '../components/Button'
import { Div_Styled } from '../HomePage'
import { Helmet } from 'react-helmet'
import { concatUrls, urls } from '../urls'
import { convertToSlug, uniqueId, useLocalStorage } from '../utils/util'
import { css } from '@emotion/css'
import { genericHookContextBuilder } from '../utils/genericHookContextBuilder'
import { useNavigate } from 'react-router-dom'
import React, { useContext, useState } from 'react'

export type Article = {
  id: number
  url: string
  title: string
  content: string
}

const useLogicState = () => {
  const [articles, setArticles] = useLocalStorage('articles:list', [] as Article[])
  const [error, setError] = useState('')

  const checkUrl = (url: string) => {
    return articles.some(article => article.url === url)
  }

  const addArticle = (title: string, content: string) => {
    if (!checkUrl(convertToSlug(title))) {
      setError('Use different title')
    }
    if (title.trim().length === 0) {
      setError('Title is required')
      return
    }
    if (content.trim().length === 0) {
      setError('Text is required')
      return
    }
    setArticles(prevArt => [
      {
        id: uniqueId(),
        url: convertToSlug(title),
        title: title,
        content: content,
      },
      ...prevArt,
    ])
    setError('')
  }
  return {
    articles,
    setArticles,
    error,
    setError,
    addArticle,
    checkUrl,
  }
}

export const { ContextProvider: BlogContextProvider, Context: BlogContext } =
  genericHookContextBuilder(useLogicState)

export const BlogPost = () => {
  return (
    <BlogContextProvider>
      <Blog />
    </BlogContextProvider>
  )
}

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
        {logic.articles.map(item => {
          return (
            <div key={item.id}>
              <Button
                className={styles.styledButton}
                onClick={() => navigate(concatUrls(item.url))}
              >
                {item.title}
              </Button>
            </div>
          )
        })}
      </div>
    </Div_Styled>
  )
}
const styles = {
  styledButton: css`
    width: 200px;
  `,
}
