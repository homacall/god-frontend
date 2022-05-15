import http from './httpService'
import { apiUrls } from './urls'
export const InsertRole = data => {
  const token = localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .post(apiUrls.insertRol, data, config)
    .then(res => res)
    .catch(err => {
      if (err.status === 401) {
        localStorage.removeItem('token')
        window.location.replace('/login/')
      } else {
        return err
      }
    })
}
export const DeleteRole = data => {
  const token = localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .post(apiUrls.deleteRol, data, config)
    .then(res => res)
    .catch(err => {
      if (err.status === 401) {
        localStorage.removeItem('token')
        window.location.replace('/login/')
      } else {
        return err
      }
    })
}

export const UpdateRole = data => {
  const token = localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .post(apiUrls.updateRol, data, config)
    .then(res => res)
    .catch(err => {
      if (err.status === 401) {
        localStorage.removeItem('token')
        window.location.replace('/login/')
      } else {
        return err
      }
    })
}

export const GetAllRole = () => {
  const token = localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .get(apiUrls.getAllRol, config)
    .then(res => res)
    .catch(err => {
      if (err.status === 401) {
        localStorage.removeItem('token')
        window.location.replace('/login/')
      } else {
        return err
      }
    })
}
