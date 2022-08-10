import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toolbar } from 'primereact/toolbar'
import { useCallback } from 'react'
import { useState, useEffect } from 'react'
import { RoleMemberService } from '../../../../service'
import TableActions from '../../../common/actionBody'
import { ToastAlert } from '../../../common/toastAlert'
import { roleMemberColumn } from '../../constant/tableColumn'
import { NewRoleMemberForm } from './components'

export const RoleMember = ({ visible, onHide, currentRole, roles }) => {
  const [globalFilter, setGlobalFilter] = useState(null)
  const [data, setData] = useState([])
  const [newRoleMember, setNewRoleMember] = useState(false)

  const header = (
    <div className="table-header">
      <span className="p-input-icon-left">
        <i className="pi pi-search text-sm" />
        <InputText type="search" onInput={e => setGlobalFilter(e.target.value)} placeholder="جستجو ..." className="h-10 text-sm" />
      </span>
    </div>
  )
  const newRoleMemberHandler = () => {
    setNewRoleMember(perv => !perv)
  }
  const rightToolbarTemplate = () => {
    return (
      <>
        <Button
          label="ثبت زیرمجموعه جدید"
          icon="pi pi-plus text-sm"
          className="p-button ml-2 text-sm rtl h-10"
          onClick={newRoleMemberHandler}
        />
      </>
    )
  }
  const fetchData = useCallback(() => {
    if (!currentRole?.rol_ID) return
    const formData = new FormData()
    formData.append('ID', currentRole.rol_ID)
    RoleMemberService.getById(formData)
      .then(res => {
        if (res.data.role && res.status === 200 && res.data.message !== 'Null') {
          setData(res.data.role)
        }
      })
      .catch(err => {
        console.log(err)
        ToastAlert.error('خطا در ارتباط با سرور')
      })
  }, [currentRole?.rol_ID])
  const currentRoleHeader = <div className="text-[14px] text-center "> {currentRole?.transTagText}</div>
  useEffect(() => {
    fetchData()
  }, [currentRole, fetchData])
  return (
    <Dialog
      visible={visible}
      onHide={() => {
        onHide()
        setNewRoleMember(false)
      }}
      header={currentRoleHeader}
      footer={null}
      className="w-[60vw]"
    >
      {newRoleMember ? (
        <NewRoleMemberForm onCancel={newRoleMemberHandler} roles={roles} currentRole={currentRole} />
      ) : (
        <>
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
            {roleMemberColumn.map((col, index) => (
              <Column field={col.field} header={col.header} sortable key={index} filterBy="#{data.name}" className={col.className}></Column>
            ))}

            <Column
              field="action"
              header="عملیات"
              body={data => (
                <TableActions
                  deleteAction={() => {}}
                  hasDelete={true}
                  hasUpdate={true}
                  updateAction={() => {}}
                  deleteLabel="حذف"
                  updateLabel="ویرایش"
                  updateView={<></>}
                  deleteButtonClassName={'p-button-danger ml-2 text-xs rtl h-10 w-25 p-1'}
                  updateButtonClassName={'p-button-warning text-xs rtl h-10 w-25 p-1'}
                ></TableActions>
              )}
            ></Column>
          </DataTable>
        </>
      )}
    </Dialog>
  )
}
