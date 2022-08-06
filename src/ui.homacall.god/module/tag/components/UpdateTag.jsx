import { useEffect, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { createTagType } from '../constant/createTagType'

export const UpdateTag = ({ oldVal, tagName, setTagName, tagType, setTagType }) => {
  const [type, setType] = useState(tagType)

  useEffect(() => {
    if (oldVal) {
      setTagName(oldVal)
    }
  }, [oldVal, setTagName])

  useEffect(() => {
    if (tagType) {
      setType(tagType)
      setTagType(tagType)
    }
  }, [tagType, setType, setTagType])

  const handleChangeType = type => {
    setTagType(type.value)
    setType(type.value)
  }

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

      <div className=" flex justify-start mr-[8%] mt-10 ">
        <span className="p-float-label">
          <Dropdown options={createTagType} id="tagType" name="tagType" value={type} onChange={handleChangeType} className="h-9 w-44" />
          <label htmlFor="tagType" className="right-2 text-sm">
            نوع
          </label>
        </span>
      </div>
    </div>
  )
}
