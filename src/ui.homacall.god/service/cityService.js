import http from './httpService'
import { LogoutUser } from './loginService'
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
    .then(res => {
      if (res.data.message === 'Unauthorized') {
        LogoutUser()
          .then(() => {
            localStorage.removeItem('token')
            window.location.replace('/login/')
          })
          .catch(err => {
            localStorage.removeItem('token')
            window.location.replace('/login/')
            console.log(err)
          })
      } else {
        return res
      }
    })
    .catch(err => {
      console.log(err)
    })
}
