import { useRecoilValue } from 'recoil'
import { showSidebar } from '../store/atom'
import Sidebar from './sidebar/sidebar'
import Navbar from './navbar/navbar'

function MainLayout(props) {
  const isOpen = useRecoilValue(showSidebar)

  return (
    <div>
      <Navbar />
      {isOpen === true && <Sidebar />}
      <div className={`${isOpen === true ? 'w-[84.3%]' : 'w-full'}  bg-slate-100 inline-block mt-20`}>{props.children}</div>
    </div>
  )
}

export default MainLayout
