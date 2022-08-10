import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { useEffect, useState } from 'react'
import { RoleMemberService } from '../../../../service'
import { ToastAlert } from '../../../common/toastAlert'

export const NewRoleMemberForm = ({ onCancel, roles, currentRole, setFetchAgain }) => {
  const [roleId, setRoleId] = useState('')
  const [filteredRole, setFilteredRoles] = useState(roles)

  useEffect(() => {
    if (roles) {
      const result = roles.filter(role => role.rol_ID !== currentRole.rol_ID)
      setFilteredRoles(result)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles])

  const submitHandler = () => {
    if (!roleId || roleId === '') return ToastAlert.error('انتخاب زیرمجموعه اجباریست')
    const formData = new FormData()
    formData.append('RolMbrs_RolID', currentRole.rol_ID)
    formData.append('RolMbrs_RolMberID', roleId)
    RoleMemberService.InsertRoleMember(formData).then(res => {
      if (res.data || res.status === 200) {
        ToastAlert.success('زیرمجموعه جدید با موفقیت ثبت شد')
        setRoleId('')
        onCancel()
        setFetchAgain(prev => !prev)
      }
    })
  }
  return (
    <div className="flex flex-col justify-center items-center gap-[32px]">
      <Dropdown
        options={filteredRole}
        name="role_Member_Name"
        optionLabel="transTagText"
        optionValue="rol_ID"
        value={roleId}
        onChange={e => setRoleId(e.target.value)}
        placeholder="انتخاب زیر مجموعه"
        className="rtl w-[80vw] sm:w-[50vw] md:w-[30vw] h-9  mx-auto"
      />
      <div>
        <Button
          onClick={() => {
            onCancel()
            setRoleId('')
          }}
          className="p-button-text"
        >
          برگشت
        </Button>
        <Button onClick={submitHandler} disabled={!roleId}>
          ثبت
        </Button>
      </div>
    </div>
  )
}
