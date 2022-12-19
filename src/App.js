import { memo, Suspense, useEffect } from 'react'
import AppWrapper from './router'

export default memo(function App() {
  return (
    <Suspense fallback={<div>page loading</div>}>
      <AppWrapper />
    </Suspense>
  )
})
