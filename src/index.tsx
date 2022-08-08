import { App } from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Counter } from './Counter/Counter'
import { HackerTyper } from './HackerTyper/HackerTyper'
import { Home } from './HomePage'
import { JsHistory } from './JS-history/JsHistory'
import { ToDo } from './ToDo/ToDo'
import { urls } from './urls'
import React from 'react'
import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={urls.homePageUrl} element={<App />}>
          <Route path={urls.homePageUrl} element={<Home />} />
          <Route path={urls.jsHistoryUrl} element={<JsHistory />} />
          <Route path={urls.counterUrl} element={<Counter />} />
          <Route path={urls.toDoUrl} element={<ToDo />} />
          <Route path={urls.hackertyper} element={<HackerTyper />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
