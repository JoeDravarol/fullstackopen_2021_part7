import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const checkLoggedUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (!loggedUserJSON) return undefined

    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)

    dispatch({
      type: 'LOGIN',
      payload: user
    })
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })

      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(user)
      )

      dispatch({
        type: 'LOGIN',
        payload: user
      })
    } catch (exception) {
      dispatch(setNotification(
        {
          message: exception.response.data.error,
          status: 'error'
        },
        3
      ))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')

    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default reducer