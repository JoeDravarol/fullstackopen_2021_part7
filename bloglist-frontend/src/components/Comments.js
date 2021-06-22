import React from 'react'

const Comments = ({ comments, createComment }) => {

  const handleSubmit = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''

    createComment(comment)
  }

  return (
    <div>
      <h3>comments</h3>

      <form onSubmit={handleSubmit}>
        <input name='comment' />
        <button type='submit'>add comment</button>
      </form>

      <ul>
        {comments.map(comment =>
          <li key={comment.id}>
            {comment.content}
          </li>
        )}
      </ul>
    </div>
  )
}

export default Comments
