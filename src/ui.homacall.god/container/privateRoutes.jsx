import { Route, Routes } from 'react-router'
import { NotFound } from '../component/notFound'
import MainLayout from '../layout/mainLayout'
import { UsersPage } from '../module/createUser'
import { LanguagePage } from '../module/language'
import CreateAndEditUser from '../module/createUser/components/createUser'
import NewLanguage from '../module/language/component/newLanguage'
import { Roll } from '../module/roll'
import { CreateRoll } from '../module/roll/components/CreateRoll'
import { Tag } from '../module/tag'
import { CreateTag } from '../module/tag/components/CreateTag'
import LoginForm from '../module/auth/login/loginForm'
import { Company } from '../module/company'
import { CreateCompany } from '../module/company/components/CreateCompany'
import { language, users, rolls, authRoutes, routeStretcher, tags, manage, serverConnection } from '../utils/constants/routes/publicRoute'
import { RouteStretcher } from '../module/routeStretcher'
import { CreateAndEditStretcher } from '../module/routeStretcher/components/CreateStretcher'
import { ServerConnection } from '../module/serverConnection'
import CreateEditServerConnection from '../module/serverConnection/components/CreateEditServerConnection'

export const PrivateRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path={`${authRoutes.login}`} element={<LoginForm />} />
        <Route path={`${language.languageTable}`} element={<LanguagePage />} />
        <Route path={`${language.newForm}`} element={<NewLanguage />} />
        <Route path={`${users.users}`} element={<UsersPage />} />
        <Route path={`${users.createUser}`} element={<CreateAndEditUser />} />
        <Route path={`${users.update}`} element={<CreateAndEditUser />} />
        <Route path={rolls.roll} element={<Roll />} />
        <Route path={rolls.newRoll} element={<CreateRoll />} />
        <Route path={`${tags.tag}`} element={<Tag />} />
        <Route path={`${tags.newTag}`} element={<CreateTag />} />
        <Route path={`${manage.company}`} element={<Company />} />
        <Route path={`${manage.newCompany}`} element={<CreateCompany />} />
        <Route path={`${manage.editCompany}`} element={<CreateCompany />} />
        <Route path={routeStretcher.main} element={<RouteStretcher />} />
        <Route path={routeStretcher.create} element={<CreateAndEditStretcher />} />
        <Route path={routeStretcher.update} element={<CreateAndEditStretcher />} />
        <Route path={`${serverConnection.main}`} element={<ServerConnection />} />
        <Route path={`${serverConnection.create}`} element={<CreateEditServerConnection />} />
        <Route path={`${serverConnection.edit}`} element={<CreateEditServerConnection />} />
        <Route path="/" element={<h1 style={{ textAlign: 'center', marginTop: 100 }}>سلام، به پنل اصلی خوش آمدید</h1>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  )
}
