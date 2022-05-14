import http from './httpService'
import { apiUrls } from './urls'

export const getAll = () => {
  const token = localStorage.getItem('token')

  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }

  return http
    .post(apiUrls.getAllCompany, config)
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

export const insertCompany = data => {
  const token = localStorage.getItem('token')

  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }

  return http
  .post(apiUrls.insertCompany, data, config)
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

export const updateCompany = (data, id) => {
  const token = localStorage.getItem('token')

  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }

  return http
  .post(apiUrls.updateCompany, data, id, config)
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

export const deleteCompany = id => {
  const token = localStorage.getItem('token')

  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }

  return http
  .post(apiUrls.deleteCompany, id, config)
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
