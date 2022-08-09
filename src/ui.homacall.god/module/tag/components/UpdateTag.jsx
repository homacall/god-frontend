import { useEffect, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { classNames } from 'primereact/utils'
import { createTagType } from '../constant/createTagType'
import { GetAllTagsTranslate } from '../../../service/translateService'
import { ToastAlert } from '../../common/toastAlert'

export const UpdateTag = ({ oldVal, tagName, setTagName, tagType, setTagType, setFormId }) => {
  const [type, setType] = useState(tagType)
  const [allSystems, setAllSystems] = useState([])
  const [sysId, setSysId] = useState()
  const [selectedFormId, setSelectedFormId] = useState()
  const [errorSysName, setErrorSysName] = useState(false)
  const [errorFormName, setErrorFormName] = useState(false)
  const [showSystemName, setShowSystemName] = useState(false)

  useEffect(() => {
    if (oldVal) {
      setTagName(oldVal)
    }
  }, [oldVal, setTagName])

  useEffect(() => {
    if (tagType) {
      setType(tagType)
      setTagType(tagType)
    }
  }, [tagType, setType, setTagType])

  useEffect(() => {
    const formData = new FormData()
    formData.append('TagType', '8')
    formData.append('ParentID', '0')
    GetAllTagsTranslate(formData)
      .then(res => {
        if (res && res.data && res.data.status === 200) {
          console.log({ res })
          setAllSystems(res.data.tagsknowledges)
        } else {
          ToastAlert.error('خطا در دریافت نام سیستم ها')
        }
      })
      .catch(() => console.log('خطا در دریافت نام سیستم ها'))
  }, [])

  const handleChangeType = type => {
    setTagType(type.value)
    setType(type.value)
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
    setSysId(type.value)
    setErrorSysName(false)
    if (type !== 2 || type !== 3 || (type !== 4) | (type !== 8)) {
      setFormId(type.value)
    }
  }

  const handleChangeFormName = type => {
    setSelectedFormId(type.value)
    Number(type) === 2 && setFormId(type.value)
    setErrorFormName(false)
  }

  return (
    <div className="w-[400px] pb-4 rounded-md m-auto container bg-white rtl">
      <div className=" flex justify-start mr-[8%] mt-10 ">
        <span className="p-float-label">
          <InputText id="inputtext" value={tagName} onChange={e => setTagName(e.target.value)} className="h-9 w-44" />
          <label htmlFor="inputtext" className="right-2 text-sm">
            عنوان
          </label>
        </span>
      </div>

      <div className=" flex justify-start mr-[8%] mt-10 ">
        <span className="p-float-label">
          <Dropdown options={createTagType} id="tagType" name="tagType" value={type} onChange={handleChangeType} className="h-9 w-44" />
          <label htmlFor="tagType" className="right-2 text-sm">
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
              name="tag_Name"
              optionValue="tag_ID"
              optionLabel="tag_Name"
              value={sysId}
              onChange={handleChangeSysName}
              className={`h-9 w-96 ${classNames({ 'p-invalid': errorSysName, 'w-full': true })}`}
            />
            <label htmlFor="sysName" className={`right-2 text-sm ${classNames({ 'p-error': errorSysName })}`}>
              نام سیستم
            </label>
          </span>
        </div>
      )}

      {type === 2 && (
        <div className=" flex justify-start mr-[8%] mt-10 ">
          <span className="p-float-label">
            <Dropdown
              options={createTagType}
              id="formName"
              name="formName"
              value={selectedFormId}
              onChange={handleChangeFormName}
              className={`h-9 w-96 ${classNames({ 'p-invalid': errorFormName, 'w-full': true })}`}
            />
            <label htmlFor="formName" className={`right-2 text-sm ${classNames({ 'p-error': errorFormName })}`}>
              نام فرم
            </label>
          </span>
        </div>
      )}
    </div>
  )
}
