import { BlogDetailContext } from './DetailArticleContext'
import { Button } from '../../components/Button'
import { Div_Styled } from '../../HomePage'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { urls } from '../../utils/urls'
import { useContext } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styled from '@emotion/styled'

export const BlogArticle = () => {
  const logic = useContext(BlogDetailContext)

  return (
    <Div_Styled>
      <Div_container>
        <h1>Blog article</h1>
        {logic.error.length > 0 ? (
          <div>{logic.error}</div>
        ) : logic.loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <h2>{logic.article.title}</h2>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{logic.article.content ?? ''}</ReactMarkdown>
            <Link to={urls.blogUpdateArticleSlug(logic.params.slug!)}>
              <Button>
                <FaEdit />
              </Button>
            </Link>
            <Link to={urls.blogPost}>
              <Button
                onClick={() => {
                  logic.deleteArticle()
                }}
              >
                <FaTrash />
              </Button>
            </Link>
          </div>
        )}

        <Link to={urls.blogPost}>
          <Button>Go back</Button>
        </Link>
      </Div_container>
    </Div_Styled>
  )
}

const Div_container = styled.div`
  margin: auto;
  max-width: 650px;
  padding: 0px 10px;
`
