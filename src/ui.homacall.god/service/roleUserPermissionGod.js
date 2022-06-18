import http from './httpService'
import { LogoutUser } from './loginService'
import { apiUrls } from './urls'
export const InsertRoleUserPermission = data => {
  const token = localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .post(apiUrls.insertRoleUserPermissionGod, data, config)
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
export const DeleteAllRoleUserPermission = id => {
  const token = localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .post(apiUrls.deleteAllRoleUserPermissionGod, id, config)
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
export const GetAllPermissionUserActions = id => {
  const token = localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .post(apiUrls.getAllPermissionUserActions, id, config)
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
export const GetAllPermissionUserRoutePath = id => {
  const token = localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .post(apiUrls.getAllPermissionUserRoutePath, id, config)
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
