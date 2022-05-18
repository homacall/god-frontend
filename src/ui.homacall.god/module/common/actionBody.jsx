import React, { useEffect, useState } from 'react'
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
  updateHasFooter = true,
  updateDialogClassName,
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
          className={`${deleteButtonClassName} mt-1`}
          onClick={() => {
            handleDeleteDialog()
          }}
          style={deleteStyle}
        />
      )}
      {hasUpdate && (
        <Button
          label={updateLabel}
          icon={updateIcon && 'pi pi-pencil text-xs mt-1'}
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
        <UpdateDialog
          visible={openUpdateDialog}
          onHide={handleUpdateDialog}
          updateAction={() => {
            updateAction()
            handleUpdateDialog()
          }}
          UpdateView={updateView}
          updateHasFooter={updateHasFooter}
          className={updateDialogClassName}
        />
      )}
      {children}
    </>
  )
}
export default TableActions
