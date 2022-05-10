export const GodHOST = process.env.REACT_APP_GOD_API_HOST || ''
export const apiUrls = {
  createLanguage: GodHOST.concat('/LoginGod/Login'),
  provinceGetAll: GodHOST.concat('/ProvinceGod/GetAll'),
  cityGetByProvinceId: GodHOST.concat('/CityGod/GetByProvinceID'),
}
