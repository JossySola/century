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
          errorElement: <ErrorPage />,
          children: [
            {
              path: 'r/:subreddit/comments/:id/:title'
            },
            {
              path: '/news',
              element: <Feed />,
              loader: newsLoader,
            }
          ]
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
