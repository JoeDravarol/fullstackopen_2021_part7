import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <Box mt={2}>
      <div style={hideWhenVisible}>
        <Button variant='contained' onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <Button variant='contained' color='secondary' onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </Box>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
