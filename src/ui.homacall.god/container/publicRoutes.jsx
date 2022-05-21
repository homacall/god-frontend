import { Route, Routes } from 'react-router'
import { Helmet } from 'react-helmet'

import { authRoutes } from '../utils/constants/routes/publicRoute'
import LoginForm from '../module/auth/login/loginForm'

export const PublicRoutes = () => {
  return (
    <div className={`w-full bg-slate-100 inline-block `}>
      <Routes>
        <Route
          path={`${authRoutes.login}`}
          element={
            <>
              <Helmet>
                <meta charSet="utf-8" />
                <title>ورود</title>
              </Helmet>
              <LoginForm />
            </>
          }
        />
      </Routes>
    </div>
  )
}
