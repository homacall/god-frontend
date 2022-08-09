import { useEffect, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { classNames } from 'primereact/utils'
import { createTagType } from '../constant/createTagType'
import { GetAllTagsTranslate } from '../../../service/translateService'
import { ToastAlert } from '../../common/toastAlert'

export const UpdateTag = ({ oldVal, tagName, setTagName, tagType, setTagType, setFormId, tagId }) => {
  const [type, setType] = useState(tagType)
  const [selectedFormId, setSelectedFormId] = useState(tagId)
  const [errorFormName, setErrorFormName] = useState(false)
  const [allForms, setAllForms] = useState([])

  useEffect(() => {
    if (oldVal) {
      setTagName(oldVal)
    }
  }, [oldVal, setTagName])

  useEffect(() => {
    if (tagId) {
      setSelectedFormId(tagId)
      setFormId(tagId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagId])

  useEffect(() => {
    if (tagType) {
      setType(tagType)
      setTagType(tagType)
    }
  }, [tagType, setType, setTagType])

  useEffect(() => {
    if (type === 2) {
      const formData = new FormData()
      formData.append('TagType', '1')
      formData.append('ParentID', '-1')
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
  }, [type])

  const handleChangeType = type => {
    setTagType(type.value)
    setType(type.value)
    if (type.value !== 2) {
      setFormId(tagId)
    }
  }

  const handleChangeFormName = type => {
    setSelectedFormId(type.value)
    setFormId(type.value)
    setErrorFormName(false)
  }
  return (
    <div className="w-[400px] pb-4 rounded-md m-auto container bg-white rtl">
      <div className=" flex justify-start mr-[8%] mt-10 ">
        <span className="p-float-label block w-full">
          <InputText id="inputtext" value={tagName} onChange={e => setTagName(e.target.value)} className="h-9 w-11/12" />
          <label htmlFor="inputtext" className="right-2 text-sm">
            عنوان
          </label>
        </span>
      </div>

      <div className=" flex justify-start mr-[8%] mt-10 ">
        <span className="p-float-label block w-full">
          <Dropdown options={createTagType} id="tagType" name="tagType" value={type} onChange={handleChangeType} className="h-9 w-11/12" />
          <label htmlFor="tagType" className="right-2 text-sm">
            نوع
          </label>
        </span>
      </div>

      {type === 2 && (
        <div className=" flex justify-start mr-[8%] mt-10 ">
          <span className="p-float-label block w-full">
            <Dropdown
              options={allForms}
              id="formName"
              name="formName"
              optionValue="tag_ID"
              optionLabel="tagTranslate_Name"
              value={selectedFormId}
              onChange={handleChangeFormName}
              className={`h-9 w-11/12 ${classNames({ 'p-invalid': errorFormName, 'w-11/12': true })}`}
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
