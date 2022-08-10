import { Button } from 'primereact/button'
import { MultiSelect } from 'primereact/multiselect'
import { useState } from 'react'
import { RoleMemberService } from '../../../../service'
import { ToastAlert } from '../../../common/toastAlert'

export const NewRoleMemberForm = ({ onCancel, roles, currentRole, setFetchAgain }) => {
  const [selectedId, setSelectedId] = useState([])

  const submitHandler = () => {
    const result = selectedId.map(id => ({ rolMbrs_RolID: currentRole.rol_ID, rolMbrs_RolMberID: id }))

    RoleMemberService.InsertRoleMember(result).then(res => {
      if (res.data || res.status === 200) {
        ToastAlert.success('زیرمجموعه جدید با موفقیت ثبت شد')
        onCancel()
        setFetchAgain(prev => !prev)
      }
    })
  }
  return (
    <div className="flex flex-col justify-center items-center gap-[32px]">
      <MultiSelect
        maxSelectedLabels={2}
        optionLabel="roleMembers_TransTagName"
        optionValue="role_ID"
        value={selectedId}
        options={roles}
        onChange={e => setSelectedId(e.value)}
        className="w-96"
      />

      <div>
        <Button
          onClick={() => {
            onCancel()
          }}
          className="p-button-text"
        >
          برگشت
        </Button>
        <Button onClick={submitHandler} disabled={selectedId.length > 0 ? false : true}>
          ثبت
        </Button>
      </div>
    </div>
  )
}
