import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toolbar } from 'primereact/toolbar'

import TableActions from '../common/actionBody'
import { routeColumns } from './constant/tableColumn'
import { DeleteRouteStructure, GetAllRoutesGodByType } from '../../service/routeStretcherService'
import { routeTypes } from './constant/routeTypes'
import { Alert } from '../common/alert'
import { Dropdown } from 'primereact/dropdown'

export const RouteStretcher = () => {
  const [globalFilter, setGlobalFilter] = useState(null)
  const [routeFilter, setRouteFilter] = useState(null)
  const [allRoutes, setAllRoutes] = useState([])
  const [filteredRoutes, setFilteredRoutes] = useState([])
  const [message, setMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const navigate = useNavigate()

  const rightToolbarTemplate = () => {
    return (
      <>
        <Link to="/route-stretcher/create">
          <Button label="ثبت جدید" icon="pi pi-plus text-sm" className="p-button ml-2 text-sm rtl h-10" />
        </Link>
      </>
    )
  }

  const fetchRouteStructure = () => {
    GetAllRoutesGodByType().then(res => {
      if (res.data || res.status === 200) {
        setAllRoutes(
          res.data.map(item => {
            const type = routeTypes.find(type => type.value === item.routStr_TypeRout.toString())
            return { ...item, routStr_TypeRout: type.label }
          }),
        )
      }
    })
  }
  const deleteRoute = id => {
    const formData = new FormData()
    formData.append('ID', id)
    DeleteRouteStructure(formData)
      .then(res => {
        setShowMessage(true)
        if (res.data || res.status === 200) {
          setMessage('مسیر با موفقیت حذف شد.')
          fetchRouteStructure()
        } else {
          setMessage('خطا در حذف مسیر')
        }
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    fetchRouteStructure()
  }, [])
  const filterByType = value => {
    const route = allRoutes.find(rout => rout.value === value)
    const newData = allRoutes.includes(route.label)
    setAllRoutes(newData)
    console.log({ value, allRoutes })
  }
  const header = (
    <div className="table-header">
      <span className="p-input-icon-left">
        <i className="pi pi-search text-sm" />
        <InputText type="search" onInput={e => setGlobalFilter(e.target.value)} placeholder="جستجو ..." className="h-10 text-sm" />
      </span>
      <span className="p-input-icon-left mr-5 translate-y-1">
        <i className="pi pi-search text-sm" />
        <Dropdown
          type="search"
          options={routeTypes}
          onChange={e => {
            setRouteFilter(e.target.value)
            filterByType(e.target.value)
          }}
          value={routeFilter}
          placeholder=" جستجو مسیر ..."
          className="h-10  	"
        />
      </span>
    </div>
  )

  return (
    <div className="w-[95%] mt-4 m-auto container">
      <div className="card">
        <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>
        <Alert message={message} setMessage={setMessage} setShowMessage={setShowMessage} showMessage={showMessage} />

        <DataTable
          value={allRoutes}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          emptyMessage="رکوردی یافت نشد"
          globalFilter={globalFilter}
          header={header}
          paginatorTemplate="NextPageLink LastPageLink PageLinks FirstPageLink PrevPageLink "
          responsiveLayout="scroll"
          className="rtl"
        >
          {routeColumns.map((col, index) => (
            <Column field={col.field} header={col.header} sortable key={index} filterBy="#{data.name}" className={col.className}></Column>
          ))}

          <Column
            field="image"
            header="عملیات"
            body={data => (
              <TableActions
                deleteAction={() => {
                  deleteRoute(data.routStr_ID)
                }}
                hasDelete={true}
                hasUpdate={true}
                updateAction={() => {
                  navigate(`/route-stretcher/update/${data.routStr_ID}`)
                }}
                updateHasView={false}
                deleteLabel="حذف"
                updateLabel="ویرایش"
                deleteButtonClassName={'p-button-outlined p-button-danger ml-2 text-xs rtl h-10 w-25 p-1'}
                updateButtonClassName={'p-button-outlined p-button-warning text-xs rtl h-10 w-25 p-1'}
              />
            )}
          ></Column>
        </DataTable>
      </div>
    </div>
  )
}
