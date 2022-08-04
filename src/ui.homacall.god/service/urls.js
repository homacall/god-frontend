export const GodHOST = process.env.REACT_APP_GOD_API_HOST || ''
export const apiUrls = {
  login: GodHOST.concat('/AuthenticationGod/Login'),
  createLanguage: GodHOST.concat('/LanguageGod/insert'),
  getAllLanguage: GodHOST.concat('/LanguageGod/GetAll'),
  deleteLanguage: GodHOST.concat('/LanguageGod/Delete'),
  updateLanguage: GodHOST.concat('/LanguageGod/Update'),
  province: GodHOST.concat('/ProvinceGod/GetAll'),
  provinceGetAll: GodHOST.concat('/ProvinceGod/GetAll'),
  cityGetByProvinceId: GodHOST.concat('/CityGod/GetByProvinceID'),
  insertUser: GodHOST.concat('/UserGod/Insert'),
  getAllUser: GodHOST.concat('/UserGod/GetAll'),
  getAllUserSP: GodHOST.concat('/UserGod/GetAllUserSP'),
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
  getByUserId: GodHOST.concat('/UserGod/GetByID'),
  updateUser: GodHOST.concat('/UserGod/Update'),
  userRoleInsert: GodHOST.concat('/UserRoleGod/Insert'),
  getAllRoutes: GodHOST.concat('/RouteStructureGod/GetAll'),
  getAllRoutesByType: GodHOST.concat('/RouteStructureGod/GetAllByTypeRoute'),
  getAllRoutesByTypeForTree: GodHOST.concat('/RouteStructureGod/GetAllByTypeRouteForTree'),
  createRoteStructure: GodHOST.concat('/RouteStructureGod/Insert'),
  deleteRoteStructure: GodHOST.concat('/RouteStructureGod/Delete'),
  getAllTagsTranslate: GodHOST.concat('/TagsknowledgeGod/GetAllTagsTranslate'),
  getByIdRouteStructure: GodHOST.concat('/RouteStructureGod/GetByIDSP'),
  updateRouteStructure: GodHOST.concat('/RouteStructure/Update'),
  getAllCompany: GodHOST.concat('/CompanyInfoGod/GetAll'),
  insertCompany: GodHOST.concat('/CompanyInfoGod/Insert'),
  deleteCompany: GodHOST.concat('/CompanyInfoGod/Delete'),
  updateCompany: GodHOST.concat('/CompanyInfoGod/Update'),
  getCompanyById: GodHOST.concat('/CompanyInfoGod/GetByID'),
  getAllCompanySP: GodHOST.concat('/CompanyInfoGod/GetAllSP'),
  userIsActive: GodHOST.concat('/UserGod/ISActive'),
  getRoleByUserId: GodHOST.concat('/UserRoleGod/GetAllRoleByUserIDSP'),
  updateUserRole: GodHOST.concat('/UserRoleGod/Update'),
  deleteAllUserRole: GodHOST.concat('/UserRoleGod/DeleteAllUserRole'),
  getAllRoutesStrByParentType: GodHOST.concat('/RouteStructureGod/GetAllByParentTypeRoute'),
  getAllPermissionUserActions: GodHOST.concat('/RoleUserPermissionGod/GetAllPermissionUserActions'),
  insertRoleUserPermissionGod: GodHOST.concat('/RoleUserPermissionGod/Insert'),
  deleteAllRoleUserPermissionGod: GodHOST.concat('/RoleUserPermissionGod/DeleteAllPermissionUser'),
  getAllPermissionUserRoutePath: GodHOST.concat('/RoleUserPermissionGod/GetAllPermissionUserRoutePath'),
  getAllServerConnections: GodHOST.concat('/ServerConnectionGod/GetAll'),
  insertServerConnections: GodHOST.concat('/ServerConnectionGod/Insert'),
  deleteServerConnections: GodHOST.concat('/ServerConnectionGod/Delete'),
  updateServerConnections: GodHOST.concat('/ServerConnectionGod/Update'),
  getServerConnectionsById: GodHOST.concat('/ServerConnectionGod/GetByID'),
  getAllRoutesByParent: GodHOST.concat('/RouteStructureGod/GetAllByParent'),
  getAllServiceType: GodHOST.concat('/ServiceTypeGod/GetAll'),
  insertServiceType: GodHOST.concat('/ServiceTypeGod/Insert'),
  updateServiceType: GodHOST.concat('/ServiceTypeGod/Update'),
  deleteServiceType: GodHOST.concat('/ServiceTypeGod/Delete'),
  getServiceTypeById: GodHOST.concat('/ServiceTypeGod/GetByID'),
  getAllSystemPath: GodHOST.concat('/SystemGod/GetAll'),
  insertSystemPath: GodHOST.concat('/SystemGod/Insert'),
  updateSystemPath: GodHOST.concat('/SystemGod/Update'),
  deleteSystemPath: GodHOST.concat('/SystemGod/Delete'),
  getSystemPathById: GodHOST.concat('/SystemGod/GetByID'),
  getAllfilePath: GodHOST.concat('/FilePathGod/GetAll'),
  insertfilePath: GodHOST.concat('/FilePathGod/Insert'),
  updatefilePath: GodHOST.concat('/FilePathGod/Update'),
  deletefilePath: GodHOST.concat('/FilePathGod/Delete'),
  getfilePathById: GodHOST.concat('/FilePathGod/GetByID'),
  getAllfilePathSP: GodHOST.concat('/FilePathGod/GetAll_SP'),
  getAllLoginLogo: GodHOST.concat('/LogosCompanyGod/GetAll'),
  insertLoginLogo: GodHOST.concat('/LogosCompanyGod/Insert'),
  updateLoginLogo: GodHOST.concat('/LogosCompanyGod/Update'),
  deleteLoginLogo: GodHOST.concat('/LogosCompanyGod/Delete'),
  getLoginLogoById: GodHOST.concat('/LogosCompanyGod/GetByID'),
  getAllLoginLogoBySP: GodHOST.concat('/LogosCompanyGod/GetAllSP'),
  getFilePathBySystemNames: GodHOST.concat('/FilePathGod/GetFilePathBySystemNames'),
  userUploadFile: GodHOST.concat('/UserGod/UploadFileUser'),
  userUpdateFile: GodHOST.concat('/UserGod/UploadFileUserUpdate'),
  userUpdateIFile: GodHOST.concat('/UserGod/UploadFile'),
  logOut: GodHOST.concat('/UserGod/LogOut'),
  roleMembersInsert: GodHOST.concat('/RoleMembersGod/Insert'),
  roleMembersGetById: GodHOST.concat('/RoleMembersGod/GetByID'),
  roleMembersGetAll: GodHOST.concat('/RoleMembersGod/GetAll'),
  roleMembersDelete: GodHOST.concat('/RoleMembersGod/Delete'),
  menuLinkGetAll: GodHOST.concat('/MenuLink/GetAll'),
  menuLinkInsert: GodHOST.concat('/MenuLink/Insert'),
}
