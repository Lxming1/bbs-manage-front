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
