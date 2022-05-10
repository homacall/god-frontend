import http from './httpService'
import { apiUrls } from './urls'
export const ProvinceServiceGetAll = () => {
  const token = localStorage.getItem('token')

  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http.get(apiUrls.provinceGetAll, config)
}
