import { useRecoilState } from 'recoil'
import { pathState } from '../../store/atom'

export const useFetchPath = name => {
  const allPath = useRecoilState(pathState)

  const firstPath = allPath[0]

  return { pathInfo: firstPath.find(path => path.filPth_SysName === name) }
}
