import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'

const UpdateDialog = ({ visible, onHide, updateAction, UpdateView, updateHasFooter, className }) => {
  const footer = () => {
    return (
      <>
        <Button label="ثبت" onClick={updateAction} className="relative right-[80%] text-sm mt-3 h-10" />
      </>
    )
  }
  return (
    <Dialog visible={visible} onHide={onHide} footer={updateHasFooter ? footer : undefined} className={className}>
      {UpdateView}
    </Dialog>
  )
}
export default UpdateDialog
