import React, { useState } from 'react'
import { Button } from 'primereact/button'
import UpdateDialog from './updateDialog'
import DeleteDialog from './deleteDialog'

const TableActions = ({ deleteAction, updateAction, hasDelete, hasUpdate, updateView, deleteButtonClassName, updateButtonClassName }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false)

  const handleDeleteDialog = () => {
    setOpenDeleteDialog(!openDeleteDialog)
  }
  const handleUpdateDialog = () => {
    setOpenUpdateDialog(!openUpdateDialog)
  }

  return (
    <>
      {hasDelete && (
        <Button
          label="حذف"
          icon="pi pi-trash text-xs"
          className={`${deleteButtonClassName} `}
          onClick={() => {
            handleDeleteDialog()
          }}
        />
      )}
      {hasUpdate && (
        <Button
          label="ویرایش"
          icon="pi pi-pencil text-xs"
          className={updateButtonClassName}
          onClick={() => {
            handleUpdateDialog()
          }}
        />
      )}
      {hasDelete && <DeleteDialog visible={openDeleteDialog} onHide={handleDeleteDialog} deleteAction={deleteAction} />}
      {hasUpdate && (
        <UpdateDialog visible={openUpdateDialog} onHide={handleUpdateDialog} updateAction={updateAction} UpdateView={updateView} />
      )}
    </>
  )
}
export default TableActions
