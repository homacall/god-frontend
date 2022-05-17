import { useState, useEffect, useCallback } from 'react'
import { useFormik } from 'formik'
import { InputText } from 'primereact/inputtext' 
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { useParams, useLocation, useNavigate } from 'react-router'

import Breadcrumb from '../../../component/breadcrumb/breadcrumb'
import { Alert } from '../../common/alert'

import { createServerConnectionBreadcrumb } from '../constant/createServerConnectionBreadcrump'
import validate from '../constant/validate'
import {GetServerConnectionsById, InsertServerConnections, UpdateServerConnections} from '../../../service/serverConnectionService'
import { GetAllCompanyInfo } from '../../../service/companyService'

const CreateEditServerConnection = () => {
  const [loading, setLoading] = useState(false);
  const [serverConnectionById, setServerConnectionBYId] = useState([]);
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [companies, setCompanies] = useState([])
  const [initialValues, setInitialValues] = useState({
    SerConn_IP: '',
    SerConn_Port: '',
    SerConn_DbName: '',
    SerConn_UsrID: '',
    SerConn_HPass: '',
    SerConn_SysID: '',
    SerConn_SysName: '',
    SerConn_CoInID: '',
  })

  const location = useLocation();
  let { ServerId } = useParams();
  const navigate = useNavigate();

  const fetchCompany = () => {
    GetAllCompanyInfo().then(res => {
      if (res.data || res.status === 200) {
        setCompanies(res.data.map(item => ({ id: item.coIn_ID, name: item.coIn_Name })))
      }
    })
  }

  const fetchServerConnection = useCallback(()=>{
    const formData = new FormData()
    formData.append("ID", ServerId)
    GetServerConnectionsById(formData).then(res => {
      if (res.data) {
        setServerConnectionBYId(res.data)
    
      }
    }).catch(err=> console.log("error: ", err))},[ServerId])

useEffect(() => {
    fetchCompany()
    fetchServerConnection()
}, [fetchServerConnection])

useEffect(() => {
    let path = location.pathname;
    if(path.split("/")[2] === "edit"){
      if( Object.keys(serverConnectionById).length > 0){
         //initialize for formik
        setInitialValues({
            SerConn_IP: serverConnectionById.serConn_IP,
            SerConn_Port: serverConnectionById.serConn_Port,
            SerConn_DbName: serverConnectionById.serConn_DbName,
            SerConn_UsrID: serverConnectionById.serConn_UsrID,
            SerConn_HPass: serverConnectionById.serConn_HPass,
            SerConn_SysID: serverConnectionById.serConn_SysID,
            SerConn_SysName: serverConnectionById.serConn_SysName,
            SerConn_CoInID: serverConnectionById.serConn_CoInID,
          })
      }
        
    }
  }, [location.pathname, serverConnectionById])

  const handleUpdateCompany = formData => {
   UpdateServerConnections(formData)
    .then(res => {
      setShowMessage(true)
      if (res.status === 200 || res.data) {
        formik.resetForm()
        setMessage('ویرایش پایگاه داده جدید با موفقیت انجام شد')
        
      } else {
        setMessage('ویرایش پایگاه داده جدید با خطا مواجه شد')
      }
    }).catch(err => {
      setShowMessage(true)
      setMessage('ویرایش پایگاه داده جدید با خطا مواجه شد')
      console.log(err)
    })
    .finally(() => {
      setLoading(false)
    })
  }

  const handleInsetCompany = formData => {
    InsertServerConnections(formData)
    .then(res => {
      setShowMessage(true)
      if (res.status === 200 || res.data) {
        formik.resetForm()
        setMessage('ثبت پایگاه داده جدید با موفقیت انجام شد')
        
      } else {
        setMessage('ثبت پایگاه داده جدید با خطا مواجه شد')
      }
    }).catch(err => {
      setShowMessage(true)
      setMessage('ثبت پایگاه داده جدید با خطا مواجه شد')
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
        
        setLoading(); 
        const formData = new FormData()
        values.SerConn_SysID = parseInt(values.SerConn_SysID)
        Object.keys(values).forEach(key => {
          const value = values[key]
          formData.append(key, value)
        }) 

        if(ServerId){
            formData.append("SerConn_ID", ServerId);
            handleUpdateCompany(formData)
          }else{
            handleInsetCompany(formData) 
          }
           
    },
   enableReinitialize: true,
  });

  return (
    <div className="w-[80%] my-4 pb-4 rounded-md  m-auto container bg-white rtl ">
      <Breadcrumb item={createServerConnectionBreadcrumb} />
      <Alert message={message} setMessage={setMessage} setShowMessage={setShowMessage} showMessage={showMessage} callBack={()=>navigate("/server-connection")} />
      <form className="p-5 mt-10" onSubmit={formik.handleSubmit}>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-7">
        <span className="p-float-label" dir='ltr'>
          <InputText
            id="SerConn_IP"
            name="SerConn_IP" 
            value={formik.values.SerConn_IP}
            className="p-inputtext p-component"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label htmlFor="SerConn_IP">ip</label>
          {formik.touched.SerConn_IP && formik.errors.SerConn_IP ? (
         <div className='text-red-600'>{formik.errors.SerConn_IP}</div>
       ) : null}
        </span>

        <span className="p-float-label" dir='ltr'>
        <InputText
            id="SerConn_Port"
            name="SerConn_Port"
            value={formik.values.SerConn_Port}
            className="p-inputtext p-component"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label htmlFor="SerConn_Port">port</label>
          {formik.touched.SerConn_Port && formik.errors.SerConn_Port ? (
         <div className='text-red-600'>{formik.errors.SerConn_Port}</div>
       ) : null} 
        </span>

        <span className="p-float-label" dir='ltr'>
          <InputText
            id="SerConn_DbName"
            name="SerConn_DbName"
            value={formik.values.SerConn_DbName}
            className="p-inputtext p-component"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label htmlFor="SerConn_DbName">نام پایگاه داده</label>
          {formik.touched.SerConn_DbName && formik.errors.SerConn_DbName ? (
         <div className='text-red-600'>{formik.errors.SerConn_DbName}</div>
       ) : null} 
        </span>

        <span className="p-float-label" dir='ltr'>
          <InputText
            id="SerConn_UsrID"
            name="SerConn_UsrID" 
            value={formik.values.SerConn_UsrID}
            className="p-inputtext p-component"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label htmlFor="SerConn_UsrID">User ID</label>
          {formik.touched.SerConn_UsrID && formik.errors.SerConn_UsrID ? (
         <div className='text-red-600'>{formik.errors.SerConn_UsrID}</div>
       ) : null} 
        </span>

        <span className="p-float-label" dir='ltr'>
          <Password
            id="SerConn_HPass"
            name="SerConn_HPass" 
            value={formik.values.SerConn_HPass}
            
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label htmlFor="SerConn_HPass">پسورد</label>
          {formik.touched.SerConn_HPass && formik.errors.SerConn_HPass ? (
         <div className='text-red-600'>{formik.errors.SerConn_HPass}</div>
       ) : null} 
        </span>

        <span className="p-float-label" dir='ltr'>
          <InputText
            id="SerConn_SysID"
            name="SerConn_SysID" 
            value={formik.values.SerConn_SysID}
            className="p-inputtext p-component"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label htmlFor="SerConn_SysID">System ID</label>
          {formik.touched.SerConn_SysID && formik.errors.SerConn_SysID ? (
         <div className='text-red-600'>{formik.errors.SerConn_SysID}</div>
       ) : null} 
        </span>

        <span className="p-float-label" dir='ltr'>
          <InputText
            id="SerConn_SysName"
            name="SerConn_SysName" 
            value={formik.values.SerConn_SysName}
            className="p-inputtext p-component"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label htmlFor="SerConn_SysName">نام سیستم</label>
          {formik.touched.SerConn_SysName && formik.errors.SerConn_SysName ? (
         <div className='text-red-600'>{formik.errors.SerConn_SysName}</div>
       ) : null} 
        </span>

        <span className="p-float-label" dir='ltr'>
          <Dropdown 
             options={companies} 
             id="SerConn_CoInID"
             name="SerConn_CoInID"  
             optionLabel="name"
             optionValue="id"
             value={formik.values.SerConn_CoInID} 
             placeholder="انتخاب  شرکت" 
             onChange={formik.handleChange}
             dir="rtl"
             style={{ width: '70%'}}
           />
           {formik.touched.SerConn_CoInID && formik.errors.SerConn_CoInID ? (
         <div className='text-red-600'>{formik.errors.SerConn_CoInID}</div>
       ) : null}
         </span>

        </section>

         <div className="mt-10 flex justify-end justify-items-end">
          <Button loading={loading} label="ثبت" className="p-button-success w-[200px] text-sm mt-3 h-10" type="submit" />
        </div>

      </form>
    </div>
  )
}

export default CreateEditServerConnection