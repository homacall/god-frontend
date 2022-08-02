import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import Breadcrumb from '../../../component/breadcrumb/breadcrumb'
import { item } from './constant/BreadcampItem'
import { CreateTagService } from '../../../service/tagManagerService'
import { classNames } from 'primereact/utils'
import { useNavigate } from 'react-router'
import { ToastAlert } from '../../common/toastAlert'
import { createTagType } from '../constant/createTagType'
export const CreateTag = () => {
  const [value, setValue] = useState('')
  const [valueType, setValueType] = useState()
  const [error, setError] = useState(false)
  const [errorType, setErrorType] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChangeType = type => {
    setValueType(type.value)
  }

  const submitHandler = e => {
    e.preventDefault()
    if (!value || value === '') {
      return setError(true)
    } else {
      setError(false)
    }
    if (valueType >= 0) {
      setErrorType(false)
    } else {
      return setErrorType(true)
    }
    const formData = new FormData()
    formData.append('Tag_Name', value)
    formData.append('Tag_Type', valueType.toString())
    CreateTagService(formData)
      .then(res => {
        if (res.status === 200 || res.data === 'Succeed') {
          ToastAlert.success('ساخت تگ با موفقیت انجام شد ')
          navigate('/tag')
          setLoading(true)
        } else {
          ToastAlert.error('خطا در ساخت تگ ')
          setLoading(false)
        }
      })
      .catch(e => console.log(e))
  }

  return (
    <>
      <div className="w-[100%] md:w-[80%] my-4 pb-4 rounded-md m-auto container bg-white rtl">
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

        <div className=" flex justify-start mr-[8%] mt-10 ">
          <span className="p-float-label">
            <Dropdown
              options={createTagType}
              id="tagType"
              name="tagType"
              value={valueType}
              onChange={handleChangeType}
              className={`h-9 w-96 ${classNames({ 'p-invalid': errorType, 'w-full': true })}`}
            />
            <label htmlFor="tagType" className={`right-2 text-sm ${classNames({ 'p-error': errorType })}`}>
              نوع
            </label>
          </span>
        </div>
        <div className="mt-10 flex justify-end justify-items-end">
          <Button
            loading={loading}
            onClick={submitHandler}
            disabled={value && valueType >= 0 ? false : true}
            label="ثبت"
            className=" ml-10 text-sm mt-3 h-10 bg-indigo-600"
            type="submit"
          />
        </div>
      </div>
    </>
  )
}
