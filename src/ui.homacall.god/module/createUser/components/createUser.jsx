import { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import Breadcrumb from '../../../component/breadcrumb/breadcrumb'
import { Password } from 'primereact/password'

const CreateUser = () => {
  const [user, setUser] = useState({
    Usr_FName: '',
    Usr_LName: '',
    Usr_IdentNum: '',
    Usr_Gender: '',
    Usr_mail: '',
    Usr_DateReg: '',
    Usr_UName: '',
    Usr_HPass: '',
    Usr_Img: '',
    Usr_Prov_ID: '',
    Usr_Cty_ID: '',
    Usr_Address: '',
  })
  const changeHandler = e => {
    const name = e.target.name
    const value = e.target.value
    // user[name] = value
    setUser(perv => ({ ...perv, [name]: value }))
  }
  const item = [
    { id: 1, label: 'تعریف کاربر و سطح دسترسی', url: '/users' },
    { id: 2, label: 'ثبت فرم جدید', url: '/users/create-user' },
  ]
  const submitHandler = e => {
    e.preventDefault()
    console.log({ user })
  }

  return (
    <div className="w-[80%] my-4 pb-4 rounded-md  m-auto container bg-white rtl ">
      <Breadcrumb item={item} />
      <form className="grid grid-cols-3 gap-4 gap-y-10 p-5 mt-10" onSubmit={submitHandler}>
        <span className="p-float-label">
          <InputText id="Usr_FName" value={user.Usr_FName} onChange={changeHandler} name="Usr_FName" className="w-full" />
          <label htmlFor="Usr_FName" className="right-2 text-sm">
            نام
          </label>
        </span>
        <span className="p-float-label">
          <InputText id="Usr_LName" value={user.Usr_LName} onChange={changeHandler} name="Usr_LName" className="w-full" />
          <label htmlFor="Usr_LName" className="right-2 text-sm">
            نام خانوادگی
          </label>
        </span>
        <span className="p-float-label">
          <InputText id="Usr_IdentNum" value={user.Usr_IdentNum} onChange={changeHandler} name="Usr_IdentNum" className="w-full" />
          <label htmlFor="Usr_IdentNum" className="right-2 text-sm">
            کد ملی
          </label>
        </span>
        <span className="p-float-label">
          <InputText id="Usr_Gender" value={user.Usr_Gender} onChange={changeHandler} name="Usr_Gender" className="w-full" />
          <label htmlFor="Usr_Gender" className="right-2 text-sm">
            جنسیت
          </label>
        </span>
        <span className="p-float-label">
          <InputText id="Usr_mail" value={user.Usr_mail} onChange={changeHandler} name="Usr_mail" className="w-full" />
          <label htmlFor="Usr_mail" className="right-2 text-sm">
            ایمیل
          </label>
        </span>
        <span className="p-float-label">
          <InputText id="Usr_DateReg" value={user.Usr_DateReg} onChange={changeHandler} name="Usr_DateReg" className="w-full" />
          <label htmlFor="Usr_DateReg" className="right-2 text-sm">
            تاریخ عضویت
          </label>
        </span>
        <span className="p-float-label">
          <InputText id="Usr_UName" value={user.Usr_UName} onChange={changeHandler} name="Usr_UName" className="w-full" />
          <label htmlFor="Usr_UName" className="right-2 text-sm">
            نام کاربری
          </label>
        </span>
        <span className="p-float-label">
          <Password id="Usr_HPass" value={user.Usr_HPass} onChange={changeHandler} name="Usr_HPass" className="w-full" />
          <label htmlFor="Usr_HPass" className="right-2 text-sm">
            رمز عبور
          </label>
        </span>
        <span className="p-float-label">
          <InputText id="Usr_Img" value={user.Usr_Img} onChange={changeHandler} name="Usr_Img" className="w-full" />
          <label htmlFor="Usr_Img" className="right-2 text-sm">
            عکس
          </label>
        </span>
        <span className="p-float-label">
          <InputText id="Usr_Prov_ID" value={user.Usr_Prov_ID} onChange={changeHandler} name="Usr_Prov_ID" className="w-full" />
          <label htmlFor="Usr_Prov_ID" className="right-2 text-sm">
            استان
          </label>
        </span>
        <span className="p-float-label">
          <InputText id="Usr_Cty_ID" value={user.Usr_Cty_ID} onChange={changeHandler} name="Usr_Cty_ID" className="w-full" />
          <label htmlFor="Usr_Cty_ID" className="right-2 text-sm">
            شهر
          </label>
        </span>
        <span className="p-float-label">
          <InputText id="Usr_Address" value={user.Usr_Address} onChange={changeHandler} name="Usr_Address" className="w-full" />
          <label htmlFor="Usr_Address" className="right-2 text-sm">
            آدرس
          </label>
        </span>
        <Button label="ثبت" className="p-button-success relative right-[86%] text-sm mt-3 h-10" />
      </form>
    </div>
  )
}
export default CreateUser
