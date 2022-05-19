import React, { useState, useEffect } from 'react'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { UpdateTranslate } from '../../../service/translateService'
import { ToastAlert } from '../../common/toastAlert'

const UpdateTranslateTag = ({ visible, onHide, tagId, oldVal, langId, data, setData, translateId }) => {
  const [translateValue, setTranslateValue] = useState('')

  useEffect(() => {
    setTranslateValue(oldVal)
  }, [oldVal, setTranslateValue])
  const updateTranslate = () => {
    const formData = new FormData()
    formData.append('TranTg_Text', translateValue)
    formData.append('TranTg_TagID', tagId)
    formData.append('TranTg_LangID', langId)
    formData.append('TranTg_ID', translateId)
    UpdateTranslate(formData).then(res => {
      if (res.data || res.status === 200) {
        const newTranslate = data.map(obj => {
          if (parseInt(obj.tranTg_ID) === parseInt(translateId)) {
            return { ...obj, tranTg_Text: translateValue }
          }

          return obj
        })
        setData(newTranslate)
        onHide()
        ToastAlert.success('ویرایش ترجمه با موفقیت انجام شد.')
      } else {
        ToastAlert.error(' خطا در ویرایش ترجمه')
      }
    })

    const newTranslate = data.map(obj => {
      if (obj.id === tagId) {
        return { ...obj, name: translateValue }
      }

      return obj
    })
    setData(newTranslate)
    onHide()
  }

  const footer = () => {
    return (
      <>
        <Button
          onClick={updateTranslate}
          label="به روز رسانی"
          disabled={translateValue ? false : true}
          className="relative right-[70%] text-xs mt-3 h-10"
        />
      </>
    )
  }

  return (
    <Dialog visible={visible} onHide={onHide} footer={footer}>
      <div className="w-[400px] pb-4 rounded-md m-auto container pt-7 bg-white rtl">
        <span className="p-float-label">
          <InputText id="inputtext" value={translateValue} onChange={e => setTranslateValue(e.target.value)} className="h-9 w-96" />
          <label htmlFor="inputtext" className="right-2 text-sm">
            ترجمه
          </label>
        </span>
      </div>
    </Dialog>
  )
}
export default UpdateTranslateTag
