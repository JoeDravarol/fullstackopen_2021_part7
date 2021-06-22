import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import BlogList from './BlogList'

const User = () => {
  const id = useParams().id
  const user = useSelector(state =>
    state.users.find(u => u.id === id)
  )

  if (!user) return null

  return (
    <div>
      <Typography variant='h4' component='h2'>{user.name}&apos;s blogs</Typography>
      <BlogList blogs={user.blogs} />
    </div>
  )
}

export default User
