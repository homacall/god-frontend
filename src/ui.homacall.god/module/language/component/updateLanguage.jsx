import React, { useEffect, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { RadioButton } from 'primereact/radiobutton'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { UpdateLanguage } from '../../../service/languageService'
import { ToastAlert } from '../../common/toastAlert'

const UpdateDialog = props => {
  const [value, setValue] = useState(props.lang_Name)
  const [layout, setLayout] = useState(props.lang_Rtl === true ? 'RTL' : 'LTR')
  const [loading, setLoading] = useState()
  const [codeValue, setCodeValue] = useState(props.lang_Icon)

  useEffect(() => {
    if (props) {
      setValue(props.lang_Name)
      setCodeValue(props.lang_Icon)
      setLayout(props.lang_Rtl === true ? 'RTL' : 'LTR')
    }
  }, [props])

  const footer = () => {
    return (
      <>
        <Button loading={loading} label="ثبت" onClick={handleSubmit} className="relative right-[80%] text-sm mt-3 h-10" />
      </>
    )
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const formData = new FormData()
    const isRTL = layout === 'RTL' ? true : false
    formData.append('Lang_Name', value)
    formData.append('Lang_Rtl', isRTL)
    formData.append('Lang_Icon', codeValue)
    formData.append('Lang_ID', props.lang_ID)
    setLoading(true)
    try {
      const { data, status } = await UpdateLanguage(formData)

      if (status === 200 || data) {
        props.fetchAgain()
        props.setShowUpdateDialog(!props.showUpdateDialog)
        ToastAlert.success('ویرایش زبان با موفقیت انجام شد.')
      } else {
        ToastAlert.error('خطا در ویرایش زبان')
      }
    } catch (error) {
      ToastAlert.error('خطا در ویرایش زبان')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      visible={props.showUpdateDialog}
      onHide={() => {
        props.setShowUpdateDialog(!props.showUpdateDialog)
      }}
      footer={footer}
    >
      <form onSubmit={handleSubmit}>
        <div className="w-[400px] pb-4 rounded-md m-auto container bg-white rtl">
          <div className=" flex justify-start mr-[8%] mt-10 ">
            <span className="p-float-label">
              <InputText id="inputtext" value={value} onChange={e => setValue(e.target.value)} className="h-9 w-44" />
              <label htmlFor="inputtext" className="right-2 text-sm">
                عنوان
              </label>
            </span>
          </div>
          <div className=" flex justify-start mr-[8%] mt-10 ">
            <span className="p-float-label">
              <InputText
                id="lang_Icon"
                name="lang_Icon"
                value={codeValue}
                onChange={e => setCodeValue(e.target.value)}
                className="h-9 w-44"
              />
              <label htmlFor="lang_Icon" className="right-2 text-sm">
                نام اختصاری کشور
              </label>
            </span>
          </div>
          <a
            href="https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes"
            target="_blank"
            className="text-xs mt-3 mr-8 text-blue-700"
          >
            نمایش کد اختصاری (alfa-2 code) کشورها
          </a>
          <div className=" flex justify-start mr-[8%] mt-10">
            <div className="field-radiobutton ml-8">
              <RadioButton inputId="RTL" name="layout" value="RTL" onChange={e => setLayout(e.value)} checked={layout === 'RTL'} />
              <label htmlFor="RTL" className="mr-4 text-sm">
                راست به چپ
              </label>
            </div>
            <div className="field-radiobutton">
              <RadioButton inputId="LTR" name="layout" value="LTR" onChange={e => setLayout(e.value)} checked={layout === 'LTR'} />
              <label htmlFor="LTR" className="mr-4 text-sm">
                چپ به راست
              </label>
            </div>
          </div>
        </div>
      </form>
    </Dialog>
  )
}
export default UpdateDialog
