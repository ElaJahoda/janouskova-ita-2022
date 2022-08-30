import { NewArticle } from './NewArticle'
import { blogServices } from '../../utils/serviceLayer'
import { genericHookContextBuilder } from '../../utils/genericHookContextBuilder'
import { useState } from 'react'

export type Article = {
  id: number
  url: string
  title: string
  content: string
}

const useLogicState = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState('')
  const [content, setContent] = useState('')
  const [contentError, setContentError] = useState('')

  const validate = async (title: string, content: string) => {
    setTitleError('')
    setContentError('')
    let isValid = true
    if (title.trim().length === 0) {
      setTitleError('Title is required')
      isValid = false
    }
    if (content.trim().length === 0) {
      setContentError('Text is required')
      isValid = false
    }
    return isValid
  }

  const addArticle = async (title: string, content: string) => {
    try {
      setLoading(true)
      await blogServices.create({ title, content })
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
    addArticle,
    contentError,
    setError,
    loading,
    error,
    setLoading,
    validate,
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
