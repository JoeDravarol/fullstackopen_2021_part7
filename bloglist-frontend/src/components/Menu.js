import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'
import { logout } from '../reducers/loginReducer'

const Menu = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const style = {
    padding: 5,
    backgroundColor: 'lightgrey',
    marginBottom: 5
  }

  const styleMargin = {
    marginRight: 10
  }

  return (
    <div style={style}>
      <Link style={styleMargin} to='/'>blogs</Link>
      <Link style={styleMargin} to='/users'>users</Link>
      <span style={styleMargin} >
        {user.name} logged in
      </span>
      <button onClick={() => dispatch( logout() )}>
        logout
      </button>
    </div>
  )
}

export default Menu
