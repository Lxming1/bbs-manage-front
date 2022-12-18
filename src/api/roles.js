import request from './index'

export const list = (pagenum, pagesize) => {
  return request({
    url: `/roles`,
    params: {
      pagenum,
      pagesize,
    },
  })
}

export const del = (uid) => {
  return request({
    url: `/roles/${uid}`,
    method: 'delete',
  })
}

export const search = (role, pagenum, pagesize) => {
  return request({
    url: `/roles/search`,
    method: 'post',
    params: {
      pagenum,
      pagesize,
    },
    data: {
      role,
    },
  })
}

export const add = ({ name, desc }) => {
  return request({
    url: `/roles`,
    data: {
      name,
      desc,
    },
  })
}

export const assigning = (roleId, rightsList) => {
  return request({
    url: `/roles/${roleId}/rights`,
    method: 'post',
    data: {
      rightsList,
    },
  })
}

export const edit = (roleId, { name, desc }) => {
  return request({
    url: `/roles/${roleId}`,
    method: 'put',
    data: {
      name,
      desc,
    },
  })
}

export const roleRights = (roleId, { name, desc }) => {
  return request({
    url: `/roles/${roleId}/rights`,
  })
}
