import React, { useState } from 'react';
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import TranslateTag from '../TranslateTag';

const TranslateAlert = ({ visibleAlert, onHide, tagId }) => {
    const [visibleTranslateDialog, setVisibleTranslateDialog] = useState(false);

  const openTranslateDialog = () => { onHide(); setVisibleTranslateDialog(true) }
  const closeTranslateDialog = () => { setVisibleTranslateDialog(false) }

  const footer = () => {
    return (
      <>
        <Button label="بلی" onClick={openTranslateDialog} className="p-button-outlined  p-button-success relative right-[70%] text-xs mt-3 h-10" />
        <Button label="خیر" onClick={onHide} className="p-button-outlined p-button-danger right-[65%] text-xs mt-3 h-10" />
      </>
    )
  }

  return (
    <>
      <TranslateTag visible={visibleTranslateDialog} onHide={closeTranslateDialog} tagId={tagId} />
      <Dialog visible={visibleAlert} onHide={onHide} footer={footer}>
         <div className="w-[400px] pb-4 rounded-md m-auto container bg-white rtl">آیا مایل به ترجمه این تگ هستید؟</div>
      </Dialog>
    </>
  )
}
export default TranslateAlert 

