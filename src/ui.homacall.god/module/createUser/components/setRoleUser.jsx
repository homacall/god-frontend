import { Dialog } from 'primereact/dialog'
import { useEffect, useState } from 'react'
import { GetAllRole } from '../../../service/rolService'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { InsertUserRole } from '../../../service/userRole'
import { Alert } from '../../common/alert'

export const SetRoleUserDialog = ({ visible, onHide, userId }) => {
  const [roles, setRoles] = useState([])
  const [selectedRole, setSelectedRole] = useState([])
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')

  const fetchRole = () => {
    GetAllRole()
      .then(res => {
        if (res.data || res.status === 200) {
          setRoles(res.data)
        } else {
          console.log('error')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  const submitHandler = () => {
    const data = selectedRole.map(role => ({ usr_ID: userId, rol_ID: role.rol_ID }))
    InsertUserRole(data)
      .then(res => {
        setShowMessage(true)
        onHide()
        if (res.data || res.status === 200) {
          setMessage('تخصیص نقش با موفقیت انجام شد')
        } else {
          setMessage('خطا در تخصیص نقش به کاربر')
        }
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    fetchRole()
  }, [userId])
  const dialogFooter = (
    <div className="flex justify-center w-full">
      <div className=" text-xs	">
        <Button label="خروج " className="p-button-text p-[10px] pr-[15px] pl-[15px]" autoFocus onClick={onHide} />
      </div>
      <div className="text-xs	">
        <Button label="ثبت" className="p-button-primary p-[10px] pr-[15px] pl-[15px]" autoFocus onClick={submitHandler} />
      </div>
    </div>
  )
  return (
    <>
      <Alert message={message} setMessage={setMessage} setShowMessage={setShowMessage} showMessage={showMessage} />

      <Dialog
        visible={visible}
        onHide={onHide}
        position="center"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ '960px': '80vw' }}
        style={{ width: '20vw', minHeight: '20vh' }}
      >
        <div className=" grid-cols-2 pt-6 px-3 rtl">
          {roles.map((role, index) => (
            <div className="mt-2" key={index}>
              <Checkbox
                inputId="cb1"
                value={role.rol_ID}
                onChange={e => {
                  if (e.checked) {
                    setSelectedRole(perv => [...perv, { rol_ID: role.rol_ID, rol_Name: role.transTagText }])
                  } else {
                    const newRoles = selectedRole.filter(rol => rol.rol_ID !== role.rol_ID)
                    setSelectedRole(newRoles)
                  }
                }}
                checked={!!selectedRole.find(selected => selected.rol_ID === role.rol_ID)}
              ></Checkbox>
              <label htmlFor="cb1" className="p-checkbox-label mr-5">
                {role.transTagText}
              </label>
            </div>
          ))}
        </div>
      </Dialog>
    </>
  )
}
