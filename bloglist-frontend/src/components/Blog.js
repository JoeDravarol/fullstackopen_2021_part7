import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateBlog, removeBlog, addComment } from '../reducers/blogReducer'
import { Typography, Link, Button, Box } from '@material-ui/core'

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
      dispatch( removeBlog(blog.id) )
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
      <Typography variant='h4' component='h2' gutterBottom>
        {blog.title} {blog.author}
      </Typography>

      <Link color='primary' href={blog.url} target='_blank' rel='noreferrer'>
        {blog.url}
      </Link>

      <Typography variant='body1' component='div'>
        likes {blog.likes}

        <Box component='span' ml={1}>
          <Button
            variant='contained'
            color='primary'
            size='small'
            onClick={incrementLikes}
          >
            like
          </Button>
        </Box>
      </Typography>

      <Typography variant='body1' component='div'>
        added by {blog.author}
      </Typography>

      <Box mt={1}>
        <Button variant='contained' size='small' onClick={deleteBlog}>
          remove
        </Button>
      </Box>

      <Comments comments={blog.comments} createComment={createComment(blog.id)} />
    </div>
  )
}

export default Blog