import http from './httpService'
import { apiUrls } from './urls'

export const GetAllFilePath = () => {
  const token = localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .get(apiUrls.getAllfilePath, config)
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

export const InsertFilePath = data => {
  const token = localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .post(apiUrls.insertfilePath, data, config)
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

export const UpdateFilePath = data => {
  const token = localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .post(apiUrls.updatefilePath, data, config)
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

export const DeleteFilePath = data => {
  const token = localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .post(apiUrls.deletefilePath, data, config)
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

export const GetFilePathById = id => {
  const token = localStorage.getItem('token')

  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }

  return http
    .post(apiUrls.getfilePathById, id, config)
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
