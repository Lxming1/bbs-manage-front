import { memo } from 'react'
import { Navigate } from 'react-router'

export default memo(({ children, login }) => {
  const user = JSON.parse(sessionStorage.getItem('user'))
  if (user === null) {
    return login ? children : <Navigate to="/login" />
  } else {
    return login ? <Navigate to="/" /> : children
  }
})
