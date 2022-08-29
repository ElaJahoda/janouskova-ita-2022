import { BlogArticle } from './BlogArticle'
import { blogArticleUrl } from '../../urls'
import { convertToSlug, uniqueId, useComponentDidMount, useLocalStorage } from '../../utils/util'
import { genericHookContextBuilder } from '../../utils/genericHookContextBuilder'
import { myCustomFetch } from '../../utils/serviceLayer'
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
  const [errorMessage, setErrorMessage] = useState('')

  const params = useParams()
  useComponentDidMount(async () => {
    setErrorMessage('')
    setLoading(true)
    try {
      const response = await myCustomFetch(blogArticleUrl(params.slug!))
      setArticle(response)
    } catch (err) {
      if (err) setErrorMessage('Server side error')
    } finally {
      setLoading(false)
    }
  })

  const deleteArticle = async () => {
    await myCustomFetch(blogArticleUrl(params.slug!), {
      method: 'DELETE',
    })
  }

  return {
    article,
    setArticle,
    loading,
    setLoading,
    errorMessage,
    setErrorMessage,
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
