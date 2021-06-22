import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, setNotification }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const incrementLikes = async () => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    try {
      dispatch( updateBlog(blog.id, newBlog) )
    } catch (exception) {
      setNotification(exception.response.data.error, 'error')
    }
  }

  const deleteBlog = async () => {
    const confirmedDeletion = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)

    if (confirmedDeletion) {
      try {
        dispatch( removeBlog(blog.id) )
      } catch (exception) {
        setNotification(exception.response.data.error, 'error')
      }
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>

      <div style={showWhenVisible} className='togglableContent'>
        <p>{blog.url}</p>
        <div>
          likes {blog.likes}
          <button onClick={incrementLikes}>like</button>
        </div>
        <p>{blog.author}</p>

        <div>
          <button onClick={deleteBlog}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog