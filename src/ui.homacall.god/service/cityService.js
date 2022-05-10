import http from './httpService'
import { apiUrls } from './urls'
export const CityServiceGetByProvinceID = PrviceID => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http.post(apiUrls.cityGetByProvinceId, PrviceID, config)
}
