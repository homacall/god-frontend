export const GodHOST = process.env.REACT_APP_GOD_API_HOST || ''
export const apiUrls = {
  login: GodHOST.concat('/LoginGod/Login'),
  createLanguage: GodHOST.concat('/LanguageGod/insert'),
  province: GodHOST.concat('/ProvinceGod/GetAll'),
  provinceGetAll: GodHOST.concat('/ProvinceGod/GetAll'),
  cityGetByProvinceId: GodHOST.concat('/CityGod/GetByProvinceID'),
}
