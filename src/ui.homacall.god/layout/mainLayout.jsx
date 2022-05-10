import { useRecoilState } from 'recoil'
import { showSidebar } from '../store/atom'
import Sidebar from './sidebar/sidebar'
import Navbar from './navbar/navbar'
import { useEffect, useState } from 'react'

function MainLayout(props) {
  const [show, setShow] = useRecoilState(showSidebar)
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)

  const innerWidthHandler = () => {
    setInnerWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      innerWidthHandler()
    })
    return () => {
      window.removeEventListener('resize', () => {
        innerWidthHandler()
      })
    }
  }, [])
  useEffect(() => {
    if (innerWidth <= 992) {
      setShow(false)
    } else {
      setShow(true)
    }
  }, [innerWidth, setShow])
  return (
    <div>
      <Navbar />
      {show === true && <Sidebar />}
      <div className={`${show === true ? 'w-[84.3%]' : 'w-full'}  bg-slate-100 inline-block mt-20`}>{props.children}</div>
    </div>
  )
}

export default MainLayout
