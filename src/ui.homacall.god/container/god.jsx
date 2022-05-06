import { Route, Routes } from 'react-router'
import MainLayout from '../layout/mainLayout'
import LoginForm from '../module/auth/login/loginForm'
import { CreateUser } from '../module/createUser'
import Language from '../module/language/language'
import NewLanguage from '../module/language/newLanguage'
import { authRoutes, language, users } from '../utils/constants/routes/publicRoute'

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
        </Routes>
      </MainLayout>
    </div>
  )
}

export default God
