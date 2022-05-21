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
  const [companyById, setCompanyBYId] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const location = useLocation();
  let { CompanyId } = useParams();
  const navigate = useNavigate();

  const fetchLanguage = () => {
    GetAllLanguage().then(res => {
      if (res.data || res.status === 200) {
        setLanguages(res.data.map(item => ({ id: item.lang_ID, name: item.lang_Name })))
      }
    })
  }
const fetchCompany = useCallback(()=>{
  const formData = new FormData()
  formData.append("ID", CompanyId)
  GetCompanyById(formData).then(res => {
    if (res.data) {
      setCompanyBYId(res.data)
  
    }
  }).catch(err=>{ console.log("error: ", err); ToastAlert.error('خطا در ارتباط با سرور ')} )},[CompanyId]) 

  useEffect(() => {
    fetchLanguage() 
    fetchCompany()
  }, [fetchCompany])
  
  useEffect(() => {
    let path = location.pathname;

    if(path.split("/")[2] === "new-company"){
       //if company info is exist redirect to company index page 
       if(companyById.length > 0){
        navigate("/company");   
    }
        
    }else{
       //initialize for formik
       setImageUrl(companyById.coIn_Logo);

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
        navigate("/company")
        
      } else {
        ToastAlert.error('ثبت شرکت جدید با خطا مواجه شد')
      }
    }).catch(err => {
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
      
      if (res.status === 200 || res.data === "Succeed") {
        //formik.resetForm()
        ToastAlert.success('ویرایش شرکت با موفقیت انجام شد')
        navigate("/company")
        
      } else {
        ToastAlert.error('ویرایش شرکت با خطا مواجه شد')
      }
    }).catch(err => {
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
      } else {
        const formData = new FormData()
        values.CoIn_Logo = imageUrl;
        Object.keys(values).forEach(key => {
          const value = values[key]
          formData.append(key, value)
        })
        setLoading(true);
       if(CompanyId){
         formData.append("CoIn_ID", CompanyId);
         handleUpdateCompany(formData)
       }else{
         handleInsetCompany(formData) 
       }
        
        setImageError(false)
      }
    },
   enableReinitialize: true,
  });

  return (
    <div className="w-[80%] my-4 pb-4 rounded-md  m-auto container bg-white rtl ">
      <Breadcrumb item={createCompanyBreadcrumb} />
      <form className="p-5 mt-10" onSubmit={formik.handleSubmit}>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 rtl">
        <span className="p-float-label rtl" dir='ltr'>
          <InputText
            id="CoIn_Name"
            name="CoIn_Name" 
            value={formik.values.CoIn_Name}
            className="p-inputtext p-component rtl"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label htmlFor="CoIn_Name">نام</label>
          {formik.touched.CoIn_Name && formik.errors.CoIn_Name ? (
           <div className="text-right"><small className='mr-[8%] p-error'>{formik.errors.CoIn_Name}</small></div>
       ) : null}
        </span>

        <span className="p-float-label rtl" dir='ltr'>
        <InputText
            id="CoIn_SmsNumber"
            name="CoIn_SmsNumber"
            rtl
            value={formik.values.CoIn_SmsNumber}
            className="p-inputtext p-component rtl"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            onKeyPress={event => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault()
              }
            }}
          />
          <label htmlFor="CoIn_SmsNumber">شماره سامانه پیامک</label>
          {formik.touched.CoIn_SmsNumber && formik.errors.CoIn_SmsNumber ? (
           <div  className="text-right"><small className='mr-[8%] p-error'>{formik.errors.CoIn_SmsNumber}</small></div>
       ) : null} 
        </span>

        <span className="p-float-label rtl" dir='ltr'>
          <InputText
            id="CoIn_Phone"
            name="CoIn_Phone"
            value={formik.values.CoIn_Phone}
            className="p-inputtext p-component rtl"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            onKeyPress={event => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault()
              }
            }}
          />
          <label htmlFor="CoIn_Phone">تلفن</label>
          {formik.touched.CoIn_Phone && formik.errors.CoIn_Phone ? (
           <div className="text-right"><small className='mr-[8%] p-error'>{formik.errors.CoIn_Phone}</small></div>
       ) : null} 
        </span>

        <span className="p-float-label rtl" dir='ltr'>
          <InputText
            id="CoIn_Mobile"
            name="CoIn_Mobile" 
            value={formik.values.CoIn_Mobile}
            className="p-inputtext p-component rtl"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            onKeyPress={event => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault()
              }
            }}
          />
          <label htmlFor="CoIn_Mobile">موبایل</label>
          {formik.touched.CoIn_Mobile && formik.errors.CoIn_Mobile ? (
          <div className="text-right"><small className='mr-[8%] p-error'>{formik.errors.CoIn_Mobile}</small></div>
       ) : null} 
        </span>

        <span className="p-float-label rtl" dir='ltr'>
          <InputText
            id="CoIn_Fax"
            name="CoIn_Fax" 
            value={formik.values.CoIn_Fax}
            className="p-inputtext p-component rtl"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            onKeyPress={event => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault()
              }
            }}
          />
          <label htmlFor="CoIn_Fax">فکس</label>
          {formik.touched.CoIn_Fax && formik.errors.CoIn_Fax ? (
          <div className="text-right"><small className='mr-[8%] p-error'>{formik.errors.CoIn_Fax}</small></div>
       ) : null} 
        </span>

        <span className="p-float-label rtl" dir='ltr'>
          <InputText
            id="CoIn_Email"
            name="CoIn_Email" 
            value={formik.values.CoIn_Email}
            className="p-inputtext p-component rtl"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label htmlFor="CoIn_Email">ایمیل</label>
          {formik.touched.CoIn_Email && formik.errors.CoIn_Email ? (
           <div className="text-right"><small className='mr-[8%] p-error'>{formik.errors.CoIn_Email}</small></div>
       ) : null} 
        </span>

        <span className="p-float-label rtl" dir='ltr'>
          <InputText
            id="CoIn_Site"
            name="CoIn_Site" 
            value={formik.values.CoIn_Site}
            className="p-inputtext p-component rtl"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label htmlFor="CoIn_Site">سایت</label>
          {formik.touched.CoIn_Site && formik.errors.CoIn_Site ? (
           <div className="text-right"><small className='mr-[8%] p-error'>{formik.errors.CoIn_Site}</small></div>
       ) : null} 
        </span>

        <span className="p-float-label rtl" dir='ltr'>
          <InputText
            id="CoIn_Instagram"
            name="CoIn_Instagram" 
            value={formik.values.CoIn_Instagram}
            className="p-inputtext p-component rtl"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label htmlFor="CoIn_Instagram">اینستاگرام</label>
          {formik.touched.CoIn_Instagram && formik.errors.CoIn_Instagram ? (
            <div className="text-right"><small className='mr-[8%] p-error'>{formik.errors.CoIn_Instagram}</small></div>
       ) : null}
        </span>

        <span className="p-float-label rtl" dir='ltr'>
          <Dropdown 
             options={languages} 
             id="CoIn_LangID"
             name="CoIn_LangID"  
             optionLabel="name"
             optionValue="id"
             value={formik.values.CoIn_LangID}
             onChange={formik.handleChange}
             className="rtl"
             style={{ width: '70%'}}
           />
           {formik.errors.CoIn_LangID ? (
             <div className="text-right"><small className='mr-[8%] p-error'>{formik.errors.CoIn_LangID}</small></div>

       ) : null}
         </span>

         <span className="p-float-label rtl" dir='ltr'>
          <Dropdown 
             options={dateTypes} 
             id="CoIn_TypeDateTime"
             name="CoIn_TypeDateTime"  
             optionLabel="name"
             optionValue="id"
             value={formik.values.CoIn_TypeDateTime} 
             onChange={formik.handleChange}
             className="rtl"
             style={{ width: '70%'}}
           />
           {formik.errors.CoIn_TypeDateTime ? (
            <div className="text-right"><small className='mr-[8%] p-error'>{formik.errors.CoIn_TypeDateTime}</small></div>
       ) : null}
         </span>

        </section>

        <div className='w-full mt-5 flex flex-col items-start content-center'>
        <InputText
            id="CoIn_Address"
            name="CoIn_Address"
            value={formik.values.CoIn_Address}
            className="p-inputtext p-component w-11/12 rtl"
            placeholder='آدرس'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />   
           {formik.errors.CoIn_Address ? (
             <div className="w-[250px]"><small className='mr-[8%] p-error'>{formik.errors.CoIn_Address}</small></div>
       ) : null}  
        </div>
     
         <div className='w-full mt-5 flex flex-col items-start content-center'>
            <InputTextarea 
             id="CoIn_About" 
             name="CoIn_About" 
             value={formik.values.CoIn_About}
             rows={5} 
             placeholder="درباره شرکت" 
             className='p-inputtextarea w-11/12'
             onBlur={formik.handleBlur}
             onChange={formik.handleChange}
            />
            
            {formik.errors.CoIn_About ? (
            <div className="w-[250px]"><small className='mr-[8%] p-error'>{formik.errors.CoIn_About}</small></div>
       ) : null}
         </div>

         <div className="mt-10 col-span-3 flex justify-center items-center">
         <InputImage setImageUrl={setImageUrl} imageError={imageError} imageUrl={imageUrl} />
         </div>

         <div className="mt-10 flex justify-end justify-items-end">
          <Button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white min-w-[90px] px-8 rtl text-sm' loading={loading}>ثبت</Button>
        </div>
        
      </form>
      
    </div>
  )
}

