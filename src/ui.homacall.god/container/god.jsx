import { Route, Routes } from 'react-router'
import MainLayout from '../layout/mainLayout'
import LoginForm from '../module/auth/login/loginForm'
import { UsersPage } from '../module/createUser'
import CreateUser from '../module/createUser/components/createUser'
import Language from '../module/language/language'
import NewLanguage from '../module/language/newLanguage'
import { Roll } from '../module/roll'
import { authRoutes, language, users, rolls } from '../utils/constants/routes/publicRoute'

function God() {
  return (
    <div className="God">
      <MainLayout>
        <Routes>
          <Route path={`${authRoutes.login}`} element={<LoginForm />} />
          <Route path={`${language.languageTable}`} element={<Language />} />
          <Route path={`${language.newForm}`} element={<NewLanguage />} />
          <Route path={`${users.users}`} element={<UsersPage />} />
          <Route path={`${users.createUser}`} element={<CreateUser />} />
          <Route path="/" element={<h1 style={{ textAlign: 'center', marginTop: 100 }}>سلام، به پنل اصلی خوش آمدید</h1>} />
          <Route path={rolls.roll} element={<Roll />} />
        </Routes>
      </MainLayout>
    </div>
  )
}

export default God
