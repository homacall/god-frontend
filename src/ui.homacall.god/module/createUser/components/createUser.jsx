import { useState, useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { classNames } from 'primereact/utils'
import { Password } from 'primereact/password'
import { Dropdown } from 'primereact/dropdown'
import { InputTextarea } from 'primereact/inputtextarea'
import { useFormik } from 'formik'

import { createUserGender } from '../constant/createusergender'
import { createUserBreadcrumb, updateUserBreadcrumb } from '../constant/createUserBreadcrumb'

import { InputImage } from '../../common/fileUploader'

import { CityServiceGetByProvinceID } from '../../../service/cityService'
import { ProvinceServiceGetAll } from '../../../service/province'
import { GetByUserId, insertUser, UpdateUser } from '../../../service/userService'
import Breadcrumb from '../../../component/breadcrumb/breadcrumb'
import { useLocation, useNavigate, useParams } from 'react-router'
import { ToastAlert } from '../../common/toastAlert'
import { Regex } from '../../../constant'

const CreateAndEditUser = () => {
  const location = useLocation()
  const params = useParams()
  const navigate = useNavigate()
  const [emailLanguageError, setEmailLanguageError] = useState(false)
  const [provinces, setProvinces] = useState([])
  const [cities, setCities] = useState([])
  const [imageUrl, setImageUrl] = useState(undefined)
  const [imageError, setImageError] = useState(false)
  const [pervImageName, setPervImageName] = useState('')
  //const [showMessage, setShowMessage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serialNumber, setSerialNumber] = useState('')
  const [oldUserName, setOldUserName] = useState()
  const [initialValues, setInitialValue] = useState({
    Usr_FName: '',
    Usr_LName: '',
    Usr_Gender: 10,
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
      const formData = new FormData()
      formData.append('ID', params.userId)
      GetByUserId(formData).then(res => {
        if (res.data || res.status === 200) {
          setSerialNumber(res.data.user.usr_SrialNum)
          fetchCity(res.data.user.usr_Cty_ID).then(() => {
            setInitialValue({
              Usr_FName: res.data.user.usr_FName,
              Usr_LName: res.data.user.usr_LName,
              Usr_Gender: res.data.user.usr_Gender,
              Usr_mail: res.data.user.usr_mail,
              Usr_UName: res.data.user.usr_UName,
              Usr_HPass: '',
              Usr_IdentNum: res.data.user.usr_IdentNum,
              Usr_Prov_ID: res.data.user.usr_Prov_ID,
              Usr_Cty_ID: res.data.user.usr_Cty_ID,
              Usr_Address: res.data.user.usr_Address,
              Usr_Mobile: res.data.user.usr_Mobile,
            })
            setOldUserName(res.data.user.usr_UName)
            if (res.data.user.usr_Img) {
              setImageUrl(process.env.REACT_APP_GOD_FTP_SERVER.concat(res.data.user.usr_Img))
              setPervImageName(res.data.user.usr_Img)
            }
          })
        }
      })
    }
  }, [editMode, params?.userId])

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
      if (data.Usr_Gender > 2 || data.Usr_Gender < 0) {
        errors.Usr_Gender = 'جنسیت را انتخاب کنید'
      }
      if (!data.Usr_IdentNum) {
        errors.Usr_IdentNum = 'کدملی را وارد کنید.'
      } else if (data.Usr_IdentNum.length !== 10) {
        errors.Usr_IdentNum = 'کد ملی اشتباه است'
      }
      // if (!data.Usr_mail) {
      //   errors.Usr_mail = 'ایمیل را وارد کنید'
      // } else
      if (data.Usr_mail && !Regex.email.test(data.Usr_mail)) {
        errors.Usr_mail = 'فرمت ایمیل اشتباه می باشد'
      }
      if (!data.Usr_Mobile) {
        errors.Usr_Mobile = 'ایمیل را وارد کنید'
      } else if (!Regex.number.test(data.Usr_Mobile) && data.Usr_Mobile.length === 11) {
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
        setProvinces(res.data.provinces)
      })
      .catch(err => console.log(err))
  }
  const fetchCity = async id => {
    const formData = new FormData()
    formData.append('PrviceID', id)
    CityServiceGetByProvinceID(formData)
      .then(res => {
        setCities(res.data.cities)
      })
      .catch(err => console(err))
  }

  const submitHandler = data => {
    if (imageUrl && typeof imageUrl !== 'string') {
      data.IFileUser = imageUrl
      setImageError(false)
    } else {
      data.IFileUser = new File([], '123')
      setImageError(false)
    }

    setLoading(true)
    const formData = new FormData()

    if (!data.Usr_HPass) {
      data.Usr_HPass = ''
    }
    Object.keys(data).forEach(key => {
      const value = data[key]
      formData.append(key, value)
    })

    if (editMode) {
      formData.append('Usr_ID', params.userId)
      formData.append('Usr_Img', pervImageName || '')
      formData.append('Usr_SrialNum', serialNumber)
      if (data.Usr_UName === oldUserName) {
        formData.delete('Usr_UName')
        formData.append('Usr_UName', '')
      }
      UpdateUser(formData)
        .then(res => {
          if (res.data || res.status === 200) {
            if (res.data.message === 'FoundUserName') {
              ToastAlert.error('نام کاذبری تکراری است ')
            } else if (res.data.message === 'SucceedUser') {
              ToastAlert.error('خطا در ثبت تصویر کاربر')
            } else if (res.data.message === 'JustUploadUser') {
              ToastAlert.error('خطا در ویرایش مشخصات کاربر')
            } else if (res.data.message === 'Sucess') {
              ToastAlert.success('ویرایش کاربر با موفقیت ثبت شد')
            } else {
              ToastAlert.error('خطا در ویرایش کاربر')
            }

            navigate('/users')
          } else {
            ToastAlert.error('خطا در ویرایش  کاربر  ')
          }
        })
        .catch(err => console.log(err))
        .finally(() => {
          setLoading(false)
        })
    } else {
      insertUser(formData)
        .then(res => {
          if (res.data || res.status === 200) {
            if (res.data.message === 'FoundUserName') {
              ToastAlert.error('نام کاذبری تکراری است ')
            } else if (res.data.message === 'SucceedUser') {
              ToastAlert.error('خطا در ثبت تصویر کاربر')
            } else if (res.data.message === 'JustUploadUser') {
              ToastAlert.error('خطا در ثبت مشخصات کاربر')
            } else if (res.data.message === 'Sucess') {
              ToastAlert.success('کاربر با موفقیت ثبت شد')
            } else {
              ToastAlert.error('خطا در ثبت کاربر جدید')
            }
            navigate('/users')
          } else {
            ToastAlert.error('خطا در ثبت کاربر جدید ')
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  const isFormFieldValid = name => !!(formik.touched[name] && formik.errors[name])
  const getFormErrorMessage = name => {
    return isFormFieldValid(name) && <small className="p-error absolute right-0 top-12">{formik.errors[name]}</small>
  }
  // const dialogFooter = (
  //   <div className="flex justify-content-center">
  //     <Button label="باشه" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} />
  //   </div>
  // )

  useEffect(() => {
    fetchProvince()
  }, [])

  return (
    <div className="w-[80%] my-4 pb-4 rounded-md  m-auto container bg-white rtl ">
      <Breadcrumb item={editMode ? updateUserBreadcrumb : createUserBreadcrumb} />
      {/* <Dialog
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
      </Dialog> */}
      <form className="grid grid-cols-3 gap-4 gap-y-10 p-5 mt-10" onSubmit={formik.handleSubmit}>
        <span className="p-float-label relative mb-5">
          <InputText
            id="Usr_FName"
            value={formik.values.Usr_FName}
            onChange={formik.handleChange}
            name="Usr_FName"
            className={classNames({ 'p-invalid': isFormFieldValid('Usr_FName'), 'w-full h-9': true })}
          />
          <label htmlFor="Usr_FName" className={`right-2 text-sm absolute ${classNames({ 'p-error': isFormFieldValid('Usr_FName') })}`}>
            نام
          </label>
          {getFormErrorMessage('Usr_FName')}
        </span>
        <span className="p-float-label relative mb-5">
          <InputText
            id="Usr_LName"
            value={formik.values.Usr_LName}
            onChange={formik.handleChange}
            name="Usr_LName"
            className={classNames({ 'p-invalid': isFormFieldValid('Usr_LName'), 'w-full h-9': true })}
          />
          <label htmlFor="Usr_LName" className={`right-2 text-sm absolute ${classNames({ 'p-error': isFormFieldValid('Usr_LName') })}`}>
            نام خانوادگی
          </label>
          {getFormErrorMessage('Usr_LName')}
        </span>
        <span className="p-float-label p-inputnumber relative	mb-5">
          <InputText
            id="Usr_IdentNum"
            value={formik.values.Usr_IdentNum}
            onChange={formik.handleChange}
            name="Usr_IdentNum"
            className={classNames({ 'p-invalid': isFormFieldValid('Usr_IdentNum'), 'w-full h-9': true })}
            maxLength={10}
            onKeyPress={event => {
              if (!Regex.number.test(event.key)) {
                event.preventDefault()
              }
            }}
          />
          <label htmlFor="Usr_IdentNum" className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('Usr_IdentNum') })}`}>
            کد ملی
          </label>
          {getFormErrorMessage('Usr_IdentNum')}
        </span>
        <span className="p-float-label mb-5">
          <Dropdown
            options={createUserGender}
            id="Usr_Gender"
            name="Usr_Gender"
            value={formik.values.Usr_Gender}
            onChange={formik.handleChange}
            className={classNames({ 'p-invalid': isFormFieldValid('Usr_Gender'), 'w-full h-9': true })}
          />
          <label htmlFor="Usr_Gender" className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('Usr_Gender') })}`}>
            جنسیت
          </label>
          {getFormErrorMessage('Usr_Gender')}
        </span>
        <span className="p-float-label mb-5">
          <InputText
            id="Usr_Mobile"
            value={formik.values.Usr_Mobile}
            onChange={formik.handleChange}
            name="Usr_Mobile"
            className={classNames({ 'p-invalid': isFormFieldValid('Usr_Mobile'), 'w-full h-9': true })}
            onKeyPress={event => {
              if (!Regex.number.test(event.key)) {
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
        <span className="p-float-label mb-5">
          <InputText
            type={'email'}
            id="Usr_mail"
            onKeyPress={event => {
              if (!Regex.englishWord.test(event.key)) {
                event.preventDefault()
                setEmailLanguageError(true)
              } else {
                setEmailLanguageError(false)
              }
            }}
            value={formik.values.Usr_mail}
            onChange={formik.handleChange}
            name="Usr_mail"
            className={classNames({ 'p-invalid': isFormFieldValid('Usr_mail'), 'w-full h-9': true })}
          />
          <label htmlFor="Usr_mail" className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('Usr_mail') })}`}>
            ایمیل
          </label>
          {emailLanguageError && <small className="p-error absolute right-0 top-12">زبان ورودی باید انگلیسی باشد.</small>}
          {getFormErrorMessage('Usr_mail')}
        </span>
        <span className="p-float-label mb-5">
          <InputText
            id="Usr_UName"
            value={formik.values.Usr_UName}
            onChange={formik.handleChange}
            name="Usr_UName"
            className={classNames({ 'p-invalid': isFormFieldValid('Usr_UName'), 'w-full h-9': true })}
          />
          <label htmlFor="Usr_UName" className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('Usr_UName') })}`}>
            نام کاربری
          </label>
          {getFormErrorMessage('Usr_UName')}
        </span>
        <span className="p-float-label mb-5">
          <Password
            id="Usr_HPass"
            value={formik.values.Usr_HPass}
            onChange={formik.handleChange}
            name="Usr_HPass"
            className={classNames({ 'p-invalid': isFormFieldValid('Usr_HPass'), 'w-full h-9': true })}
          />
          <label htmlFor="Usr_HPass" className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('Usr_HPass') })}`}>
            رمز عبور
          </label>
          {getFormErrorMessage('Usr_HPass')}
        </span>

        <span className="p-float-label mb-5">
          <Dropdown
            options={provinces}
            id="Usr_Prov_ID"
            value={formik.values.Usr_Prov_ID}
            onChange={e => {
              formik.handleChange(e)
              fetchCity(e.value)
            }}
            optionLabel="provi_Name"
            optionValue="provi_ID"
            name="Usr_Prov_ID"
            className={classNames({ 'p-invalid': isFormFieldValid('Usr_Prov_ID'), 'w-full h-9': true })}
          />
          <label htmlFor="Usr_Prov_ID" className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('Usr_Prov_ID') })}`}>
            استان
          </label>
          {getFormErrorMessage('Usr_Prov_ID')}
        </span>
        <span className="p-float-label mb-5">
          <Dropdown
            options={cities}
            id="Usr_Cty_ID"
            value={formik.values.Usr_Cty_ID}
            onChange={formik.handleChange}
            optionLabel="cty_Name"
            optionValue="cty_ID"
            name="Usr_Cty_ID"
            className={classNames({ 'p-invalid': isFormFieldValid('Usr_Cty_ID'), 'w-full h-9': true })}
          />
          <label htmlFor="Usr_Cty_ID" className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('Usr_Cty_ID') })}`}>
            شهر
          </label>
          {getFormErrorMessage('Usr_Cty_ID')}
        </span>

        <span className="p-float-label col-span-2 h-0 mb-5">
          <InputTextarea
            id="Usr_Address"
            value={formik.values.Usr_Address}
            onChange={formik.handleChange}
            name="Usr_Address"
            autoResize="off"
            style={{ height: '36px' }}
            className={classNames({ 'p-invalid': isFormFieldValid('Usr_Address'), 'w-full h-9': true })}
          />
          <label htmlFor="Usr_Address" className={`right-2 text-sm  ${classNames({ 'p-error': isFormFieldValid('Usr_Address') })}`}>
            آدرس
          </label>
          {getFormErrorMessage('Usr_Address')}
        </span>

        <div className="col-span-3 flex items-center mb-5">
          <InputImage setImageUrl={setImageUrl} imageError={imageError} imageUrl={imageUrl} />
        </div>
        <div className="col-span-3 flex justify-end items-end ">
          <Button label="ثبت" className=" ml-10 bg-indigo-600 text-sm mt-3 h-10" type="submit" loading={loading} />
        </div>
      </form>
    </div>
  )
}
export default CreateAndEditUser
