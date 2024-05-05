import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, } from 'react-router-dom'

import './assets/css/index.scss'
import './assets/css/normalize.css'
import { router } from './pages/router'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
