export const GodHOST = process.env.REACT_APP_GOD_API_HOST || ''
export const apiUrls = {
  login: GodHOST.concat('AuthenticationGod/Login'),
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
  createTag: GodHOST.concat('/TagsknowledgeGod/Insert'),
  getAllTags: GodHOST.concat('/TagsknowledgeGod/GetAll'),
  deleteTags: GodHOST.concat('/TagsknowledgeGod/Delete'),
  updateTags: GodHOST.concat('/TagsknowledgeGod/Update'),
  getTranslateTagId: GodHOST.concat('/TranslateTagsGod/GetAllByTagID'),
  insertTranslate: GodHOST.concat('/TranslateTagsGod/Insert'),
  updateTranslate: GodHOST.concat('/TranslateTagsGod/Update'),
  insertRol: GodHOST.concat('/RoleGod/Insert'),
  getAllRol: GodHOST.concat('/RoleGod/GetAll'),
  deleteRol: GodHOST.concat('/RoleGod/Delete'),
  updateRol: GodHOST.concat('/RoleGod/Update'),
}
