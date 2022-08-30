import { BlogDetailContext } from './DetailArticleContext'
import { Button } from '../../components/Button'
import { Div_Styled } from '../../HomePage'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { concatUrlUpdate, urls } from '../../urls'
import { useContext } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const BlogArticle = () => {
  const logic = useContext(BlogDetailContext)

  return (
    <Div_Styled>
      <h1>Blog article</h1>
      {logic.error.length > 0 ? (
        <div>{logic.error}</div>
      ) : logic.loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>{logic.article?.title}</h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{logic.article?.content ?? ''}</ReactMarkdown>
          <Link to={concatUrlUpdate(logic.params.slug!)}>
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
    </Div_Styled>
  )
}
