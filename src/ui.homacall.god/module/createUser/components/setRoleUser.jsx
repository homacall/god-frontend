import { Dialog } from 'primereact/dialog'
import { useCallback, useEffect, useState } from 'react'
import { GetAllRole } from '../../../service/rolService'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { DeleteAllUserRole, InsertUserRole } from '../../../service/userRole'
import { GetRoleByUserId } from '../../../service/userService'
import { ToastAlert } from '../../common/toastAlert'

export const SetRoleUserDialog = ({ visible, onHide, userId }) => {
  const [roles, setRoles] = useState([])
  const [selectedRole, setSelectedRole] = useState([])
  const [hasRole, setHasRole] = useState(false)
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
  const fetchRoleByUserId = useCallback(() => {
    const formData = new FormData()
    formData.append('UserID', userId)
    GetRoleByUserId(formData).then(res => {
      if (res.data || res.status === 200) {
        if (res.data.length) {
          setHasRole(true)
        } else {
          setHasRole(false)
        }
        setSelectedRole(res.data.map(item => ({ rol_ID: item.rol_ID, rol_Name: item.transTagText })))
      }
    })
  }, [userId])
  const submitHandler = () => {
    const data = selectedRole.map(role => ({ usr_ID: userId, rol_ID: role.rol_ID }))
    const formData = new FormData()
    formData.append('UserID', userId)
    if (hasRole) {
      DeleteAllUserRole(formData)
        .then(res => {
          if ((res.data || res.status === 200) && selectedRole.length) {
            InsertUserRole(data)
              .then(res => {
                onHide()
                if (res.data || res.status === 200) {
                  ToastAlert.success('تخصیص نقش با موفقیت انجام شد')
                } else {
                  ToastAlert.error('خطا در تخصیص نقش به کاربر')
                }
              })
              .catch(err => console.log(err))
          }
        })
        .catch(err => console.log(err))
    } else {
      InsertUserRole(data)
        .then(res => {
          onHide()
          if (res.data || res.status === 200) {
            ToastAlert.success('تخصیص نقش با موفقیت انجام شد')
          } else {
            ToastAlert.error('خطا در تخصیص نقش به کاربر')
          }
        })
        .catch(err => console.log(err))
    }
  }
  useEffect(() => {
    if (userId !== 0) {
      fetchRoleByUserId()
    }
  }, [userId, fetchRoleByUserId])
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
