import { useEffect, useState } from 'react'
import { GetAllUserSP } from '../../service/userService'
import { UserTable } from './components/userTable'

export const UsersPage = () => {
  const [data, setData] = useState([])
  const [fetchAgain, setFetchAgain] = useState(false)

  const fetchAgainHandler = () => {
    setFetchAgain(perv => !perv)
  }
  useEffect(() => {
    GetAllUserSP()
      .then(res => {
        if (res.data) setData(res.data.user)
      })
      .catch(e => console.log(e))
  }, [fetchAgain])

  return (
    <>
      <UserTable data={data} fetchAgain={fetchAgainHandler} />
    </>
  )
}
