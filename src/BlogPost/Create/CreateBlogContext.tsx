import { NewArticle } from './NewArticle'
import { blogServices, serviceLayerFetch } from '../../utils/serviceLayer'
import { genericHookContextBuilder } from '../../utils/genericHookContextBuilder'
import { urlBlog } from '../../urls'
import { useComponentDidMount } from '../../utils/util'
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
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState('')
  const [content, setContent] = useState('')
  const [contentError, setContentError] = useState('')

  useComponentDidMount(async () => {
    try {
      const response = await serviceLayerFetch(urlBlog)
      setArticles(response)
    } catch (err) {
      setError('Database is unavailable')
    }
  })

  const setNewArticle = () => blogServices.setNew({ title, content })

  const addArticle = async (title: string, content: string) => {
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

    setNewArticle()
    setTitle('')
    setContent('')
  }
  return {
    title,
    setTitle,
    content,
    setContent,
    titleError,
    addArticle,
    contentError,
    setError,
    loading,
    error,
    setLoading,
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
