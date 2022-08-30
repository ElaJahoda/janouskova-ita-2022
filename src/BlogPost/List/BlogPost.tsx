import { BlogPageContext } from './BlogContextProvider'
import { Button } from '../../components/Button'
import { Div_Styled } from '../../HomePage'
import { Helmet } from 'react-helmet'
import { Input_Styled } from '../../MortgageCalculator/MortgageCalculator'
import { Link } from 'react-router-dom'
import { css } from '@emotion/css'
import { urls } from '../../urls'
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
          <Button className={styles.styledButton}>Create New Article</Button>
        </Link>
      </nav>
      <div>
        <h2>List of Articles:</h2>
        <Input_Styled
          type='text'
          value={logic.valueInput}
          onChange={logic.handleChange}
          placeholder='Search...'
        />
        {logic.error.length > 0 ? (
          <div>{logic.error}</div>
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
}
