import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { PrivateRoutes } from './privateRoutes'
import { PublicRoutes } from './publicRoutes'

function God() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      navigate('/login/')
    }
  }, [navigate, token])

  return <div className="God">{token ? <PrivateRoutes /> : <PublicRoutes />}</div>
}

export default God
