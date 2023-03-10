import request from './index'

export const login = ({ email, password }) => {
  return request({
    url: '/login',
    method: 'post',
    data: {
      email,
      password,
    },
  })
}

export const getMenus = () => {
  return request({
    url: '/menus',
  })
}
