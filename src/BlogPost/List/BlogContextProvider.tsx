import { Blog } from './BlogPost'
import { apiUrlBlog, blogFilterUrl, urlBlog } from '../../urls'
import { genericHookContextBuilder } from '../../utils/genericHookContextBuilder'
import { myCustomFetch } from '../../utils/serviceLayer'
import { useComponentDidMount } from '../../utils/util'
import { useState } from 'react'

export type Article = { id: number; url: string; title: string; content: string }[]

const useLogicState = () => {
  const [articles, setArticles] = useState([] as Article)
  const [valueInput, setValueInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useComponentDidMount(async () => {
    setLoading(true)
    setErrorMessage('')
    try {
      const response = await myCustomFetch(urlBlog)
      setArticles(response)
    } catch (err) {
      setErrorMessage('Database is unavailable')
    } finally {
      setLoading(false)
    }
  })

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    setValueInput(e.target.value)
    setErrorMessage('')
    try {
      const response = await myCustomFetch(blogFilterUrl(valueInput))
      setArticles(response)
    } catch (err) {
      if (err) setErrorMessage('Database is unavailable')
    } finally {
      setLoading(false)
    }
  }

  return {
    articles,
    setArticles,
    valueInput,
    setValueInput,
    handleChange,
    errorMessage,
    setErrorMessage,
    loading,
    setLoading,
  }
}

export const { ContextProvider: BlogContextPageProvider, Context: BlogPageContext } =
  genericHookContextBuilder(useLogicState)

export const BlogPost = () => {
  return (
    <BlogContextPageProvider>
      <Blog />
    </BlogContextPageProvider>
  )
}
