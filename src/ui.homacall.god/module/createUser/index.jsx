import { useEffect, useState } from 'react'
import { GetAllUser } from '../../service/userService'
import { UserTable } from './components/userTable'
export const UsersPage = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    GetAllUser()
      .then(res => {
        if (res.data) setData(res.data)
      })
      .catch(e => console.log(e))
  }, [])
  return <UserTable data={data} />
}
