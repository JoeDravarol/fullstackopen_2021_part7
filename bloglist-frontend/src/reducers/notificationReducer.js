const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

let timeoutId

export const setNotification = (notification, timeInSeconds = 3) => {
  const timeInMilliseconds = timeInSeconds * 1000
  clearTimeout(timeoutId)

  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: {
        message: notification.message,
        status: notification.status,
      }
    })

    timeoutId = setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, timeInMilliseconds)
  }
}

export default reducer