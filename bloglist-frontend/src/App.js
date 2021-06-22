import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { checkLoggedUser, login, logout } from './reducers/loginReducer'
import Users from './components/Users'
import User from './components/User'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch( initializeBlogs() )
  }, [])

  useEffect(() => {
    dispatch( checkLoggedUser() )
  }, [])

  const displayNotificationWith = (message, status='success') => {
    const seconds = 3
    dispatch( setNotification({ message, status }, seconds) )
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch( login(username, password) )

    setUsername('')
    setPassword('')

  }

  const handleInputOnChange = (callback) => {
    return ({ target }) => {
      callback(target.value)
    }
  }

  const addBlog = async (blogObject) => {

    try {
      dispatch( createBlog(blogObject) )

      blogFormRef.current.toggleVisibility()
      displayNotificationWith(
        `a new blog ${blogObject.title} by ${blogObject.author} added`
      )
    } catch (exception) {
      displayNotificationWith(exception.response.data.error, 'error')
    }
  }

  const blogFormRef = useRef()

  // Sort in descending order
  const sortedBlogsByLikes = blogs.sort((a,b) => b.likes - a.likes)

  if (user === null) {
    return (
      <>
        <h2>Log in to application</h2>
        <Notification notification={notification} />
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleUsernameChange={handleInputOnChange(setUsername)}
          handlePasswordChange={handleInputOnChange(setPassword)}
        />
      </>
    )
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <div>
        {user.name} logged in
        <button onClick={() => dispatch( logout() )}>
          logout
        </button>
      </div>

      <Switch>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/blogs/:id'>
          <Blog setNotification={displayNotificationWith} />
        </Route>
        <Route path='/'>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>

          {sortedBlogsByLikes.map(blog =>
            <Link key={blog.id} to={`/blogs/${blog.id}`}>
              <div style={blogStyle}>
                {blog.title}
              </div>
            </Link>
          )}
        </Route>
      </Switch>
    </div>
  )
}

export default App