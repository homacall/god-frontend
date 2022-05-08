import { Route, Routes, useLocation } from 'react-router'
import { Navigate } from "react-router-dom";
import MainLayout from '../layout/mainLayout'
import LoginForm from '../module/auth/login/loginForm'
import { UsersPage } from '../module/createUser'
import CreateUser from '../module/createUser/components/createUser'
import Language from '../module/language/language'
import NewLanguage from '../module/language/newLanguage'
import { Roll } from '../module/roll'
import { authRoutes, language, users, rolls } from '../utils/constants/routes/publicRoute'

function God() {

  const token = localStorage.getItem("token");
  const location = useLocation();

  return (
    <div className="God">
      <MainLayout>
        <Routes>
          <Route path={`${authRoutes.login}`} element={<LoginForm />} />
          <Route path={`${language.languageTable}`} element={<Language />} />
          <Route path={`${language.newForm}`} element={<NewLanguage />} />
          <Route path={`${users.users}`} element={<UsersPage />} />
          <Route path={`${users.createUser}`} element={<CreateUser />} />
          <Route path={rolls.roll} element={<Roll />} />
          <Route path="/" element={token ? <h1 style={{ textAlign: 'center', marginTop: 100 }}>سلام، به پنل اصلی خوش آمدید</h1> : <Navigate to="/" replace state={{ from: location }} />} />
        </Routes>
      </MainLayout>
    </div>
  )
}

export default God
