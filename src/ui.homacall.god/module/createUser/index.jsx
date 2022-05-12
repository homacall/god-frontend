import { useEffect, useState } from 'react'
import { GetAllUser } from '../../service/userService'
import { UserTable } from './components/userTable'
export const UsersPage = () => {
  const [data, setData] = useState([])
  // const data = [
  //   {
  //     id: 1,
  //     name: '1',
  //     lastName: '1',
  //     userIdNumber: '1',
  //     gender: '1',
  //     email: '1',
  //     registerDate: '1',
  //     username: '1',
  //     permission: '1',
  //     roll: '1',
  //     image: '1',
  //     status: 'active',
  //   },
  //   {
  //     id: 2,
  //     name: '2',
  //     lastName: '2',
  //     userIdNumber: '2',
  //     gender: '2',
  //     email: '2',
  //     registerDate: '2',
  //     username: '2',
  //     permission: '2',
  //     roll: '2',
  //     image: '2',
  //     status: 'deactivate',
  //   },
  // ]
  useEffect(() => {
    GetAllUser()
      .then(res => {
        if (res.data) setData(res.data)
      })
      .catch(e => console.log(e))
  }, [])
  return <UserTable data={data} />
}
