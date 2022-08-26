import { Blog } from './BlogPost'
import { convertToSlug, uniqueId, useComponentDidMount, useLocalStorage } from '../../utils/util'
import { genericHookContextBuilder } from '../../utils/genericHookContextBuilder'
import { useState } from 'react'

export type Article = { id: number; url: string; title: string; content: string }[]

const useLogicState = () => {
  const [articles, setArticles] = useState([] as Article)
  const [error, setError] = useState('')

  useComponentDidMount(async () => {
    try {
      const response = await fetch('http://localhost:1234/blog')
      if (!response.ok) throw new Error('...')
      setArticles(await response.json())
    } catch (err) {
      console.info('network error')
    }
  })

  return {
    articles,
    setArticles,
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
