export const GodHOST = process.env.REACT_APP_GOD_API_HOST || ''
export const apiUrls = {
  createLanguage: GodHOST.concat('/LoginGod/Login'),
  province: GodHOST.concat('/ProvinceGod/GetAll'),
}
