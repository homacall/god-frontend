import React, { useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'

import '../style/translatetag.css'
import { insertTranslate } from '../../../service/translateService'
import { Alert } from '../../common/alert'

const TranslateTag = ({ visible, onHide, tagId, languages, data, setData, tagName, fetchAgain }) => {
  const [translateValue, setTranslateValue] = useState('')
  const [languageId, setLanguageId] = useState('')
  const [languageName, setLanguageName] = useState('')
  const [languageList, setLanguageList] = useState(languages)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const registerTranslate = () => {
    const formData = new FormData()
    formData.append('TranTg_TagID', tagId)
    formData.append('TranTg_LangID', languageId)
    formData.append('TranTg_Text', translateValue)
    insertTranslate(formData).then(res => {
      if (res.data || res.status === 200) {
        const newList = languageList.filter(lang => lang.value !== languageId)
        setLanguageList(newList)
        if (data) {
          setData([
            ...data,
            {
              id: data.length + 1,
              tranTg_Text: translateValue,
              tranTg_LangID: languageId,
              lang_id: languageId,
              tranTg_LangName: languageName,
            },
          ])
        }
        setLanguageId('')
        setTranslateValue('')
        fetchAgain()

        if (languageList.length === 1) {
          onHide()
        }
      } else {
        setMessage('ترجمه با خطا مواجه شد')
        setShowMessage(true)
      }
    })
  }
  const footer = () => {
    return (
      <>
        <Button
          label="ثبت"
          onClick={registerTranslate}
          disabled={translateValue && languageId ? false : true}
          className="relative right-[82.5%] text-xs mt-3 h-10"
        />
      </>
    )
  }

  const header = () => {
    return (
      <>
        <div dir="rtl">
          <p className="text-base">
            افزودن ترجمه برای تگ <span className="text-red-600">{tagName}</span>
          </p>
        </div>
      </>
    )
  }
  useEffect(() => {
    setLanguageList(languages)
  }, [languages])
  return (
    <Dialog visible={visible} onHide={onHide} footer={footer} header={header} dir="rtl">
      <Alert message={message} setMessage={setMessage} setShowMessage={setShowMessage} showMessage={showMessage} />
      <div className='w-[400px]  flex flex-col'>
        <div className=" pb-4 rounded-md container mt-7 bg-white rtl">
          <span className="p-float-label">
            <InputText id="inputtext" value={translateValue} onChange={e => setTranslateValue(e.target.value)} className="h-9 w-full" />
            <label htmlFor="inputtext" className="right-2 text-sm">
              ترجمه
            </label>
          </span>
        </div>
        <div className=" pb-4 rounded-md container bg-white ltr ">
          <Dropdown
            value={languageId}
            options={languageList}
            onChange={e => {
              setLanguageId(e.value)
              const selectedLang = languageList.find(lang => lang.value === e.value)
              setLanguageName(selectedLang?.label)
            }}
            optionLabel="label"
            placeholder="انتخاب زبان"
            className=" w-full h-9 text-sm"
          />
        </div>
      </div>

    </Dialog>
  )
}
export default TranslateTag
