import _ from 'lodash'
import { Button } from 'primereact/button'
import { Fragment, useEffect, useState } from 'react'
import { GetAllRoutesGod } from '../../../service/routeStretcherService'

export const TreeView = ({ setSelectedRoute, closeButton, data }) => {
  const [dataView, setDataView] = useState([])
  const [selected, setSelected] = useState([])

  const filterData = route => {
    const newData = data.filter(d => d.routStr_PID === route.routStr_ID)
    if (setSelectedRoute) {
      if (!newData.length) {
        setSelectedRoute(route)
      } else {
        setSelectedRoute(undefined)
      }
    }

    setDataView(newData)
  }

  useEffect(() => {
    filterData({ routStr_ID: 0 })
  }, [data])
  const removeHeaderHandler = index => {
    if (index + 1 === selected.length) return
    const newHeaders = _.slice(selected, 0, index + 1)
    setSelected(newHeaders)
  }
  return (
    <div className="">
      <div className=" w-full border-b shadow-sm border-gray-200 rtl mt-4 ">
        <ul className="flex h-12 place-item-center text-gray-700 ">
          <li
            className="pt-[10px] pr-[10px] cursor-pointer"
            onClick={() => {
              filterData({ id: 0 })
              removeHeaderHandler(0)
            }}
          >
            <a className="hover:text-indigo-600">اصلی</a>
            {<i className="pi pi-angle-left pr-2" />}
          </li>
          {selected.map((label, index) => (
            <Fragment key={index}>
              <li
                className="pt-[10px] pr-[10px] cursor-pointer"
                onClick={() => {
                  filterData(label)
                  removeHeaderHandler(index)
                }}
              >
                <a className="hover:text-indigo-600">{label.routStr_Trans_Tag_Name}</a>
                {index + 1 < selected.length && <i className="pi pi-angle-left pr-2" />}
              </li>
            </Fragment>
          ))}
        </ul>
      </div>

      {data.length ? (
        dataView.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              filterData(item)
              setSelected(perv => [...perv, item])
            }}
            className="rtl p-float-label p-2 text-indigo-400 cursor-pointer"
          >
            {item.routStr_Trans_Tag_Name}
          </div>
        ))
      ) : (
        <div className="text-center rtl">رکوردی یافت نشد!</div>
      )}
      <Button
        className="p-button-primary absolute bottom-[25px] left-[130px]"
        onClick={() => {
          setSelectedRoute(selected[selected.length - 1])
        }}
      >
        انتخاب مسیر
      </Button>
      {closeButton}
    </div>
  )
}
