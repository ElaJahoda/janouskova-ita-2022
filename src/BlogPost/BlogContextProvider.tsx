import { Blog } from './BlogPost'
import { convertToSlug, uniqueId, useLocalStorage } from '../utils/util'
import { genericHookContextBuilder } from '../utils/genericHookContextBuilder'
import { useState } from 'react'

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
