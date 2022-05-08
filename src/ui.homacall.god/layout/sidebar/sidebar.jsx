import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import items from '../../utils/constants/sidebar/sidebar'
import { LogoutDialog } from './logOutDialog'

const Sidebar = () => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  const location = useLocation()
  const handleLogoutDialog = () => {
    console.log('hi')
    setShowLogoutDialog(!showLogoutDialog)
  }

  return (
    <>
      <div className="w-60  h-[100vh] bg-slate-50 fixed right-0 top-20 z-10 shadow-md">
        <ul className="text-center  text-sm text-slate-800 sidebarFont">
          {items.map(items => (
            <Link to={items.url}>
              <li
                key={items.id}
                className={`${location.pathname === items.url && 'text-indigo-600 border-r-8 border-indigo-600 rounded-sm'}
                             py-4 shadow-sm cursor-pointer hover:text-indigo-600 sidebarFont w-full h-full`}
              >
                <span to={items.url} className="inline-block w-full">
                  {items.label}
                </span>
              </li>
            </Link>
          ))}
          <li className={`py-4 shadow-sm cursor-pointer hover:text-indigo-600 sidebarFont w-full h-full`} onClick={handleLogoutDialog}>
            <span to={items.url} className="inline-block w-full">
              خروج
            </span>
            <LogoutDialog visible={showLogoutDialog} onHide={handleLogoutDialog} />
          </li>
        </ul>
      </div>
    </>
  )
}
export default Sidebar
