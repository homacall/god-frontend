import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'

import TableActions from '../common/actionBody'
import { menuListColumns } from './constant/tableColumn'
import { ToastAlert } from '../common/toastAlert'
import { menu } from '../../utils/constants/routes/publicRoute'
import { MenuLinkService } from '../../service'

export const MenuLinks = () => {
  const [data, setData] = useState([])
  const [globalFilter, setGlobalFilter] = useState(null)
  const [fetchAgain, setFetchAgain] = useState(false)

  useEffect(() => {
    MenuLinkService.getAllGrid()
      .then(res => {
        if (res.data) {
          const newData = res.data.menuLinksGrid.map(menuLink => {
            const currentData = menuLink
            switch (menuLink.menuLink_TypeRouteID) {
              case 0:
                currentData.menuLink_TypeRouteID = 'مسیر'
                break
              case 1:
                currentData.menuLink_TypeRouteID = 'فرم'
                break
              case 2:
                currentData.menuLink_TypeRouteID = 'اکشن'
                break
              default:
                break
            }

            return currentData
          })

          setData(newData)
        }
      })
      .catch(e => console.log(e))
  }, [fetchAgain])

  const rightToolbarTemplate = () => {
    return (
      <>
        <Link to={menu.create}>
          <Button label="ثبت جدید" icon="pi pi-plus text-sm" className="p-button ml-2 text-sm rtl h-10" />
        </Link>
      </>
    )
  }

  const fetchAgainHandler = () => {
    setFetchAgain(perv => !perv)
  }

  const header = (
    <div className="table-header">
      <span className="p-input-icon-left">
        <i className="pi pi-search text-sm" />
        <InputText type="search" onInput={e => setGlobalFilter(e.target.value)} placeholder="جستجو ..." className="h-10 text-sm" />
      </span>
    </div>
  )

  const handleDelete = id => {
    const formData = new FormData()
    formData.append('LinkId', id)
    MenuLinkService.deleteLink(formData)
      .then(res => {
        if (res.data || res.status === 200) {
          ToastAlert.success('حذف لینک منو با موفقیت انجام شد')
          fetchAgainHandler()
        } else {
          ToastAlert.error('خطا در حذف لینک منو  ')
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <div className="w-[95%] mt-4 m-auto container">
        <div className="card">
          <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>
          <DataTable
            value={data}
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
            {menuListColumns.map((col, index) => {
              return (
                <Column
                  field={col.field}
                  header={col.header}
                  sortable
                  key={index}
                  filterBy="#{data.name}"
                  className={col.className}
                ></Column>
              )
            })}

            <Column
              field="image"
              header="عملیات"
              body={data => (
                <>
                  <TableActions
                    deleteAction={() => {
                      handleDelete(data.menuLink_ID)
                    }}
                    hasDelete={true}
                    hasUpdate={false}
                    deleteLabel="حذف"
                    deleteButtonClassName={'p-button-danger ml-2 text-xs rtl h-10 w-[50px] p-1'}
                  />
                </>
              )}
            ></Column>
          </DataTable>
        </div>
      </div>
    </>
  )
}
