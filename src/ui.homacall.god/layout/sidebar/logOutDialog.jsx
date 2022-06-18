import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { useNavigate } from 'react-router'
import { ToastAlert } from '../../module/common/toastAlert'
import { LogoutUser } from '../../service/loginService'

export const LogoutDialog = ({ visible, onHide }) => {
  const navigate = useNavigate()
  const logOut = () => {
    LogoutUser().finally(() => {
      localStorage.removeItem('token')
      navigate('/login/')
    })
  }
  const footer = () => {
    return (
      <>
        <Button label="بلی" onClick={logOut} className="p-button-outlined  p-button-success relative right-[70%] text-xs mt-3 h-10" />
        <Button label="خیر" onClick={() => onHide()} className="p-button-outlined p-button-danger right-[65%] text-xs mt-3 h-10" />
      </>
    )
  }

  return (
    <Dialog visible={visible} onHide={onHide} footer={footer}>
      <div className="w-[400px] pb-4 rounded-md m-auto container bg-white rtl">آیا مایل به خروج هستید؟</div>
    </Dialog>
  )
}
