import { useEffect, useState } from 'react'
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
import { GetAllTagsTranslate } from '../../../service/translateService'

export const CreateTag = () => {
  const [value, setValue] = useState('')
  const [valueType, setValueType] = useState()
  const [error, setError] = useState(false)
  const [errorType, setErrorType] = useState(false)
  const [loading, setLoading] = useState(false)
  const [systemName, setSystemName] = useState()
  const [formName, setFormName] = useState()
  const [allSystems, setAllSystems] = useState([])
  const [errorSysName, setErrorSysName] = useState(false)
  const [errorFormName, setErrorFormName] = useState(false)
  const [showSystemName, setShowSystemName] = useState(false)
  const [formId, setFormId] = useState()
  const [allForms, setAllForms] = useState([])

  const navigate = useNavigate()

  const handleChangeType = type => {
    setValueType(type.value)
    setSystemName('')
    setFormName('')
    switch (Number(type.value)) {
      case 0:
      case 1:
      case 2:
      case 5:
      case 6:
      case 7:
      case 9:
        setShowSystemName(true)
        setErrorSysName(true)
        setErrorFormName(false)
        break
      case 3:
      case 4:
      case 8:
        setShowSystemName(false)
        setErrorSysName(false)
        setErrorFormName(false)
        setFormId(0)
        break
      default:
        setShowSystemName(false)
        setErrorSysName(false)
        setErrorFormName(false)
    }
  }

  const handleChangeSysName = type => {
    setSystemName(type.value)
    setErrorSysName(false)
    if (valueType !== 2 || valueType !== 3 || (valueType !== 4) | (valueType !== 8)) {
      setFormId(type.value)
    }
  }

  const handleChangeFormName = type => {
    setFormName(type.value)
    Number(valueType) === 2 && setFormId(type.value)
    setErrorFormName(false)
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
    formData.append('Tag_PID', formId)
    //alert(formId)
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

  useEffect(() => {
    if (valueType !== 3 && valueType !== 4 && valueType !== 8 && allSystems.length === 0) {
      const formData = new FormData()
      formData.append('TagType', '8')
      formData.append('ParentID', '-1')
      GetAllTagsTranslate(formData)
        .then(res => {
          if (res && res.data && res.data.status === 200) {
            setAllSystems(res.data.tagsknowledges)
          } else {
            ToastAlert.error('خطا در دریافت نام سیستم ها')
          }
        })
        .catch(() => console.log('خطا در دریافت نام سیستم ها'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueType])

  useEffect(() => {
    if (valueType === 2 && systemName > 0) {
      const formData = new FormData()
      formData.append('TagType', '1')
      formData.append('ParentID', systemName.toString())
      GetAllTagsTranslate(formData)
        .then(res => {
          if (res && res.data && res.data.status === 200) {
            setAllForms(res.data.tagsknowledges)
          } else {
            ToastAlert.error('خطا در دریافت نام سیستم ها')
          }
        })
        .catch(() => console.log('خطا در دریافت نام سیستم ها'))
    }
  }, [valueType, systemName])

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

        {showSystemName && (
          <div className=" flex justify-start mr-[8%] mt-10 ">
            <span className="p-float-label">
              <Dropdown
                options={allSystems}
                id="tag_ID"
                name="tagTranslate_Name"
                optionValue="tag_ID"
                optionLabel="tagTranslate_Name"
                value={systemName}
                onChange={handleChangeSysName}
                className={`h-9 w-96 ${classNames({ 'p-invalid': errorSysName, 'w-full': true })}`}
              />
              <label htmlFor="sysName" className={`right-2 text-sm ${classNames({ 'p-error': errorSysName })}`}>
                نام سیستم
              </label>
            </span>
          </div>
        )}

        {Number(valueType) === 2 && (
          <div className=" flex justify-start mr-[8%] mt-10 ">
            <span className="p-float-label">
              <Dropdown
                options={allForms}
                id="FormId"
                name="FormId"
                optionValue="tag_ID"
                optionLabel="tagTranslate_Name"
                value={formName}
                disabled={errorSysName}
                onChange={handleChangeFormName}
                className={`h-9 w-96 ${classNames({ 'p-invalid': errorFormName, 'w-full': true })}`}
              />
              <label htmlFor="formName" className={`right-2 text-sm ${classNames({ 'p-error': errorFormName })}`}>
                نام فرم
              </label>
            </span>
          </div>
        )}

        <div className="mt-10 flex justify-end justify-items-end">
          <Button
            loading={loading}
            onClick={submitHandler}
            disabled={value && valueType >= 0 && !errorSysName && !errorFormName ? false : true}
            label="ثبت"
            className=" ml-10 text-sm mt-3 h-10 bg-indigo-600"
            type="submit"
          />
        </div>
      </div>
    </>
  )
}
