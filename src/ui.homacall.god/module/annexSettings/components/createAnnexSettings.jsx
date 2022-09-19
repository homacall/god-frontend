import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { InputTextarea } from 'primereact/inputtextarea'
import { useFormik } from 'formik'
import Breadcrumb from '../../../component/breadcrumb/breadcrumb'
import { ToastAlert } from '../../common/toastAlert'
import { createAnnexSettingsBreadcrumb } from '../constant/breadCrumb'
import { GetAllTags } from '../../../service/tagManagerService'
import { englishWord } from '../constant/regex'
import { CreateAnnex } from '../../../service/annexSettingsService'

export const CreateAnnexSettings = () => {
  const [loading, setLoading] = useState(false)
  const [systemNames, setSystemNames] = useState([])
  const [archiveNames, setArchiveNames] = useState([])
  const [selectedSystem, setSelectedSystem] = useState()
  const [filteredArchive, setFilteredArchive] = useState([])
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      systemId: '',
      archiveId: '',
      keyword: '',
      RefComent: '',
      description: '',
    },
    validate: data => {
      let errors = {}
      if (!data.systemId) {
        errors.systemId = 'انتخاب سیستم الزامی است.'
      }
      if (!data.archiveId) {
        errors.archiveId = 'انتخاب آرشیو الزامی است'
      }
      if (!data.keyword) {
        errors.keyword = 'کلمه کلیدی را وارد نمایید.'
      }
      if (!data.RefComent) {
        errors.RefComent = ' نام جدول مرجع را وارد نمایید.'
      }
      if (!data.description) {
        errors.description = ' توضیحات را وارد نمایید.'
      }

      return errors
    },
    onSubmit: data => {
      submitHandler(data)
    },
    enableReinitialize: true,
  })

  const handleCreateAnnexSetting = createValues => {
    CreateAnnex(createValues)
      .then(res => {
        if (res.status === 200 || res.data === 'Sucess') {
          navigate('/annexSettings')
          ToastAlert.success('بایگانی با موفقیت ایجاد شد.')
        } else {
          ToastAlert.error('خطا در  ایجاد بایگانی ')
        }
      })
      .catch(() => ToastAlert.error('خطا در ارتباط با سرور'))
      .finally(() => setLoading(false))
  }

  const submitHandler = data => {
    setLoading(true)
    const formData = new FormData()
    formData.append('AnxSeting_SysTagID', data.systemId)
    formData.append('AnxSeting_TagID', data.archiveId)
    formData.append('AnxSeting_KeyWord', data.keyword)
    formData.append('AnxSeting_RefComent', data.RefComent)
    formData.append('AnxSeting_Desc', data.description)

    handleCreateAnnexSetting(formData)
  }

  const isFormFieldValid = name => !!(formik.touched[name] && formik.errors[name])
  const getFormErrorMessage = name => {
    return isFormFieldValid(name) && <small className="p-error absolute right-0 top-12">{formik.errors[name]}</small>
  }

  const fetchAllSystemTags = () => {
    const formData = new FormData()
    formData.append('TagType', '8')

    GetAllTags(formData)
      .then(res => {
        if (res && res.data && res.data.status === 200) {
          setSystemNames(res.data.tagsknowledges)
        } else {
          ToastAlert.error('خطا در دریافت نام سیستم ها')
        }
      })
      .catch(() => console.log('خطا در دریافت نام سیستم ها'))
  }

  useEffect(() => {
    fetchAllSystemTags()
    fetchAllArchiveTags()
  }, [])

  const fetchAllArchiveTags = () => {
    const formData = new FormData()
    formData.append('TagType', '6')

    GetAllTags(formData)
      .then(res => {
        if (res && res.data && res.data.status === 200) {
          setArchiveNames(res.data.tagsknowledges)
        } else {
          ToastAlert.error('خطا در دریافت نام سیستم ها')
        }
      })
      .catch(() => console.log('خطا در دریافت نام سیستم ها'))
  }

  useEffect(() => {
    if (selectedSystem) {
      console.log({ archiveNames, selectedSystem })
      const newArchive = archiveNames.filter(item => item.tag_PID === selectedSystem)
      setFilteredArchive(newArchive)
    }
  }, [archiveNames, selectedSystem])

  return (
    <div className="w-[80%] my-4 pb-4 rounded-md  m-auto container bg-white rtl ">
      <Breadcrumb item={createAnnexSettingsBreadcrumb} />

      <form className="flex flex-col gap-4 gap-y-10 p-5 mt-10" onSubmit={formik.handleSubmit}>
        <span className="p-float-label mb-5 block w-full md:w-[50%] m-auto">
          <Dropdown
            options={systemNames}
            id="systemId"
            name="systemId"
            optionValue="tag_ID"
            optionLabel="tag_TransName"
            filterBy="tag_TransName"
            filter
            value={formik.values.systemId}
            onChange={event => {
              formik.handleChange(event)
              setSelectedSystem(event.value)
            }}
            className={classNames({ 'p-invalid': isFormFieldValid('systemId'), 'w-full h-9': true })}
          />
          <label htmlFor="systemId" className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('systemId') })}`}>
            عنوان سیستم
          </label>
          {getFormErrorMessage('systemId')}
        </span>
        <span className="p-float-label mb-5 block w-full md:w-[50%] m-auto">
          <Dropdown
            options={filteredArchive}
            id="archiveId"
            value={formik.values.archiveId}
            optionLabel="tag_TransName"
            optionValue="tag_ID"
            filterBy="tag_TransName"
            filter
            disabled={!selectedSystem}
            name="archiveId"
            onChange={formik.handleChange}
            className={classNames({ 'p-invalid': isFormFieldValid('archiveId'), 'w-full h-9': true })}
          />
          <label htmlFor="archiveId" className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('archiveId') })}`}>
            عنوان آرشیو
          </label>
          {getFormErrorMessage('archiveId')}
        </span>

        <span className="p-float-label mb-5 block w-full md:w-[50%] m-auto">
          <InputText
            id="keyword"
            value={formik.values.keyword}
            onChange={formik.handleChange}
            name="keyword"
            maxLength={10}
            minLength={1}
            className={classNames({ 'p-invalid': isFormFieldValid('keyword'), 'w-full h-9': true })}
            onKeyPress={event => {
              if (!englishWord.test(event.key)) {
                event.preventDefault()
              }
            }}
          />
          <label htmlFor="Usr_UName" className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('keyword') })}`}>
            کلمه اختصاری(keyword)
          </label>
          {getFormErrorMessage('keyword')}
        </span>

        <span className="p-float-label mb-5 block w-full md:w-[50%] m-auto">
          <InputText
            id="RefComent"
            value={formik.values.RefComent}
            onChange={formik.handleChange}
            name="RefComent"
            className={classNames({ 'p-invalid': isFormFieldValid('RefComent'), 'w-full h-9': true })}
            onKeyPress={event => {
              if (!englishWord.test(event.key)) {
                event.preventDefault()
              }
            }}
          />
          <label htmlFor="RefComent" className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('RefComent') })}`}>
            نام جدول
          </label>
          {getFormErrorMessage('RefComent')}
        </span>

        <span className="p-float-label mb-5 block w-full md:w-[50%] m-auto">
          <InputTextarea
            id="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            name="description"
            autoResize="off"
            style={{ height: '100px' }}
            className={classNames({ 'p-invalid': isFormFieldValid('description'), 'w-full h-9': true })}
          />
          <label htmlFor="description" className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('description') })}`}>
            توضیحات
          </label>
          {getFormErrorMessage('description')}
        </span>

        <div className="col-span-3 flex justify-end items-end ">
          <Button label="ثبت" className=" ml-10 bg-indigo-600 text-sm mt-3 h-10" type="submit" loading={loading} />
        </div>
      </form>
    </div>
  )
}
