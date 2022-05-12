import { useState } from 'react'
import { createCompanyBreadcrumb } from '../constant/createCompanyBreadcrumb'
import Breadcrumb from '../../../component/breadcrumb/breadcrumb'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputImage } from '../../common/fileUploader'
import { Button } from 'primereact/button'

export const CreateCompany = () => {
  //const [imageUrl, setImageUrl] = useState('')
 // const [imageError, setImageError] = useState(false)
  //const [loading, setLoading] = useState(false)

  const cities = [
    {name: 'New York', code: 'NY'},
    {name: 'Rome', code: 'RM'},
    {name: 'London', code: 'LDN'},
    {name: 'Istanbul', code: 'IST'},
    {name: 'Paris', code: 'PRS'}
];

const handleSubmit = (e) => {
  e.preventDefault();
  
}

  return (
    <div className="w-[80%] my-4 pb-4 rounded-md  m-auto container bg-white rtl ">
      <Breadcrumb item={createCompanyBreadcrumb} />

      <form className="p-5 mt-10" onSubmit={handleSubmit}>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5">
        <span className="p-float-label" dir='ltr'>
          <InputText
            id="Comp_FName"
            name="Comp_FName" 
            className="p-inputtext p-component"
          />
          <label htmlFor="Comp_FName">نام</label>
        </span>

        <span className="p-float-label" dir='ltr'>
          <InputText
            id="Comp_Address"
            name="Comp_Address"
            className="p-inputtext p-component"
          />   
           <label htmlFor="Comp_Address">آدرس</label>      
        </span>

        <span className="p-float-label" dir='ltr'>
          <InputText
            id="Comp_Phone"
            name="Comp_Phone"
            className="p-inputtext p-component"
           
          />
          <label htmlFor="Comp_Phone">تلفن</label>
        </span>

        <span className="p-float-label" dir='ltr'>
          <InputText
            id="Comp_Mobile"
            name="Comp_Mobile" 
            className="p-inputtext p-component"
          />
          <label htmlFor="Comp_Mobile">موبایل</label>
        </span>

        <span className="p-float-label" dir='ltr'>
          <InputText
            id="Comp_Fax"
            name="Comp_Fax" 
            className="p-inputtext p-component"
          />
          <label htmlFor="Comp_Fax">فکس</label>
        </span>

        <span className="p-float-label" dir='ltr'>
          <InputText
            id="Comp_Email"
            name="Comp_Email" 
            className="p-inputtext p-component"
          />
          <label htmlFor="Comp_Email">ایمیل</label>
        </span>

        <span className="p-float-label" dir='ltr'>
          <InputText
            id="Comp_Site"
            name="Comp_Site" 
            className="p-inputtext p-component"
          />
          <label htmlFor="Comp_Site">سایت</label>
        </span>

        <span className="p-float-label" dir='ltr'>
          <InputText
            id="Comp_Insta"
            name="Comp_Insta" 
            className="p-inputtext p-component"
          />
          <label htmlFor="Comp_Insta">اینستاگرام</label>
        </span>

        <span className="p-float-label" dir='ltr'>
          
          <Dropdown 
             id="Comp_Lang"
             name="Comp_Lang"  
             optionLabel="name"
             optionValue="code"
             options={cities} 
             filter 
             showClear 
             filterBy="name"
             placeholder="انتخاب زبان" 
           />
         </span>

        </section>
     
         <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <InputTextarea rows={5} cols={104} placeholder="درباره شرکت" className='p-inputtextarea'/>
         </div>

         <div className="mt-10 col-span-3 flex justify-center items-center">
         <InputImage />
         </div>

         <div className="mt-10 flex justify-end justify-items-end">
          <Button label="ثبت" className="p-button-success w-[200px] text-sm mt-3 h-10" type="submit" />
        </div>

      </form>
    </div>
  )
}

