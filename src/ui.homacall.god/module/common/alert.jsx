import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'

export const Alert = ({ showMessage, setShowMessage, setMessage, message, callBack }) => {
  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="باشه"
        className="p-button-text"
        autoFocus
        onClick={() => {
          setShowMessage(false)
          setMessage('')
          if (callBack) {
            callBack()
          }
        }}
      />
    </div>
  )
  return (
    <Dialog
      visible={showMessage}
      onHide={() => setShowMessage(false)}
      position="top"
      footer={dialogFooter}
      showHeader={false}
      breakpoints={{ '960px': '80vw' }}
      style={{ width: '30vw' }}
    >
      <div className="flex align-items-center flex-column pt-6 px-3">
        {/* <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i> */}
        <h5>{message}</h5>
      </div>
    </Dialog>
  )
}
