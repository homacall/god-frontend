import http from './httpService'
import { LogoutUser } from './loginService'
import { apiUrls } from './urls'
export const ProvinceServiceGetAll = () => {
  const token = localStorage.getItem('token')

  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .get(apiUrls.provinceGetAll, config)
    .then(res => {
      if (res.data.message === 'Unauthorized') {
        LogoutUser().finally(() => {
          localStorage.removeItem('token')
          window.location.replace('/login/')
        })
      } else {
        return res
      }
    })
    .catch(err => {
      console.log(err)
    })
}
