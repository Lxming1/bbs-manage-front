import { memo, Suspense, useEffect } from 'react'
import AppWrapper from './router'

export default memo(function App() {
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    window.location.href = user === null ? '#/login' : '#/'
  }, [window.location.href])
  return (
    <Suspense fallback={<div>page loading</div>}>
      <AppWrapper />
    </Suspense>
  )
})
