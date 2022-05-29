import { useState, useEffect, useCallback } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import Breadcrumb from '../../../component/breadcrumb/breadcrumb'
import { classNames } from 'primereact/utils'
import { useLocation, useNavigate, useParams } from 'react-router'
import { ToastAlert } from '../../common/toastAlert'
import { BreadcrumbItem } from '../constant/BreadcampItem'
import { filePath } from '../../../utils/constants/routes/publicRoute'
import { Dropdown } from 'primereact/dropdown'
import { UpdateFilePath, InsertFilePath, GetFilePathById } from '../../../service/filePathService'
import { GetAllSystemPath } from '../../../service/systemPathService'

const CreateEditFilePath = () => {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [systems, setSystem] = useState('')
  const [systemPath, setSystemPath] = useState([])
  const [filePathById, setFilePathById] = useState([])

  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()

  const getSystemsPath = () => {
    GetAllSystemPath()
      .then(res => {
        if (res.data) setSystemPath(res.data.map(item => ({ id: item.sys_ID, name: item.sys_Name })))
      })
      .catch(e => ToastAlert.error('خطا در  ارتباط با سرور '))
  }

  const fetchFilePath = useCallback(() => {
    const formData = new FormData()
    formData.append('ID', params.FilePathId)
    GetFilePathById(formData)
      .then(res => {
        if (res.data) {
          setValue(res.data.filPth_Name)
          setSystem(res.data.filPth_SysID)
          setFilePathById(res.data)
        }
      })
      .catch(err => {
        ToastAlert.error('خطا در ارتباط با سرور ')
      })
  }, [params.FilePathId])

  useEffect(() => {
    getSystemsPath()
    fetchFilePath()
  }, [fetchFilePath])

  useEffect(() => {
    if (location.pathname.includes(filePath.editPath) && params.FilePathId) {
      // fetchDataById
      setEditMode(true)
    } else {
      setEditMode(false)
    }
    console.log('systems: ', systems)
  }, [location, params])

  const handleInsertFilePath = formData => {
    InsertFilePath(formData)
      .then(res => {
        if (res.status === 200 || res.data === 'Succeed') {
          ToastAlert.success('ساخت مسیر فایل با موفقیت انجام شد ')
          navigate('/files-path')
          setLoading(true)
        } else {
          ToastAlert.error('خطا در ساخت مسیر فایل ')
          setLoading(false)
        }
      })
      .catch(e => ToastAlert.error('خطا در ساخت مسیر فایل '))
  }

  const handleUdpateFilePath = formData => {
    UpdateFilePath(formData)
      .then(res => {
        if (res.status === 200 || res.data === 'Succeed') {
          ToastAlert.success('ویرایش مسیر فایل با موفقیت انجام شد ')
          navigate('/files-path')
          setLoading(true)
        } else {
          ToastAlert.error('خطا در ویرایش مسیر فایل ')
          setLoading(false)
        }
      })
      .catch(e => ToastAlert.error('خطا در ارتباط با سرور '))
  }

  const submitHandler = e => {
    e.preventDefault()
    if (!value || value === '') {
      return setError(true)
    } else {
      setError(false)
    }
    const formData = new FormData()
    formData.append('FilPth_Name', value)
    formData.append('FilPth_SysID', systems)
    if (editMode) {
      formData.append('FilPth_ID', params.FilePathId)
      handleUdpateFilePath(formData)
    } else {
      handleInsertFilePath(formData)
    }
  }

  return (
    <>
      <div className="w-[80%] my-4 pb-4 rounded-md m-auto container bg-white rtl">
        <Breadcrumb item={BreadcrumbItem} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 px-2">
          <span className="p-float-label">
            <Dropdown
              options={systemPath}
              id="Sys_ID"
              name="Sys_Name"
              optionLabel="name"
              optionValue="id"
              value={systems}
              onChange={e => setSystem(e.target.value)}
              className={`h-9 ${classNames({ 'p-invalid': error, 'w-full': true })}`}
            />
            <label htmlFor="dropDown" className={`right-2 text-sm ${classNames({ 'p-error': error })}`}>
              سیستم
            </label>
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 px-2">
          <span className="p-float-label">
            <InputText
              id="inputtext"
              value={value}
              onChange={e => setValue(e.target.value)}
              className={`h-9 ${classNames({ 'p-invalid': error, 'w-full': true })}`}
            />
            <label htmlFor="inputtext" className={`right-2 text-sm ${classNames({ 'p-error': error })}`}>
              مسیر فایل
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
