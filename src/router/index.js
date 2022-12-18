// 路由懒加载
import { useRoutes } from 'react-router-dom'
import Login from '../pages/login'
import Home from '../pages/home'
import Users from '../pages/home/users'
import Roles from '../pages/home/roles'
import Rights from '../pages/home/rights'
import Moments from '../pages/home/moments'
import Plates from '../pages/home/plates'

const routes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/users',
        element: <Users />,
      },
      {
        path: '/roles',
        element: <Roles />,
      },
      {
        path: '/rights',
        element: <Rights />,
      },
      {
        path: '/moments',
        element: <Moments />,
      },
      {
        path: '/plates',
        element: <Plates />,
      },
    ],
  },
]

const App = () => useRoutes(routes)

export default App
