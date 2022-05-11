import http from './httpService'
import { apiUrls } from './urls'
export const CityServiceGetByProvinceID = PrviceID => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .post(apiUrls.cityGetByProvinceId, PrviceID, config)
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
