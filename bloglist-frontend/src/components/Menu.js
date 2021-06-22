import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/loginReducer'

const useStyles = makeStyles({
  typographyStyle: {
    textTransform: 'uppercase'
  }
})

const Menu = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const classes = useStyles()

  return (
    <AppBar position='static'>
      <Toolbar>
        <Button color='inherit' component={Link} to='/'>
          blogs
        </Button>

        <Button color='inherit' component={Link} to='/users'>
          users
        </Button>

        <Typography className={classes.typographyStyle} component='em'>
          {user.name} logged in
        </Typography>

        <Button color='inherit' onClick={() => dispatch( logout() )}>
          logout
        </Button>
      </Toolbar>
    </AppBar>

  )
}

export default Menu
