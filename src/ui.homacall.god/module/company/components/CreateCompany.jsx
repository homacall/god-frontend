import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { useParams, useLocation, useNavigate } from 'react-router'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputImage } from '../../common/fileUploader'
import { Button } from 'primereact/button'

import Breadcrumb from '../../../component/breadcrumb/breadcrumb'

import { createCompanyBreadcrumb } from '../constant/createCompanyBreadcrumb'
import validate from '../constant/validate'
import { InsertCompany, UpdateCompany, getCompanyById, getAllLanguages } from '../constant/Crud'

export const CreateCompany = () => {
  const [imageUrl, setImageUrl] = useState('')
  const [imageError, setImageError] = useState(false)
  const [initialValues, setInitialValues] = useState({
    Comp_FName: '',
    Comp_Address: '',
    Comp_Fax: '',
    Comp_Email: '',
    Comp_Phone: '',
    Comp_Mobile: '',
    Comp_Site: '',
    Comp_Insta: '',
    Comp_About: '',
    Comp_Lang: '',
    Comp_SMS: ''
  })

  const location = useLocation();
  let { CompanyId } = useParams();
  const navigate = useNavigate();

  //get languages from database with api
  let languages = getAllLanguages();
  

  useEffect(() => {
    let path = location.pathname;
    
     //get company info from database with companyId params 
     let companyInfo = getCompanyById(CompanyId);

     if(path.split("/")[2] === "new-company"){
       //if company info is exist redirect to company index page 
       if(companyInfo.length > 0){
        navigate("/company");   
       }
        
    }else{
       //initialize for formik
       setImageUrl(companyInfo[0].logo);
       setInitialValues({
        Comp_FName: companyInfo[0].name,
        Comp_Address: companyInfo[0].address,
        Comp_Fax: companyInfo[0].fax,
        Comp_Email: companyInfo[0].email,
        Comp_Phone: companyInfo[0].phone,
        Comp_Mobile: companyInfo[0].mobile,
        Comp_Site: companyInfo[0].site,
        Comp_Insta: companyInfo[0].insta,
        Comp_About: companyInfo[0].about,
        Comp_Lang: companyInfo[0].language,
        Comp_SMS: companyInfo[0].sms
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
        values.Comp_Img = imageUrl;
       if(CompanyId){
        UpdateCompany(values, CompanyId)
       }else{
        InsertCompany(values);
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
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-7">
        <span className="p-float-label" dir='ltr'>
          <InputText
            id="Comp_FName"
            name="Comp_FName" 
            value={formik.values.Comp_FName}
            className="p-inputtext p-component"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label htmlFor="Comp_FName">نام</label>
          {formik.touched.Comp_FName && formik.errors.Comp_FName ? (
         <div className='text-red-600'>{formik.errors.Comp_FName}</div>
       ) : null}
        </span>

        <span className="p-float-label" dir='ltr'>
        <InputText
            id="Comp_SMS"
            name="Comp_SMS"
            value={formik.values.Comp_SMS}
            className="p-inputtext p-component"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label htmlFor="Comp_SMS">شماره سامانه پیامک</label>
          {formik.touched.Comp_SMS && formik.errors.Comp_SMS ? (
         <div className='text-red-600'>{formik.errors.Comp_SMS}</div>
       ) : null} 
        </span>

        <span className="p-float-label" dir='ltr'>
          <InputText
            id="Comp_Phone"
            name="Comp_Phone"
            value={formik.values.Comp_Phone}
            className="p-inputtext p-component"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label htmlFor="Comp_Phone">تلفن</label>
          {formik.touched.Comp_Phone && formik.errors.Comp_Phone ? (
         <div className='text-red-600'>{formik.errors.Comp_Phone}</div>
       ) : null} 
        </span>

        <span className="p-float-label" dir='ltr'>
          <InputText
            id="Comp_Mobile"
            name="Comp_Mobile" 
            value={formik.values.Comp_Mobile}
            className="p-inputtext p-component"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label htmlFor="Comp_Mobile">موبایل</label>
          {formik.touched.Comp_Mobile && formik.errors.Comp_Mobile ? (
         <div className='text-red-600'>{formik.errors.Comp_Mobile}</div>
       ) : null} 
        </span>

        <span className="p-float-label" dir='ltr'>
          <InputText
            id="Comp_Fax"
            name="Comp_Fax" 
            value={formik.values.Comp_Fax}
            className="p-inputtext p-component"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label htmlFor="Comp_Fax">فکس</label>
          {formik.touched.Comp_Fax && formik.errors.Comp_Fax ? (
         <div className='text-red-600'>{formik.errors.Comp_Fax}</div>
       ) : null} 
        </span>

        <span className="p-float-label" dir='ltr'>
          <InputText
            id="Comp_Email"
            name="Comp_Email" 
            value={formik.values.Comp_Email}
            className="p-inputtext p-component"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label htmlFor="Comp_Email">ایمیل</label>
          {formik.touched.Comp_Email && formik.errors.Comp_Email ? (
         <div className='text-red-600'>{formik.errors.Comp_Email}</div>
       ) : null} 
        </span>

        <span className="p-float-label" dir='ltr'>
          <InputText
            id="Comp_Site"
            name="Comp_Site" 
            value={formik.values.Comp_Site}
            className="p-inputtext p-component"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label htmlFor="Comp_Site">سایت</label>
          {formik.touched.Comp_Site && formik.errors.Comp_Site ? (
         <div className='text-red-600'>{formik.errors.Comp_Site}</div>
       ) : null} 
        </span>

        <span className="p-float-label" dir='ltr'>
          <InputText
            id="Comp_Insta"
            name="Comp_Insta" 
            value={formik.values.Comp_Insta}
            className="p-inputtext p-component"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label htmlFor="Comp_Insta">اینستاگرام</label>
          {formik.touched.Comp_Insta && formik.errors.Comp_Insta ? (
         <div className='text-red-600'>{formik.errors.Comp_Insta}</div>
       ) : null}
        </span>

        <span className="p-float-label" dir='ltr'>
          
          <Dropdown 
             options={languages} 
             id="Comp_Lang"
             name="Comp_Lang"  
             optionLabel="name"
             optionValue="id"
             value={formik.values.Comp_Lang}
             filter 
             showClear 
             filterBy="name"
             placeholder="انتخاب زبان" 
             onChange={formik.handleChange}
             dir="rtl"
             style={{ width: '70%'}}
           />
           {formik.touched.Comp_Lang && formik.errors.Comp_Lang ? (
         <div className='text-red-600'>{formik.errors.Comp_Lang}</div>
       ) : null}
         </span>

        </section>

        <div className='w-full mt-5 flex flex-col items-end content-center'>
        <InputText
            id="Comp_Address"
            name="Comp_Address"
            value={formik.values.Comp_Address}
            className="p-inputtext p-component w-11/12"
            placeholder='آدرس'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />   
             {/* <label htmlFor="Comp_Address">آدرس</label>   */}
           {formik.touched.Comp_Address && formik.errors.Comp_Address ? (
         <div className='text-red-600'>{formik.errors.Comp_Address}</div>
       ) : null}  
        </div>
     
         <div className='w-full mt-5 flex flex-col items-end content-center'>
            <InputTextarea 
            id="Comp_About" 
            name="Comp_About" 
            value={formik.values.Comp_About}
            rows={5} 
            placeholder="درباره شرکت" 
            className='p-inputtextarea w-11/12'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            />
            
            {formik.touched.Comp_About && formik.errors.Comp_About ? (
         <div className='text-red-600'>{formik.errors.Comp_About}</div>
       ) : null}
         </div>

         <div className="mt-10 col-span-3 flex justify-center items-center">
         <InputImage setImageUrl={setImageUrl} imageError={imageError}/>
         </div>

         <div className="mt-10 flex justify-end justify-items-end">
          <Button label="ثبت" className="p-button-success w-[200px] text-sm mt-3 h-10" type="submit" />
        </div>

      </form>
    </div>
  )
}

