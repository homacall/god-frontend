import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import Breadcrumb from '../../component/breadcrumb/breadcrumb';

const NewLanguage = () => {
  
    const [value, setValue] = useState('');
    const [layout, setLayout] = useState(null);

       const item = [
            {id:1, label: 'مدیریت زبان' ,url:'/language' },
            {id:2, label: 'ثبت فرم جدید' ,url:'/language/new-form' },
        ];


    return (
        <div className='w-[80%] my-4 pb-4 rounded-md m-auto container bg-white rtl'>
                <Breadcrumb item={item}/>
                <div className=" flex justify-start mr-[8%] mt-10 ">
                    <span className="p-float-label">
                        <InputText id="inputtext" value={value} onChange={(e) => setValue(e.target.value)} className='h-9 w-96'/>
                        <label htmlFor="inputtext" className='right-2 text-sm'>عنوان</label>
                    </span>
                </div>
                <div className=" flex justify-start mr-[8%] mt-10">
                   <div className="field-radiobutton ml-8">
                        <RadioButton inputId="RTL" name="layout" value="RTL" onChange={(e) => setLayout(e.value)} checked={layout === 'RTL'} />
                        <label htmlFor="RTL" className='mr-4 text-sm'>راست به چپ</label>
                    </div>
                    <div className="field-radiobutton">
                        <RadioButton inputId="LTR" name="layout" value="LTR" onChange={(e) => setLayout(e.value)} checked={layout === 'LTR'} />
                        <label htmlFor="LTR" className='mr-4 text-sm'>چپ به راست</label>
                    </div>
                </div>

                <Button label='ثبت'  className='relative right-[86%] text-sm mt-3 h-10'/>
            </div>
    );
}
export default NewLanguage