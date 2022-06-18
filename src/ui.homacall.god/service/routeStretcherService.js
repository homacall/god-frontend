import http from './httpService'
import { LogoutUser } from './loginService'
import { apiUrls } from './urls'
export const GetAllRoutesGodByType = () => {
  const token = localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .get(apiUrls.getAllRoutesByType, config)
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
export const GetAllRoutesGodByTypeRouteTree = () => {
  const token = localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .get(apiUrls.getAllRoutesByTypeForTree, config)
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
export const CreateRouteStructure = data => {
  const token = localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .post(apiUrls.createRoteStructure, data, config)
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
export const DeleteRouteStructure = id => {
  const token = localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .post(apiUrls.deleteRoteStructure, id, config)
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
export const UpdateRouteStructure = data => {
  const token = localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .post(apiUrls.updateRouteStructure, data, config)
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
export const GetByIdRouteStructure = id => {
  const token = localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .post(apiUrls.getByIdRouteStructure, id, config)
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
export const GetAllByParentTypeRouteStructure = id => {
  const token = localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .post(apiUrls.getAllRoutesStrByParentType, id, config)
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

export const GetAllRoutesByParent = id => {
  const token = localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  return http
    .post(apiUrls.getAllRoutesByParent, id, config)
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
