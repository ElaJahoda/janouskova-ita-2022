import { Blog } from './BlogPost'
import { blogServices } from '../../utils/serviceLayer'
import { genericHookContextBuilder } from '../../utils/genericHookContextBuilder'
import { useComponentDidMount } from '../../utils/util'
import { useState } from 'react'

export type Article = { id: number; url: string; title: string; content: string }[]

const useLogicState = () => {
  const [articles, setArticles] = useState([] as Article)
  const [valueInput, setValueInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [filterArticles, setFilterArticles] = useState([] as Article)

  useComponentDidMount(async () => {
    setError('')
    try {
      setLoading(true)
      const response = await blogServices.read()
      setArticles(response)
    } catch (err) {
      setError('Database is unavailable')
    } finally {
      setLoading(false)
    }
  })

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value)
    setError('')
    try {
      setLoading(true)
      setFilterArticles(await blogServices.filter(valueInput))
    } catch (err) {
      setError('Database is unavailable')
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
    error,
    setError,
    loading,
    setLoading,
    filterArticles,
    setFilterArticles,
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
