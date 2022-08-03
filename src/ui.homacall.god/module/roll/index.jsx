import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toolbar } from 'primereact/toolbar'
import { UpdateRoll } from './components/updateRoll'
import { InputSwitch } from 'primereact/inputswitch'

import TableActions from '../common/actionBody'
import { roleColumn } from './constant/tableColumn'
import { DeleteRole, GetAllRole, UpdateRole } from '../../service/rolService'
import { rolls } from '../../utils/constants/routes/publicRoute'
import { ToastAlert } from '../common/toastAlert'
import { UserPermissions } from '../userPermissions'
import { RoleMember } from './module'

export const Roll = () => {
  const [globalFilter, setGlobalFilter] = useState(null)
  const [dataL, setDataL] = useState([])
  const [fetchAgain, setFetchAgain] = useState(false)
  const [showPermissions, setShowPermissions] = useState(false)
  const [userInfoForPermission, setUserInfoForPermission] = useState(undefined)
  const [showRoleMember, setShowRoleMember] = useState(false)
  const [currentRole, setCurrentRole] = useState()

  const fetchAgainHandler = () => {
    setFetchAgain(perv => !perv)
  }
  const roleMemberHandler = () => {
    setShowRoleMember(perv => !perv)
  }
  useEffect(() => {
    GetAllRole().then(res => {
      if (res.data || res.status === 200) {
        setDataL(res.data.roles)
      }
    })
  }, [fetchAgain])
  const rightToolbarTemplate = () => {
    return (
      <>
        <Link to={rolls.newRoll}>
          <Button label="ثبت نقش جدید" icon="pi pi-plus text-sm" className="p-button ml-2 text-sm rtl h-10" />
        </Link>
      </>
    )
  }
  const deleteRole = id => {
    const formData = new FormData()
    formData.append('ID', id)
    DeleteRole(formData)
      .then(res => {
        if (res.data || res.status === 200) {
          ToastAlert.success('حذف نقش با موفقیت انجام شد')
          fetchAgainHandler()
        } else {
          ToastAlert.error('خطا در حذف نقش ')
        }
      })
      .catch(err => console.log(err))
  }

  const updateRole = (rolId, rol_TagID, isUserSysRole) => {
    const formData = new FormData()
    formData.append('Rol_ID', rolId)
    formData.append('Rol_TgID', rol_TagID)
    formData.append('Rol_IsSysRol ', isUserSysRole)
    UpdateRole(formData)
      .then(res => {
        if (res.data || res.status === 200) {
          ToastAlert.success('ویرایش نقش با موفقیت انجام شد')
          fetchAgainHandler()
        } else {
          ToastAlert.error('خطا در ویرایش نقش ')
        }
      })
      .catch(err => console.log(err))
  }
  const permissionDialogHandler = () => {
    setShowPermissions(perv => !perv)
  }
  const header = (
    <div className="table-header">
      <span className="p-input-icon-left">
        <i className="pi pi-search text-sm" />
        <InputText type="search" onInput={e => setGlobalFilter(e.target.value)} placeholder="جستجو ..." className="h-10 text-sm" />
      </span>
    </div>
  )

  return (
    <div className="w-[95%] mt-4 m-auto container">
      <div className="card">
        <RoleMember onHide={roleMemberHandler} visible={showRoleMember} currentRole={currentRole} roles={dataL} />
        <Toolbar className="mb-4" right={rightToolbarTemplate} />

        <DataTable
          value={dataL}
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
          {roleColumn.map((col, index) => {
            if (col.field === 'role_IsSystemRole') {
              return (
                <Column
                  field={col.field}
                  header={col.header}
                  sortable
                  key={index}
                  body={data => (
                    <InputSwitch
                      checked={data.role_IsSystemRole}
                      onChange={e => {
                        updateRole(data.rol_ID, data.rol_TagID, e.value ? 1 : 0)
                      }}
                    />
                  )}
                  style={{ width: '10%' }}
                  filterBy="#{data.name}"
                  className={col.className}
                ></Column>
              )
            } else
              return (
                <Column
                  field={col.field}
                  header={col.header}
                  sortable
                  key={index}
                  filterBy="#{data.name}"
                  className={col.className}
                  style={{ width: '70%' }}
                ></Column>
              )
          })}

          <Column
            field="action"
            header="عملیات"
            body={data => (
              <TableActions
                deleteAction={() => {
                  deleteRole(data.rol_ID)
                }}
                hasDelete={true}
                hasUpdate={false}
                // updateAction={() => {
                //   updateRole(data.rol_ID, rollName)
                // }}
                deleteLabel="حذف"
                // updateLabel="ویرایش"
                // updateView={<UpdateRoll rollName={rollName} setRollName={setRollName} oldVal={data} />}
                deleteButtonClassName={'p-button-danger ml-2 text-xs rtl h-10 w-25 p-1'}
                updateButtonClassName={'p-button-warning text-xs rtl h-10 w-25 p-1'}
              >
                <Button
                  className="p-button-primary text-xs rtl ml-1 p-1 mt-1 mr-2 h-10"
                  onClick={() => {
                    setUserInfoForPermission(data)
                    setShowPermissions(perv => !perv)
                  }}
                >
                  سطح دسترسی
                </Button>
                <Button
                  className="p-button-help text-xs rtl ml-1 p-1 mt-1 mr-2 h-10"
                  onClick={() => {
                    roleMemberHandler()
                    setCurrentRole(data)
                  }}
                >
                  زیرمجموعه
                </Button>
              </TableActions>
            )}
            style={{ width: '20%' }}
          ></Column>
        </DataTable>
        <UserPermissions visible={showPermissions} onHide={permissionDialogHandler} user={userInfoForPermission} role={true} />
      </div>
    </div>
  )
}
