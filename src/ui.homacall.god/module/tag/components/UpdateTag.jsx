import React, { useEffect } from 'react'
import { InputText } from 'primereact/inputtext'

export const UpdateTag = ({ oldVal, tagName, setTagName }) => {
  useEffect(() => {
    if (oldVal) {
      setTagName(oldVal)
    }
  }, [oldVal, setTagName])
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
    </div>
  )
}
