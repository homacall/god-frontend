import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

// const languages = [
//   {label: 'فارسی', value: 1},
//   {label: 'انگلیسی', value: 2},
//   {label: 'عربی', value: 3},
// ];

const UpdateTranslateTag= ({ visible, onHide, tagId, oldVal, langId }) => {
 
  const [translateValue, setTranslateValue] = useState('');
  //const [languageValue, setLanguageValue] = useState('');

  useEffect(()=>{
    setTranslateValue(oldVal)
  }, [oldVal, setTranslateValue])
  
  const updateTranslate = () =>  {
    alert(tagId+" "+translateValue+" "+langId);
    
    onHide();
    }

  const footer = () => {
    return (
      <>
        <Button onClick={updateTranslate} label="به روز رسانی"  disabled={translateValue ? false:true} className="relative right-[70%] text-xs mt-3 h-10" />
      </>
    )
  }

  return (
    <Dialog visible={visible} onHide={onHide} footer={footer}>
      <div className="w-[400px] pb-4 rounded-md m-auto container bg-white rtl">
        <span className="p-float-label">
            <InputText id="inputtext" value={translateValue} onChange={(e) => setTranslateValue(e.target.value)} className='h-9 w-96'/>
            <label htmlFor="inputtext" className='right-2 text-sm'>ترجمه</label>
        </span>
      </div>
      {/* <div className="w-[400px] pb-4 rounded-md m-auto container bg-white rtl">
      <Dropdown value={oldLang} options={languages} onChange={(e) => {setLanguageValue(e.value); }} optionLabel="label" filter showClear  filterBy="label"
         placeholder="انتخاب زبان" className="right-1 w-[95%] text-sm" />
      </div> */}
    </Dialog>
  )
}
export default UpdateTranslateTag