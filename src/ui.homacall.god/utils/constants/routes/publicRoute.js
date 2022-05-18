export const authRoutes = {
  login: '/login',
}

export const sidebar = {
  language: '/language',
  tagTable: '/tag',
  users: '/users',
  home: '/',
  roll: '/roll',
  tag: '/tag',
  manage: '/company',
  routeStretcher: '/route-stretcher',
  serverConnection: '/server-connection',
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
  roll: '/roll',
  newRoll: '/roll/new-roll',
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
