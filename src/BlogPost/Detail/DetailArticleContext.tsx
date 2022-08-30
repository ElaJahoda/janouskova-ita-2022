import { BlogArticle } from './BlogArticle'
import { blogArticleUrl } from '../../urls'
import { blogServices, serviceLayerFetch } from '../../utils/serviceLayer'
import { genericHookContextBuilder } from '../../utils/genericHookContextBuilder'
import { useComponentDidMount, useLocalStorage } from '../../utils/util'
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

  const params = useParams()
  useComponentDidMount(async () => {
    setError('')
    setLoading(true)
    try {
      const response = await serviceLayerFetch(blogArticleUrl(params.slug!))
      setArticle(response)
    } catch (err) {
      if (err) setError('Server side error')
    } finally {
      setLoading(false)
    }
  })

  const deleteArticle = async () => await blogServices.delete(params.slug!)

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
