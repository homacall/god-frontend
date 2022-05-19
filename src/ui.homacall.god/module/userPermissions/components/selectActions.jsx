import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'
import { useEffect, useState } from 'react'
import { DeleteAllRoleUserPermission, GetAllPermissionUserActions, InsertRoleUserPermission } from '../../../service/roleUserPermissionGod'
import { ToastAlert } from '../../common/toastAlert'

export const SelectActions = ({ selectedRoute, user, onHide, parentId, buttonClass, fetchAgain, editMode = false }) => {
  const [actions, setActions] = useState([])
  const [selectedAction, setSelectedAction] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingActions, setLoadingActions] = useState(false)
  useEffect(() => {
    if (parentId || selectedRoute) {
      const formData = new FormData()
      formData.append('UsrRol_ID', user.usr_ID)
      formData.append('FormID', parentId ? parentId : selectedRoute[selectedRoute.length - 1].routStr_ID)
      setLoadingActions(true)
      GetAllPermissionUserActions(formData)
        .then(res => {
          if (res.data || res.status === 200) {
            setActions(res.data)

            const selected = []
            res.data.forEach(item => {
              if (item.action_State === true) {
                selected.push({
                  rlUsrPer_RolID_UsrID: user.usr_ID,
                  rlUsrPer_RoutStrID: item.routstructure_ID,
                  rlUsrPer_BitMrge: item.action_State,
                  rlUsrPer_ParentID: parentId ? parentId : selectedRoute[selectedRoute.length - 1].routStr_ID,
                })
              }
            })
            setSelectedAction(selected)
          }
        })
        .catch(err => console.log(err))
        .finally(() => {
          setLoadingActions(false)
        })
    }
  }, [parentId, selectedRoute])
  const submitHandler = () => {
    setLoading(true)
    const formData = new FormData()
    formData.append('UserID', user.usr_ID)
    formData.append('ParentID', parentId ? parentId : selectedRoute[selectedRoute.length - 1].routStr_ID)
    DeleteAllRoleUserPermission(formData)
      .then(res => {
        if ((res.status === 200 || res.data || res.code === 'ERR_BAD_REQUEST') && selectedAction.length > 0) {
          InsertRoleUserPermission(selectedAction)
            .then(res => {
              if (res.data || res.status === 200) {
                if (onHide) {
                  onHide()
                }
                ToastAlert.success(`${editMode ? 'ویرایش' : 'ثبت'} با موفقیت انجام شد`)
              }
            })
            .catch(err => console.log('error: ', err))
        }
      })
      .catch(err => console.log(err))
      .finally(() => {
        if (fetchAgain) {
          fetchAgain()
        }
        setLoading(false)
      })
  }
  return (
    <div className="rtl">
      {actions.length ? (
        actions.map((action, index) => (
          <div className="mt-2" key={index}>
            <Checkbox
              inputId="cb1"
              value={action.routstructure_ID}
              onChange={e => {
                if (e.checked) {
                  setSelectedAction(perv => [
                    ...perv,
                    {
                      rlUsrPer_RolID_UsrID: user.usr_ID,
                      rlUsrPer_RoutStrID: e.value,
                      rlUsrPer_BitMrge: true,
                      rlUsrPer_ParentID: parentId ? parentId : selectedRoute[selectedRoute.length - 1].routStr_ID,
                    },
                  ])
                } else {
                  const newActions = selectedAction.filter(act => act.rlUsrPer_RoutStrID !== e.value)
                  setSelectedAction(newActions)
                }
              }}
              checked={!!selectedAction.find(selected => selected.rlUsrPer_RoutStrID === action.routstructure_ID)}
            ></Checkbox>
            <label htmlFor="cb1" className="p-checkbox-label mr-5">
              {action.tag_Name}
            </label>
          </div>
        ))
      ) : loadingActions ? (
        <h5 className="mt-5 	text-center ">صبر کنید...</h5>
      ) : (
        <h5 className="mt-5 text-amber-500	text-center ">ابتدا یک اکشن برای این فرم تعریف کنید</h5>
      )}
      <Button
        className={`p-button-primary absolute bottom-[25px] min-w-[90px] justify-center left-[${'130px'}] ${buttonClass}`}
        loading={loading}
        onClick={submitHandler}
      >
        {editMode ? 'ویرایش' : 'ثبت'}
      </Button>
    </div>
  )
}
