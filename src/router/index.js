// 路由懒加载
import { useRoutes } from 'react-router-dom'
import Login from '../pages/login'
import Home from '../pages/home'
import Users from '../pages/home/users'
import Roles from '../pages/home/roles'
import Rights from '../pages/home/rights'
import Moments from '../pages/home/moments'
import Plates from '../pages/home/plates'
import NotFound from '../pages/notFount'
import VerifyAuthorization from '../components/verifyAuthorization'

const verify = (Cpn, login = false) => (
  <VerifyAuthorization login={login}>{Cpn}</VerifyAuthorization>
)

const routes = [
  {
    path: '/login',
    element: verify(<Login />, true),
  },
  {
    path: '/',
    element: verify(<Home />),
    children: [
      {
        path: '/',
        element: verify(<Users />),
      },
      {
        path: '/users',
        element: verify(<Users />),
      },
      {
        path: '/roles',
        element: verify(<Roles />),
      },
      {
        path: '/rights',
        element: verify(<Rights />),
      },
      {
        path: '/moments',
        element: verify(<Moments />),
      },
      {
        path: '/plates',
        element: verify(<Plates />),
      },
      {
        path: '*',
        element: verify(<NotFound />),
      },
    ],
  },
  {
    path: '*',
    element: verify(<Login />, true),
  },
]

const App = () => useRoutes(routes)

export default App
