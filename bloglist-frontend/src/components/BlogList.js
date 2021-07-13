import React from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core/index'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  return (
    <List class="blogs">
      {blogs.map(blog =>
        <ListItem key={blog.id} component={Link} to={`/blogs/${blog.id}`} button divider>
          <ListItemText>
            {blog.title}
          </ListItemText>
        </ListItem>
      )}
    </List>
  )
}

export default BlogList
