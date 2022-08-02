import { useState, useEffect, useCallback } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { InputImage } from '../../common/fileUploader'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import Breadcrumb from '../../../component/breadcrumb/breadcrumb'
import { GetAllTags } from '../../../service/tagManagerService'
import { BreadcrumbItem } from '../constant/BreadcampItem'
import { ToastAlert } from '../../common/toastAlert'
import { UpdateLoginLogo, InsertLoginLogo, GetLoginLogoById } from '../../../service/loginLogoService'
import { useFetchPath } from '../../common/fetchPath'

function CreateEditLoginLogo() {
  const [imageUrl, setImageUrl] = useState('')
  const [imagePervUrl, setImagePervUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState([])
  const [tagValue, setTagValue] = useState('')
  const [editMode, setEditMode] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()

  const fetchTags = () => {
    GetAllTags().then(res => {
      if (res.data || res.status === 200) {
        setTags(res.data.map(item => ({ id: item.tag_ID, name: item.tag_Name })))
      }
    })
  }

  const fetchLoginLogo = useCallback(() => {
    if (params.loginLogoId) {
      const formData = new FormData()
      formData.append('ID', params.loginLogoId)
      GetLoginLogoById(formData)
        .then(res => {
          if (res.data && res.status === 200) {
            const imgUrl = process.env.REACT_APP_GOD_FTP_SERVER + res.data.logoCo_Name
            setTagValue(res.data.logoCo_TgID)
            setImageUrl(imgUrl)
            setImagePervUrl(res.data.logoCo_Name)
          }
        })
        .catch(err => {
          ToastAlert.error('خطا در ارتباط با سرور ')
        })
    }
  }, [params.loginLogoId])

  useEffect(() => {
    fetchTags()
    fetchLoginLogo()
  }, [fetchLoginLogo])

  useEffect(() => {
    if (params.loginLogoId) {
      setEditMode(true)
    } else {
      setEditMode(false)
    }
  }, [location, params])

  const handleInsertLoginLogo = formData => {
    InsertLoginLogo(formData)
      .then(res => {
        if (res.status === 200 || res.data === 'Succeed') {
          ToastAlert.success('آپلود لوگو با موفقیت انجام شد ')
          navigate('/login-logo')
          setLoading(true)
        } else {
          ToastAlert.error('خطا در آپلود لوگو ')
          setLoading(false)
        }
      })
      .catch(e => ToastAlert.error('خطا در ساخت مسیر فایل '))
  }

  const handleUpdateLoginLogo = formData => {
    UpdateLoginLogo(formData)
      .then(res => {
        if (res.status === 200 && res.data.message === 'Succeed') {
          ToastAlert.success('آپلود لوگو با موفقیت انجام شد ')
          navigate('/login-logo')
          setLoading(true)
        } else {
          ToastAlert.error('خطا در آپلود لوگو ')
          setLoading(false)
        }
      })
      .catch(e => ToastAlert.error('خطا در آپلود لوگو '))
  }

  const handleLoginLogo = () => {
    const formData = new FormData()
    formData.append('LogoCo_TgID', tagValue)
    if (typeof imageUrl !== 'string') {
      formData.append('IFileLogo', imageUrl)
    } else {
      const file = new File([], 'none-image')
      formData.append('IFileLogo', file)
    }

    if (editMode) {
      formData.append('LogoCo_ID', params.loginLogoId)
      formData.append('LogoCo_Name', imagePervUrl || '')
      handleUpdateLoginLogo(formData)
    } else {
      handleInsertLoginLogo(formData)
    }
  }

  return (
    <section className="w-[80%] h-[80vh] mt-5 py-4 rounded-md  m-auto container bg-white rtl ">
      <Breadcrumb item={BreadcrumbItem} />

      <section className="flex mt-8 justify-center">
        <span className="p-float-label rtl relative mt-10" dir="ltr">
          <Dropdown
            options={tags}
            id="Tag_ID"
            name="Tag_Name"
            optionLabel="name"
            optionValue="id"
            value={tagValue}
            onChange={e => setTagValue(e.target.value)}
            placeholder="انتخاب تگ"
            className="rtl w-[80vw] sm:w-[50vw] md:w-[30vw] h-9 "
          />
        </span>
      </section>

      <section className="flex justify-center justify-items-center mt-8">
        <InputImage setImageUrl={setImageUrl} imageUrl={imageUrl} />
      </section>

      <section className="mt-8 flex justify-center justify-items-center">
        <Button
          type="submit"
          disabled={imageUrl && tagValue ? false : true}
          className="bg-indigo-600 text-sm h-10 text-center min-w-[120px] max-w-[120px]"
          loading={loading}
          onClick={handleLoginLogo}
        >
          ثبت / آپلود
        </Button>
      </section>
    </section>
  )
}

export default CreateEditLoginLogo
