import { Route, Routes } from 'react-router'
import { NotFound } from '../component/notFound'
import MainLayout from '../layout/mainLayout'
import { UsersPage } from '../module/createUser'
import { LanguagePage } from '../module/language'
import CreateUser from '../module/createUser/components/createUser'
import NewLanguage from '../module/language/component/newLanguage'
import { Roll } from '../module/roll'
import { CreateRoll } from '../module/roll/CreateRoll'
import { Tag } from '../module/tag'
import { CreateTag } from '../module/tag/components/CreateTag'
import { language, users, rolls, authRoutes, tags } from '../utils/constants/routes/publicRoute'
import LoginForm from '../module/auth/login/loginForm'

export const PrivateRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path={`${authRoutes.login}`} element={<LoginForm />} />
        <Route path={`${language.languageTable}`} element={<LanguagePage />} />
        <Route path={`${language.newForm}`} element={<NewLanguage />} />
        <Route path={`${users.users}`} element={<UsersPage />} />
        <Route path={`${users.createUser}`} element={<CreateUser />} />
        <Route path={rolls.roll} element={<Roll />} />
        <Route path={rolls.newRoll} element={<CreateRoll />} />
        <Route path={`${tags.tag}`} element={<Tag />} />
        <Route path={`${tags.newTag}`} element={<CreateTag />} />
        <Route path="/" element={<h1 style={{ textAlign: 'center', marginTop: 100 }}>سلام، به پنل اصلی خوش آمدید</h1>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  )
}
