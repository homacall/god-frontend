import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { Toolbar } from 'primereact/toolbar'
import { useCallback } from 'react'
import { useEffect, useState } from 'react'
import { DeleteAllRoleUserPermission, GetAllPermissionUserRoutePath } from '../../service/roleUserPermissionGod'
import { GetAllRoutesGodByTypeRouteTree } from '../../service/routeStretcherService'
import TableActions from '../common/actionBody'
import { ToastAlert } from '../common/toastAlert'
import { SelectActions } from './components/selectActions'
import { TreeView } from './components/treeView'
import { permissionColumns } from './constants/permissionColumns'

export const UserPermissions = ({ visible, onHide, user, role = false }) => {
  const [newPermissionDialog, setNewPermissionDialog] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState(undefined)
  const [routes, setRoutes] = useState([])
  const [dataTable, setDataTable] = useState([])
  const [fetchAgain, setFetchAgain] = useState(false)
  const [showUpdateDialog, setShowUpdateDialog] = useState(false)
  const [editParentId, setEditParentId] = useState(0)
  const handelNewPermissionDialog = () => {
    setNewPermissionDialog(perv => !perv)
  }
  const updateDialogHandler = () => {
    setShowUpdateDialog(perv => !perv)
  }
  const fetchAgainHandler = useCallback(() => {
    setFetchAgain(perv => !perv)
  }, [])
  console.log(user)
  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button label="بستن" className="p-button-text" autoFocus onClick={onHide} />
    </div>
  )
  const dialogPermissionFooter = (
    <div className="flex justify-content-center">
      <Button label="بستن" className="p-button-text" autoFocus onClick={handelNewPermissionDialog} />
    </div>
  )
  const updateDialogFooter = (
    <div className="flex justify-content-center">
      <Button label="بستن" className="p-button-text" autoFocus onClick={updateDialogHandler} />
    </div>
  )
  const deleteUserPermission = useCallback(
    parentId => {
      const formData = new FormData()
      formData.append('UserID', user.usr_ID)
      formData.append('ParentID', parentId)
      DeleteAllRoleUserPermission(formData).then(res => {
        if (res.data || res.status === 200) {
          fetchAgainHandler()
          ToastAlert.success('دسترسی ها با موفقیت حذف شد')
        } else {
          ToastAlert.error('خطا در حذف دسترسی ها')
        }
      })
    },
    [fetchAgainHandler, user?.usr_ID],
  )

  const fetchUserPermission = useCallback(() => {
    const formData = new FormData()
    formData.append('UsrRol_ID', role ? user.rol_ID : user.usr_ID)
    GetAllPermissionUserRoutePath(formData)
      .then(res => {
        if (res.data || res.status === 200) {
          const newData = []
          res.data.forEach(item => {
            newData.push({
              ...item,
              action: (
                <TableActions
                  hasDelete={true}
                  hasUpdate={false}
                  deleteButtonClassName={' p-button-danger ml-1 text-xs rtl  p-1'}
                  deleteLabel={'حذف'}
                  deleteAction={() => {
                    deleteUserPermission(item.routeStructure_ParentID)
                  }}
                  deleteIcon={false}
                >
                  <Button
                    label={'ویرایش'}
                    className={'p-button-warning ml-1 text-xs rtl  p-1'}
                    onClick={() => {
                      setEditParentId(item.routeStructure_ParentID)
                      updateDialogHandler()
                    }}
                  />
                </TableActions>
              ),
            })
          })
          setDataTable(newData)
        }
      })
      .catch(err => console.log(err))
  }, [user, deleteUserPermission])

  useEffect(() => {
    GetAllRoutesGodByTypeRouteTree()
      .then(res => {
        setRoutes(res.data)
      })
      .catch(err => console.log(err))
  }, [])
  useEffect(() => {
    if (visible) {
      fetchUserPermission()
    }
  }, [visible, fetchAgain, fetchUserPermission])
  const rightToolbarTemplate = () => {
    return (
      <>
        <Button
          onClick={handelNewPermissionDialog}
          label="ثبت دسترسی جدید"
          icon="pi pi-plus text-sm"
          className="p-button ml-2 text-sm rtl h-10"
        />
      </>
    )
  }

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      position="center"
      footer={dialogFooter}
      showHeader={false}
      breakpoints={{ '960px': '80vw' }}
      style={{ width: '50vw', borderReduce: 10 }}
    >
      <Dialog
        visible={showUpdateDialog}
        onHide={updateDialogHandler}
        position="center"
        footer={updateDialogFooter}
        className="w-[45vw] min-h-[300px]"
        showHeader={false}
        breakpoints={{ '960px': '80vw' }}
        style={{ borderReduce: 10 }}
      >
        <SelectActions
          role={role}
          editMode={true}
          user={user}
          parentId={editParentId}
          buttonClass="bottom-[25px] left-[45px]"
          onHide={updateDialogHandler}
        />
      </Dialog>
      <Toolbar className="mb-4 mt-3" right={rightToolbarTemplate}></Toolbar>
      <Dialog
        visible={newPermissionDialog}
        onHide={handelNewPermissionDialog}
        position="center"
        footer={dialogPermissionFooter}
        showHeader={false}
        breakpoints={{ '960px': '80vw' }}
        style={{ width: '60vw' }}
      >
        <TreeView
          data={routes}
          setSelectedRoute={setSelectedRoute}
          hasPermission={true}
          user={user}
          onHide={handelNewPermissionDialog}
          fetchAgain={fetchAgainHandler}
          selectedRoute={selectedRoute}
        />
      </Dialog>
      <DataTable
        value={dataTable}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="NextPageLink LastPageLink PageLinks FirstPageLink PrevPageLink "
        responsiveLayout="scroll"
        className="rtl"
        emptyMessage="رکوردی یافت نشد"
      >
        {permissionColumns.map((col, index) => {
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
    </Dialog>
  )
}
