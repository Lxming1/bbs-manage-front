import request from './'

export const getMoments = (pagenum, pagesize, plateId) => {
  return request({
    url: `/moment/plate/${plateId}`,
    params: {
      pagenum,
      pagesize,
    },
  })
}

export const getMoment = (momentId) => {
  return request({
    url: `/moment/${momentId}`,
  })
}

export const delMoment = (momentId) => {
  return request({
    url: `/moment/${momentId}`,
    method: 'delete',
  })
}

export const editMoment = (momentId, { title, content, plateId, visible }) => {
  return request({
    url: `/moment/${momentId}`,
    method: 'patch',
    data: {
      title,
      content,
      plateId,
      visible,
    },
  })
}

export const searchMoment = (content, pagenum, pagesize) => {
  return request({
    url: '/moment/search',
    params: {
      pagenum,
      pagesize,
      content,
    },
  })
}

export const uploadPicture = (momentId, data) => {
  return request({
    url: `/upload/picture?momentId=${momentId}`,
    method: 'post',
    data,
  })
}

export const getMomentByUser = (uid, pagenum, pagesize) => {
  return request({
    url: `/users/${uid}/moments`,
    params: {
      pagenum,
      pagesize,
    },
  })
}

export const delMomentPic = (images, momentId) => {
  return request({
    url: `/upload/picture/${momentId}`,
    method: 'delete',
    data: images,
  })
}
