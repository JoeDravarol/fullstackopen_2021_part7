import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.payload
    case 'NEW_BLOG':
      return [...state, action.payload]
    case 'UPDATE_BLOG': {
      const id = action.payload.id
      const updatedBlogs = state.map(blog =>
        blog.id !== id ? blog : action.payload.data
      )
      return updatedBlogs
    }
    case 'REMOVE_BLOG': {
      const id = action.payload.id
      return state.filter(blog => blog.id !== id)
    }
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

export const updateBlog = (id, blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(
      id,
      blog
    )
    dispatch({
      type: 'UPDATE_BLOG',
      payload: {
        data: updatedBlog,
        id
      }
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    try {
      await blogService.remove(id)
      dispatch({
        type: 'REMOVE_BLOG',
        payload: { id }
      })
    } catch (e) {
      dispatch( setNotification({ message: e.response.data.error, status: 'error' }) )
    }
  }
}

export const addComment = (blogId, comment) => {
  return async dispatch => {
    const returnedBlog = await blogService.addComment(blogId, { comment })
    dispatch({
      type: 'UPDATE_BLOG',
      payload: {
        data: returnedBlog,
        id: blogId
      }
    })
  }
}

export default reducer