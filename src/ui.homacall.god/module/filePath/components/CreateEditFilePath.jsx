import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import Breadcrumb from '../../../component/breadcrumb/breadcrumb'
import { CreateTagService } from '../../../service/tagManagerService'
import { classNames } from 'primereact/utils'
import { useLocation, useNavigate, useParams } from 'react-router'
import { ToastAlert } from '../../common/toastAlert'
import { BreadcrumbItem } from '../constant/BreadcampItem'
import { useEffect } from 'react'
import { filePath, systemPath } from '../../../utils/constants/routes/publicRoute'
import { Dropdown } from 'primereact/dropdown'

const CreateEditFilePath = () => {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [systems, setSystem] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()

  useEffect(() => {
    if (location.pathname.includes(filePath.editPath) && params.FilePathId) {
      // fetchDataById
      setEditMode(true)
    } else {
      setEditMode(false)
    }
  }, [location, params])

  const submitHandler = e => {
    e.preventDefault()
    if (!value || value === '') {
      return setError(true)
    } else {
      setError(false)
    }
    const formData = new FormData()
    formData.append('Tag_Name', value)
    // CreateTagService(formData)
    //   .then(res => {
    //     if (res.status === 200 || res.data === 'Succeed') {
    //       ToastAlert.success('ساخت مسیر سیستم با موفقیت انجام شد ')
    //       navigate('/tag')
    //       setLoading(true)
    //     } else {
    //       ToastAlert.error('خطا در ساخت مسیر سیستم ')
    //       setLoading(false)
    //     }
    //   })
    //   .catch(e => console.log(e))
  }

  return (
    <>
      <div className="w-[80%] my-4 pb-4 rounded-md m-auto container bg-white rtl">
        <Breadcrumb item={BreadcrumbItem} />
        <div className=" flex justify-start mr-[8%] mt-10 ">
          <span className="p-float-label">
            <InputText
              id="inputtext"
              value={value}
              onChange={e => setValue(e.target.value)}
              className={`h-9 w-96 ${classNames({ 'p-invalid': error, 'w-full': true })}`}
            />
            <label htmlFor="inputtext" className={`right-2 text-sm ${classNames({ 'p-error': error })}`}>
              مسیر فایل
            </label>
          </span>
          <span className="p-float-label mr-5">
            <Dropdown
              id="dropDown"
              value={systems}
              onChange={e => setSystem(e.target.value)}
              className={`h-9 w-96 ${classNames({ 'p-invalid': error, 'w-full': true })}`}
            />
            <label htmlFor="dropDown" className={`right-2 text-sm ${classNames({ 'p-error': error })}`}>
              سیستم
            </label>
          </span>
        </div>
        <div className="mt-10 flex justify-end justify-items-end">
          <Button
            loading={loading}
            onClick={submitHandler}
            disabled={value ? false : true}
            label="ثبت"
            className=" ml-10 text-sm mt-3 h-10 bg-indigo-600"
            type="submit"
          />
        </div>
      </div>
    </>
  )
}
export default CreateEditFilePath
