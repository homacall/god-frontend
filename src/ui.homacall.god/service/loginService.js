import http from './httpService'
import { apiUrls } from './urls'
export const loginUser = user => {
  return http.post(apiUrls.login, user)
}
export const LogoutUser = () => {
  const token = localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http.get(apiUrls.logOut, config).then(res => {
    if (res.data.message === 'Delete') {
      return true
    } else return false
  })
}
