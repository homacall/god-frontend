import { sidebar } from '../routes/publicRoute'

const items = [
  {
    id: 1,
    label: 'مدیریت زبان',
    url: `${sidebar.language}`,
  },
  {
    id: 2,
    label: 'مدیریت تگ',
    url: `${sidebar.tag}`,
  },
  {
    id: 3,
    label: 'راهبری مدیریت نقش',
    url: `${sidebar.roll}`,
  },
  {
    id: 4,
    label: 'مدیریت شرکت',
    url: `${sidebar.tag}`,
  },
  {
    id: 5,
    label: 'تعریف کاربر و سطح دسترسی',
    url: `${sidebar.users}`,
  },
  {
    id: 6,
    label: 'انتصاب مسیر',
    url: `${sidebar.tag}`,
  },
  {
    id: 7,
    label: 'انتصاب ساختار',
    url: `${sidebar.routeStretcher}`,
  },
]

export default items
