import { Route, Routes } from 'react-router'
import { NotFound } from '../component/notFound'
import MainLayout from '../layout/mainLayout'
import { UsersPage } from '../module/createUser'
import CreateUser from '../module/createUser/components/createUser'
import Language from '../module/language/language'
import NewLanguage from '../module/language/newLanguage'
import { Roll, CreateRoll } from '../module/roll'
import { language, users, rolls, authRoutes } from '../utils/constants/routes/publicRoute'
import LoginForm from '../module/auth/login/loginForm'

export const PrivateRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path={`${authRoutes.login}`} element={<LoginForm />} />
        <Route path={`${language.languageTable}`} element={<Language />} />
        <Route path={`${language.newForm}`} element={<NewLanguage />} />
        <Route path={`${users.users}`} element={<UsersPage />} />
        <Route path={`${users.createUser}`} element={<CreateUser />} />
        <Route path={rolls.roll} element={<Roll />} />
        <Route path={rolls.newRoll} element={<CreateRoll />} />
        <Route path="/" element={<h1 style={{ textAlign: 'center', marginTop: 100 }}>سلام، به پنل اصلی خوش آمدید</h1>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  )
}
