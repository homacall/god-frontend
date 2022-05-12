import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import Breadcrumb from '../../component/breadcrumb/breadcrumb'

export const CreateStretcher = () => {
  const [value, setValue] = useState('')

  const item = [
    { id: 1, label: 'مدیریت نقش', url: '/roll' },
    { id: 2, label: 'ثبت نقش جدید', url: '/roll/new-roll' },
  ]

  const createRoll = () => {
    alert(value)
  }

  return (
    <div className="w-[80%] my-4 pb-4 rounded-md m-auto container bg-white rtl">
      <Breadcrumb item={item} />
      <div className=" flex justify-start mr-[8%] mt-10 ">
        <span className="p-float-label">
          <InputText id="inputtext" value={value} onChange={e => setValue(e.target.value)} className="h-9 w-96" />
          <label htmlFor="inputtext" className="right-2 text-sm">
            نقش
          </label>
        </span>
      </div>
      <Button label="ثبت" onClick={createRoll} disabled={value ? false : true} className="relative right-[86%] text-sm mt-3 h-10" />
    </div>
  )
}
