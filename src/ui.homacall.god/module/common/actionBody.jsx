import React, { useState } from 'react'
import { Button } from 'primereact/button'
import UpdateDialog from './updateDialog'
import DeleteDialog from './deleteDialog'

const TableActions = ({
  deleteAction,
  updateAction,
  hasDelete,
  hasUpdate,
  updateView,
  deleteButtonClassName,
  updateButtonClassName,
  deleteLabel,
  updateLabel,
  deleteStyle,
  updateStyle,
  children,
  deleteIcon,
  updateIcon,
  deleteLoading,
  updateHasView = true,
}) => {
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
          label={deleteLabel}
          icon={deleteIcon && 'pi pi-trash text-xs'}
          className={`${deleteButtonClassName} `}
          onClick={() => {
            handleDeleteDialog()
          }}
          style={deleteStyle}
        />
      )}
      {hasUpdate && (
        <Button
          label={updateLabel}
          icon={updateIcon && 'pi pi-pencil text-xs'}
          className={updateButtonClassName}
          onClick={() => {
            if (updateHasView) {
              handleUpdateDialog()
            } else {
              updateAction()
            }
          }}
          style={updateStyle}
        />
      )}
      {hasDelete && (
        <DeleteDialog loading={deleteLoading} visible={openDeleteDialog} onHide={handleDeleteDialog} deleteAction={deleteAction} />
      )}
      {hasUpdate && updateHasView && (
        <UpdateDialog visible={openUpdateDialog} onHide={handleUpdateDialog} updateAction={updateAction} UpdateView={updateView} />
      )}
      {children}
    </>
  )
}
export default TableActions
