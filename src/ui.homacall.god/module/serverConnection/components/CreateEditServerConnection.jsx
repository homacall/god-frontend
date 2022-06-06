import { useState, useEffect, useCallback } from 'react'
import { useFormik } from 'formik'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { useParams, useLocation, useNavigate } from 'react-router'

import { createServerConnectionBreadcrumb } from '../constant/createServerConnectionBreadcrump'
import validate from '../constant/validate'
import { ToastAlert } from '../../common/toastAlert'
import { GetAllCompanyInfo } from '../../../service/companyService'
import { GetAllSystemPath } from '../../../service/systemPathService'
import { GetServerConnectionsById, InsertServerConnections, UpdateServerConnections } from '../../../service/serverConnectionService'
import Breadcrumb from '../../../component/breadcrumb/breadcrumb'
import styles from '../styles/serverConnection.module.css'
import { GetAllServiceType } from '../../../service/serviceTypeService'

const CreateEditServerConnection = () => {
  const [loading, setLoading] = useState(false)
  const [serverConnectionById, setServerConnectionBYId] = useState([])
  const [companies, setCompanies] = useState([])
  const [serviceType, setServiceType] = useState([])
  const [systemsPath, setSystemsPath] = useState([])
  const [initialValues, setInitialValues] = useState({
    SerConn_IP: '',
    SerConn_Port: '',
    SerConn_DbName: '',
    SerConn_UsrID: '',
    SerConn_HPass: '',
    SerConn_SysID: '',
    SerConn_CoInID: '',
    SerConn_ServTypID: '',
  })

  const location = useLocation()
  let { ServerId } = useParams()
  const navigate = useNavigate()

  const fetchCompany = () => {
    GetAllCompanyInfo().then(res => {
      if (res.data || res.status === 200) {
        setCompanies(res.data.map(item => ({ id: item.coIn_ID, name: item.coIn_Name })))
      }
    })
  }

  const fetchServiceType = () => {
    GetAllServiceType()
      .then(res => {
        if (res.data) setServiceType(res.data)
      })
      .catch(e => ToastAlert.error('خطا در  ارتباط با سرور '))
  }

  const fetchSystemPath = () => {
    GetAllSystemPath()
      .then(res => {
        if (res.data) setSystemsPath(res.data.map(item => ({ id: item.sys_ID, name: item.sys_Name })))
      })
      .catch(e => ToastAlert.error('خطا در  ارتباط با سرور '))
  }

  const fetchServerConnection = useCallback(() => {
    const formData = new FormData()
    formData.append('ID', ServerId)
    GetServerConnectionsById(formData)
      .then(res => {
        if (res.data) {
          setServerConnectionBYId(res.data)
        }
      })
      .catch(err => console.log('error: ', err))
  }, [ServerId])

  useEffect(() => {
    fetchCompany()
    fetchServiceType()
    fetchSystemPath()
    fetchServerConnection()
  }, [fetchServerConnection])

  useEffect(() => {
    let path = location.pathname
    if (path.split('/')[2] === 'edit') {
      if (Object.keys(serverConnectionById).length > 0) {
        //fetchSystemName()
        setInitialValues({
          SerConn_IP: serverConnectionById.serConn_IP,
          SerConn_Port: serverConnectionById.serConn_Port,
          SerConn_DbName: serverConnectionById.serConn_DbName,
          SerConn_UsrID: serverConnectionById.serConn_UsrID,
          SerConn_HPass: serverConnectionById.serConn_HPass,
          SerConn_SysID: serverConnectionById.serConn_SysID,
          SerConn_CoInID: serverConnectionById.serConn_CoInID,
          SerConn_ServTypID: serverConnectionById.serConn_ServTypID,
        })
      }
    }
  }, [location.pathname, serverConnectionById])

  const handleUpdateServerConnections = formData => {
    UpdateServerConnections(formData)
      .then(res => {
        if (res.status === 200 || res.data) {
          formik.resetForm()
          ToastAlert.success('ویرایش پایگاه داده با موفقیت انجام شد')
          navigate('/server-connection')
        } else {
          ToastAlert.error('ویرایش پایگاه داده با خطا مواجه شد')
        }
      })
      .catch(err => {
        ToastAlert.error('ویرایش پایگاه داده با خطا مواجه شد')
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleInsertServerConnections = formData => {
    InsertServerConnections(formData)
      .then(res => {
        if (res.status === 200 || res.data) {
          formik.resetForm()
          ToastAlert.success('ثبت پایگاه داده جدید با موفقیت انجام شد')
          navigate('/server-connection')
        } else {
          ToastAlert.error('ثبت پایگاه داده جدید با خطا مواجه شد')
        }
      })
      .catch(err => {
        ToastAlert.error('ثبت پایگاه داده جدید با خطا مواجه شد')
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
      setLoading()
      const formData = new FormData()
      Object.keys(values).forEach(key => {
        const value = values[key]
        formData.append(key, value)
      })

      if (ServerId) {
        formData.append('SerConn_ID', ServerId)
        handleUpdateServerConnections(formData)
      } else {
        handleInsertServerConnections(formData)
      }
    },
    enableReinitialize: true,
  })

  return (
    <div className="w-[80%] my-4 pb-4 rounded-md  m-auto container bg-white rtl ">
      <Breadcrumb item={createServerConnectionBreadcrumb} />
      <form className="p-5 mt-10 " onSubmit={formik.handleSubmit}>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  gap-y-10 rtl">
          <span className="p-float-label relative mb-5">
            <InputText
              id="SerConn_IP"
              name="SerConn_IP"
              value={formik.values.SerConn_IP}
              className={`p-inputtext p-component w-full h-9 ${
                formik.touched.SerConn_IP && formik.errors.SerConn_IP && 'border border-red-600'
              }`}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="SerConn_IP"
              className={`${formik.touched.SerConn_IP && formik.errors.SerConn_IP && styles.labelError} right-2 text-sm`}
            >
              ip
            </label>
            {formik.touched.SerConn_IP && formik.errors.SerConn_IP ? (
              <div className="absolute text-red-600 text-sm my-2">{formik.errors.SerConn_IP}</div>
            ) : null}
          </span>

          <span className="p-float-label relative mb-5">
            <InputText
              id="SerConn_Port"
              name="SerConn_Port"
              value={formik.values.SerConn_Port}
              className={`p-inputtext p-component w-full h-9 ${
                formik.touched.SerConn_Port && formik.errors.SerConn_Port && 'border border-red-600'
              }`}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="SerConn_Port"
              className={`${formik.touched.SerConn_Port && formik.errors.SerConn_Port && styles.labelError} right-2 text-sm`}
            >
              port
            </label>
            {formik.touched.SerConn_Port && formik.errors.SerConn_Port ? (
              <div className="absolute text-red-600 text-sm">{formik.errors.SerConn_Port}</div>
            ) : null}
          </span>

          <span className="p-float-label relative mb-5">
            <InputText
              id="SerConn_DbName"
              name="SerConn_DbName"
              value={formik.values.SerConn_DbName}
              className={`p-inputtext p-component w-full h-9 ${
                formik.touched.SerConn_DbName && formik.errors.SerConn_DbName && 'border border-red-600'
              }`}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="SerConn_DbName"
              className={`${formik.touched.SerConn_DbName && formik.errors.SerConn_DbName && styles.labelError} right-2 text-sm`}
            >
              نام پایگاه داده
            </label>
            {formik.touched.SerConn_DbName && formik.errors.SerConn_DbName ? (
              <div className="absolute text-red-600 text-sm">{formik.errors.SerConn_DbName}</div>
            ) : null}
          </span>

          <span className="p-float-label relative mb-5">
            <InputText
              id="SerConn_UsrID"
              name="SerConn_UsrID"
              value={formik.values.SerConn_UsrID}
              className={`p-inputtext p-component w-full h-9 ${
                formik.touched.SerConn_UsrID && formik.errors.SerConn_UsrID && 'border border-red-600'
              }`}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="SerConn_UsrID"
              className={`${formik.touched.SerConn_UsrID && formik.errors.SerConn_UsrID && styles.labelError} right-2 text-sm`}
            >
              User ID
            </label>
            {formik.touched.SerConn_UsrID && formik.errors.SerConn_UsrID ? (
              <div className="absolute text-red-600 text-sm">{formik.errors.SerConn_UsrID}</div>
            ) : null}
          </span>

          <span className="p-float-label relative mb-5">
            <Password
              id="SerConn_HPass"
              name="SerConn_HPass"
              value={formik.values.SerConn_HPass}
              className={`p-component w-full h-9 ${
                formik.touched.SerConn_HPass && formik.errors.SerConn_HPass && 'border border-red-600 rounded-md'
              }`}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="SerConn_HPass"
              className={`${formik.touched.SerConn_HPass && formik.errors.SerConn_HPass && styles.labelError} right-2 text-sm`}
            >
              رمز عبور
            </label>
            {formik.touched.SerConn_HPass && formik.errors.SerConn_HPass ? (
              <div className="absolute text-red-600 text-sm">{formik.errors.SerConn_HPass}</div>
            ) : null}
          </span>

          <span className="p-float-label" dir="ltr">
            <Dropdown
              options={serviceType}
              id="SerConn_ServTypID"
              name="SerConn_ServTypID"
              optionLabel="servTyp_Name"
              optionValue="servTyp_ID"
              value={formik.values.SerConn_ServTypID}
              placeholder="انتخاب  سرویس"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              dir="rtl"
              style={{ width: '100%' }}
            />

            {formik.touched.SerConn_ServTypID && formik.errors.SerConn_ServTypID ? (
              <div className="text-right">
                <small className="p-error">{formik.errors.SerConn_ServTypID}</small>
              </div>
            ) : null}
          </span>

          <span className="p-float-label" dir="ltr">
            <Dropdown
              options={systemsPath}
              id="SerConn_SysID"
              name="SerConn_SysID"
              optionLabel="name"
              optionValue="id"
              value={formik.values.SerConn_SysID}
              placeholder="انتخاب  سیستم"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              dir="rtl"
              style={{ width: '100%' }}
            />

            {formik.touched.SerConn_SysID && formik.errors.SerConn_SysID ? (
              <div className="text-right">
                <small className="p-error">{formik.errors.SerConn_SysID}</small>
              </div>
            ) : null}
          </span>
          <span className="p-float-label" dir="ltr">
            <Dropdown
              options={companies}
              id="SerConn_CoInID"
              name="SerConn_CoInID"
              optionLabel="name"
              optionValue="id"
              value={formik.values.SerConn_CoInID}
              placeholder="انتخاب  شرکت"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              dir="rtl"
              style={{ width: '100%' }}
            />

            {formik.touched.SerConn_CoInID && formik.errors.SerConn_CoInID ? (
              <div className="text-right">
                <small className="p-error">{formik.errors.SerConn_CoInID}</small>
              </div>
            ) : null}
          </span>
        </section>

        <div className="mt-10 flex justify-end justify-items-end">
          <Button loading={loading} label="ثبت" className="ml-10 text-sm mt-3 h-10 bg-indigo-600" type="submit" />
        </div>
      </form>
    </div>
  )
}

export default CreateEditServerConnection
