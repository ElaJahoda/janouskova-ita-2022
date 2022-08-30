import { BlogArticle } from './BlogArticle'
import { blogServices } from '../../utils/serviceLayer'
import { genericHookContextBuilder } from '../../utils/genericHookContextBuilder'
import { useComponentDidMount } from '../../utils/util'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

export type Article = {
  id: number
  url: string
  title: string
  content: string
}

const useLogicState = () => {
  const [article, setArticle] = useState(undefined as Article | undefined)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')

  const params = useParams()
  useComponentDidMount(async () => {
    setError('')
    setLoading(true)
    try {
      blogServices.getOne(params.slug!, setTitle, setContent)
    } catch (err) {
      setError('Server side error')
    } finally {
      setLoading(false)
    }
  })

  const deleteArticle = () => blogServices.delete(params.slug!)

  return {
    article,
    setArticle,
    loading,
    setLoading,
    error,
    setError,
    deleteArticle,
    params,
    content,
    setContent,
    title,
    setTitle,
  }
}

export const { ContextProvider: BlogContextDetailProvider, Context: BlogDetailContext } =
  genericHookContextBuilder(useLogicState)

export const DetailArticle = () => {
  return (
    <BlogContextDetailProvider>
      <BlogArticle />
    </BlogContextDetailProvider>
  )
}
