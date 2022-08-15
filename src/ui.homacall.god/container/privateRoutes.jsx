import { Route, Routes } from 'react-router'
import { Helmet } from 'react-helmet'
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
import {
  language,
  users,
  rolls,
  authRoutes,
  routeStretcher,
  tags,
  manage,
  menu,
  loginLogo,
  annexSettings,
} from '../utils/constants/routes/publicRoute'
import { RouteStretcher } from '../module/routeStretcher'
import { CreateAndEditStretcher } from '../module/routeStretcher/components/CreateStretcher'
import { MenuLinks } from '../module/menuLink'
import { AnnexSettings } from '../module/annexSettings'

import LoginLogo from '../module/loginLogo'
import CreateEditLoginLogo from '../module/loginLogo/components/CreateEditLoginLogo'
import CreateEditMenuLink from '../module/menuLink/components/CreateEditMenuLink'
import { CreateAnnexSettings } from '../module/annexSettings/components/createAnnexSettings'
import { EditAnnexSettings } from '../module/annexSettings/components/editAnnexSettings'

export const PrivateRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route
          path={`${authRoutes.login}`}
          element={
            <>
              <Helmet>
                <title>ورود</title>
              </Helmet>
              <LoginForm />
            </>
          }
        />
        <Route
          path={`${language.languageTable}`}
          element={
            <>
              <Helmet>
                <title>مدیریت زبان</title>
              </Helmet>
              <LanguagePage />
            </>
          }
        />
        <Route
          path={`${language.newForm}`}
          element={
            <>
              <Helmet>
                <title>مدیریت زبان</title>
              </Helmet>
              <NewLanguage />
            </>
          }
        />
        <Route
          path={`${users.users}`}
          element={
            <>
              <Helmet>
                <title>مدیریت کاربران</title>
              </Helmet>
              <UsersPage />
            </>
          }
        />
        <Route
          path={`${users.createUser}`}
          element={
            <>
              <Helmet>
                <title>مدیریت کاربران</title>
              </Helmet>
              <CreateAndEditUser />
            </>
          }
        />
        <Route
          path={`${users.update}`}
          element={
            <>
              <Helmet>
                <title>مدیریت کاربران</title>
              </Helmet>
              <CreateAndEditUser />
            </>
          }
        />
        <Route
          path={rolls.roll}
          element={
            <>
              <Helmet>
                <title>راهبری نقش</title>
              </Helmet>
              <Roll />
            </>
          }
        />
        <Route
          path={rolls.newRoll}
          element={
            <>
              <Helmet>
                <title>راهبری نقش</title>
              </Helmet>
              <CreateRoll />
            </>
          }
        />
        <Route
          path={`${tags.tag}`}
          element={
            <>
              <Helmet>
                <title>مدیریت تگ</title>
              </Helmet>
              <Tag />
            </>
          }
        />
        <Route
          path={`${tags.newTag}`}
          element={
            <>
              <Helmet>
                <title>مدیریت تگ</title>
              </Helmet>
              <CreateTag />
            </>
          }
        />
        <Route
          path={`${manage.company}`}
          element={
            <>
              <Helmet>
                <title>مدیریت شرکت</title>
              </Helmet>
              <Company />
            </>
          }
        />
        <Route
          path={`${manage.newCompany}`}
          element={
            <>
              <Helmet>
                <title>مدیریت شرکت</title>
              </Helmet>
              <CreateCompany />
            </>
          }
        />
        <Route
          path={`${manage.editCompany}`}
          element={
            <>
              <Helmet>
                <title>مدیریت شرکت</title>
              </Helmet>
              <CreateCompany />
            </>
          }
        />
        <Route
          path={routeStretcher.main}
          element={
            <>
              <Helmet>
                <title>انتصاب مسیر</title>
              </Helmet>
              <RouteStretcher />
            </>
          }
        />
        <Route
          path={routeStretcher.create}
          element={
            <>
              <Helmet>
                <title>انتصاب مسیر</title>
              </Helmet>
              <CreateAndEditStretcher />
            </>
          }
        />
        <Route
          path={routeStretcher.update}
          element={
            <>
              <Helmet>
                <title>انتصاب مسیر</title>
              </Helmet>
              <CreateAndEditStretcher />
            </>
          }
        />
        <Route
          path={`${menu.main}`}
          element={
            <>
              <Helmet>
                <title>تعریف منوها</title>
              </Helmet>
              <MenuLinks />
            </>
          }
        />
        <Route
          path={`${menu.create}`}
          element={
            <>
              <Helmet>
                <title>تعریف منوها</title>
              </Helmet>
              <CreateEditMenuLink />
            </>
          }
        />
        <Route
          path={`${menu.edit}`}
          element={
            <>
              <Helmet>
                <title>تعریف منوها</title>
              </Helmet>
              <CreateEditMenuLink />
            </>
          }
        />
        {/* <Route
          path={`${serviceType.main}`}
          element={
            <>
              <Helmet>
                <title>تعریف انواع سرویس</title>
              </Helmet>
              <ServiceType />
            </>
          }
        />
        <Route
          path={`${serviceType.create}`}
          element={
            <>
              <Helmet>
                <title>تعریف انواع سرویس</title>
              </Helmet>
              <CreateEditServiceType />
            </>
          }
        /> */}
        {/* <Route
          path={`${serviceType.edit}`}
          element={
            <>
              <Helmet>
                <title>تعریف انواع سرویس</title>
              </Helmet>
              <CreateEditServiceType />
            </>
          }
        />
        <Route
          path={`${systemPath.main}`}
          element={
            <>
              <Helmet>
                <title>مسیر سیستم ها</title>
              </Helmet>
              <SystemPath />
            </>
          }
        /> */}
        {/* <Route
          path={`${systemPath.create}`}
          element={
            <>
              <Helmet>
                <title>مسیر سیستم ها</title>
              </Helmet>
              <CreateEditSystemPath />
            </>
          }
        />
        <Route
          path={`${systemPath.edit}`}
          element={
            <>
              <Helmet>
                <title>مسیر سیستم ها</title>
              </Helmet>
              <CreateEditSystemPath />
            </>
          }
        /> */}
        {/* <Route
          path={`${filePath.main}`}
          element={
            <>
              <Helmet>
                <title>مسیر فایل ها</title>
              </Helmet>
              <FilePath />
            </>
          }
        />
        <Route
          path={`${filePath.create}`}
          element={
            <>
              <Helmet>
                <title>مسیر فایل ها</title>
              </Helmet>
              <CreateEditFilePath />
            </>
          }
        />
        <Route
          path={`${filePath.edit}`}
          element={
            <>
              <Helmet>
                <title>مسیر فایل ها</title>
              </Helmet>
              <CreateEditFilePath />
            </>
          }
        /> */}
        <Route
          path={`${loginLogo.main}`}
          element={
            <>
              <Helmet>
                <title>آپلود لوگو ورود</title>
              </Helmet>
              <LoginLogo />
            </>
          }
        />
        <Route
          path={`${loginLogo.create}`}
          element={
            <>
              <Helmet>
                <title>آپلود لوگو ورود</title>
              </Helmet>
              <CreateEditLoginLogo />
            </>
          }
        />
        <Route
          path={`${loginLogo.edit}`}
          element={
            <>
              <Helmet>
                <title>آپلود لوگو ورود</title>
              </Helmet>
              <CreateEditLoginLogo />
            </>
          }
        />

        <Route
          path={`${annexSettings.main}`}
          element={
            <>
              <Helmet>
                <title>تنظیمات بایگانی</title>
              </Helmet>
              <AnnexSettings />
            </>
          }
        />
        <Route
          path={`${annexSettings.create}`}
          element={
            <>
              <Helmet>
                <title>ایجاد تنظیمات بایگانی</title>
              </Helmet>
              <CreateAnnexSettings />
            </>
          }
        />
        <Route
          path={`${annexSettings.edit}`}
          element={
            <>
              <Helmet>
                <title>ویرایش تنظیمات بایگانی</title>
              </Helmet>
              <EditAnnexSettings />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <Helmet>
                <title>داشبورد</title>
              </Helmet>
              <h1 style={{ textAlign: 'center', marginTop: 100 }}>سلام، به پنل اصلی خوش آمدید</h1>
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  )
}
