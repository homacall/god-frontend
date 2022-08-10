import { Button } from 'primereact/button'
import { MultiSelect } from 'primereact/multiselect'
import { useEffect, useState } from 'react'
import { RoleMemberService } from '../../../../service'
import { ToastAlert } from '../../../common/toastAlert'

export const NewRoleMemberForm = ({ onCancel, roles, currentRole, setFetchAgain, data }) => {
  const [filteredRole, setFilteredRoles] = useState(roles)
  const [selectedId, setSelectedId] = useState([])

  useEffect(() => {
    if (roles) {
      const result = roles.filter(role => role.rol_ID !== currentRole.rol_ID)

      setFilteredRoles(result)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles])

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
        optionLabel="transTagText"
        optionValue="rol_ID"
        value={selectedId}
        options={filteredRole}
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
