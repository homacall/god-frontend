import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { useParams, useLocation, useNavigate } from 'react-router'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputImage } from '../../common/fileUploader'
import { Button } from 'primereact/button'

import Breadcrumb from '../../../component/breadcrumb/breadcrumb'
import { Alert } from '../../common/alert'

import { createCompanyBreadcrumb } from '../constant/createCompanyBreadcrumb'
import validate from '../constant/validate'
import { UpdateCompany, getCompanyById, getAllLanguages } from '../constant/Crud'
import { GetAllLanguage } from '../../../service/languageService'
import { GetAllCompanyInfo, InsertCompany } from '../../../service/companyService'


export const CreateCompany = () => {
  const [imageUrl, setImageUrl] = useState('')
  const [imageError, setImageError] = useState(false)
  const [companyInfo, setCompanyInfo] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
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
    CoIn_SmsNumber: ''
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

  useEffect(() => {
    fetchLanguage() 
    GetAllCompanyInfo().then(res => {
      if (res.data) {
        setCompanyInfo(res.data)
      }
    }).catch(err=> console.log("error: ", err))
  }, [])
  
  useEffect(() => {
    let path = location.pathname;

    if(path.split("/")[2] === "new-company"){
       //if company info is exist redirect to company index page 
       if(companyInfo.length > 0){
        navigate("/company");   
    }
        
    }else{
      console.log("company: ", companyInfo)
       //initialize for formik
       setImageUrl(companyInfo.coIn_Logo);
       setInitialValues({
        CoIn_FName: companyInfo.coIn_FName,
        CoIn_Address: companyInfo.coIn_Address,
        CoIn_Fax: companyInfo.coIn_fax,
        CoIn_Email: companyInfo.coIn_Email,
        CoIn_Phone: companyInfo.coIn_Phone,
        CoIn_Mobile: companyInfo.coIn_Mobile,
        CoIn_Site: companyInfo.coIn_Site,
        CoIn_Instagram: companyInfo.coIn_Instagram,
        CoIn_About: companyInfo.coIn_About,
        CoIn_LangID: companyInfo.coIn_LangID,
        CoIn_SmsNumber: companyInfo.coIn_SmsNumber
      })
    }
    
  }, [location.pathname, navigate, CompanyId])

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: values => {
      if (!imageUrl) {
        return setImageError(true)
      } else {
        values.CoIn_Logo = imageUrl;
       if(CompanyId){
        UpdateCompany(values, CompanyId)
       }else{
        const formData = new FormData()
        Object.keys(values).forEach(key => {
          const value = values[key]
          formData.append(key, value)
        })
          if(!CompanyId){
            InsertCompany(formData)
            .then(res => {
              setShowMessage(true)
              if (res.status === 200 || res.data === 'success') {
                formik.resetForm()
                setMessage('ثبت شرکت جدید با موفقیت انجام شد')
              } else {
                setMessage('ثبت شرکت جدید با خطا مواجه شد')
              }
            }).catch(err => {
              setShowMessage(true)
              setMessage('ثبت شرکت جدید با خطا مواجه شد')
              console.log(err)
            })
            .finally(() => {
              setLoading(false)
            })
          }else{
             InsertCompany(formData)
            .then(res => {
              setShowMessage(true)
              if (res.status === 200 || res.data === 'success') {
                formik.resetForm()
                setMessage('ثبت شرکت جدید با موفقیت انجام شد')
              } else {
                setMessage('ثبت شرکت جدید با خطا مواجه شد')
              }
            }).catch(err => {
              setShowMessage(true)
              setMessage('ثبت شرکت جدید با خطا مواجه شد')
              console.log(err)
            })
            .finally(() => {
              setLoading(false)
            })
          }
       }
        
        setImageError(false)
      }
    },
   enableReinitialize: true,
  });

  return (
    <div className="w-[80%] my-4 pb-4 rounded-md  m-auto container bg-white rtl ">
      <Breadcrumb item={createCompanyBreadcrumb} />
      <Alert message={message} setMessage={setMessage} setShowMessage={setShowMessage} showMessage={showMessage} />
      <form className="p-5 mt-10" onSubmit={formik.handleSubmit}>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-7">
        <span className="p-float-label" dir='ltr'>
          <InputText
            id="CoIn_Name"
            name="CoIn_Name" 
            value={formik.values.CoIn_Name}
            className="p-inputtext p-component"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label htmlFor="CoIn_Name">نام</label>
          {formik.touched.CoIn_Name && formik.errors.CoIn_Name ? (
         <div className='text-red-600'>{formik.errors.CoIn_Name}</div>
       ) : null}
        </span>

        <span className="p-float-label" dir='ltr'>
        <InputText
            id="CoIn_SmsNumber"
            name="CoIn_SmsNumber"
            value={formik.values.CoIn_SmsNumber}
            className="p-inputtext p-component"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label htmlFor="CoIn_SmsNumber">شماره سامانه پیامک</label>
          {formik.touched.CoIn_SmsNumber && formik.errors.CoIn_SmsNumber ? (
         <div className='text-red-600'>{formik.errors.CoIn_SmsNumber}</div>
       ) : null} 
        </span>

        <span className="p-float-label" dir='ltr'>
          <InputText
            id="CoIn_Phone"
            name="CoIn_Phone"
            value={formik.values.CoIn_Phone}
            className="p-inputtext p-component"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label htmlFor="CoIn_Phone">تلفن</label>
          {formik.touched.CoIn_Phone && formik.errors.CoIn_Phone ? (
         <div className='text-red-600'>{formik.errors.CoIn_Phone}</div>
       ) : null} 
        </span>

        <span className="p-float-label" dir='ltr'>
          <InputText
            id="CoIn_Mobile"
            name="CoIn_Mobile" 
            value={formik.values.CoIn_Mobile}
            className="p-inputtext p-component"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label htmlFor="CoIn_Mobile">موبایل</label>
          {formik.touched.CoIn_Mobile && formik.errors.CoIn_Mobile ? (
         <div className='text-red-600'>{formik.errors.CoIn_Mobile}</div>
       ) : null} 
        </span>

        <span className="p-float-label" dir='ltr'>
          <InputText
            id="CoIn_Fax"
            name="CoIn_Fax" 
            value={formik.values.CoIn_Fax}
            className="p-inputtext p-component"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label htmlFor="CoIn_Fax">فکس</label>
          {formik.touched.CoIn_Fax && formik.errors.CoIn_Fax ? (
         <div className='text-red-600'>{formik.errors.CoIn_Fax}</div>
       ) : null} 
        </span>

        <span className="p-float-label" dir='ltr'>
          <InputText
            id="CoIn_Email"
            name="CoIn_Email" 
            value={formik.values.CoIn_Email}
            className="p-inputtext p-component"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label htmlFor="CoIn_Email">ایمیل</label>
          {formik.touched.CoIn_Email && formik.errors.CoIn_Email ? (
         <div className='text-red-600'>{formik.errors.CoIn_Email}</div>
       ) : null} 
        </span>

        <span className="p-float-label" dir='ltr'>
          <InputText
            id="CoIn_Site"
            name="CoIn_Site" 
            value={formik.values.CoIn_Site}
            className="p-inputtext p-component"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label htmlFor="CoIn_Site">سایت</label>
          {formik.touched.CoIn_Site && formik.errors.CoIn_Site ? (
         <div className='text-red-600'>{formik.errors.CoIn_Site}</div>
       ) : null} 
        </span>

        <span className="p-float-label" dir='ltr'>
          <InputText
            id="CoIn_Instagram"
            name="CoIn_Instagram" 
            value={formik.values.CoIn_Instagram}
            className="p-inputtext p-component"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label htmlFor="CoIn_Instagram">اینستاگرام</label>
          {formik.touched.CoIn_Instagram && formik.errors.CoIn_Instagram ? (
         <div className='text-red-600'>{formik.errors.CoIn_Instagram}</div>
       ) : null}
        </span>

        <span className="p-float-label" dir='ltr'>
          
          <Dropdown 
             options={languages} 
             id="CoIn_LangID"
             name="CoIn_LangID"  
             optionLabel="name"
             optionValue="id"
             value={formik.values.CoIn_LangID}
             filter 
             showClear 
             filterBy="name"
             placeholder="انتخاب زبان" 
             onChange={formik.handleChange}
             dir="rtl"
             style={{ width: '70%'}}
           />
           {formik.touched.CoIn_LangID && formik.errors.CoIn_LangID ? (
         <div className='text-red-600'>{formik.errors.CoIn_LangID}</div>
       ) : null}
         </span>

        </section>

        <div className='w-full mt-5 flex flex-col items-end content-center'>
        <InputText
            id="CoIn_Address"
            name="CoIn_Address"
            value={formik.values.CoIn_Address}
            className="p-inputtext p-component w-11/12"
            placeholder='آدرس'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />   
             {/* <label htmlFor="Comp_Address">آدرس</label>   */}
           {formik.touched.CoIn_Address && formik.errors.CoIn_Address ? (
         <div className='text-red-600'>{formik.errors.CoIn_Address}</div>
       ) : null}  
        </div>
     
         <div className='w-full mt-5 flex flex-col items-end content-center'>
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
            
            {formik.touched.CoIn_About && formik.errors.CoIn_About ? (
         <div className='text-red-600'>{formik.errors.CoIn_About}</div>
       ) : null}
         </div>

         <div className="mt-10 col-span-3 flex justify-center items-center">
         <InputImage setImageUrl={setImageUrl} imageError={imageError}/>
         </div>

         <div className="mt-10 flex justify-end justify-items-end">
          <Button loading={loading} label="ثبت" className="p-button-success w-[200px] text-sm mt-3 h-10" type="submit" />
        </div>

      </form>
    </div>
  )
}

