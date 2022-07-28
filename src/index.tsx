import JsHistory from './JS-history/JsHistory'
import React from 'react'
import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <JsHistory />
  </React.StrictMode>
)
