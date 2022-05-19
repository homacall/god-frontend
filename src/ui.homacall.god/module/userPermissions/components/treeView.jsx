import _ from 'lodash'
import { Button } from 'primereact/button'
import { useCallback } from 'react'
import { Fragment, useEffect, useState } from 'react'
import { SelectActions } from './selectActions'

export const TreeView = ({ setSelectedRoute, closeButton, data, hasPermission = false, user, onHide, fetchAgain }) => {
  const [dataView, setDataView] = useState([])
  const [selected, setSelected] = useState([])
  const filterData = useCallback(
    route => {
      const newData = data.filter(d => d.routStr_PID === route.routStr_ID)
      if (setSelectedRoute) {
        if (!newData.length) {
          setSelectedRoute(route)
        } else {
          setSelectedRoute(undefined)
        }
      }

      setDataView(newData)
    },
    [data, setSelectedRoute],
  )
  useEffect(() => {
    filterData({ routStr_ID: 0 })
  }, [data, filterData])
  const removeHeaderHandler = index => {
    if (index === -1) {
      setSelected([])
      return
    } else {
      const newHeaders = _.slice(selected, 0, index + 1)
      setSelected(newHeaders)
    }
  }

  return (
    <div className="min-h-[300px]">
      <div className=" w-full border-b shadow-sm border-gray-200 rtl mt-4 ">
        <ul className="flex h-12 place-item-center text-gray-700 items-center">
          <li
            className=" flex  pr-[10px] cursor-pointer"
            onClick={() => {
              filterData({ routStr_ID: 0 })
              removeHeaderHandler(-1)
            }}
          >
            <div className="hover:text-indigo-600">اصلی</div>
            <i className="pi pi-angle-left pr-2 pt-[8px]" />
          </li>
          {selected.map((label, index) => (
            <Fragment key={index}>
              <li
                className="flex pr-[10px] cursor-pointer"
                onClick={() => {
                  filterData(label)
                  removeHeaderHandler(index)
                }}
              >
                <div className="hover:text-indigo-600">{label.routStr_Trans_Tag_Name}</div>
                {index + 1 < selected.length && <i className="pi pi-angle-left pr-2  pt-[8px]" />}
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
            className="rtl p-float-label p-2 text-indigo-400 cursor-pointer hover:bg-slate-100 transition	ease-in duration-100"
          >
            {item.routStr_Trans_Tag_Name}
          </div>
        ))
      ) : (
        <div className="text-center rtl">رکوردی یافت نشد!</div>
      )}

      {!dataView.length && selected && selected.length > 0 && hasPermission ? (
        selected[selected.length - 1].routStr_TypeRout === 1 ? (
          <SelectActions selectedRoute={selected} user={user} onHide={onHide} fetchAgain={fetchAgain} />
        ) : (
          <h5 className="mt-5 text-amber-500	text-center ">ابتدا یک فرم یا مسیر جدید تعریف کنید</h5>
        )
      ) : (
        ''
      )}

      {!hasPermission && (
        <Button
          className="p-button-primary absolute bottom-[25px] left-[130px]"
          onClick={() => {
            setSelectedRoute(selected[selected.length - 1])
          }}
        >
          انتخاب مسیر
        </Button>
      )}
      {!!dataView.length && selected && selected.length > 0 && selected[selected.length - 1].routStr_TypeRout === 1 && hasPermission && (
        <Button
          className="p-button-primary absolute bottom-[25px] left-[130px]"
          onClick={() => {
            setSelectedRoute(selected[selected.length - 1])
            setDataView([])
          }}
        >
          انتخاب فرم
        </Button>
      )}

      {closeButton}
    </div>
  )
}
