import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useSetRecoilState } from 'recoil'
import { userData } from '../store/atom'
import { PrivateRoutes } from './privateRoutes'
import { PublicRoutes } from './publicRoutes'
import { pathState } from '../store/atom'
import { GetFilePathBySysNames } from '../service/filePathService'
import { GetAllSystemPath } from '../service/systemPathService'

function God() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const setToken = useSetRecoilState(userData)
  const setPath = useSetRecoilState(pathState)
  const [systemNames, setSystemNames] = useState('')

  useEffect(() => {
    if (!token) {
      navigate('/login/')
    } else {
      setToken(token)
    }
  }, [navigate, token, setToken])

  const fetchAllSystems = useCallback(() => {
    GetAllSystemPath()
      .then(res => {
        var sysNames = ''
        res.data.map(function (item) {
          sysNames += item.sys_Name.concat(',')
        })
        sysNames = sysNames.substring(0, sysNames.length - 1)
        setSystemNames(sysNames)
      })
      .catch(e => console.log(e))
    //setSystemNames('Logo,User')
  })

  const fetchAllPath = useCallback(() => {
    const formData = new FormData()
    formData.append('SystemNames', systemNames)
    if (systemNames !== '') {
      GetFilePathBySysNames(formData)
        .then(res => {
          if (res.data) {
            setPath(res.data.filePaths)
          }
        })
        .catch(e => console.log(e))
    }
  })

  useEffect(() => {
    fetchAllSystems()
    localStorage.setItem('token', '123')
  }, [fetchAllSystems])

  useEffect(() => {
    fetchAllPath()
  }, [fetchAllPath])

  return <div className="God">{token ? <PrivateRoutes /> : <PublicRoutes />}</div>
}

export default God
