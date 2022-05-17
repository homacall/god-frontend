import React, { useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import Breadcrumb from '../../component/breadcrumb/breadcrumb'
import { InsertRole } from '../../service/rolService'
import { Alert } from '../common/alert'
import { GetAllTags } from '../../service/tagManagerService'
import { Dropdown } from 'primereact/dropdown'

export const CreateRoll = () => {
  const [value, setValue] = useState()
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState([])
  const item = [
    { id: 1, label: 'مدیریت نقش', url: '/roll' },
    { id: 2, label: 'ثبت نقش جدید', url: '/roll/new-roll' },
  ]

  const fetchTags = () => {
    GetAllTags().then(res => {
      if (res.data || res.status === 200) {
        setTags(res.data)
      }
    })
  }
  const createRoll = () => {
    setLoading(true)
    const formData = new FormData()
    console.log(value)
    formData.append('Rol_TgID', value)
    InsertRole(formData)
      .then(res => {
        setShowMessage(true)
        if (res.data || res.status === 200) {
          setMessage('ثبت نقش جدید با موفقیت انجام شد')
          setValue('')
        } else {
          setMessage('ثبت نقش جدید با خطا مواجه شد')
        }
      })
      .catch(err => {
        setShowMessage(true)
        setMessage('ثبت نقش جدید با خطا مواجه شد')
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  useEffect(() => {
    fetchTags()
  }, [])
  return (
    <div className="w-[80%] my-4 pb-4 rounded-md m-auto container bg-white rtl">
      <Breadcrumb item={item} />
      <Alert message={message} setMessage={setMessage} setShowMessage={setShowMessage} showMessage={showMessage} />
      <div className=" flex justify-start mr-[8%] mt-10 ">
        <span className="p-float-label">
          <Dropdown
            options={tags}
            optionLabel={'tag_Name'}
            optionValue={'tag_ID'}
            id="Rol_TgID"
            value={value}
            onChange={e => setValue(e.target.value)}
            name="Rol_TgID"
            className={'h-[50px] w-96'}
          />
          <label htmlFor="Rol_TgID" className={`right-2 text-sm w-full`}>
            نقش
          </label>
        </span>
        {/* <span className="p-float-label">
          <InputText id="inputtext" value={value} onChange={e => setValue(e.target.value)} className="h-9 w-96" />
          <label htmlFor="inputtext" className="right-2 text-sm">
            نقش
          </label>
        </span> */}
      </div>
      <Button
        loading={loading}
        label="ثبت"
        onClick={createRoll}
        disabled={value ? false : true}
        className="relative right-[86%] text-sm mt-3 h-10"
      />
    </div>
  )
}
