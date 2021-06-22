import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.payload
    case 'NEW_BLOG':
      return [...state, action.payload]
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      payload: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const returnedBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      payload: returnedBlog
    })
  }
}

export default reducer