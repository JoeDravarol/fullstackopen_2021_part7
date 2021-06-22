import React from 'react'
import { TextField, Button, Box } from '@material-ui/core'

const loginForm = ({
  username,
  password,
  handleLogin,
  handleUsernameChange,
  handlePasswordChange
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        <TextField
          id='username'
          label='username'
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>
      <div>
        <TextField
          id='password'
          label='password'
          type='password'
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <Box mt={1}>
        <Button variant='contained' color='primary' type='submit'>
          login
        </Button>
      </Box>
    </form>
  )
}

export default loginForm
