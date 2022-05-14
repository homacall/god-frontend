import _ from 'lodash'
import { Fragment, useEffect, useState } from 'react'

export const TreeView = ({ setSelectedRoute, closeButton }) => {
  const [dataView, setDataView] = useState([])
  const [selected, setSelected] = useState([])
  const data = [
    { parentId: 0, routeType: 0, id: 1, tagName: '111' },
    { parentId: 0, routeType: 0, id: 2, tagName: '222' },
    { parentId: 1, routeType: 1, id: 3, tagName: '333' },
    { parentId: 1, routeType: 0, id: 4, tagName: '444' },
    { parentId: 2, routeType: 1, id: 5, tagName: '555' },
    { parentId: 2, routeType: 0, id: 6, tagName: '666' },
    { parentId: 2, routeType: 0, id: 7, tagName: '777' },
    { parentId: 7, routeType: 0, id: 8, tagName: '888' },
    { parentId: 7, routeType: 0, id: 9, tagName: '999' },
    { parentId: 7, routeType: 0, id: 10, tagName: '1010' },
  ]

  const filterData = route => {
    const newData = data.filter(d => d.parentId === route.id)
    console.log({ setSelectedRoute, newData })
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
    filterData({ id: 0 })
  }, [])
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
                <a className="hover:text-indigo-600">{label.tagName}</a>
                {index + 1 < selected.length && <i className="pi pi-angle-left pr-2" />}
              </li>
            </Fragment>
          ))}
        </ul>
      </div>

      {dataView.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            filterData(item)
            setSelected(perv => [...perv, item])
          }}
          className="rtl p-float-label p-2 text-indigo-400 cursor-pointer"
        >
          {item.tagName}
        </div>
      ))}
      {closeButton}
    </div>
  )
}
