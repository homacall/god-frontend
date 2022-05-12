import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'

const DeleteDialog = ({ visible, onHide, deleteAction, deleteLoading }) => {
  const footer = () => {
    return (
      <>
        <Button
          label="بلی"
          onClick={deleteAction}
          loading={deleteLoading}
          className="p-button-outlined  p-button-success relative right-[70%] text-xs mt-3 h-10"
        />
        <Button label="خیر" onClick={onHide} className="p-button-outlined p-button-danger right-[65%] text-xs mt-3 h-10" />
      </>
    )
  }

  return (
    <Dialog visible={visible} onHide={onHide} footer={footer}>
      <div className="w-[400px] pb-4 rounded-md m-auto container bg-white rtl">آیا مایل به حذف این سطر هستید؟</div>
    </Dialog>
  )
}
export default DeleteDialog
