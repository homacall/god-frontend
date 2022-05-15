import { Dialog } from 'primereact/dialog'
import { useEffect, useState } from 'react'
import { GetAllRole } from '../../../service/rolService'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'

export const SetRoleUserDialog = ({ visible, onHide, userId }) => {
  const [roles, setRoles] = useState([])
  const [selectedRole, setSelectedRole] = useState([])
  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button label="ثبت" className="p-button-text" autoFocus onClick={onHide} />
    </div>
  )
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
  useEffect(() => {
    fetchRole()
  }, [userId])

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      position="center"
      footer={dialogFooter}
      showHeader={false}
      breakpoints={{ '960px': '80vw' }}
      style={{ width: '30vw' }}
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
  )
}
