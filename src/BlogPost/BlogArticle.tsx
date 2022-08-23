import { BlogContext } from './BlogContextProvider'
import { Button } from '../components/Button'
import { Div_Styled } from '../HomePage'
import { Link } from 'react-router-dom'
import { urls } from '../urls'
import { useContext } from 'react'
import { useParams } from 'react-router'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const BlogArticle = () => {
  const params = useParams()
  const logic = useContext(BlogContext)
  const article = logic.articles.find(article => article.url === params.slug)
  return (
    <Div_Styled>
      <h1>{article?.title}</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{article?.content ?? ''}</ReactMarkdown>
      <Link to={urls.blogPost}>
        <Button>Go back</Button>
      </Link>
    </Div_Styled>
  )
}
