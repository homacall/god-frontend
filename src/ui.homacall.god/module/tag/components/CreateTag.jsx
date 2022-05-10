import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Breadcrumb from '../../../component/breadcrumb/breadcrumb';
import TranslateAlert from './alert/TranslateAlert';


export const CreateTag = () => {
  
    const [value, setValue] = useState('');
    const [visibleAlert, setVisibleAlert] = useState(false);
    const [tagId, setTagId] = useState(0);

    const item = [
            {id:1, label: 'مدیریت تگ' ,url:'/tag' },
            {id:2, label: 'ثبت تگ جدید' ,url:'/tag/new-tag' },
    ];

    const createTag = () => { alert(value); setValue(''); setTagId(1); setVisibleAlert(true) }
    
    const closeTranslateAlert = () => { setVisibleAlert(false) }

    return (
        <>
            <TranslateAlert visibleAlert={visibleAlert} onHide={closeTranslateAlert} tagId={tagId} />
            <div className='w-[80%] my-4 pb-4 rounded-md m-auto container bg-white rtl'>
                <Breadcrumb item={item}/>
                <div className=" flex justify-start mr-[8%] mt-10 ">
                    <span className="p-float-label">
                        <InputText id="inputtext" value={value} onChange={(e) => setValue(e.target.value)} className='h-9 w-96'/>
                        <label htmlFor="inputtext" className='right-2 text-sm'>عنوان</label>
                    </span>
                </div> 
                <Button label='ثبت' onClick={createTag} disabled={value ? false:true}  className='relative right-[86%] text-sm mt-3 h-10'/>
            </div>
        </>
    );
}
