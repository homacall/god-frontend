import { useState, useEffect, useCallback } from 'react'
import { useFormik } from 'formik'
import { useParams, useLocation, useNavigate } from 'react-router'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputImage } from '../../common/fileUploader'
import { Button } from 'primereact/button'

import Breadcrumb from '../../../component/breadcrumb/breadcrumb'
import { ToastAlert } from '../../common/toastAlert'

import { createCompanyBreadcrumb } from '../constant/createCompanyBreadcrumb'
import validate from '../constant/validate'
import { GetAllLanguage } from '../../../service/languageService'
import { GetCompanyById, InsertCompany, UpdateCompany } from '../../../service/companyService'
import { dateTypes } from '../constant/dateTypes'

import '../style/company.css'

export const CreateCompany = () => {
  const [imageUrl, setImageUrl] = useState('')
  const [imageError, setImageError] = useState(false)
  const [loginImg, setLoginImg] = useState('')
  const [loginImgError, setLoginImgError] = useState(false)
  const [pathImg, setPathImg] = useState(false)
  const [pathImgError, setPathImgError] = useState(false)
  const [companyById, setCompanyBYId] = useState([])
  const [languages, setLanguages] = useState([])
  const [loading, setLoading] = useState(false)
  const [initialValues, setInitialValues] = useState({
    CoIn_Name: '',
    CoIn_Address: '',
    CoIn_Fax: '',
    CoIn_Email: '',
    CoIn_Phone: '',
    CoIn_Mobile: '',
    CoIn_Site: '',
    CoIn_Instagram: '',
    CoIn_About: '',
    CoIn_LangID: '',
    CoIn_SmsNumber: '',
    CoIn_TypeDateTime: '',
  })

  const location = useLocation()
  let { CompanyId } = useParams()
  const navigate = useNavigate()

  const fetchLanguage = () => {
    GetAllLanguage().then(res => {
      if (res.data || res.status === 200) {
        setLanguages(res.data.map(item => ({ id: item.lang_ID, name: item.lang_Name })))
      }
    })
  }
  const fetchCompany = useCallback(() => {
    const formData = new FormData()
    formData.append('ID', CompanyId)
    GetCompanyById(formData)
      .then(res => {
        if (res.data) {
          setCompanyBYId(res.data)
        }
      })
      .catch(err => {
        console.log('error: ', err)
        ToastAlert.error('خطا در ارتباط با سرور ')
      })
  }, [CompanyId])

  useEffect(() => {
    fetchLanguage()
    fetchCompany()
  }, [fetchCompany])

  useEffect(() => {
    let path = location.pathname

    if (path.split('/')[2] === 'new-company') {
      //if company info is exist redirect to company index page
      if (companyById.length > 0) {
        navigate('/company')
      }
    } else {
      //initialize for formik
      setImageUrl(companyById.coIn_Logo)
      setLoginImg(companyById.coIn_Login_Img)
      setPathImg(companyById.coIn_Usr_Path_Img)

      setInitialValues({
        CoIn_Name: companyById.coIn_Name,
        CoIn_Address: companyById.coIn_Address,
        CoIn_Fax: companyById.coIn_Fax,
        CoIn_Email: companyById.coIn_Email,
        CoIn_Phone: companyById.coIn_Phone,
        CoIn_Mobile: companyById.coIn_Mobile,
        CoIn_Site: companyById.coIn_Site,
        CoIn_Instagram: companyById.coIn_Instagram,
        CoIn_About: companyById.coIn_About,
        CoIn_LangID: companyById.coIn_LangID,
        CoIn_SmsNumber: companyById.coIn_SmsNumber,
        CoIn_TypeDateTime: companyById.coIn_TypeDateTime,
      })
    }
  }, [location.pathname, navigate, companyById])

  const handleInsetCompany = formData => {
    InsertCompany(formData)
      .then(res => {
        if (res.status === 200 || res.data) {
          formik.resetForm()
          ToastAlert.success('ثبت شرکت جدید با موفقیت انجام شد')
          navigate('/company')
        } else {
          ToastAlert.error('ثبت شرکت جدید با خطا مواجه شد')
        }
      })
      .catch(err => {
        ToastAlert.error('ثبت شرکت جدید با خطا مواجه شد')
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleUpdateCompany = formData => {
    UpdateCompany(formData)
      .then(res => {
        if (res.status === 200 || res.data === 'Succeed') {
          //formik.resetForm()
          ToastAlert.success('ویرایش شرکت با موفقیت انجام شد')
          navigate('/company')
        } else {
          ToastAlert.error('ویرایش شرکت با خطا مواجه شد')
        }
      })
      .catch(err => {
        ToastAlert.error('ویرایش شرکت با خطا مواجه شد')
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: values => {
      if (!imageUrl) {
        return setImageError(true)
      } else if (!loginImg) {
        return setLoginImgError(true)
      } else if (!pathImg) {
        return setPathImgError(true)
      } else {
        const formData = new FormData()
        values.CoIn_Logo = imageUrl
        values.CoIn_Login_Img = loginImg
        values.CoIn_Usr_Path_Img = pathImg

        Object.keys(values).forEach(key => {
          const value = values[key]
          formData.append(key, value)
        })
        setLoading(true)
        if (CompanyId) {
          formData.append('CoIn_ID', CompanyId)
          handleUpdateCompany(formData)
        } else {
          handleInsetCompany(formData)
        }

        setImageError(false)
      }
    },
    enableReinitialize: true,
  })

  return (
    <div className="w-[80%] my-4 pb-4 rounded-md  m-auto container bg-white rtl ">
      <Breadcrumb item={createCompanyBreadcrumb} />
      <form className="p-5 mt-10" onSubmit={formik.handleSubmit}>
        <section className="grid grid-cols-3 gap-4 md:grid-cols-2 lg:grid-cols-3 gap-y-10 rtl">

          <span className="p-float-label rtl relative" dir="ltr">
            <InputText
              id="CoIn_Name"
              name="CoIn_Name"
              value={formik.values.CoIn_Name}
              className="p-inputtext p-component w-full h-9  rtl text-xs"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label htmlFor="CoIn_Name" className="text-sm">
              نام
            </label>

            {formik.touched.CoIn_Name && formik.errors.CoIn_Name ? (
              <div className="absolute text-red-600 text-sm">{formik.errors.CoIn_Name}</div>
            ) : null}
          </span>

          <span className="p-float-label rtl relative" dir="ltr">
            <InputText
              id="CoIn_SmsNumber"
              name="CoIn_SmsNumber"
              rtl
              value={formik.values.CoIn_SmsNumber}
              className="p-inputtext p-component rtl text-sm w-full h-9"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              onKeyPress={event => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
            />
            <label htmlFor="CoIn_SmsNumber" className="text-sm">
              شماره سامانه پیامک
            </label>

            {formik.touched.CoIn_SmsNumber && formik.errors.CoIn_SmsNumber ? (
              <div className="absolute text-red-600 text-sm">{formik.errors.CoIn_SmsNumber}</div>
            ) : null}
          </span>

          <span className="p-float-label rtl relative" dir="ltr">
            <InputText
              id="CoIn_Phone"
              name="CoIn_Phone"
              value={formik.values.CoIn_Phone}
              className="p-inputtext p-component w-full h-9 rtl"

              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              onKeyPress={event => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
            />
            <label htmlFor="CoIn_Phone" className="text-sm">
              تلفن
            </label>

            {formik.touched.CoIn_Phone && formik.errors.CoIn_Phone ? (
              <div className="absolute text-red-600 text-sm">{formik.errors.CoIn_Phone}</div>
            ) : null}
          </span>

          <span className="p-float-label rtl relative" dir="ltr">
            <InputText
              id="CoIn_Mobile"
              name="CoIn_Mobile"
              value={formik.values.CoIn_Mobile}
              className="p-inputtext p-component w-full h-9 rtl"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              onKeyPress={event => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
            />
            <label htmlFor="CoIn_Mobile" className="text-sm">
              موبایل
            </label>
            {formik.touched.CoIn_Mobile && formik.errors.CoIn_Mobile ? (
              <div className="absolute text-red-600 text-xs">{formik.errors.CoIn_Mobile}</div>

            ) : null}
          </span>

          <span className="p-float-label rtl relative" dir="ltr">
            <InputText
              id="CoIn_Fax"
              name="CoIn_Fax"
              value={formik.values.CoIn_Fax}
              className="p-inputtext p-component w-full h-9 rtl"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              onKeyPress={event => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
            />
            <label htmlFor="CoIn_Fax" className="text-sm">
              فکس
            </label>
            {formik.touched.CoIn_Fax && formik.errors.CoIn_Fax ? (
              <div className="absolute text-red-600 text-xs">{formik.errors.CoIn_Fax}</div>

            ) : null}
          </span>

          <span className="p-float-label rtl relative" dir="ltr">
            <InputText
              id="CoIn_Email"
              name="CoIn_Email"
              value={formik.values.CoIn_Email}
              className="p-inputtext p-component w-full h-9 rtl"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label htmlFor="CoIn_Email" className="text-sm">
              ایمیل
            </label>
            {formik.touched.CoIn_Email && formik.errors.CoIn_Email ? (
              <div className="absolute text-red-600 text-xs">{formik.errors.CoIn_Email}</div>

            ) : null}
          </span>

          <span className="p-float-label rtl relative" dir="ltr">
            <InputText
              id="CoIn_Site"
              name="CoIn_Site"
              value={formik.values.CoIn_Site}
              className="p-inputtext p-component w-full h-9 rtl"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label htmlFor=" CoIn_Site" className="text-sm">
              سایت
            </label>
            {formik.touched.CoIn_Site && formik.errors.CoIn_Site ? (
              <div className="absolute text-red-600 text-xs">{formik.errors.CoIn_Site}</div>

            ) : null}
          </span>

          <span className="p-float-label rtl relative" dir="ltr">
            <InputText
              id="CoIn_Instagram"
              name="CoIn_Instagram"
              value={formik.values.CoIn_Instagram}
              className="p-inputtext p-component w-full h-9 rtl"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label htmlFor="CoIn_Instagram" className="text-sm">
              اینستاگرام
            </label>
            {formik.touched.CoIn_Instagram && formik.errors.CoIn_Instagram ? (
              <div className="absolute text-red-600 text-xs">{formik.errors.CoIn_Instagram}</div>

            ) : null}
          </span>

          <span className="p-float-label rtl relative" dir="ltr">
            <Dropdown
              options={languages}
              id="CoIn_LangID"
              name="CoIn_LangID"
              optionLabel="name"
              optionValue="id"
              value={formik.values.CoIn_LangID}
              onChange={formik.handleChange}
              placeholder="انتخاب زبان"
              className="rtl w-full h-9 "
            />
            {formik.errors.CoIn_LangID ? <div className="absolute text-red-600 text-xs">{formik.errors.CoIn_LangID}</div> : null}

          </span>

          <span className="p-float-label rtl relative" dir="ltr">
            <Dropdown
              options={dateTypes}
              id="CoIn_TypeDateTime"
              name="CoIn_TypeDateTime"
              optionLabel="name"
              optionValue="id"
              value={formik.values.CoIn_TypeDateTime}
              onChange={formik.handleChange}
              className="rtl w-full h-9"
              placeholder="انتخاب نوع سال"
            />
            {formik.errors.CoIn_TypeDateTime ? (
              <div className="absolute text-red-600 text-xs">{formik.errors.CoIn_TypeDateTime}</div>

            ) : null}
          </span>
        </section>

        <div className="w-full mt-5 py-3 flex flex-col items-start content-center">
          <InputText
            id="CoIn_Address"
            name="CoIn_Address"
            value={formik.values.CoIn_Address}
            className="p-inputtext p-component w-full h-9 rtl text-sm"

            placeholder="آدرس"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.CoIn_Address && formik.errors.CoIn_Address ? (
            <div className="text-red-600 text-xs">{formik.errors.CoIn_Address}</div>
          ) : null}
        </div>

        <div className="w-full mt-3 flex flex-col items-start content-center">
          <InputTextarea
            id="CoIn_About"
            name="CoIn_About"
            value={formik.values.CoIn_About}
            rows={5}
            placeholder="درباره شرکت"
            className="p-inputtextarea w-full text-sm"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />

          {formik.touched.CoIn_About && formik.errors.CoIn_About ? (
            <div className="text-red-600 text-xs">{formik.errors.CoIn_About}</div>
          ) : null}
        </div>

        <div className="mt-10 col-span-3 flex justify-center items-center">
          <InputImage setImageUrl={setImageUrl} imageError={imageError} imageUrl={imageUrl} />
        </div>

        <div className="mt-10 flex justify-end justify-items-end">
          <Button type="submit" className=" ml-10 bg-indigo-600 text-sm mt-3 h-10" loading={loading}>

            ثبت
          </Button>
        </div>
      </form>
    </div>
  )
}
