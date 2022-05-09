<<<<<<< Updated upstream
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
=======
import { Route, Routes } from 'react-router'
import MainLayout from '../layout/mainLayout'
import LoginForm from '../module/auth/login/loginForm'
import { CreateUser } from '../module/createUser'
import Language from '../module/language/language'
import NewLanguage from '../module/language/newLanguage'
import { Roll } from '../module/roll'
import CreateRoll from '../module/roll/CreateRoll'
import { authRoutes, language, users, rolls } from '../utils/constants/routes/publicRoute'

function God() {
  return (
    <div className="God">
      <MainLayout>
        <Routes>
          <Route path={`${authRoutes.login}`} element={<LoginForm />} />
          <Route path={`${language.languageTable}`} element={<Language />} />
          <Route path={`${language.newForm}`} element={<NewLanguage />} />
          <Route path={`${users.createUser}`} element={<CreateUser />} />
          <Route path="/" element={<h1 style={{ textAlign: 'center', marginTop: 100 }}>سلام، به پنل اصلی خوش آمدید</h1>} />
          <Route path={rolls.roll} element={<Roll />} />
          <Route path={rolls.newRoll}  element={<CreateRoll />} />
        </Routes>
      </MainLayout>
    </div>
  )
>>>>>>> Stashed changes
}

export default God
