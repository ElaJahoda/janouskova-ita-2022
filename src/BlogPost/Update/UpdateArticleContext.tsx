import { UpdateArticle } from './UpdateArticle'
import { blogArticleUrl, blogUpdateUrl } from '../../urls'
import { convertToSlug, uniqueId, useComponentDidMount, useLocalStorage } from '../../utils/util'
import { genericHookContextBuilder } from '../../utils/genericHookContextBuilder'
import { myCustomFetch } from '../../utils/serviceLayer'
import { useParams } from 'react-router'
import { useState } from 'react'

export type Article = {
  id: number
  url: string
  title: string
  content: string
}

const useLogicState = () => {
  const [articles, setArticles] = useState([] as Article[])
  const [error, setError] = useState('')
  const [valid, setValid] = useState(true)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const params = useParams()

  useComponentDidMount(async () => {
    try {
      const response = (await myCustomFetch(blogArticleUrl(params.slug!))) as Article
      setTitle(response.title)
      setContent(response.content)
    } catch (err) {
      setError('Database is unavailable')
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

  const updateArticle = async (title: string, content: string) => {
    setLoading(true)
    try {
      const response = await fetch(blogUpdateUrl(params.slug!), {
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
    } catch (err) {
      console.error(err)
      setError('Database is unavailable')
    } finally {
      setLoading(false)
    }
    setError('')
  }

  return {
    articles,
    setArticles,
    error,
    setError,
    validation,
    updateArticle,
    title,
    setTitle,
    content,
    setContent,
    loading,
    setLoading,
  }
}

export const { ContextProvider: BlogContextUpdateProvider, Context: BlogUpdateContext } =
  genericHookContextBuilder(useLogicState)

export const BlogUpdateArticle = () => {
  return (
    <BlogContextUpdateProvider>
      <UpdateArticle />
    </BlogContextUpdateProvider>
  )
}
