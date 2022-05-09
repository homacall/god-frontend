import React, { useEffect } from 'react'
import { InputText } from 'primereact/inputtext'

export const UpdateRoll = ({oldVal, rollName, setRollName}) => {
  useEffect(()=>{
    if(oldVal){ setRollName(oldVal)}
  }, [])
  return (
    <div className="w-[400px] pb-4 rounded-md m-auto container bg-white rtl">
      <div className=" flex justify-start mr-[8%] mt-10 ">
        <span className="p-float-label">
          <InputText id="inputtext" value={rollName} onChange={e => setRollName(e.target.value) } className="h-9 w-44" />
          <label htmlFor="inputtext" className="right-2 text-sm">
            نقش
          </label>
        </span>
      </div>
    </div>
  )
}
