import React, { useEffect, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { GetAllTags } from '../../../service/tagManagerService'
import { Dropdown } from 'primereact/dropdown'

export const UpdateRoll = ({ oldVal, rollName, setRollName }) => {
  const [tags, setTags] = useState([])
  useEffect(() => {
    fetchTags()
    if (oldVal) {
      setRollName(oldVal)
    }
  }, [oldVal, setRollName])
  const fetchTags = () => {
    GetAllTags().then(res => {
      if (res.data || res.status === 200) {
        setTags(res.data)
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
    </div>
  )
}
