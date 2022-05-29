import { useEffect, useState, useCallback } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import Breadcrumb from '../../../component/breadcrumb/breadcrumb'
import { ToastAlert } from '../../common/toastAlert'
import { serviceType } from '../../../utils/constants/routes/publicRoute'
import { useFormik } from 'formik'
import { GetServiceTypeById, InsertServiceType, UpdateServiceType } from '../../../service/serviceTypeService'

function CreateEditServiceType() {
  const [loading, setLoading] = useState(false)
  const [serviceTypeById, setServiceTypeBYId] = useState([])
  const [initialValues, setInitialValues] = useState({
    ServTyp_Name: '',
  })

  const location = useLocation()
  let { ServiceId } = useParams()
  const navigate = useNavigate()

  const item = [
    { id: 1, label: 'تعریف انواع سرویس', url: serviceType.main },
    { id: 2, label: 'ثبت سرویس جدید', url: serviceType.create },
  ]

  const fetchServiceType = useCallback(() => {
    const formData = new FormData()
    formData.append('ID', ServiceId)

    GetServiceTypeById(formData)
      .then(res => {
        if (res.data) {
          setServiceTypeBYId(res.data)
        }
      })
      .catch(err => {
        ToastAlert.error('خطا در ارتباط با سرور ')
      })
  }, [ServiceId])

  useEffect(() => {
    fetchServiceType()
  }, [fetchServiceType])

  useEffect(() => {
    let path = location.pathname

    if (path.split('/')[2] === 'edit') {
      //if serviceType info is exist redirect to company index page

      //initialize for formi
      setInitialValues({
        ServTyp_Name: serviceTypeById.servTyp_Name,
      })
    }
  }, [location.pathname, serviceTypeById])

  const handleInsertServiceType = formData => {
    InsertServiceType(formData)
      .then(res => {
        if (res.status === 200 || res.data) {
          formik.resetForm()
          ToastAlert.success('ثبت سرویس جدید با موفقیت انجام شد')
          navigate('/service-types')
        } else {
          ToastAlert.error('ثبت سرویس جدید با خطا مواجه شد')
        }
      })
      .catch(err => {
        ToastAlert.error('ثبت سرویس جدید با خطا مواجه شد')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleUpdateServiceType = formData => {
    UpdateServiceType(formData)
      .then(res => {
        if (res.status === 200 || res.data === 'Succeed') {
          //formik.resetForm()
          ToastAlert.success('ویرایش سرویس با موفقیت انجام شد')
          navigate('/service-types')
        } else {
          ToastAlert.error('ویرایش سرویس با خطا مواجه شد')
        }
      })
      .catch(err => {
        ToastAlert.error('ویرایش سرویس با خطا مواجه شد')
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const formik = useFormik({
    initialValues,
    validate: data => {
      let errors = {}
      if (!data.ServTyp_Name) {
        errors.ServTyp_Name = 'نام سرویس را وارد کنید.'
      }
      return errors
    },
    onSubmit: data => {
      const formData = new FormData()
      Object.keys(data).forEach(key => {
        const value = data[key]
        formData.append(key, value)
      })
      setLoading(true)
      if (ServiceId) {
        formData.append('ServTyp_ID', ServiceId)
        handleUpdateServiceType(formData)
      } else {
        handleInsertServiceType(formData)
      }
    },
    enableReinitialize: true,
  })

  const isFormFieldValid = name => !!(formik.touched[name] && formik.errors[name])
  const getFormErrorMessage = name => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>
  }

  return (
    <div className="w-[80%] my-4 pb-4 rounded-md m-auto container bg-white rtl">
      <Breadcrumb item={item} />
      <form className="p-5 mt-10" onSubmit={formik.handleSubmit}>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-y-10 rtl">
          <div className=" flex flex-col justify-start mt-1">
            <span className="p-float-label relative">
              <InputText
                id="ServTyp_Name"
                name="ServTyp_Name"
                value={formik.values.ServTyp_Name}
                onChange={formik.handleChange}
                className={`${classNames({ 'p-invalid': isFormFieldValid('ServTyp_Name'), 'w-full': true })} h-9 `}
              />
              <label
                htmlFor="ServTyp_Name"
                className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('ServTyp_Name') })} right-2 text-sm`}
              >
                نام
              </label>
            </span>
            {getFormErrorMessage('ServTyp_Name')}
          </div>
        </section>
        <Button type="submit" loading={loading} label="ثبت" className="relative bg-indigo-600 right-[86%] text-sm mt-5 h-10" />
      </form>
    </div>
  )
}

export default CreateEditServiceType
