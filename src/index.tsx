import { App } from './App'
import { BlogPost } from './BlogPost/List/BlogContextProvider'
import { BlogUpdateArticle } from './BlogPost/Update/UpdateArticleContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CoinHunter } from './CoinHunter/CoinHunter'
import { CreateNewArticle } from './BlogPost/Create/CreateBlogContext'
import { CvPage } from './CvPage'
import { DetailArticle } from './BlogPost/Detail/DetailArticleContext'
import { HackerTyper } from './HackerTyper/HackerTyper'
import { Home } from './HomePage'
import { JsHistory } from './JShistory/JsHistory'
import { MemoryGame } from './MemoryGame/MemoryGame'
import { MortgageCalculator } from './MortgageCalculator/MortgageCalculator'
import { ProjectsPage } from './ProjectsPage'
import { ToDoRedux } from './ToDoRedux/ToDoRedux'
import { urls } from './utils/urls'
import React from 'react'
import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Routes>
        <Route path={urls.homePage} element={<Home />} />
        <Route path={urls.projectsPage} element={<ProjectsPage />} />
        <Route path={urls.cvPage} element={<CvPage />} />
        <Route path={urls.jsHistory} element={<JsHistory />} />
        <Route path={urls.toDoRedux} element={<ToDoRedux />} />
        <Route path={urls.hackertyper} element={<HackerTyper />} />
        <Route path={urls.mortgageCalculator} element={<MortgageCalculator />} />
        <Route path={urls.memoryGame} element={<MemoryGame />} />
        <Route path={urls.coinHunter} element={<CoinHunter />} />
        <Route path={urls.blogPost} element={<BlogPost />} />
        <Route path={urls.blogNewArticle} element={<CreateNewArticle />} />
        <Route path={urls.blogArticles} element={<DetailArticle />} />
        <Route path={urls.blogUpdateArticle} element={<BlogUpdateArticle />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
