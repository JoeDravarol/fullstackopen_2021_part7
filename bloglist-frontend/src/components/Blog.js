import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateBlog, removeBlog, addComment } from '../reducers/blogReducer'

import Comments from './Comments'

const Blog = ({ setNotification }) => {
  const id = useParams().id
  const blog = useSelector(state =>
    state.blogs.find(b => b.id === id)
  )
  const dispatch = useDispatch()

  const incrementLikes = async () => {
    const commentsId = blog.comments.map(comment => comment.id)

    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
      comments: commentsId
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

  const createComment = blogId => {
    return comment => {
      dispatch( addComment(blogId, comment) )
    }
  }

  if (!blog) return null

  return (
    <div className='blog'>
      <h2>{blog.title} {blog.author}</h2>

      <a href={blog.url} target='_blank' rel='noreferrer'>{blog.url}</a>
      <div>
        likes {blog.likes}
        <button onClick={incrementLikes}>like</button>
      </div>

      <div>
        added by {blog.author}
      </div>

      <div>
        <button onClick={deleteBlog}>remove</button>
      </div>

      <Comments comments={blog.comments} createComment={createComment(blog.id)} />
    </div>
  )
}

export default Blog