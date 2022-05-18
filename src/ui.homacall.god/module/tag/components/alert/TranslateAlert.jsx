import React, { useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import TranslateTag from '../TranslateTag'
import { GetAllLanguage } from '../../../../service/languageService'

const TranslateAlert = ({ visibleAlert, onHide, tagId, tagName }) => {
  const [visibleTranslateDialog, setVisibleTranslateDialog] = useState(false)
  const openTranslateDialog = () => {
    setVisibleTranslateDialog(true)
  }
  const closeTranslateDialog = () => {
    setVisibleTranslateDialog(false)
    onHide()
  }

  const [languages, setLanguages] = useState([])

  useEffect(() => {
    GetAllLanguage()
      .then(res => {
        if (res.data || res.status === 200) {
          const lang = res.data.map(item => ({ label: item.lang_Name, value: item.lang_ID }))
          setLanguages(lang)
        }
      })
      .catch(e => console.log(e))
  }, [])

  const footer = () => {
    return (
      <>
        <Button
          label="بلی"
          onClick={openTranslateDialog}
          className="p-button-outlined  p-button-success relative right-[70%] text-xs mt-3 h-10"
        />
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
