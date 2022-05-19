import { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { RadioButton } from 'primereact/radiobutton'
import { Button } from 'primereact/button'
import Breadcrumb from '../../../component/breadcrumb/breadcrumb'
import { newLanguage } from '../../../service/languageService'
import { useFormik } from 'formik'
import { classNames } from 'primereact/utils'
import { ToastAlert } from '../../common/toastAlert'

const NewLanguage = () => {
  const [layout, setLayout] = useState(null)
  const [handleError, setHandleError] = useState(false)
  const [loading, setLoading] = useState(false)

  const item = [
    { id: 1, label: 'مدیریت زبان', url: '/language' },
    { id: 2, label: 'ثبت فرم جدید', url: '/language/new-form' },
  ]
  const formik = useFormik({
    initialValues: {
      lang_Name: '',
    },
    validate: data => {
      let errors = {}
      if (!data.lang_Name) {
        errors.lang_Name = 'نام را وارد کنید.'
      }
      return errors
    },
    onSubmit: data => {
      handleSubmit(data)
    },
  })

  const isFormFieldValid = name => !!(formik.touched[name] && formik.errors[name])
  const getFormErrorMessage = name => {
    return isFormFieldValid(name) && <small className="mr-[8%] p-error">{formik.errors[name]}</small>
  }
  const handleSubmit = async data => {
    if (layout === null) {
      setHandleError(true)
      return
    } else {
      setHandleError(false)
    }
    const formData = new FormData()
    const isRTL = layout === 'RTL' ? true : false
    formData.append('Lang_Name', data.lang_Name)
    formData.append('Lang_Rtl', isRTL)
    setLoading(true)

    try {
      const { status } = await newLanguage(formData)
      if (status === 200) {
        ToastAlert.success('زبان با موفقیت ثبت شد')
        formik.resetForm()
      } else {
        ToastAlert.error('خطا در ثبت زبان')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-[80%] my-4 pb-4 rounded-md m-auto container bg-white rtl">
      <Breadcrumb item={item} />
      <form onSubmit={formik.handleSubmit}>
        <div className=" flex justify-start mr-[8%] mt-10 ">
          <span className="p-float-label">
            <InputText
              id="lang_Name"
              name="lang_Name"
              value={formik.values.lang_Name}
              onChange={formik.handleChange}
              className={`${classNames({ 'p-invalid': isFormFieldValid('lang_Name'), 'w-full': true })} h-9 w-96`}
            />
            <label
              htmlFor="lang_Name"
              className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('lang_Name') })} right-2 text-sm`}
            >
              عنوان
            </label>
          </span>
        </div>
        {getFormErrorMessage('lang_Name')}
        <div className=" flex justify-start mr-[8%] mt-10">
          <div className="field-radiobutton ml-8">
            <RadioButton
              inputId="RTL"
              name="layout"
              value="RTL"
              onChange={e => {
                setLayout(e.target.value)
              }}
              checked={layout === 'RTL'}
            />
            <label htmlFor="RTL" className="mr-4 text-sm">
              راست به چپ
            </label>
          </div>
          <div className="field-radiobutton">
            <RadioButton
              inputId="LTR"
              name="layout"
              value="LTR"
              onChange={e => {
                setLayout(e.target.value)
              }}
              checked={layout === 'LTR'}
            />
            <label htmlFor="LTR" className="mr-4 text-sm">
              چپ به راست
            </label>
          </div>
          {handleError && <small className="mr-[8%] p-error">نوع چیدمان را انتخاب کنید</small>}
        </div>
        <Button label="ثبت" type="submit" className="relative right-[86%] text-sm mt-3 h-10 bg-indigo-600" loading={loading} />
      </form>
    </div>
  )
}
export default NewLanguage
