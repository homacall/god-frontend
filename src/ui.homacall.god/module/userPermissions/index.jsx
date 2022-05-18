import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { Toolbar } from 'primereact/toolbar'
import { useEffect, useState } from 'react'
import { DeleteAllRoleUserPermission, GetAllPermissionUserRoutePath } from '../../service/roleUserPermissionGod'
import { GetAllRoutesGodByTypeRouteTree } from '../../service/routeStretcherService'
import TableActions from '../common/actionBody'
import { ToastAlert } from '../common/toastAlert'
import { SelectActions } from './components/selectActions'
import { TreeView } from './components/treeView'
import { permissionColumns } from './constants/permissionColumns'

export const UserPermissions = ({ visible, onHide, user }) => {
  const [newPermissionDialog, setNewPermissionDialog] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState(undefined)
  const [closeEditDialog, setCloseEditDialog] = useState(false)
  const [routes, setRoutes] = useState([])
  const [dataTable, setDataTable] = useState([])
  const [fetchAgain, setFetchAgain] = useState(false)
  const handelNewPermissionDialog = () => {
    setNewPermissionDialog(perv => !perv)
  }
  const fetchAgainHandler = () => {
    setFetchAgain(perv => !perv)
  }
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
  const deleteUserPermission = parentId => {
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
  }
  const onHideUpdateDialogHandler = () => {
    setCloseEditDialog(true)
  }
  const fetchUserPermission = () => {
    const formData = new FormData()
    formData.append('UsrRol_ID', user.usr_ID)
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
                  hasUpdate={true}
                  deleteButtonClassName={' p-button-danger ml-1 text-xs rtl  p-1'}
                  updateButtonClassName={' p-button-warning ml-1 text-xs rtl  p-1'}
                  updateLabel="ویرایش"
                  deleteLabel={'حذف'}
                  onHideUpdateDialog={closeEditDialog}
                  deleteAction={() => {
                    deleteUserPermission(item.routeStructure_ParentID)
                  }}
                  deleteIcon={false}
                  updateIcon={false}
                  updateView={
                    <SelectActions
                      editMode={true}
                      user={user}
                      parentId={item.routeStructure_ParentID}
                      buttonClass="bottom-[25px] left-[45px]"
                      onHide={onHideUpdateDialogHandler}
                    />
                  }
                  updateHasView={true}
                  updateHasFooter={false}
                  updateDialogClassName={'w-[45vw] min-h-[300px]'}
                ></TableActions>
              ),
            })
          })
          setDataTable(newData)
        }
      })
      .catch(err => console.log(err))
  }

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
  }, [visible, fetchAgain])
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
