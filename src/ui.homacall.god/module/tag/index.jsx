import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toolbar } from 'primereact/toolbar'
import { UpdateTag } from './components/UpdateTag'

import TableActions from '../common/actionBody'
import { tagColumns } from './constant/tableColumn'
import ShowTag from './components/ShowTag'
import { GetAllTags } from '../../service/tagManagerService'

export const Tag = () => {
  const [tagName, setTagName] = useState('')
  const [globalFilter, setGlobalFilter] = useState(null)
  const [openShow, setOpenShow] = useState(false)
  const [id, setId] = useState(0)
  const [data, setData] = useState([])
  //Get Tags List from server with api
  useEffect(() => {
    GetAllTags().then(res => {
      if (res.data) {
        setData(res.data.map(item => ({ id: item.tag_ID, title: item.tag_Name })))
      }
    })
  }, [])

  const rightToolbarTemplate = () => {
    return (
      <>
        <Link to="/tag/new-tag">
          <Button label="ثبت تگ جدید" icon="pi pi-plus text-sm" className="p-button ml-2 text-sm rtl h-10" />
        </Link>
      </>
    )
  }

  const header = (
    <div className="table-header">
      <span className="p-input-icon-left">
        <i className="pi pi-search text-sm" />
        <InputText type="search" onInput={e => setGlobalFilter(e.target.value)} placeholder="جستجو ..." className="h-10 text-sm" />
      </span>
    </div>
  )

  const openShowTag = (valId, valName) => {
    setId(valId)
    setTagName(valName)
    setOpenShow(true)
  }

  const closeShowTag = () => {
    setOpenShow(false)
  }

  return (
    <>
      <ShowTag visible={openShow} tagId={id} onHide={closeShowTag} tagName={tagName} />
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
            {tagColumns.map((col, index) => (
              <Column field={col.field} header={col.header} sortable key={index} filterBy="#{data.name}" className={col.className}></Column>
            ))}

            <Column
              field="image"
              header="عملیات"
              body={data => (
                <>
                  <TableActions
                    deleteAction={() => {
                      alert(data.id)
                    }}
                    hasDelete={true}
                    hasUpdate={true}
                    updateAction={() => {
                      alert(tagName + ' ' + data.id)
                    }}
                    deleteLabel="حذف"
                    updateLabel="ویرایش"
                    updateView={<UpdateTag tagName={tagName} setTagName={setTagName} oldVal={data.title} />}
                    deleteButtonClassName={'p-button-outlined p-button-danger ml-2 text-xs rtl h-10 w-25 py-1 px-3'}
                    updateButtonClassName={'p-button-outlined p-button-warning ml-2 text-xs rtl h-10 w-25 py-1 px-3'}
                  />
                  <Button
                    onClick={() => openShowTag(data.id, data.title)}
                    className="p-button-outlined p-button-success text-xs rtl h-10 w-25 py-1 px-3 ml-2"
                  >
                    ترجمه
                  </Button>
                </>
              )}
            ></Column>
          </DataTable>
        </div>
      </div>
    </>
  )
}
