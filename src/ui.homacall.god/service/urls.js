export const GodHOST = process.env.REACT_APP_GOD_API_HOST || ''
export const apiUrls = {
  login: GodHOST.concat('/LoginGod/Login'),
  createLanguage: GodHOST.concat('/LanguageGod/insert'),
}
