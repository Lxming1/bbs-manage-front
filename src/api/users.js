import request from './index'

export const list = (pagenum, pagesize) => {
  return request({
    url: `/users`,
    params: {
      pagenum,
      pagesize,
    },
  })
}

export const del = (uid) => {
  return request({
    url: `/users/${uid}`,
    method: 'delete',
  })
}

export const search = (user, pagenum, pagesize) => {
  return request({
    url: `/users/search`,
    method: 'post',
    params: {
      pagenum,
      pagesize,
    },
    data: {
      user,
    },
  })
}

export const add = (email, password) => {
  return request({
    url: `/users`,
    method: 'post',
    data: {
      email,
      password,
    },
  })
}

export const assigning = (userId, roleId) => {
  return request({
    url: `/users/${userId}/role/${roleId}`,
    method: 'put',
  })
}

export const edit = (userId, info) => {
  return request({
    url: `/users/${userId}`,
    method: 'put',
    data: info,
  })
}

export const userRole = (uid) => {
  return request({
    url: `/users/${uid}/role`,
  })
}
