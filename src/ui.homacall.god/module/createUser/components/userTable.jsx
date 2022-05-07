import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { UpdateUser } from './updateUser'
import TableActions from '../../common/actionBody'
import { userColumns } from '../constant/tableColumn'
export const UserTable = ({ data }) => {
  const [dataTable, setDataTable] = useState([])
  useEffect(() => {
    const newData = []
    data.forEach(item =>
      newData.push({
        ...item,
        action: (
          <TableActions
            deleteAction={() => {}}
            hasDelete={true}
            hasUpdate={true}
            updateAction={() => {
              alert('edit')
            }}
            updateView={<UpdateUser />}
            deleteButtonClassName={' p-button-danger ml-1 text-xs rtl  p-1'}
            updateButtonClassName={' p-button-warning ml-1 text-xs rtl  p-1'}
            deleteLabel="حذف"
            updateLabel="ویرایش"
            deleteIcon={false}
            updateIcon={false}
          >
            <Button
              className={item.status !== 'active' ? 'p-button-success text-xs ml-1 rtl  p-1' : ' p-button-danger ml-2 text-xs rtl  p-1'}
            >
              {item.status !== 'active' ? 'فعال' : 'غیرفعال'}
            </Button>
            <Button className="p-button-primary text-xs rtl ml-1 p-1">سطح دسترسی</Button>
            <Button className="p-button-help text-xs rtl  p-1">نقش</Button>
          </TableActions>
        ),
      }),
    )
    setDataTable(newData)
  }, [data])
  const rightToolbarTemplate = () => {
    return (
      <>
        <Link to="/users/create-user">
          <Button label="ثبت کاربر جدید" icon="pi pi-plus text-sm" className="p-button ml-2 text-sm rtl h-10" />
        </Link>
      </>
    )
  }
  return (
    <div className="w-[95%] mt-4 m-auto container">
      <div className={`card `}>
        <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>

        <DataTable
          value={dataTable}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="NextPageLink LastPageLink PageLinks FirstPageLink PrevPageLink "
          responsiveLayout="scroll"
          className="rtl"
        >
          {userColumns.map((col, index) => {
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
