import { useState, useEffect, useCallback } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { classNames } from 'primereact/utils'
import { Password } from 'primereact/password'
import { Dropdown } from 'primereact/dropdown'
import { InputTextarea } from 'primereact/inputtextarea'
import { Dialog } from 'primereact/dialog'
import { useFormik } from 'formik'
import { useRecoilValue } from 'recoil'

import { createUserGender } from '../constant/createusergender'
import { createUserBreadcrumb } from '../constant/createUserBreadcrumb'

import { InputImage } from '../../common/fileUploader'

import { CityServiceGetByProvinceID } from '../../../service/cityService'
import { ProvinceServiceGetAll } from '../../../service/province'
import { userData } from '../../../store/atom'
import { GetByUserId, insertUser, UpdateUser } from '../../../service/userService'
import Breadcrumb from '../../../component/breadcrumb/breadcrumb'
import { useLocation, useParams } from 'react-router'

const CreateAndEditUser = ({ updateUser }) => {
  const location = useLocation()
  const params = useParams()
  const [provinces, setProvinces] = useState([])
  const [cities, setCities] = useState([])
  const [imageUrl, setImageUrl] = useState('')
  const [imageError, setImageError] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [initialValues, setInitialValue] = useState({
    Usr_FName: '',
    Usr_LName: '',
    Usr_Gender: '',
    Usr_mail: '',
    Usr_UName: '',
    Usr_HPass: '',
    Usr_IdentNum: '',
    Usr_Prov_ID: '',
    Usr_Cty_ID: '',
    Usr_Address: '',
    Usr_Mobile: '',
  })
  const [editMode, setEditMode] = useState(location.pathname.includes('/users/update/') && params.userId)

  useEffect(() => {
    if (location.pathname.includes('/users/update/') && params.userId) {
      setEditMode(true)
    } else {
      setEditMode(false)
    }
  }, [location.pathname, params?.userId])
  useEffect(() => {
    if (editMode) {
      // routeBreadcrumb[1].label = 'ویرایش انتساب'
      // routeBreadcrumb[1].url = `/route-stretcher/update/${params.stretcherId}`

      // fetch find one data
      const formData = new FormData()
      formData.append('ID', params.userId)
      GetByUserId(formData).then(res => {
        if (res.data || res.status === 200) {
          fetchCity(res.data.usr_Cty_ID).then(() => {
            setInitialValue({
              Usr_FName: res.data.usr_FName,
              Usr_LName: res.data.usr_LName,
              Usr_Gender: res.data.usr_Gender,
              Usr_mail: res.data.usr_mail,
              Usr_UName: res.data.usr_UName,
              Usr_HPass: '',
              Usr_IdentNum: res.data.usr_IdentNum,
              Usr_Prov_ID: res.data.usr_Prov_ID,
              Usr_Cty_ID: res.data.usr_Cty_ID,
              Usr_Address: res.data.usr_Address,
              Usr_Mobile: res.data.usr_Mobile,
            })
            setImageUrl(res.data.usr_Img)
          })
        }
      })
    }
  }, [])

  const formik = useFormik({
    initialValues,
    validate: data => {
      let errors = {}
      if (!data.Usr_FName) {
        errors.Usr_FName = 'نام را وارد کنید.'
      }
      if (!data.Usr_LName) {
        errors.Usr_LName = 'نام خانوادگی را وارد کنید.'
      }
      if (!data.Usr_Gender) {
        errors.Usr_Gender = 'جنسیت را انتخاب کنید'
      }
      if (!data.Usr_IdentNum) {
        errors.Usr_IdentNum = 'کدملی را وارد کنید.'
      } else if (data.Usr_IdentNum.length !== 10) {
        errors.Usr_IdentNum = 'کد ملی اشتباه است'
      }
      if (!data.Usr_mail) {
        errors.Usr_mail = 'ایمیل را وارد کنید'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.Usr_mail)) {
        errors.Usr_mail = 'فرمت ایمیل اشتباه می باشد'
      }
      if (!data.Usr_Mobile) {
        errors.Usr_Mobile = 'ایمیل را وارد کنید'
      } else if (!/[0-9]/i.test(data.Usr_Mobile) && data.Usr_Mobile.length === 11) {
        errors.Usr_Mobile = 'فرمت ایمیل اشتباه می باشد'
      }

      if (!data.Usr_UName) {
        errors.Usr_UName = 'نام کاربری را وارد کنید'
      }

      if (!data.Usr_HPass && !editMode) {
        errors.Usr_HPass = 'رمز عبور را وارد کنید'
      }
      if (!data.Usr_Prov_ID) {
        errors.Usr_Prov_ID = 'استان را وارد کنید'
      }
      if (!data.Usr_Cty_ID) {
        errors.Usr_Cty_ID = 'شهر را وارد کنید'
      }
      if (!data.Usr_Address) {
        errors.Usr_Address = 'آدرس را وارد کنید'
      }

      return errors
    },
    onSubmit: data => {
      submitHandler(data)
    },
    enableReinitialize: true,
  })

  const fetchProvince = () => {
    ProvinceServiceGetAll()
      .then(res => {
        setProvinces(res.data)
      })
      .catch(err => console.log(err))
  }
  const fetchCity = async id => {
    const formData = new FormData()
    formData.append('PrviceID', id)
    CityServiceGetByProvinceID(formData)
      .then(res => {
        setCities(res.data)
      })
      .catch(err => console(err))
  }
  const submitHandler = data => {
    if (!imageUrl) {
      return setImageError(true)
    } else {
      data.Usr_Img = imageUrl
      setImageError(false)
    }
    setLoading(true)
    const formData = new FormData()
    Object.keys(data).forEach(key => {
      const value = data[key]
      formData.append(key, value)
    })
    if (editMode) {
      formData.append('Usr_ID', params.userId)
      if (!data.Usr_HPass) {
        formData.delete('Usr_HPass')
      }
      UpdateUser(formData)
        .then(res => {
          if (res.data || res.status === 200) {
            setShowMessage(true)
          }
        })
        .catch(err => console.log(err))
        .finally(() => {
          setLoading(false)
        })
    } else {
      formData.append('Usr_DateReg', '1401/02/20')
      insertUser(formData)
        .then(res => {
          if (res.status === 200 || res.data === 'success') {
            formik.resetForm()
            setShowMessage(true)
          }
        })
        .catch(err => console.log(err))
        .finally(() => {
          setLoading(false)
        })
    }
  }

  const isFormFieldValid = name => !!(formik.touched[name] && formik.errors[name])
  const getFormErrorMessage = name => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>
  }
  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button label="باشه" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} />
    </div>
  )

  useEffect(() => {
    fetchProvince()
  }, [])
  return (
    <div className="w-[80%] my-4 pb-4 rounded-md  m-auto container bg-white rtl ">
      <Breadcrumb item={createUserBreadcrumb} />
      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ '960px': '80vw' }}
        style={{ width: '30vw' }}
      >
        <div className="flex align-items-center flex-column pt-6 px-3">
          <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
          <h5>{editMode ? 'کاربر با موفقیت ویرایش شد.' : `کاربر جدید با موفقیت ثبت شد!`}</h5>
        </div>
      </Dialog>
      <form className="grid grid-cols-3 gap-4 gap-y-10 p-5 mt-10" onSubmit={formik.handleSubmit}>
        <span className="p-float-label">
          <InputText
            id="Usr_FName"
            value={formik.values.Usr_FName}
            onChange={formik.handleChange}
            name="Usr_FName"
            className={classNames({ 'p-invalid': isFormFieldValid('Usr_FName'), 'w-full': true })}
          />
          <label htmlFor="Usr_FName" className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('Usr_FName') })}`}>
            نام
          </label>
          {getFormErrorMessage('Usr_FName')}
        </span>
        <span className="p-float-label">
          <InputText
            id="Usr_LName"
            value={formik.values.Usr_LName}
            onChange={formik.handleChange}
            name="Usr_LName"
            className={classNames({ 'p-invalid': isFormFieldValid('Usr_LName'), 'w-full': true })}
          />
          <label htmlFor="Usr_LName" className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('Usr_LName') })}`}>
            نام خانوادگی
          </label>
          {getFormErrorMessage('Usr_LName')}
        </span>
        <span className="p-float-label p-inputnumber	">
          <InputText
            id="Usr_IdentNum"
            value={formik.values.Usr_IdentNum}
            onChange={formik.handleChange}
            name="Usr_IdentNum"
            className={classNames({ 'p-invalid': isFormFieldValid('Usr_IdentNum'), 'w-full': true })}
            maxLength={10}
            onKeyPress={event => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault()
              }
            }}
          />
          <label htmlFor="Usr_IdentNum" className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('Usr_IdentNum') })}`}>
            کد ملی
          </label>
          {getFormErrorMessage('Usr_IdentNum')}
        </span>
        <span className="p-float-label">
          <Dropdown
            options={createUserGender}
            id="Usr_Gender"
            value={formik.values.Usr_Gender}
            onChange={formik.handleChange}
            name="Usr_Gender"
            className={classNames({ 'p-invalid': isFormFieldValid('Usr_Gender'), 'w-full': true })}
          />
          <label htmlFor="Usr_Gender" className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('Usr_Gender') })}`}>
            جنسیت
          </label>
          {getFormErrorMessage('Usr_Gender')}
        </span>
        <span className="p-float-label">
          <InputText
            id="Usr_Mobile"
            value={formik.values.Usr_Mobile}
            onChange={formik.handleChange}
            name="Usr_Mobile"
            className={classNames({ 'p-invalid': isFormFieldValid('Usr_Mobile'), 'w-full': true })}
            onKeyPress={event => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault()
              }
            }}
            maxLength={11}
          />
          <label htmlFor="Usr_Mobile" className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('Usr_Mobile') })}`}>
            تلفن همراه
          </label>
          {getFormErrorMessage('Usr_Mobile')}
        </span>
        <span className="p-float-label">
          <InputText
            type={'email'}
            id="Usr_mail"
            value={formik.values.Usr_mail}
            onChange={formik.handleChange}
            name="Usr_mail"
            className={classNames({ 'p-invalid': isFormFieldValid('Usr_mail'), 'w-full': true })}
          />
          <label htmlFor="Usr_mail" className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('Usr_mail') })}`}>
            ایمیل
          </label>
          {getFormErrorMessage('Usr_mail')}
        </span>
        <span className="p-float-label">
          <InputText
            id="Usr_UName"
            value={formik.values.Usr_UName}
            onChange={formik.handleChange}
            name="Usr_UName"
            className={classNames({ 'p-invalid': isFormFieldValid('Usr_UName'), 'w-full': true })}
          />
          <label htmlFor="Usr_UName" className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('Usr_UName') })}`}>
            نام کاربری
          </label>
          {getFormErrorMessage('Usr_UName')}
        </span>
        <span className="p-float-label">
          <Password
            id="Usr_HPass"
            value={formik.values.Usr_HPass}
            onChange={formik.handleChange}
            name="Usr_HPass"
            className={classNames({ 'p-invalid': isFormFieldValid('Usr_HPass'), 'w-full': true })}
          />
          <label htmlFor="Usr_HPass" className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('Usr_HPass') })}`}>
            رمز عبور
          </label>
          {getFormErrorMessage('Usr_HPass')}
        </span>

        <span className="p-float-label">
          <Dropdown
            value={formik.values.Usr_Prov_ID}
            options={provinces}
            optionLabel="provi_Name"
            optionValue="provi_ID"
            onChange={e => {
              formik.handleChange(e)
              fetchCity(e.value)
            }}
            id="Usr_Prov_ID"
            name="Usr_Prov_ID"
            className={classNames({ 'p-invalid': isFormFieldValid('Usr_Prov_ID'), 'w-full': true })}
          />

          <label
            htmlFor="Usr_Prov_ID"
            className={`right-2 text-sm 
          `}
          >
            استان
          </label>
          {getFormErrorMessage('Usr_Prov_ID')}
        </span>
        <span className="p-float-label">
          <Dropdown
            value={formik.values.Usr_Cty_ID}
            options={cities}
            optionLabel="cty_Name"
            optionValue="cty_ID"
            onChange={formik.handleChange}
            id="Usr_Cty_ID"
            name="Usr_Cty_ID"
            className={classNames({ 'p-invalid': isFormFieldValid('Usr_Cty_ID'), 'w-full': true })}
            // className={classNames({ 'p-invalid': isFormFieldValid('Usr_FName') })}
          />

          <label htmlFor="Usr_Cty_ID" className={`right-2 text-sm `}>
            شهر
          </label>
          {getFormErrorMessage('Usr_Cty_ID')}
        </span>
        <span className="p-float-label col-span-2">
          <InputTextarea
            id="Usr_Address"
            value={formik.values.Usr_Address}
            onChange={formik.handleChange}
            name="Usr_Address"
            autoResize="off"
            className={classNames({ 'p-invalid': isFormFieldValid('Usr_Address'), 'w-full': true, 'h-[95%]': true })}
            rows={1}
          />
          <label htmlFor="Usr_Address" className={`right-2 text-sm  ${classNames({ 'p-error': isFormFieldValid('Usr_Address') })}`}>
            آدرس
          </label>
          {getFormErrorMessage('Usr_Address')}
        </span>

        <div className="col-span-3 flex items-center">
          <InputImage setImageUrl={setImageUrl} imageError={imageError} imageUrl={imageUrl} />
        </div>
        <div className="col-span-3 flex justify-center items-center">
          <Button label="ثبت" className="p-button-success  mx-auto w-[200px]  text-sm mt-3 h-10" type="submit" loading={loading} />
        </div>
      </form>
    </div>
  )
}
export default CreateAndEditUser
