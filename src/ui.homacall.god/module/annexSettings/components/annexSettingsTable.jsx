import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Toolbar } from 'primereact/toolbar'
import { annexSettingsColumns } from '../constant/tableColumn'
import { DeleteAnnex } from '../../../service/annexSettingsService'
import { ToastAlert } from '../../common/toastAlert'
import DeleteDialog from '../../common/deleteDialog'

export const AnnexSettingsTable = ({ data, fetchAgain, dataLoading }) => {
  const [deleteAnnexLoading, setDeleteAnnexLoading] = useState(false)
  const [selectedId, setSelectedId] = useState(0)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const navigate = useNavigate()

  const rightToolbarTemplate = () => {
    return (
      <>
        <Link to="/annexSettings/create">
          <Button label="ثبت بایگانی جدید" icon="pi pi-plus text-sm" className="p-button ml-2 text-sm rtl h-10" />
        </Link>
      </>
    )
  }

  const handleDeleteAnnexSetting = deleteId => {
    DeleteAnnex(deleteId)
      .then(res => {
        if (res && res.data && res.data.message === 'Sucess') {
          ToastAlert.success('بایگانی با موفقیت حذف گردید.')
          fetchAgain()
        } else {
          ToastAlert.error('خطا در حذف بایگانی')
        }
      })
      .catch(() => ToastAlert.error('خطا در ارتباط با سرور'))
      .finally(() => {
        setDeleteAnnexLoading(false)
      })
  }

  const handleDeleteAnnex = () => {
    setDeleteAnnexLoading(true)
    const formData = new FormData()
    formData.append('AnexSetingID', selectedId)
    handleDeleteAnnexSetting(formData)
  }

  const handleDeleteDialog = () => {
    setOpenDeleteDialog(prev => !prev)
  }

  return (
    <>
      <div className="w-[95%] mt-4 m-auto container">
        <div className={`card `}>
          <DeleteDialog
            loading={deleteAnnexLoading}
            visible={openDeleteDialog}
            onHide={handleDeleteDialog}
            deleteAction={handleDeleteAnnex}
          />
          <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>
          <DataTable
            loading={dataLoading}
            value={data}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="NextPageLink LastPageLink PageLinks FirstPageLink PrevPageLink "
            responsiveLayout="scroll"
            className="rtl"
            emptyMessage="رکوردی یافت نشد"
          >
            {annexSettingsColumns.map((col, index) => {
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

            <Column
              field="action"
              header="عملیات"
              body={data => (
                <>
                  <Button
                    className="p-button-danger text-xs rtl h-10 w-25 py-1 px-3 ml-2"
                    onClick={() => {
                      setSelectedId(data.anxSeting_ID)
                      handleDeleteDialog()
                    }}
                  >
                    حذف
                  </Button>
                  <Button
                    className="p-button-warning text-xs rtl h-10 w-25 py-1 px-3 ml-2"
                    onClick={() => {
                      navigate(`/annexSettings/edit/${data.anxSeting_ID}`)
                    }}
                  >
                    ویرایش
                  </Button>
                </>
              )}
              style={{ width: '25%' }}
            ></Column>
          </DataTable>
        </div>
      </div>
    </>
  )
}
