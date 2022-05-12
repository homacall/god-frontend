import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { InputText } from 'primereact/inputtext'
import TableActions from '../../common/actionBody'
import UpdateDialog from './updateLanguage'
import { languageColumns } from '../constant/tableColumn'
import { DeleteLanguage } from '../../../service/languageService'
import { Dialog } from 'primereact/dialog'

const Language = ({ data }) => {
  const [globalFilter, setGlobalFilter] = useState(null)
  const [dataTable, setDataTable] = useState([])
  const [editProps, setEditProps] = useState({ lang_Name: '', lang_Rtl: false })
  const [showUpdateDialog, setShowUpdateDialog] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const deleteRow = async id => {
    const formData = new FormData()
    formData.append('ID', id)
    try {
      const { data, status } = await DeleteLanguage(formData)
      if (status === 200 || data) {
        console.log(data)
        setMessage('زبان مورد نظر با موفقیت حذف شد')
      } else {
        setMessage('خطا در حذف زبان مورد نظر !!')
      }
      setMessage('خطا در حذف زبان مورد نظر !!')
      setShowMessage(true)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const newData = []
    data.forEach(item =>
      newData.push({
        ...item,
        lang_Rtl: item.lang_Rtl === true ? 'راست به چپ' : 'چپ به راست',
        action: (
          <TableActions
            deleteAction={() => {
              deleteRow(item.id)
            }}
            hasDelete={true}
            hasUpdate={false}
            deleteButtonClassName={' p-button-danger ml-1 text-xs rtl  p-2'}
            deleteLabel="حذف"
            deleteIcon={false}
          >
            <Button
              className=" p-button-warning ml-1 text-xs rtl p-2"
              label="ویرایش"
              onClick={() => {
                setEditProps({ ...item })
                setShowUpdateDialog(!showUpdateDialog)
              }}
            />
          </TableActions>
        ),
      }),
    )
    setDataTable(newData)
  }, [data])

  const rightToolbarTemplate = () => {
    return (
      <>
        <Link to="/language/new-form">
          <Button label="ثبت زبان جدید" icon="pi pi-plus text-sm" className="p-button ml-2 text-sm rtl h-10" />
        </Link>
      </>
    )
  }

  const header = (
    <div className="table-header">
      <span className="p-input-icon-left">
        <i className="pi pi-search text-sm" />
        <InputText type="search" onInput={e => setGlobalFilter(e.target.value)} placeholder="جستوجو ..." className="h-10 text-sm" />
      </span>
    </div>
  )
  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="باشه"
        className="p-button-text"
        autoFocus
        onClick={() => {
          setShowMessage(false)
          setMessage('')
        }}
      />
    </div>
  )

  return (
    <div className="w-[95%] mt-4 m-auto container">
      <UpdateDialog showUpdateDialog={showUpdateDialog} setShowUpdateDialog={setShowUpdateDialog} {...editProps} />
      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ '960px': '80vw' }}
        style={{ width: '30vw' }}
      >
        <div className="flex align-items-center flex-column pt-6 px-3">
          {/* <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i> */}
          <h5>{message}</h5>
        </div>
      </Dialog>{' '}
      <div className="card">
        <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>

        <DataTable
          value={dataTable}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="NextPageLink LastPageLink PageLinks FirstPageLink PrevPageLink "
          globalFilter={globalFilter}
          header={header}
          responsiveLayout="scroll"
          className="rtl"
        >
          {languageColumns.map((col, index) => {
            return (
              <Column
                key={index}
                field={col.field}
                header={col.header}
                sortable
                className={` pb-2 ${col.className} ${col.field === 'action' ? 'w-[25%]' : ''}`}
                style={{ padding: '10px' }}
              ></Column>
            )
          })}
        </DataTable>
      </div>
    </div>
  )
}

export default Language
