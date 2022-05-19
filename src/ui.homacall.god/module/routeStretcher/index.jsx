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
import { routeTypes, routeTypesForSearch } from './constant/routeTypes'
import { Dropdown } from 'primereact/dropdown'
import { ToastAlert } from '../common/toastAlert'

export const RouteStretcher = () => {
  const [globalFilter, setGlobalFilter] = useState(null)
  const [routeFilter, setRouteFilter] = useState('-1')
  const [allRoutes, setAllRoutes] = useState([])
  const [filteredRoutes, setFilteredRoutes] = useState([])
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
    GetAllRoutesGodByType()
      .then(res => {
        if (res.data || res.status === 200) {
          const routes = res.data.map(item => {
            const type = routeTypes.find(type => type.value === item.routStr_TypeRout.toString())
            return { ...item, routStr_TypeRout: type.label }
          })
          setAllRoutes(routes)
          setFilteredRoutes(routes)
        }
      })
      .catch(error => console.log(error))
  }
  const deleteRoute = id => {
    const formData = new FormData()
    formData.append('ID', id)
    DeleteRouteStructure(formData)
      .then(res => {
        if (res.data || res.status === 200) {
          ToastAlert.success('مسیر با موفقیت حذف شد.')
          fetchRouteStructure()
        } else {
          ToastAlert.error('خطا در حذف مسیر')
        }
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    fetchRouteStructure()
  }, [])
  const filterByType = value => {
    if (value === '-1') {
      setFilteredRoutes(allRoutes)
      return
    }
    const route = routeTypes.find(rout => rout.value === value)
    const newData = allRoutes.filter(item => item.routStr_TypeRout.includes(route.label))
    setFilteredRoutes(newData)
  }
  const header = (
    <div className="table-header">
      <span className="p-input-icon-left">
        <i className="pi pi-search text-sm" />
        <InputText type="search" onInput={e => setGlobalFilter(e.target.value)} placeholder="جستجو ..." className="h-10 text-sm" />
      </span>
      <span className="p-input-icon-left mr-5 translate-y-1 min-w-[150px]">
        <i className="pi pi-search text-sm" />
        <Dropdown
          type="search"
          options={routeTypesForSearch}
          onChange={e => {
            setRouteFilter(e.target.value)
            filterByType(e.target.value)
          }}
          value={routeFilter}
          placeholder=" جستجو مسیر ..."
          className="h-10 w-full 	"
        />
      </span>
    </div>
  )

  return (
    <div className="w-[95%] mt-4 m-auto container">
      <div className="card">
        <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>
        <DataTable
          value={filteredRoutes}
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
