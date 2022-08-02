import React, { useEffect, useState } from 'react'
import { GetAllTags } from '../../../service/tagManagerService'
import { Dropdown } from 'primereact/dropdown'
import { Checkbox } from 'primereact/checkbox'

export const UpdateRoll = ({ oldVal, rollName, setRollName, setIsUserSysRole }) => {
  const [tags, setTags] = useState([])
  const [checked, setChecked] = useState(oldVal ? oldVal.role_IsSystemRole : false)

  useEffect(() => {
    fetchTags()
    if (oldVal) {
      setRollName(oldVal.rol_TagID)
      setIsUserSysRole(oldVal.role_IsSystemRole)
    }
  }, [oldVal, setIsUserSysRole, setRollName])

  const fetchTags = () => {
    const formData = new FormData()
    formData.append('TagType', '4')
    GetAllTags(formData).then(res => {
      if (res.data || res.status === 200) {
        setTags(res.data.tagsknowledges)
      }
    })
  }
  return (
    <div className="w-[400px] pb-4 rounded-md m-auto container bg-white rtl">
      <div className=" flex justify-start mr-[8%] mt-10 ">
        <span className="p-float-label">
          <span className="p-float-label">
            <Dropdown
              options={tags}
              optionLabel={'tag_Name'}
              optionValue={'tag_ID'}
              id="Rol_TgID"
              value={rollName}
              onChange={e => setRollName(e.target.value)}
              name="Rol_TgID"
              className={'h-[50px] w-96'}
            />
            <label htmlFor="Rol_TgID" className={`right-2 text-sm w-full`}>
              نقش
            </label>
          </span>
          {/* <InputText id="inputtext" value={rollName} onChange={e => setRollName(e.target.value)} className="h-9 w-44" />
          <label htmlFor="inputtext" className="right-2 text-sm">
            نقش
          </label> */}
        </span>
      </div>
      <div className=" flex justify-start mr-[8%] mt-10 ">
        <span className="p-float-label">
          <Checkbox
            onChange={e => {
              setChecked(e.checked)
              setIsUserSysRole(e.checked)
            }}
            checked={checked}
            id="isSystemRole"
          />

          <span htmlFor="isSystemRole" className={`mr-2 text-sm w-full`}>
            کاربر سازمانی
          </span>
        </span>
      </div>
    </div>
  )
}
