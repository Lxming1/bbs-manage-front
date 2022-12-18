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

export const add = ({ email, password }) => {
  return request({
    url: `/users`,
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

export const edit = (userId, { name, introduction }) => {
  return request({
    url: `/user/${userId}`,
    method: 'put',
    data: {
      name,
      introduction,
    },
  })
}

export const userRole = (uid) => {
  return request({
    url: `/users/${uid}/role`,
  })
}
