import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { news as newsLoader } from './scripts/loaders/loaders.ts'
import { science as scienceLoader } from './scripts/loaders/loaders.ts'
import { gaming as gamingLoader } from './scripts/loaders/loaders.ts'
import { space as spaceLoader } from './scripts/loaders/loaders.ts'
import { sports as sportsLoader } from './scripts/loaders/loaders.ts'
import { tech as techLoader } from './scripts/loaders/loaders.ts'
import { index as indexLoader } from './scripts/loaders/loaders.ts'
import { submitComment as commentAction } from './scripts/actions/actions.ts'

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
              action: commentAction,
            },
            {
              path: 'news',
              element: <Feed />,
              loader: newsLoader,
            },
            {
              path: 'tech',
              element: <Feed />,
              loader: techLoader,
            },
            {
              path: 'sports',
              element: <Feed />,
              loader: sportsLoader,
            },
            {
              path: 'astronomy',
              element: <Feed />,
              loader: spaceLoader,
            },
            {
              path: 'science',
              element: <Feed />,
              loader: scienceLoader,
            },
            {
              path: 'gaming',
              element: <Feed />,
              loader: gamingLoader,
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
