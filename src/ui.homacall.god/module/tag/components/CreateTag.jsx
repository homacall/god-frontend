import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import Breadcrumb from '../../../component/breadcrumb/breadcrumb'
import { item } from './constant/BreadcampItem'
import { CreateTagService } from '../../../service/tagManagerService'
import { classNames } from 'primereact/utils'
import { Alert } from '../../common/alert'
import { useNavigate } from 'react-router'

export const CreateTag = () => {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const submitHandler = e => {
    e.preventDefault()
    if (!value || value === '') {
      return setError(true)
    } else {
      setError(false)
    }
    const formData = new FormData()
    formData.append('Tag_Name', value)
    CreateTagService(formData)
      .then(res => {
        setShowMessage(true)
        if (res.status === 200 || res.data === 'Succeed') {
          setMessage('ساخت تگ با موفقیت انجام شد ')
        } else {
          setMessage('خطا در ساخت تگ ')
        }
      })
      .catch(e => console.log(e))
  }

  return (
    <>
      <Alert
        message={message}
        setMessage={setMessage}
        setShowMessage={setShowMessage}
        showMessage={showMessage}
        callBack={() => navigate('/tag')}
      />
      <div className="w-[80%] my-4 pb-4 rounded-md m-auto container bg-white rtl">
        <Breadcrumb item={item} />
        <div className=" flex justify-start mr-[8%] mt-10 ">
          <span className="p-float-label">
            <InputText
              id="inputtext"
              value={value}
              onChange={e => setValue(e.target.value)}
              className={`h-9 w-96 ${classNames({ 'p-invalid': error, 'w-full': true })}`}
            />
            <label htmlFor="inputtext" className={`right-2 text-sm ${classNames({ 'p-error': error })}`}>
              عنوان
            </label>
          </span>
        </div>
        <Button label="ثبت" onClick={submitHandler} disabled={value ? false : true} className="relative right-[86%] text-sm mt-3 h-10" />
      </div>
    </>
  )
}
