import { useEffect, useState } from 'react'
import { GetAllUser } from '../../service/userService'
import { UserTable } from './components/userTable'
export const UsersPage = () => {
  const [data, setData] = useState([])
  const [fetchAgain, setFetchAgain] = useState(false)
  const fetchAgainHandler = () => {
    setFetchAgain(perv => !perv)
  }
  useEffect(() => {
    GetAllUser()
      .then(res => {
        if (res.data) setData(res.data)
      })
      .catch(e => console.log(e))
  }, [fetchAgain])
  return <UserTable data={data} fetchAgain={fetchAgainHandler} />
}
