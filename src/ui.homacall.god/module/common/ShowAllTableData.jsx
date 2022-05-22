import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import Breadcrumb from '../../component/breadcrumb/breadcrumb'

function ShowAllTableData({
  visible,
  onHide,
  data,
  hasBreadCamp,
  breadCamp,
  buttonCallBack,
  headerTitle,
  hasButton,
  buttonClasses,
  buttonTitle,
}) {
  const renderData = statistics => {
    return Object.entries(statistics).map(([key, val]) => (
      <section key={key} className="mb-4 py-2">
        <div className="py-1 px-1">{key} : </div>
        <div className="py-3 px-1 border-2">{val}</div>
      </section>
    ))
  }

  const header = (
    <>
      <div className="table-header">
        <p className="p-input-icon-left">
          <span className="text-base">{headerTitle}</span>
        </p>
      </div>
    </>
  )

  const footer = () => {
    return (
      <>
        {hasButton ? (
          <div className="text-left">
            <Button label={buttonTitle} onClick={buttonCallBack} className={buttonClasses} />
          </div>
        ) : null}
      </>
    )
  }

  return (
    <>
      {/* <div className="w-[80%] my-4 pb-4 rounded-md  m-auto container bg-white"> */}
      <Dialog
        visible={visible}
        onHide={onHide}
        header={header}
        footer={footer}
        position="top"
        breakpoints={{ '960px': '80vw' }}
        style={{ width: '50vw', direction: 'rtl' }}
      >
        {hasBreadCamp ? <Breadcrumb item={breadCamp} /> : null}
        <section>{data ? renderData(data) : null}</section>
      </Dialog>
      {/* </div> */}
    </>
  )
}

export default ShowAllTableData
