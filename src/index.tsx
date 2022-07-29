import { App } from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Counter } from './Counter/Counter'
import { Home } from './HomePage'
import { JsHistory } from './JS-history/JsHistory'
import React from 'react'
import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/' element={<Home />} />
          <Route path='jshistory' element={<JsHistory />} />
          <Route path='counter' element={<Counter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
