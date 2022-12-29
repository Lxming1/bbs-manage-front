import request from './'

export const getMoments = (pagenum, pagesize, type = 'all') => {
  return request({
    url: `/moment/${type}`,
    params: {
      pagenum,
      pagesize,
    },
  })
}

export const getMoment = (momentId) => {
  return request({
    url: `/moment/${momentId}/detail`,
  })
}

export const searchMoment = (content, pagenum, pagesize, type = 'all') => {
  return request({
    url: `/moment/search/${type}`,
    method: 'post',
    params: {
      pagenum,
      pagesize,
    },
    data: {
      content,
    },
  })
}

export const checkMoment = (momentId, status) => {
  return request({
    url: `/moment/${momentId}/check/${status}`,
    method: 'put',
  })
}

export const getCommentsByMomentId = (momentId) => {
  return request({
    url: `/comment/${momentId}`,
  })
}

export const changeCommentStatus = (id, status) => {
  return request({
    url: `/comment/${id}`,
    method: 'put',
    data: {
      status,
    },
  })
}
