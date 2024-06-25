import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { news as newsLoader } from './scripts/loaders/loaders.ts'
import { index as indexLoader } from './scripts/loaders/loaders.ts'

import App from './App.jsx'
import ErrorPage from './error-page.jsx'
import Feed from './organisms/Feed/Feed'
import Post from "./organisms/Post/Post"

import './index.css'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          errorElement: <ErrorPage />,
          children: [
            {
              index: true,
              element: <Feed />,
              loader: indexLoader,
            },
            {
              path: 'r/:subreddit/comments/:id/:title',
              element: <Post />,
            },
            {
              path: 'news',
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
