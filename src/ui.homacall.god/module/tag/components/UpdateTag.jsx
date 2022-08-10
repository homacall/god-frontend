import { useEffect, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { classNames } from 'primereact/utils'
import { createTagType } from '../constant/createTagType'
import { GetAllTagsTranslate } from '../../../service/translateService'
import { UpdateTags } from '../../../service/tagManagerService'
import { ToastAlert } from '../../common/toastAlert'

export const UpdateTag = ({ showUpdateDialog, setShowUpdateDialog, editProps, fetchAgainHandler }) => {
  const [type, setType] = useState(editProps.typeId)
  const [selectedFormId, setSelectedFormId] = useState(editProps.formParentID)
  const [errorFormName, setErrorFormName] = useState(false)
  const [allForms, setAllForms] = useState([])
  const [tagName, setTagName] = useState(editProps.title)
  const [errorTagName, setErrorTagName] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)

  useEffect(() => {
    if (editProps) {
      setErrorTagName(false)
      setTagName(editProps.title)
      setType(editProps.typeId)
      setSelectedFormId(editProps.formParentID)
    }
  }, [editProps])

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
    setType(type.value)
    if (type.value !== 2) {
      setSelectedFormId(editProps.formParentID)
    } else {
      setSelectedFormId(-1)
      setErrorFormName(true)
    }
  }

  const handleChangeFormName = type => {
    setSelectedFormId(type.value)
    setErrorFormName(false)
  }

  const updateTags = () => {
    setUpdateLoading(true)
    const formData = new FormData()
    formData.append('Tag_ID', editProps.id)
    formData.append('Tag_Name', tagName)
    formData.append('Tag_Type', type.toString())
    formData.append('Tag_PID', selectedFormId)

    UpdateTags(formData)
      .then(res => {
        if (res.data || res.status === 200) {
          ToastAlert.success('تگ مورد نظر با موفقیت ویرایش گردید')
          setShowUpdateDialog(!showUpdateDialog)
          fetchAgainHandler()
        } else {
          ToastAlert.error('خطا در ویرایش تگ')
        }
      })
      .catch(err => console.log(err))
      .finally(() => setUpdateLoading(false))
  }

  const footer = () => {
    return (
      <>
        <Button
          loading={updateLoading}
          label="ثبت"
          disabled={errorTagName || errorFormName ? true : false}
          onClick={updateTags}
          className="relative right-[80%] text-sm mt-3 h-10"
        />
      </>
    )
  }

  return (
    <Dialog
      visible={showUpdateDialog}
      onHide={() => {
        setShowUpdateDialog(!showUpdateDialog)
      }}
      footer={footer}
    >
      <div className="w-[400px] pb-4 rounded-md m-auto container bg-white rtl">
        <div className=" flex justify-start mr-[8%] mt-10 ">
          <span className="p-float-label block w-full">
            <InputText
              id="inputtext"
              value={tagName}
              onChange={e => {
                e.target.value === '' ? setErrorTagName(true) : setErrorTagName(false)
                setTagName(e.target.value)
              }}
              className={`h-9 w-11/12 ${classNames({ 'p-invalid': errorTagName, 'w-11/12': true })}`}
            />
            <label htmlFor="inputtext" className="right-2 text-sm">
              عنوان
            </label>
          </span>
        </div>

        <div className=" flex justify-start mr-[8%] mt-10 ">
          <span className="p-float-label block w-full">
            <Dropdown
              options={createTagType}
              id="tagType"
              name="tagType"
              value={type}
              onChange={handleChangeType}
              className="h-9 w-11/12"
            />
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
    </Dialog>
  )
}
