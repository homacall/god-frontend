import http from './httpService'
import { apiUrls } from './urls'
export const loginUser = user => {
  return http.post(apiUrls.login, user)
}
export const newLanguage = (data, token) => {
  let config = {
    headers: {
      'Authorization': 'Bearer ' + token,
    }
  }
  return http.post(apiUrls.createLanguage, data, config)
}
