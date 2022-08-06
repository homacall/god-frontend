import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { useState } from 'react'
import { RoleMemberService } from '../../../../service'
import { ToastAlert } from '../../../common/toastAlert'

export const NewRoleMemberForm = ({ onCancel, roles, currentRole }) => {
  const [roleId, setRoleId] = useState('')
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
      }
    })
  }
  return (
    <div className="flex flex-col justify-center items-center gap-[32px]">
      <Dropdown
        options={roles}
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
