import http from './httpService'
import { apiUrls } from './urls'
export const ProvinceServiceGetAll = token => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http.get(apiUrls.province, config)
}
