import { useState, useEffect, useCallback } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import Breadcrumb from '../../../component/breadcrumb/breadcrumb'
import { Password } from 'primereact/password'
import { InputImage } from '../../common/fileUploader'
import { ProvinceServiceGetAll } from '../../../service/province'
import { Dropdown } from 'primereact/dropdown'
import { createUserBreadcrumb } from '../constant/createUserBreadcrumb'
import { CityServiceGetByProvinceID } from '../../../service/cityService'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputNumber } from 'primereact/inputnumber'
import { createUserGender } from '../constant/createusergender'
import { useFormik } from 'formik'
import { classNames } from 'primereact/utils'

const CreateUser = () => {
  const [user, setUser] = useState({
    Usr_FName: '',
    Usr_LName: '',
    Usr_Gender: '',
    Usr_mail: '',
    Usr_UName: '',
    Usr_HPass: '',
    Usr_Img: '',
    // Usr_IdentNum: '',
    Usr_Prov_ID: '',
    Usr_Cty_ID: '',
    Usr_Address: '',
  })
  const [selectedProvince, setSelectedProvince] = useState(undefined)
  const [provinces, setProvinces] = useState([])
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState(undefined)
  const token = localStorage.getItem('token')
  const [imageUrl, setImageUrl] = useState('')
  const formik = useFormik({
    initialValues: {
      Usr_FName: '',
      email: '',
      password: '',
      date: null,
      country: null,
      accept: false,
    },
    validate: data => {
      let errors = {}
      console.log(data)
      if (!data.Usr_FName) {
        errors.Usr_FName = 'Name is required.'
      }

      if (!data.email) {
        errors.email = 'Email is required.'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        errors.email = 'Invalid email address. E.g. example@email.com'
      }

      if (!data.password) {
        errors.password = 'Password is required.'
      }

      if (!data.accept) {
        errors.accept = 'You need to agree to the terms and conditions.'
      }

      return errors
    },
    onSubmit: data => {
      console.log(data)

      formik.resetForm()
    },
  })
  const fetchProvince = useCallback(async () => {
    ProvinceServiceGetAll(token)
      .then(res => {
        setProvinces(res.data)
      })
      .catch(err => console.log(err))
  }, [token])
  const fetchCity = async id => {
    const formData = new FormData()
    formData.append('PrviceID', id)
    CityServiceGetByProvinceID(formData)
      .then(res => {
        setCities(res.data)
      })
      .catch(err => console(err))
  }

  const changeHandler = e => {
    const name = e.target.name
    const value = e.target.value
    setUser(perv => ({ ...perv, [name]: value }))
  }
  const isFormFieldValid = name => !!(formik.touched[name] && formik.errors[name])

  useEffect(() => {
    if (!provinces.length) {
      fetchProvince()
    }
  }, [provinces.length, fetchProvince])
  return (
    <div className="w-[80%] my-4 pb-4 rounded-md  m-auto container bg-white rtl ">
      <Breadcrumb item={createUserBreadcrumb} />
      <form className="grid grid-cols-3 gap-4 gap-y-10 p-5 mt-10" onSubmit={formik.handleSubmit}>
        <span className="p-float-label">
          <InputText
            id="Usr_FName"
            value={formik.values.Usr_FName}
            onChange={formik.handleChange}
            name="Usr_FName"
            className={classNames({ 'p-invalid': isFormFieldValid('Usr_FName') })}
          />
          <label htmlFor="Usr_FName" className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('Usr_FName') })}`}>
            نام
          </label>
        </span>
        <span className="p-float-label">
          <InputText id="Usr_LName" value={user.Usr_LName} onChange={changeHandler} name="Usr_LName" className="w-full" />
          <label htmlFor="Usr_LName" className="right-2 text-sm">
            نام خانوادگی
          </label>
        </span>
        <span className="p-float-label p-inputnumber	">
          <InputText
            id="Usr_IdentNum"
            value={user.Usr_IdentNum}
            onChange={changeHandler}
            name="Usr_IdentNum"
            className="w-full"
            maxLength={10}
            onKeyPress={event => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault()
              }
            }}
          />
          <label htmlFor="Usr_IdentNum" className="right-2 text-sm">
            کد ملی
          </label>
        </span>
        <span className="p-float-label">
          <Dropdown
            options={createUserGender}
            id="Usr_Gender"
            value={user.Usr_Gender}
            onChange={changeHandler}
            name="Usr_Gender"
            className="w-full"
          />
          <label htmlFor="Usr_Gender" className="right-2 text-sm">
            جنسیت
          </label>
        </span>
        <span className="p-float-label">
          <InputText type={'email'} id="Usr_mail" value={user.Usr_mail} onChange={changeHandler} name="Usr_mail" className="w-full" />
          <label htmlFor="Usr_mail" className="right-2 text-sm">
            ایمیل
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
          {/* <InputText id="Usr_Prov_ID" value={user.Usr_Prov_ID} onChange={changeHandler} name="Usr_Prov_ID" className="w-full" /> */}
          <Dropdown
            value={selectedProvince}
            options={provinces}
            onChange={e => {
              setSelectedProvince(e.value)
              fetchCity(e.value)
            }}
            optionLabel="provi_Name"
            optionValue="provi_ID"
            className="w-full"
          />

          <label htmlFor="Usr_Prov_ID" className="right-2 text-sm">
            استان
          </label>
        </span>
        <span className="p-float-label">
          <Dropdown
            value={selectedCity}
            options={cities}
            onChange={e => {
              setSelectedCity(e.value)
            }}
            optionLabel="cty_Name"
            optionValue="cty_ID"
            className="w-full"
          />
          {/* <InputText id="Usr_Cty_ID" value={user.Usr_Cty_ID} onChange={changeHandler} name="Usr_Cty_ID" className="w-full" /> */}
          <label htmlFor="Usr_Cty_ID" className="right-2 text-sm">
            شهر
          </label>
        </span>
        <span className="p-float-label">
          <InputTextarea id="Usr_Address" value={user.Usr_Address} onChange={changeHandler} name="Usr_Address" className="w-full" />
          <label htmlFor="Usr_Address" className="right-2 text-sm">
            آدرس
          </label>
        </span>

        <div className="col-span-3 flex items-center">
          <InputImage setImageUrl={setImageUrl} />
        </div>
        <br />
        <Button
          label="ثبت"
          className="p-button-success relative right-[86%] text-sm mt-3 h-10"
          type="submit"
          onClick={() => {
            console.log(isFormFieldValid('Usr_FName'))
          }}
        />
      </form>
    </div>
  )
}
export default CreateUser
