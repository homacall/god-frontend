export const GodHOST = process.env.REACT_APP_GOD_API_HOST || ''
export const apiUrls = {
  login: GodHOST.concat('/LoginGod/Login'),
  createLanguage: GodHOST.concat('/LanguageGod/insert'),
  getAllLanguage: GodHOST.concat('/LanguageGod/GetAll'),
  deleteLanguage: GodHOST.concat('/LanguageGod/Delete'),
  updateLanguage: GodHOST.concat('/LanguageGod/Update'),
  province: GodHOST.concat('/ProvinceGod/GetAll'),
  provinceGetAll: GodHOST.concat('/ProvinceGod/GetAll'),
  cityGetByProvinceId: GodHOST.concat('/CityGod/GetByProvinceID'),
  insertUser: GodHOST.concat('/UserGod/Insert'),
  getAllUser: GodHOST.concat('/UserGod/GetAll'),
  deleteUser: GodHOST.concat('/UserGod/Delete'),
}
