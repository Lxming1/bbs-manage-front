// 路由懒加载
import { useRoutes } from 'react-router-dom'
import Login from '../pages/login'
import Home from '../pages/home'
import Users from '../pages/home/users'
import UsersDetail from '../pages/home/users/detail'
import Roles from '../pages/home/roles'
import Rights from '../pages/home/rights'
import Moments from '../pages/home/moments'
import MomentsDetail from '../pages/home/moments/detail'
import Examine from '../pages/home/examine'
import ExamineDetail from '../pages/home/examine/table/detail'
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
        path: '/users',
        element: verify(<Users />),
      },
      {
        path: '/users/:userId',
        element: verify(<UsersDetail />),
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
        path: '/moments/:momentId',
        element: verify(<MomentsDetail />),
      },
      {
        path: '/examine',
        element: verify(<Examine />),
      },
      {
        path: '/examine/:momentId',
        element: verify(<ExamineDetail />),
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
