import { Article } from '../Create/CreateBlogContext'
import { BlogArticle } from './BlogArticle'
import { blogServices } from '../../utils/serviceLayer'
import { genericHookContextBuilder } from '../../utils/genericHookContextBuilder'
import { useComponentDidMount } from '../../utils/util'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

const useLogicState = () => {
  const [article, setArticle] = useState({} as Article)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const params = useParams()
  useComponentDidMount(async () => {
    setError('')
    setLoading(true)
    try {
      const response = await blogServices.getOne(params.slug!)
      setArticle(response)
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
