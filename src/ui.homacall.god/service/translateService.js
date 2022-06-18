import http from './httpService'
import { LogoutUser } from './loginService'
import { apiUrls } from './urls'
export const getTranslateByTagId = data => {
  const token = localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .post(apiUrls.getTranslateTagId, data, config)
    .then(res => {
      if (res.data.message === 'Unauthorized') {
        LogoutUser().finally(() => {
          localStorage.removeItem('token')
          window.location.replace('/login/')
        })
      } else {
        return res
      }
    })
    .catch(err => {
      console.log(err)
    })
}
export const insertTranslate = data => {
  const token = localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .post(apiUrls.insertTranslate, data, config)
    .then(res => {
      if (res.data.message === 'Unauthorized') {
        LogoutUser().finally(() => {
          localStorage.removeItem('token')
          window.location.replace('/login/')
        })
      } else {
        return res
      }
    })
    .catch(err => {
      console.log(err)
    })
}
export const UpdateTranslate = data => {
  const token = localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .post(apiUrls.updateTranslate, data, config)
    .then(res => {
      if (res.data.message === 'Unauthorized') {
        LogoutUser().finally(() => {
          localStorage.removeItem('token')
          window.location.replace('/login/')
        })
      } else {
        return res
      }
    })
    .catch(err => {
      console.log(err)
    })
}
export const GetAllTagsTranslate = () => {
  const token = localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .get(apiUrls.getAllTagsTranslate, config)
    .then(res => {
      if (res.data.message === 'Unauthorized') {
        LogoutUser().finally(() => {
          localStorage.removeItem('token')
          window.location.replace('/login/')
        })
      } else {
        return res
      }
    })
    .catch(err => {
      console.log(err)
    })
}
