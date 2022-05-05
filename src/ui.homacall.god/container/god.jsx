import { Route, Routes } from "react-router";
import MainLayout from "../layout/mainLayout";
import LoginForm from "../module/auth/login/loginForm";
import Language from "../module/language/language";
import NewLanguage from "../module/language/newLanguage";
import{authRoutes,language} from '../utils/constants/routes/publicRoute'


function God() {
  return (
    <div className="God"> 
      <MainLayout>
       <Routes>
              <Route path={`${authRoutes.login}`} element={<LoginForm />} />
                <Route path={`${language.languageTable}`} element={<Language />} />
                <Route path={`${language.newForm}`} element={<NewLanguage />} />
        </Routes>
        </MainLayout>
       
    </div>
  );
}

export default God;
