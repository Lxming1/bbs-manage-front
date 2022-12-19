import request from '.'

export const list = (pagenum, pagesize) => {
  return request({
    url: '/plate',
    params: {
      pagenum,
      pagesize,
    },
  })
}

export const del = (plateId) => {
  return request({
    url: `/plate/${plateId}`,
    method: 'delete',
  })
}

export const add = ({ name, description }) => {
  return request({
    url: `/plate`,
    method: 'post',
    data: {
      name,
      description,
    },
  })
}

export const edit = (plateId, { name, description }) => {
  return request({
    url: `/plate/${plateId}`,
    method: 'put',
    data: {
      name,
      description,
    },
  })
}
