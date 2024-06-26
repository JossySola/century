import { useEffect } from 'react'
import { Form, Outlet, Link } from 'react-router-dom'
import _Date from '../src/atoms/Date/Date';
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
      <header>
        <div id='top-div'>
          <_Date/>
          <button type='button'></button>
        </div>
      

        <h1><Link to="/">The 21st Century Times</Link></h1>
        
        <Form id="search-form" role="search">
          <input name='search' id='search' aria-label='Search' placeholder='Search subreddits...' type='search' />
          <button form='search-form' className='submit' type='submit'>Go!</button>
        </Form>

        <div id='double-border'></div>
      </header>

      <nav>
        <ul>
          <li><Link to="tech">Tech</Link></li>
          <li><Link to="sports">Sports</Link></li>
          <li><Link to="astronomy">Astronomy</Link></li>
          <li><Link to="science">Science</Link></li>
          <li><Link to="gaming">Gaming</Link></li>
        </ul>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App