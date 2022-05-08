import http from './httpService'
import { apiUrls } from './urls'
export const loginUser = user => {
  return http.post(apiUrls.createLanguage, user)
}
