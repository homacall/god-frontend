import { useState, useEffect, useCallback } from 'react'
import { useFormik } from 'formik'
import { useParams, useNavigate } from 'react-router'
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
import { getAllTagsTranslate } from '../../../service/tagManagerService'

import '../style/company.css'

export const CreateCompany = () => {
  const [imageUrl, setImageUrl] = useState('')
  const [imageError, setImageError] = useState(false)
  const [companyById, setCompanyBYId] = useState([])
  const [languages, setLanguages] = useState([])
  const [loading, setLoading] = useState(false)
  const [pervImageName, setPervImageName] = useState('')
  const [initialValues, setInitialValues] = useState({
    CoIn_TagID: '',
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
  const [titleTags, setTitleTags] = useState([])

  //const location = useLocation()
  let { CompanyId } = useParams()
  const navigate = useNavigate()

  const fetchLanguage = () => {
    GetAllLanguage().then(res => {
      if (res.data || res.status === 200) {
        setLanguages(res.data.languages.map(item => ({ id: item.lang_ID, name: item.lang_Name })))
      }
    })
  }
  const fetchCompany = useCallback(() => {
    const formData = new FormData()
    formData.append('ID', CompanyId)
    GetCompanyById(formData)
      .then(res => {
        if (res.data) {
          //setLogoPath(res.data.path)
          setCompanyBYId(res.data.companyInfo)
        }
      })
      .catch(err => {
        ToastAlert.error('خطا در ارتباط با سرور ')
      })
  }, [CompanyId])

  const fetchTags = useCallback(() => {
    const formData = new FormData()
    formData.append('TagType', '3')
    formData.append('ParentID', '-1')
    getAllTagsTranslate(formData)
      .then(res => {
        if (res.data || res.status === 200) {
          setTitleTags(res.data.tagsknowledges.map(item => ({ id: item.tag_ID, name: item.tagTranslate_Name })))
        }
      })
      .catch(() => ToastAlert.error('خطا در ارتباط با سرور'))
  }, [])

  useEffect(() => {
    fetchLanguage()
  }, [])

  useEffect(() => {
    fetchTags()
  }, [fetchTags])

  useEffect(() => {
    if (CompanyId) {
      fetchCompany()
    }
  }, [fetchCompany, CompanyId])

  useEffect(() => {
    //let path = location.pathname
    if (CompanyId && companyById) {
      //initialize for formik
      const logoSrc = process.env.REACT_APP_GOD_FTP_SERVER.concat(companyById.coIn_Logo)
      setImageUrl(logoSrc)
      setPervImageName(companyById.coIn_Logo)
      setInitialValues({
        CoIn_TagID: companyById.coIn_TagID,
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
  }, [CompanyId, companyById])

  const handleInsertCompany = formData => {
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
      .catch(() => {
        ToastAlert.error('ثبت شرکت جدید با خطا مواجه شد')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleUpdateCompany = formData => {
    UpdateCompany(formData)
      .then(res => {
        if (res.status === 200 || res.data === 'Succeed') {
          ToastAlert.success('ویرایش شرکت با موفقیت انجام شد')
          navigate('/company')
        } else {
          ToastAlert.error('ویرایش شرکت با خطا مواجه شد')
        }
      })
      .catch(() => {
        ToastAlert.error('ویرایش شرکت با خطا مواجه شد')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: values => {
      if (!imageUrl || typeof imageUrl === 'string') {
        values.IFileLogo = new File([], 'none-image')
      } else {
        values.IFileLogo = imageUrl
        setImageError(false)
      }
      const formData = new FormData()
      Object.keys(values).forEach(key => {
        const value = values[key]
        formData.append(key, value)
      })
      setLoading(true)

      if (CompanyId) {
        formData.append('CoIn_ID', CompanyId)
        formData.append('CoIn_Logo', pervImageName)
        handleUpdateCompany(formData)
      } else {
        handleInsertCompany(formData)
      }
      setImageError(false)
    },
    enableReinitialize: true,
  })

  return (
    <div className="w-[80%] my-4 pb-4 rounded-md  m-auto container bg-white rtl ">
      <Breadcrumb item={createCompanyBreadcrumb} />
      <form className="p-5 mt-10" onSubmit={formik.handleSubmit}>
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 gap-y-10 rtl">
          <span className="p-float-label rtl relative" dir="ltr">
            <Dropdown
              filter
              filterBy="name"
              options={titleTags}
              id="CoIn_TagID"
              name="CoIn_TagID"
              optionLabel="name"
              optionValue="id"
              value={formik.values.CoIn_TagID}
              onChange={formik.handleChange}
              placeholder="انتخاب تگ"
              className="rtl w-full h-9"
            />

            {formik.touched.CoIn_TagID && formik.errors.CoIn_TagID ? (
              <div className="absolute text-red-600 text-sm">{formik.errors.CoIn_TagID}</div>
            ) : null}
          </span>

          <span className="p-float-label rtl relative" dir="ltr">
            <InputText
              id="CoIn_SmsNumber"
              name="CoIn_SmsNumber"
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
              placeholder="انتخاب نوع تاریخ"
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
