import { Button } from 'primereact/button'
import { Link } from 'react-router-dom'
import { Toolbar } from 'primereact/toolbar'

const TableToolbar = ({ size }) => {
  const rightToolbarTemplate = () => (
    <>
      <Link to="/company/new-company">
        <Button label="ثبت جدید" icon="pi pi-plus text-sm" className="p-button ml-2 text-sm rtl h-10" />
      </Link>
    </>
  )

  return <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>
}

export default TableToolbar
