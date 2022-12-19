import request from './index'

// type = tree or list
export const list = (type = 'list') => {
  return request({
    url: `/rights`,
    params: {
      type,
    },
  })
}

export const roleRights = (roleId) => {
  return request({
    url: `/roles/${roleId}/rights`,
  })
}
