import { NewArticle } from './NewArticle'
import { convertToSlug, uniqueId, useComponentDidMount, useLocalStorage } from '../../utils/util'
import { genericHookContextBuilder } from '../../utils/genericHookContextBuilder'
import { myCustomFetch } from '../../utils/serviceLayer'
import { urlBlog } from '../../urls'
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
  const [valid, setValid] = useState(true)

  useComponentDidMount(async () => {
    try {
      const response = await myCustomFetch(urlBlog)
      setArticles(response)
    } catch (err) {
      console.info('network error')
    }
  })

  const checkIfUrlExists = (url: string) => {
    return articles.some(article => article.url === url)
  }

  const validation = async (title: string, content: string) => {
    if (!checkIfUrlExists(convertToSlug(title))) {
      setError('Use different title')
      setValid(false)
    }
    if (title.trim().length === 0) {
      setError('Title is required')
      setValid(false)
    }
    if (content.trim().length === 0) {
      setError('Text is required')
      setValid(false)
    }
    return valid
  }

  const addArticle = async (title: string, content: string) => {
    await fetch(urlBlog, {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify({
        id: uniqueId(),
        url: convertToSlug(title),
        title: title,
        content: content,
      }),
    })
    setError('')
  }
  return {
    articles,
    setArticles,
    error,
    setError,
    addArticle,
    validation,
  }
}

export const { ContextProvider: BlogContextNewProvider, Context: BlogNewContext } =
  genericHookContextBuilder(useLogicState)

export const CreateNewArticle = () => {
  return (
    <BlogContextNewProvider>
      <NewArticle />
    </BlogContextNewProvider>
  )
}
