import React, { useState } from 'react';
import { Button } from 'primereact/button';
import UpdateDialog from './updateDialog';
import DeleteDialog from './deleteDialog';



const ActionBodyTemplate = () => {
  
    const [openDeleteDialog,setOpenDeleteDialog]=useState(false)
    const [openUpdateDialog,setOpenUpdateDialog]=useState(false)

    const handleDeleteDialog = () => {
        setOpenDeleteDialog(!openDeleteDialog)
    };
    const handleUpdateDialog = () => {
        setOpenUpdateDialog(!openUpdateDialog)
    }

    return (
        <>
            <Button label="حذف"
                icon="pi pi-trash text-xs"
                className='p-button-outlined p-button-danger ml-2 text-xs rtl h-10'
                onClick={handleDeleteDialog}
            />
            <Button label="ویرایش"
                icon="pi pi-refresh text-xs"
                className='p-button-outlined p-button-warning text-xs rtl h-10'
                onClick={handleUpdateDialog}
            />
            <DeleteDialog visible={openDeleteDialog} onHide={handleDeleteDialog}/>
            <UpdateDialog visible={openUpdateDialog} onHide={handleUpdateDialog }/>
        </>
    );
}
export default ActionBodyTemplate;