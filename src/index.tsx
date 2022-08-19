import { App } from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Counter } from './Counter/Counter'
import { HackerTyper } from './HackerTyper/HackerTyper'
import { Home } from './HomePage'
import { JsHistory } from './JShistory/JsHistory'
import { MemoryGame } from './MemoryGame/MemoryGame'
import { MortgageCalculator } from './MortgageCalculator/MortgageCalculator'
import { ToDo } from './ToDo/ToDo'
import { urls } from './urls'
import React from 'react'
import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Routes>
        <Route path={urls.homePage} element={<Home />} />
        <Route path={urls.jsHistory} element={<JsHistory />} />
        <Route path={urls.counter} element={<Counter />} />
        <Route path={urls.toDo} element={<ToDo />} />
        <Route path={urls.hackertyper} element={<HackerTyper />} />
        <Route path={urls.mortgageCalculator} element={<MortgageCalculator />} />
        <Route path={urls.memoryGame} element={<MemoryGame />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
