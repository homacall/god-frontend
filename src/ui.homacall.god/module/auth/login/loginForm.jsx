import { useEffect, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../../service/loginService'
import { useSetRecoilState } from 'recoil'
import { userData } from '../../../store/atom'
import { ToastAlert } from '../../common/toastAlert'

const NewLanguage = () => {
  const [UserName, setUserName] = useState('')
  const [PassWord, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const setToken = useSetRecoilState(userData)
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      return navigate('/')
    }
  }, [navigate])
  const reset = () => {
    setUserName('')
    setPassword('')
  }
  const handleSubmit = async event => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('UserName', UserName)
    formData.append('PassWord', PassWord)
    setLoading(true)
    try {
      const { data } = await loginUser(formData)

      if (data && data.message === 'Full') {
        return ToastAlert.error('ظرفیت تعداد ورود برای شما پر شده است ')
      }
      if (data && data.message !== 'NotFoundUser' && data.token) {
        ToastAlert.success('خوش آمدید :)')
        localStorage.setItem('token', data.token)
        setToken(data.token)
        navigate('/')
        reset()
      } else {
        localStorage.clear()
        ToastAlert.error('نام کاربری یا رمز عبور اشتباه است.')
      }
    } catch (error) {
      ToastAlert.error('خطا در ورود لطفا دوباره امتحان کنید.')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="mx-auto w-[30%] pb-5 bg-white m-auto shadow-lg rounded-md my-40">
        <form onSubmit={handleSubmit}>
          <div className="border-b border-slate-400 h-10">
            <span className="inline-block  float-right mr-5 leading-9">ورود</span>
          </div>
          <div className=" rtl mr-[8%] mt-10 ">
            <span className="p-float-label">
              <InputText id="inputtext" value={UserName} onChange={e => setUserName(e.target.value)} className="h-9 w-[92%]" />
              <label htmlFor="inputtext" className="right-2 text-sm">
                نام کاربری
              </label>
            </span>
          </div>
          <div className=" rtl mr-[8%] mt-10 ">
            <span className="p-float-label">
              <Password id="password" value={PassWord} onChange={e => setPassword(e.target.value)} className="h-9 w-[92%]" />
              <label htmlFor="password" className="right-2 text-sm">
                رمز عبور
              </label>
            </span>
          </div>

          <Button label="ورود" className="relative left-[8%] text-sm mt-7 h-10" loading={loading} />
        </form>
      </div>
    </>
  )
}
export default NewLanguage
