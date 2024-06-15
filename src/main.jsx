import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { news as newsLoader } from './scripts/loaders/loaders.ts'

import App from './App.jsx'
import ErrorPage from './error-page.jsx'
import Feed from './organisms/Feed/Feed'

import './index.css'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />, // Add permalink as State
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/news',
          element: <Feed t3={"worldnews.json?raw_json=1"}/>,
          errorElement: <ErrorPage />,
          loader: newsLoader,
        },
      ],
    },
  ]
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
