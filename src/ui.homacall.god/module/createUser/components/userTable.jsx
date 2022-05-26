import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Image } from 'primereact/image'
import { Dialog } from 'primereact/dialog'

import { userColumns } from '../constant/tableColumn'
import TableActions from '../../common/actionBody'
import { ChangeUserStatus } from '../../../service/userService'
import { UserPermissions } from '../../userPermissions'
import { SetRoleUserDialog } from './setRoleUser'
import moment from 'moment-jalaali'

export const UserTable = ({ data, fetchAgain }) => {
  const [dataTable, setDataTable] = useState([])
  const [showMessage, setShowMessage] = useState(false)
  const [showPermissions, setShowPermissions] = useState(false)
  const [userInfoForPermission, setUserInfoForPermission] = useState(undefined)
  const [userIdForRole, setUserIdForRole] = useState(0)
  const [showRoleDialog, setRoleDialog] = useState(false)
  const [activeDialog, setActiveDialog] = useState(false)
  const [userIsActive, setUserIsActive] = useState(false)

  const navigate = useNavigate()

  const permissionDialogHandler = () => {
    setShowPermissions(perv => !perv)
  }
  const roleDialogHandler = () => {
    setRoleDialog(perv => !perv)
  }
  const activeDialogHandler = () => {
    setActiveDialog(perv => !perv)
  }
  useEffect(() => {
    const newData = []
    data.forEach(item =>
      newData.push({
        ...item,
        usr_Gender: item.usr_Gender === 1 ? 'مرد' : item.usr_Gender === 0 ? 'زن' : 'سایر',
        usr_Img: (
          <Image
            src={item.usr_Img === 'no-image' ? '/assets/img/user.png' : item.usr_Img}
            template="نمایش"
            alt="user image"
            width={50}
            height={50}
            preview={true}
            className="w-[50px] h-[50px] rounded-full"
          />
        ),
        usr_DateReg: moment(item.usr_DateReg).format('jYYYY/jMM/jDD'),
        action: (
          <TableActions
            hasDelete={false}
            hasUpdate={true}
            updateAction={() => {
              navigate(`/users/update/${item.usr_ID}`)
            }}
            deleteButtonClassName={' p-button-danger ml-1 text-xs rtl  p-1'}
            updateButtonClassName={' p-button-warning ml-1 text-xs rtl  p-1'}
            updateLabel="ویرایش"
            updateIcon={false}
            updateHasView={false}
          >
            <Button
              onClick={() => {
                setUserIsActive({ status: item.usr_IsA, userId: item.usr_ID, username: item.usr_UName })
                activeDialogHandler()
              }}
              className={!item.usr_IsA ? 'p-button-success text-xs ml-1 rtl  p-1 mt-1' : ' p-button-danger ml-2 text-xs rtl  p-1 mt-1'}
            >
              {item.usr_IsA ? 'غیرفعال' : 'فعال'}
            </Button>
            {item.usr_IsA && (
              <Button
                className="p-button-primary text-xs rtl ml-1 p-1 mt-1"
                onClick={() => {
                  setUserInfoForPermission(item)
                  setShowPermissions(perv => !perv)
                }}
              >
                سطح دسترسی
              </Button>
            )}
            {item.usr_IsA && (
              <Button
                className="p-button-help text-xs rtl  p-1 mt-1"
                onClick={() => {
                  setUserIdForRole(item.usr_ID)
                  roleDialogHandler()
                }}
              >
                نقش
              </Button>
            )}
          </TableActions>
        ),
        usr_IsA: item.usr_IsA ? 'فعال' : 'غیرفعال',
      }),
    )
    setDataTable(newData)
  }, [data, navigate])
  const rightToolbarTemplate = () => {
    return (
      <>
        <Link to="/users/create-user">
          <Button label="ثبت کاربر جدید" icon="pi pi-plus text-sm" className="p-button ml-2 text-sm rtl h-10" />
        </Link>
      </>
    )
  }
  const changeUserStatus = () => {
    const formData = new FormData()
    formData.append('ID', userIsActive.userId)
    formData.append('IsActive', !userIsActive.status)
    ChangeUserStatus(formData).then(res => {
      if (res.data || res.status === 200) {
        fetchAgain()
        setUserIsActive({ status: false, username: '', userId: 0 })
        activeDialogHandler()
        setShowMessage(true)
      }
    })
  }
  const dialogFooterActive = (
    <div className="block w-full">
      <Button label="خیر" onClick={activeDialogHandler} className="p-button-outlined p-button-danger  text-xs mt-3 h-10" />
      <Button
        label="بلی"
        onClick={() => {
          changeUserStatus()
        }}
        className="p-button-outlined  p-button-success relative  text-xs mt-3 h-10"
      />
    </div>
  )
  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="باشه"
        className="p-button-text"
        autoFocus
        onClick={() => {
          setShowMessage(false)
        }}
      />
    </div>
  )
  return (
    <div className="w-[95%] mt-4 m-auto container">
      <div className={`card `}>
        <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>
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
            <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
            <h5>{`تغییر وضعیت کاربر با موفقیت انجام شد.`}</h5>
          </div>
        </Dialog>
        <Dialog
          visible={activeDialog}
          onHide={activeDialogHandler}
          position="center"
          footer={dialogFooterActive}
          showHeader={false}
          breakpoints={{ '960px': '80vw' }}
          style={{ width: '30vw' }}
        >
          <div className=" pb-4 rounded-md m-auto container bg-white rtl mt-4">
            <h5>
              {` آیا میخواهید کاربر ${userIsActive.username} را `}
              <span className={`${userIsActive.status ? 'text-red-500' : 'text-green-500	'}`}>{`${
                userIsActive.status ? ' غیرفعال ' : ' فعال '
              }`}</span>
              کنید
            </h5>
          </div>
        </Dialog>
        <SetRoleUserDialog onHide={roleDialogHandler} visible={showRoleDialog} userId={userIdForRole} />
        <UserPermissions visible={showPermissions} onHide={permissionDialogHandler} user={userInfoForPermission} />
        <DataTable
          value={dataTable}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="NextPageLink LastPageLink PageLinks FirstPageLink PrevPageLink "
          responsiveLayout="scroll"
          className="rtl"
          emptyMessage="رکوردی یافت نشد"
        >
          {userColumns.map((col, index) => {
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
        </DataTable>
      </div>
    </div>
  )
}
