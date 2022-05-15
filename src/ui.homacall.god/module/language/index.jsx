import { useEffect, useState } from 'react'
import { GetAllLanguage } from '../../service/languageService'
import Language from './component/language'

export const LanguagePage = () => {
  const [data, setData] = useState([])
  const [fetchAgain, setFetchAgain] = useState(false)
  const fetchHandler = () => {
    setFetchAgain(perv => !perv)
  }
  useEffect(() => {
    GetAllLanguage()
      .then(res => {
        if (res.data) setData(res.data)
      })
      .catch(e => console.log(e))
  }, [fetchAgain])

  return <Language data={data} fetchAgain={fetchHandler} />
}
