import http from './httpService'
import { LogoutUser } from './loginService'
import { apiUrls } from './urls'
export const InsertUserRole = data => {
  const token = localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .post(apiUrls.userRoleInsert, data, config)
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
export const UpdateUserRole = data => {
  const token = localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .post(apiUrls.updateUserRole, data, config)
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
export const DeleteAllUserRole = data => {
  const token = localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .post(apiUrls.deleteAllUserRole, data, config)
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
