import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

import '../style/translatetag.css';

const TranslateTag= ({ visible, onHide, tagId, languages, data, setData, tagName }) => {
  const [translateValue, setTranslateValue] = useState('');
  const [languageId, setLanguageId] = useState('');
  const [languageList, setLanguageList] = useState(languages);

  const registerTranslate = () =>  {
    const newList = languageList.filter(lang=>lang.value !== languageId);
    setLanguageList(newList);
    setData(
      [...data,
         {id: data.length+1, name: translateValue, language: languageId, lang_id: languageId}
      ]
    );
    setLanguageId('');
    setTranslateValue('');
    alert(tagId+" "+translateValue+" "+languageId); 
    if(languageList.length === 1){ onHide();  }
     
  }
  const footer = () => {
    return (
      <>
        <Button label="ثبت" onClick={registerTranslate} disabled={translateValue && languageId ? false:true} className="relative right-[70%] text-xs mt-3 h-10" />
      </>
    )
  }

  const header = () => {
    return (
      <>
        <div dir='rtl'><p className='text-base'>افزودن ترجمه برای تگ <spann className="text-red-600">{tagName}</spann></p></div>
      </>
    )
  }

  return (
    <Dialog visible={visible} onHide={onHide} footer={footer} header={header} dir="rtl">
      
      <div className="w-[400px] pb-4 rounded-md m-auto container bg-white rtl">
        <span className="p-float-label">
            <InputText id="inputtext" value={translateValue} onChange={(e) => setTranslateValue(e.target.value)} className='h-9 w-96'/>
            <label htmlFor="inputtext" className='right-2 text-sm'>ترجمه</label>
        </span>
      </div>
      <div className="w-[400px] pb-4 rounded-md m-auto container bg-white rtl">
      <Dropdown value={languageId} options={languageList} onChange={(e) => {setLanguageId(e.value); }} optionLabel="label" filter showClear  filterBy="label"
         placeholder="انتخاب زبان" className="right-1 w-[95%] text-sm" />
      </div>
    </Dialog>
  )
}
export default TranslateTag