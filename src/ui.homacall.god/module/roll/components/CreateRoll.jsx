import React, { useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import Breadcrumb from '../../../component/breadcrumb/breadcrumb'
import { InsertRole } from '../../../service/rolService'
import { GetAllTags, getAllTagsTranslate } from '../../../service/tagManagerService'
import { Dropdown } from 'primereact/dropdown'
import { useNavigate } from 'react-router'
import { rolls } from '../../../utils/constants/routes/publicRoute'
import { ToastAlert } from '../../common/toastAlert'
import { Checkbox } from 'primereact/checkbox'
import { createTagType } from '../../tag/constant/createTagType'

export const CreateRoll = () => {
  const [value, setValue] = useState()
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState([])
  const [checked, setChecked] = useState(false)
  const navigate = useNavigate()
  const item = [
    { id: 1, label: 'مدیریت نقش', url: rolls.roll },
    { id: 2, label: 'ثبت نقش جدید', url: rolls.newRoll },
  ]

  const fetchTags = () => {
    const formData = new FormData()
    formData.append('TagType', '5')
    formData.append('ParentID', '-1')
    getAllTagsTranslate(formData).then(res => {
      if (res.data || res.status === 200) {
        setTags(res.data.tagsknowledges)
      }
    })
  }
  const createRoll = () => {
    setLoading(true)
    const formData = new FormData()
    formData.append('Rol_TgID', value)
    formData.append('Rol_IsSysRol', checked)
    InsertRole(formData)
      .then(res => {
        if (res.data || res.status === 200) {
          ToastAlert.success('ثبت نقش جدید با موفقیت انجام شد')
          setValue('')
          navigate('/role')
        } else {
          ToastAlert.error('ثبت نقش جدید با خطا مواجه شد')
        }
      })
      .catch(err => {
        ToastAlert.error('ثبت نقش جدید با خطا مواجه شد')
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
      <div className=" flex justify-start mr-[8%] mt-10 ">
        <span className="p-float-label">
          <Dropdown
            options={tags}
            optionLabel={'tagTranslate_Name'}
            optionValue={'tag_ID'}
            id="Rol_TgID"
            value={value}
            onChange={e => setValue(e.target.value)}
            name="Rol_TgID"
            className={'h-9 w-96'}
          />
          <label htmlFor="Rol_TgID" className={`right-2 text-sm w-full`}>
            نقش
          </label>
        </span>
      </div>
      <div className=" flex justify-start mr-[8%] mt-10 ">
        <span className="p-float-label">
          <Checkbox onChange={e => setChecked(e.checked)} checked={checked} id="isSystemRole" />

          <span htmlFor="isSystemRole" className={`mr-2 text-sm w-full`}>
            کاربر سازمانی
          </span>
        </span>
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
