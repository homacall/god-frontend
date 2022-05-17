import { Checkbox } from 'primereact/checkbox'
import { useEffect, useState } from 'react'
import { GetAllByParentTypeRouteStructure } from '../../../service/routeStretcherService'

export const SelectActions = ({ selectedRoute }) => {
  const [actions, setActions] = useState([])
  const [selectedAction, setSelectedAction] = useState([])
  useEffect(() => {
    const formData = new FormData()
    formData.append('ParntID', selectedRoute[selectedRoute.length - 1].routStr_ID)
    formData.append('TypRotID', 2)
    GetAllByParentTypeRouteStructure(formData)
      .then(res => {
        if (res.data || res.status === 200) {
          setActions(res.data)
        }
      })
      .catch(err => console.log(err))
  }, [])
  return (
    // "routStr_ID": 12,
    // "routStr_PID": 10,
    // "routStr_Tag_ID": 7,
    // "routStr_Tag_Name": "Add",
    // "routStr_Trans_Tag_Name": "افزودن",
    // "routStr_TypeRout": 2
    <div>
      {actions.map((action, index) => (
        <div className="mt-2" key={index}>
          <Checkbox
            inputId="cb1"
            value={action.routStr_ID}
            onChange={e => {
              if (e.checked) {
                setSelectedAction(perv => [
                  ...perv,
                  { routStr_ID: action.routStr_ID, routStr_Trans_Tag_Name: action.routStr_Trans_Tag_Name },
                ])
              } else {
                const newRoles = selectedAction.filter(rol => rol.routStr_ID !== action.routStr_ID)
                setSelectedAction(newRoles)
              }
            }}
            checked={!!selectedAction.find(selected => selected.routStr_ID === action.routStr_ID)}
          ></Checkbox>
          <label htmlFor="cb1" className="p-checkbox-label mr-5">
            {action.routStr_Trans_Tag_Name}
          </label>
        </div>
      ))}
    </div>
  )
}
