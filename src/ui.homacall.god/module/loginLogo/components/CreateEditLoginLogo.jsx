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

function CreateEditLoginLogo() {
  const [imageUrl, setImageUrl] = useState('')
  const [imagePervUrl, setImagePervUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState([])
  const [tagValue, setTagValue] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [fetchTagsLoading, setFetchTagsLoading] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()

  const fetchTags = useCallback(() => {
    setFetchTagsLoading(true)
    const formData = new FormData()
    formData.append('TagType', '7')
    //formData.append('ParentID', sysID)
    GetAllTags(formData)
      .then(res => {
        if (res.data || res.status === 200) {
          setTags(res.data.tagsknowledges.map(item => ({ id: item.tag_ID, name: item.tag_TransName })))
        }
      })
      .catch(() => ToastAlert.error('خطا در ارتباط با سرور'))
      .finally(() => setFetchTagsLoading(false))
  }, [])

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
    fetchLoginLogo()
  }, [fetchLoginLogo])

  useEffect(() => {
    fetchTags()
  }, [fetchTags])

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
        console.log(res)
        if (res.data.message === 'Succeed') {
          ToastAlert.success('آپلود لوگو با موفقیت انجام شد ')
          navigate('/login-logo')
        } else if (res.data.message === 'TagUsed') {
          ToastAlert.error('این تگ قبلا تعریف شده است')
        } else {
          ToastAlert.error('خطا در آپلود لوگو ')
        }
      })
      .catch(e => ToastAlert.error('خطا در ساخت مسیر فایل '))
      .finally(() => setLoading(false))
  }

  const handleUpdateLoginLogo = formData => {
    UpdateLoginLogo(formData)
      .then(res => {
        if (res.status === 200 && res.data.message === 'Succeed') {
          ToastAlert.success('آپلود لوگو با موفقیت انجام شد ')
          navigate('/login-logo')
        } else {
          ToastAlert.error('خطا در آپلود لوگو ')
        }
      })
      .catch(e => ToastAlert.error('خطا در آپلود لوگو '))
      .finally(() => setLoading(false))
  }

  const handleLoginLogo = () => {
    setLoading(true)
    const formData = new FormData()
    formData.append('TagId', tagValue)
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
    <section className="w-[80%]  mt-5 py-4 rounded-md  m-auto container bg-white rtl ">
      <Breadcrumb item={BreadcrumbItem} />

      <section className="flex mt-8 justify-center">
        <span className="p-float-label rtl relative mt-10" dir="ltr">
          <Dropdown
            filter
            filterBy="name"
            options={tags}
            id="Tag_ID"
            name="Tag_Name"
            optionLabel="name"
            optionValue="id"
            value={tagValue}
            loading={fetchTagsLoading}
            onChange={e => setTagValue(e.target.value)}
            placeholder="انتخاب تگ"
            className="rtl w-[80vw] sm:w-[70vw] md:w-[50vw] lg:w-[30vw] h-9 "
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
