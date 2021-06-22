import React, { useState } from 'react'
import { TextField, Button, Box, Typography } from '@material-ui/core'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <Typography variant='h4' component='h2' gutterBottom>Create new</Typography>

      <form onSubmit={addBlog}>
        <div>
          <TextField
            id='title'
            label='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            variant='outlined'
          />
        </div>
        <div>
          <TextField
            id='author'
            label='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            variant='outlined'
          />
        </div>
        <div>
          <TextField
            id='url'
            label='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            variant='outlined'
          />
        </div>

        <Box my={1}>
          <Button variant='contained' color='primary' type='submit'>
            create
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default BlogForm
