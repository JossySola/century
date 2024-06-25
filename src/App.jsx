import { useEffect } from 'react'
import { Form, Outlet } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("App.jsx: Setting timer...")
      caches.keys().then(keys => {
        for (const key of keys) {
          const isOurCache = key.startsWith("century-");
          if (isOurCache) {
            caches.delete(key);
            console.log("App.jsx: Cache deleted")
          }
        }
      })
    }, 600000)

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Form id="search-form" role="search">
        <input name='search' id='search' aria-label='Search' placeholder='Search...' type='search' />
        <button form='search-form' type='submit'>Search!</button>
      </Form>

      <Outlet />
    </>
  )
}

export default App