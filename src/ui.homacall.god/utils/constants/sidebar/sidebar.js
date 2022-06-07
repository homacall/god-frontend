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
    label: 'مدیریت نقش',
    url: `${sidebar.roll}`,
  },
  {
    id: 4,
    label: 'مدیریت شرکت',
    url: `${sidebar.manage}`,
  },
  {
    id: 5,
    label: 'تعریف کاربر و سطح دسترسی',
    url: `${sidebar.users}`,
  },
  {
    id: 6,
    label: 'تعریف سرویس ها',
    url: `${sidebar.serviceType}`,
  },
  {
    id: 7,
    label: 'تعریف سیستم ها',
    url: `${sidebar.systemPath}`,
  },
  {
    id: 8,
    label: 'تعریف مسیر فایل ها',
    url: `${sidebar.filePath}`,
  },
  {
    id: 9,
    label: 'مدیریت پایگاه داده',
    url: `${sidebar.serverConnection}`,
  },
  {
    id: 10,
    label: 'آپلود لوگو ورود',
    url: `${sidebar.loginLogo}`,
  },
  {
    id: 11,
    label: 'انتساب مسیر',
    url: `${sidebar.routeStretcher}`,
  },
]

export default items
