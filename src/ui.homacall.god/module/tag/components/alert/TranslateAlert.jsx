import React, { useState } from 'react';
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import TranslateTag from '../TranslateTag';

const TranslateAlert = ({ visibleAlert, onHide, tagId, tagName }) => {
    const [visibleTranslateDialog, setVisibleTranslateDialog] = useState(false);

  const openTranslateDialog = () => {  setVisibleTranslateDialog(true) }
  const closeTranslateDialog = () => { setVisibleTranslateDialog(false); onHide(); }

  const languages = [
    {label: 'فارسی', value: 1},
    {label: 'انگلیسی', value: 2},
    {label: 'kr', value: 3},
    {label: 'ch', value: 4},
  ];

  const footer = () => {
    return (
      <>
        <Button label="بلی" onClick={openTranslateDialog} className="p-button-outlined  p-button-success relative right-[70%] text-xs mt-3 h-10" />
        <Button label="خیر" onClick={closeTranslateDialog} className="p-button-outlined p-button-danger right-[65%] text-xs mt-3 h-10" />
      </>
    )
  }

  return (
    <>
      <TranslateTag visible={visibleTranslateDialog} onHide={closeTranslateDialog} tagId={tagId} languages={languages} tagName={tagName} />
      <Dialog visible={visibleAlert} onHide={onHide} footer={footer}>
         <div className="w-[400px] pb-4 rounded-md m-auto container bg-white rtl">آیا مایل به ترجمه این تگ هستید؟</div>
      </Dialog>
    </>
  )
}
export default TranslateAlert 

