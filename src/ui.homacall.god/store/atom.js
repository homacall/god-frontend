import { atom } from 'recoil'

export const showSidebar = atom({
  key: 'showSidebar',
  default: true,
})
export const userData = atom({
  key: 'userData',
  default: undefined,
})

export const pathState = atom({
  key: 'pathState',
  default: [],
})
