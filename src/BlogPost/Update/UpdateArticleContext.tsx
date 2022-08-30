import { UpdateArticle } from './UpdateArticle'
import { blogArticleUrl, blogUpdateUrl } from '../../urls'
import { blogServices, serviceLayerFetch } from '../../utils/serviceLayer'
import { genericHookContextBuilder } from '../../utils/genericHookContextBuilder'
import { useComponentDidMount } from '../../utils/util'
import { useParams } from 'react-router'
import { useState } from 'react'

export type Article = {
  id: number
  url: string
  title: string
  content: string
}

const useLogicState = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState('')
  const [content, setContent] = useState('')
  const [contentError, setContentError] = useState('')

  const params = useParams()

  useComponentDidMount(async () => {
    try {
      const response = (await serviceLayerFetch(blogArticleUrl(params.slug!))) as Article
      setTitle(response.title)
      setContent(response.content)
    } catch (err) {
      setError('Database is unavailable')
    } finally {
      setLoading(false)
    }
  })

  const updateArticle = async (title: string, content: string) => {
    setTitleError('')
    setContentError('')

    if (title.trim().length === 0) {
      setTitleError('Title is required')
      return
    }
    if (content.trim().length === 0) {
      setContentError('Text is required')
      return
    }

    try {
      setLoading(true)
      await blogServices.update(params.slug!, { title, content })
      setTitle('')
      setContent('')
    } catch (err) {
      setError('Database is unavailable')
    } finally {
      setLoading(false)
    }
  }

  return {
    title,
    setTitle,
    content,
    setContent,
    titleError,
    updateArticle,
    contentError,
    setError,
    loading,
    error,
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
