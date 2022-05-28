import React, { useState, useEffect, useCallback } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import Breadcrumb from '../../../component/breadcrumb/breadcrumb'
import { CreateTagService } from '../../../service/tagManagerService'
import { classNames } from 'primereact/utils'
import { useLocation, useNavigate, useParams } from 'react-router'
import { ToastAlert } from '../../common/toastAlert'
import { BreadcrumbItem } from '../constant/BreadcampItem'
import { systemPath } from '../../../utils/constants/routes/publicRoute'
import { UpdateSystemPath, InsertSystemPath, GetSystemPathById } from '../../../service/systemPathService'

const CreateEditSystemPath = () => {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [systemPathId, setSystemPathId] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()

  // const fetchSystemPath = useCallback(() => {
  //   const formData = new FormData()
  //   formData.append('ID', params.SystemId)

  //   GetSystemPathById(formData)
  //     .then(res => {
  //       if (res.data) {
  //         setSystemPathId(res.data)
  //       }
  //     })
  //     .catch(err => {
  //       ToastAlert.error('خطا در ارتباط با سرور ')
  //     })
  // }, [params.SystemId])

  // useEffect(() => {
  //   fetchSystemPath()
  // }, [fetchSystemPath])

  useEffect(() => {
    if (location.pathname.includes(systemPath.editPath) && params.SystemId) {
      const formData = new FormData()
      formData.append('ID', params.SystemId)
      // fetchDataById
      setEditMode(true)
      GetSystemPathById(formData)
        .then(res => {
          if (res.data) {
            setSystemPathId(res.data)
            setValue(res.data.sys_Name)
          }
        })
        .catch(err => {
          ToastAlert.error('خطا در ارتباط با سرور ')
        })
    } else {
      setEditMode(false)
    }
  }, [location, params.SystemId])

  const submitHandler = e => {
    e.preventDefault()
    if (!value || value === '') {
      return setError(true)
    } else {
      setError(false)
    }
    const formData = new FormData()
    formData.append('Sys_Name', value)
    if (editMode) {
      formData.append('Sys_ID', params.SystemId)
      UpdateSystemPath(formData)
        .then(res => {
          if (res.status === 200 || res.data === 'Succeed') {
            ToastAlert.success('ویرایش مسیر سیستم با موفقیت انجام شد ')
            navigate('/systems-path')
            setLoading(true)
          } else {
            ToastAlert.error('خطا در ویرایش مسیر سیستم ')
            setLoading(false)
          }
        })
        .catch(e => console.log(e))
    } else {
      InsertSystemPath(formData)
        .then(res => {
          if (res.status === 200 || res.data === 'Succeed') {
            ToastAlert.success('ساخت مسیر سیستم با موفقیت انجام شد ')
            navigate('/systems-path')
            setLoading(true)
          } else {
            ToastAlert.error('خطا در ساخت مسیر سیستم ')
            setLoading(false)
          }
        })
        .catch(e => console.log(e))
    }
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
              مسیر سیستم
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
export default CreateEditSystemPath
