import { A_Styled, Div_Styled } from '../../HomePage'
import { BlogPageContext } from './BlogContextProvider'
import { Button } from '../../components/Button'
import { Helmet } from 'react-helmet'
import { Input_Styled } from '../../MortgageCalculator/MortgageCalculator'
import { Link } from 'react-router-dom'
import { css } from '@emotion/css'
import { theme } from '../../theme'
import { urls, urlsGH } from '../../utils/urls'
import React, { useContext } from 'react'

export const Blog = () => {
  const logic = useContext(BlogPageContext)
  return (
    <Div_Styled>
      <Helmet>
        <title>Eva Janouskova - Blog post</title>
      </Helmet>
      <h1>Blog Post</h1>
      <nav>
        <Link to={urls.blogNewArticle}>
          <Button className={styles.styledButton} disabled={logic.loading || Boolean(logic.error)}>
            Create New Article
          </Button>
        </Link>
      </nav>
      <div>
        <h2>List of Articles:</h2>
        <Input_Styled
          disabled={logic.loading || Boolean(logic.error)}
          type='text'
          value={logic.valueInput}
          onChange={logic.handleChange}
          placeholder='Search...'
        />
        {logic.error.length > 0 ? (
          <div>
            <div>{logic.error}</div>
            <div className={styles.errorMessage}>
              To make the app work download repository from{' '}
              <A_Styled href={urlsGH.blogPost} target='_blank'>
                GitHub
              </A_Styled>{' '}
              and run it on localhost.
            </div>
          </div>
        ) : logic.loading ? (
          <p>Loading...</p>
        ) : logic.articles.length < 1 ? (
          <p>Create your first blog post</p>
        ) : logic.valueInput.length > 0 ? (
          logic.filterArticles.map(item => (
            <div key={item.id}>
              <Link to={urls.blogArticleSlug(item.url)}>
                <Button className={styles.styledButton}>{item.title} </Button>
              </Link>
            </div>
          ))
        ) : (
          logic.articles.map(item => (
            <div key={item.id}>
              <Link to={urls.blogArticleSlug(item.url)}>
                <Button className={styles.styledButton}>{item.title} </Button>
              </Link>
            </div>
          ))
        )}
      </div>
    </Div_Styled>
  )
}
const styles = {
  styledButton: css`
    width: 210px;
  `,
  errorMessage: css`
    margin: auto;
    margin-top: 20px;
    padding: 10px;
    border: solid 3px ${theme.primaryColor};
    max-width: 650px;
  `,
}
