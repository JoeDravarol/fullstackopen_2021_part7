import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { List, ListItem, ListItemText } from '@material-ui/core/index'

const Comment = ({ comment }) => {
  return (
    <ListItem disableGutters divider>
      <ListItemText>
        {comment}
      </ListItemText>
    </ListItem>
  )
}

const Comments = ({ comments, createComment }) => {

  const handleSubmit = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''

    createComment(comment)
  }

  return (
    <Box my={2}>
      <Typography variant='h5' component='h3' gutterBottom>comments</Typography>

      <form onSubmit={handleSubmit}>
        <input name='comment' />
        <button type='submit'>add comment</button>
      </form>

      <List dense>
        {comments.map(comment =>
          <Comment key={comment.id} comment={comment.content} />
        )}
      </List>
    </Box>
  )
}

export default Comments
