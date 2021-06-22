import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'

const Users = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch( initializeUsers() )
  }, [])

  return (
    <div>
      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
