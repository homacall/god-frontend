import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSetRecoilState } from 'recoil'
import { userData } from '../store/atom'
import { PrivateRoutes } from './privateRoutes'
import { PublicRoutes } from './publicRoutes'

function God() {
  const navigate = useNavigate()
  localStorage.setItem('token', 'token')
  const token = localStorage.getItem('token')
  const setToken = useSetRecoilState(userData)

  useEffect(() => {
    if (!token) {
      navigate('/login/')
    } else {
      setToken(token)
    }
  }, [navigate, token])

  return <div className="God">{token ? <PrivateRoutes /> : <PublicRoutes />}</div>
}

export default God
