import http from './httpService'
import { apiUrls } from './urls'
export const insertUser = data => {
  const token = localStorage.getItem('token')

  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .post(apiUrls.insertUser, data, config)
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

export const GetAllUser = () => {
  const token = localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .get(apiUrls.getAllUser, config)
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
export const DeleteUser = id => {
  const token = localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .post(apiUrls.deleteUser, id, config)
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
