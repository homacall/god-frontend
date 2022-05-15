import React, { useState, useEffect } from 'react'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { UpdateTranslate } from '../../../service/translateService'
import { Alert } from '../../common/alert'

const UpdateTranslateTag = ({ visible, onHide, tagId, oldVal, langId, data, setData, translateId }) => {
  const [translateValue, setTranslateValue] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
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
      } else {
        setMessage('خطا در')
        setShowMessage(true)
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
      <Alert message={message} setMessage={setMessage} setShowMessage={setShowMessage} showMessage={showMessage} />

      <div className="w-[400px] pb-4 rounded-md m-auto container bg-white rtl">
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
