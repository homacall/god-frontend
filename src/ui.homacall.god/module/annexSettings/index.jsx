import { useEffect, useState } from 'react'
import { AnnexSettingsTable } from './components/annexSettingsTable'
import { getAllAnnex } from '../../service/annexSettingsService'

export const AnnexSettings = () => {
  const [data, setData] = useState([])
  const [fetchAgain, setFetchAgain] = useState(false)
  const [dataLoading, setDataLoading] = useState(true)

  const fetchAgainHandler = () => {
    setFetchAgain(perv => !perv)
  }

  const fetchAllAnnexSettings = () => {
    getAllAnnex()
      .then(res => {
        if (res.data) {
          setData(res.data.annexSettings)
        }
      })
      .catch(e => console.log(e))
      .finally(() => setDataLoading(false))
  }

  useEffect(() => {
    fetchAllAnnexSettings()
  }, [fetchAgain])

  return (
    <>
      <AnnexSettingsTable data={data} fetchAgain={fetchAgainHandler} dataLoading={dataLoading} />
    </>
  )
}
