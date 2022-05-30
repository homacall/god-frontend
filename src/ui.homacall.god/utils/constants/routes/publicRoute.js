export const authRoutes = {
  login: '/login',
}

export const sidebar = {
  language: '/language',
  tagTable: '/tag',
  users: '/users',
  home: '/',
  roll: '/role',
  tag: '/tag',
  manage: '/company',
  routeStretcher: '/route-stretcher',
  serverConnection: '/server-connection',
  serviceType: '/service-types',
  systemPath: '/systems-path',
  filePath: '/files-path',
  loginLogo: '/login-logo',
}
export const language = {
  languageTable: '/language',
  newForm: '/language/new-form',
}
export const users = {
  users: '/users',
  createUser: '/users/create-user',
  update: '/users/update/:userId',
}
export const home = {
  home: '/',
}
export const rolls = {
  roll: '/role',
  newRoll: '/role/new-role',
}

export const tags = {
  tag: '/tag',
  newTag: '/tag/new-tag',
}

export const manage = {
  company: '/company',
  newCompany: '/company/new-company',
  editCompany: '/company/edit/:CompanyId',
}

export const routeStretcher = {
  main: '/route-stretcher',
  create: '/route-stretcher/create',
  update: '/route-stretcher/update/:stretcherId',
}

export const serverConnection = {
  main: '/server-connection',
  create: '/server-connection/create',
  edit: '/server-connection/edit/:ServerId',
}

export const serviceType = {
  main: '/service-types',
  create: '/service-types/create',
  edit: '/service-types/edit/:ServiceId',
}

export const systemPath = {
  main: '/systems-path',
  create: '/systems-path/create',
  edit: '/systems-path/edit/:SystemId',
  editPath: '/systems-path/edit/',
}

export const filePath = {
  main: '/files-path',
  create: '/files-path/create',
  edit: '/files-path/edit/:FilePathId',
  editPath: '/files-path/edit/',
}

export const loginLogo = {
  main: '/login-logo',
  create: '/login-logo/create',
  edit: '/login-logo/edit/:loginLogoId',
}
