import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { Toolbar } from 'primereact/toolbar'
import { useState } from 'react'
import { TreeView } from './components/treeView'
import { permissionColumns } from './constants/permissionColumns'

export const UserPermissions = ({ visible, onHide, user }) => {
  const [newPermissionDialog, setNewPermissionDialog] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState(undefined)
  const handelNewPermissionDialog = () => {
    setNewPermissionDialog(perv => !perv)
  }
  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button label="باشه" className="p-button-text" autoFocus onClick={onHide} />
    </div>
  )
  const dialogPermissionFooter = (
    <div className="flex justify-content-center">
      <Button label="باشه" className="p-button-text" autoFocus onClick={handelNewPermissionDialog} />
    </div>
  )

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
        <TreeView data={[]} setSelectedRoute={setSelectedRoute} />
      </Dialog>
      <DataTable
        value={[]}
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
