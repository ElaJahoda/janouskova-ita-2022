import { App } from './App'
import { BlogPost } from './BlogPost/List/BlogContextProvider'
import { BlogUpdateArticle } from './BlogPost/Update/UpdateArticleContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Counter } from './Counter/Counter'
import { CreateNewArticle } from './BlogPost/Create/CreateBlogContext'
import { DetailArticle } from './BlogPost/Detail/DetailArticleContext'
import { HackerTyper } from './HackerTyper/HackerTyper'
import { Home } from './HomePage'
import { HttpFilter } from './HttpFilter/HttpFilter'
import { JsHistory } from './JShistory/JsHistory'
import { MemoryGame } from './MemoryGame/MemoryGame'
import { MortgageCalculator } from './MortgageCalculator/MortgageCalculator'
import { Provider } from 'react-redux'
import { ToDo } from './ToDo/ToDo'
import { ToDoRedux } from './ToDoRedux/ToDoRedux'
import { store } from './ToDoRedux/store'
import { urls } from './urls'
import React from 'react'
import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
        <Routes>
          <Route path={urls.homePage} element={<Home />} />
          <Route path={urls.jsHistory} element={<JsHistory />} />
          <Route path={urls.counter} element={<Counter />} />
          <Route path={urls.toDo} element={<ToDo />} />
          <Route path={urls.toDoRedux} element={<ToDoRedux />} />
          <Route path={urls.hackertyper} element={<HackerTyper />} />
          <Route path={urls.mortgageCalculator} element={<MortgageCalculator />} />
          <Route path={urls.memoryGame} element={<MemoryGame />} />
          <Route path={urls.httpFilter} element={<HttpFilter />} />
          <Route path={urls.blogPost} element={<BlogPost />} />
          <Route path={urls.blogNewArticle} element={<CreateNewArticle />} />
          <Route path={urls.blogArticles} element={<DetailArticle />} />
          <Route path={urls.blogUpdateArticle} element={<BlogUpdateArticle />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
)
