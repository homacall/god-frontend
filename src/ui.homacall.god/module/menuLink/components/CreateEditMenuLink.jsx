import { useState, useEffect } from 'react'
import { useFormik } from 'formik'

import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { useParams, useNavigate } from 'react-router'

import { createMenuLinksBreadcrumb } from '../constant/menuLinkBreadcrump'
import { ToastAlert } from '../../common/toastAlert'
import Breadcrumb from '../../../component/breadcrumb/breadcrumb'
import '../styles/menuLink.module.css'
import { GetAllTagsTranslate } from '../../../service/translateService'
import { createTagType } from '../../tag/constant/createTagType'
import { Checkbox } from 'primereact/checkbox'
import { MenuLinkService } from '../../../service'
import { useCallback } from 'react'
import { menu } from '../../../utils/constants/routes/publicRoute'
import { InputText } from 'primereact/inputtext'

const CreateEditMenuLink = () => {
  const [loading, setLoading] = useState(false)
  const [linkTags, setLinkTags] = useState([])
  const [formsTags, setFormsTags] = useState([])
  const [systemsTags, setSystemsTags] = useState([])
  const [actionsTags, setActionTags] = useState([])
  const [initialValues, setInitialValues] = useState({})
  const [isParent, setIsParent] = useState(false)
  const [systemId, setSystemId] = useState(-1)
  const [menuLinks, setMenuLinks] = useState([])
  const [errors, setErrors] = useState({})
  // const location = useLocation()
  let { ServerId } = useParams()
  const navigate = useNavigate()
  const tagTypes = {
    form: 1,
    action: 2,
    system: 8,
    link: 9,
  }
  const fetchTags = async (tagType, parentId) => {
    const formData = new FormData()
    formData.append('TagType', tagType)
    formData.append('PID', parentId)

    GetAllTagsTranslate(formData)
      .then(res => {
        if (res.data && res.status === 200 && res.data.tagsknowledges) {
          switch (tagType) {
            case tagTypes.link:
              setLinkTags(res.data.tagsknowledges)
              break
            case tagTypes.form:
              setFormsTags(res.data.tagsknowledges)

              break
            case tagTypes.action:
              setActionTags(res.data.tagsknowledges)
              break
            case tagTypes.system:
              setSystemsTags(res.data.tagsknowledges)
              break
            default:
              break
          }
          return res.data.tagsknowledges
        } else return []
      })
      .catch(err => {
        console.log(err)
        return []
      })
  }

  useEffect(() => {
    fetchTags(8, -1)
  }, [])

  // useEffect(() => {
  //   let path = location.pathname
  //   if (path.split('/')[2] === 'edit') {
  //     if (Object.keys(serverConnectionById).length > 0) {
  //       //fetchSystemName()
  //       setInitialValues({
  //         SerConn_IP: serverConnectionById.serConn_IP,
  //         SerConn_Port: serverConnectionById.serConn_Port,
  //         SerConn_DbName: serverConnectionById.serConn_DbName,
  //         SerConn_UsrID: serverConnectionById.serConn_UsrID,
  //         SerConn_HPass: serverConnectionById.serConn_HPass,
  //         SerConn_SysID: serverConnectionById.serConn_SysID,
  //         SerConn_CoInID: serverConnectionById.serConn_CoInID,
  //         SerConn_ServTypID: serverConnectionById.serConn_ServTypID,
  //       })
  //     }
  //   }
  // }, [location.pathname, serverConnectionById])

  const submitHandler = values => {
    if (!isValid(values)) {
      return
    }
    setLoading(true)

    const formData = new FormData()
    Object.keys(values).forEach(key => {
      const value = values[key]
      formData.append(key, value)
    })

    if (isParent || !values.MenuLnk_ParntID) {
      if (values.MenuLnk_ParntID) {
        formData.delete('MenuLnk_ParntID')
      }
      formData.append('MenuLnk_ParntID', 0)
    }
    if (!values.MenuLnk_ActnTagID) {
      formData.append('MenuLnk_ActnTagID', '-1')
      formData.append('MenuLnk_TypRoutID', '0')
    } else {
      formData.append('MenuLnk_TypRoutID', '2')
    }

    if (!values.MenuLnk_FrmTagID) {
      formData.append('MenuLnk_FrmTagID', '-1')
    }
    MenuLinkService.insert(formData)
      .then(res => {
        if (res.status === 200 || res.data) {
          formik.resetForm()
          ToastAlert.success('ثبت پایگاه داده جدید با موفقیت انجام شد')
          navigate(menu.main)
        } else {
          ToastAlert.error('ثبت پایگاه داده جدید با خطا مواجه شد')
        }
      })
      .catch(err => {
        ToastAlert.error('ثبت پایگاه داده جدید با خطا مواجه شد')
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const fetchParentId = useCallback(() => {
    const formData = new FormData()
    formData.append('SysTagID', systemId)
    MenuLinkService.getAllLinkSubMenu(formData)
      .then(res => {
        if (res.data || res.status === 200) {
          setMenuLinks(res.data.menuLinks)
        }
      })
      .catch(err => console.log(err))
  }, [systemId])
  useEffect(() => {
    if (systemId > 0) {
      fetchParentId()
    }
  }, [systemId, fetchParentId])
  const formik = useFormik({
    initialValues,
    onSubmit: submitHandler,
    enableReinitialize: true,
  })
  const isValid = values => {
    const error = {}

    if (!values?.MenuLnk_SysTagID) {
      error.MenuLnk_SysTagID = 'انتخاب سیستم الزامی است'
    }
    if (!values?.MenuLnk_TagID) {
      error.MenuLnk_TagID = 'انتخاب عنوان لینک الزامی است'
    }

    if (!values?.MenuLnk_ParntID && !isParent) {
      error.MenuLnk_ParntID = `انتخاب زیرمنو یا منوی اصلی الزامی است`
    }
    if (!values?.MenuLnk_NavigaPath) {
      error.MenuLnk_NavigaPath = `انتخاب آدرس الزامی است`
    }
    if (!values?.MenuLnk_Icon) {
      error.MenuLnk_Icon = `انتخاب آیکون الزامی است`
    }
    console.log(error)
    setErrors(error)
    if (Object.keys(error).length) {
      return false
    } else return true
  }

  return (
    <div className="w-[80%] my-4 pb-4 rounded-md  m-auto container bg-white rtl ">
      <Breadcrumb item={createMenuLinksBreadcrumb} />
      <form className="p-5 mt-10 " onSubmit={formik.handleSubmit}>
        <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4  gap-y-10 rtl">
          <span className="p-float-label" dir="ltr">
            <Dropdown
              options={systemsTags}
              id="MenuLnk_SysTagID"
              name="MenuLnk_SysTagID"
              optionLabel="tagTranslate_Name"
              optionValue="tag_ID"
              value={formik.values.MenuLnk_SysTagID}
              placeholder="انتخاب  سیستم"
              onChange={event => {
                formik.handleChange(event)
                fetchTags(tagTypes.link, event.value)
                fetchTags(tagTypes.form, event.value)
                setSystemId(event.value)
              }}
              dir="rtl"
              style={{ width: '100%' }}
            />

            {errors.MenuLnk_SysTagID ? (
              <div className="text-right">
                <small className="p-error">{errors.MenuLnk_SysTagID}</small>
              </div>
            ) : null}
          </span>
          <span className="p-float-label" dir="ltr">
            <Dropdown
              options={linkTags}
              id="MenuLnk_TagID"
              name="MenuLnk_TagID"
              optionLabel="tagTranslate_Name"
              optionValue="tag_ID"
              value={formik.values.MenuLnk_TagID}
              placeholder="عنوان لینک"
              onChange={formik.handleChange}
              dir="rtl"
              style={{ width: '100%' }}
            />

            {errors.MenuLnk_TagID ? (
              <div className="text-right">
                <small className="p-error">{errors.MenuLnk_TagID}</small>
              </div>
            ) : null}
          </span>
          <span className="p-float-label" dir="ltr">
            <Dropdown
              options={menuLinks}
              id="MenuLnk_ParntID"
              name="MenuLnk_ParntID"
              value={formik.values.MenuLnk_ParntID}
              placeholder="انتخاب زیر منو"
              optionLabel="menuLink_TransTagName"
              optionValue="menuLnk_ID"
              onChange={formik.handleChange}
              dir="rtl"
              style={{ width: '100%' }}
              disabled={isParent}
            />
            <div dir="rtl " style={{ display: 'flex', marginTop: 16, justifyContent: 'end', gap: 8 }}>
              <Checkbox
                checked={isParent}
                onChange={e => {
                  setIsParent(e.checked)
                }}
              ></Checkbox>
              <div style={{ fontSize: 12 }}>منو اصلی</div>
            </div>
            {errors.MenuLnk_ParntID ? (
              <div className="text-right">
                <small className="p-error">{errors.MenuLnk_ParntID}</small>
              </div>
            ) : null}
          </span>
          <span className="p-float-label" dir="ltr">
            <Dropdown
              options={formsTags}
              id="MenuLnk_FrmTagID"
              name="MenuLnk_FrmTagID"
              optionLabel="tagTranslate_Name"
              optionValue="tag_ID"
              value={formik.values.MenuLnk_FrmTagID}
              placeholder="انتخاب  فرم"
              onChange={event => {
                formik.handleChange(event)
                fetchTags(tagTypes.action, event.value)
              }}
              dir="rtl"
              style={{ width: '100%' }}
            />

            {errors.MenuLnk_FrmTagID ? (
              <div className="text-right">
                <small className="p-error">{errors.MenuLnk_FrmTagID}</small>
              </div>
            ) : null}
          </span>
          <span className="p-float-label" dir="ltr">
            <Dropdown
              options={actionsTags}
              id="MenuLnk_ActnTagID"
              name="MenuLnk_ActnTagID"
              optionLabel="tagTranslate_Name"
              optionValue="tag_ID"
              value={formik.values.MenuLnk_ActnTagID}
              placeholder="انتخاب  اکشن"
              onChange={formik.handleChange}
              dir="rtl"
              style={{ width: '100%' }}
            />

            {errors.MenuLnk_ActnTagID ? (
              <div className="text-right">
                <small className="p-error">{errors.MenuLnk_ActnTagID}</small>
              </div>
            ) : null}
          </span>

          <span className="p-float-label" dir="rtl">
            <InputText
              id="MenuLnk_NavigaPath"
              name="MenuLnk_NavigaPath"
              value={formik.values.MenuLnk_NavigaPath || ''}
              placeholder="آدرس لینک"
              onChange={formik.handleChange}
              dir="rtl"
              style={{ width: '100%', height: 38 }}
            />
            {errors.MenuLnk_NavigaPath ? (
              <div className="text-right">
                <small className="p-error">{errors.MenuLnk_NavigaPath}</small>
              </div>
            ) : null}
          </span>
          <span className="p-float-label" dir="rtl">
            <InputText
              id="MenuLnk_Icon"
              name="MenuLnk_Icon"
              value={formik.values.MenuLnk_Icon || ''}
              placeholder="آیکون"
              onChange={formik.handleChange}
              dir="rtl"
              style={{ width: '100%', height: 38 }}
            />
            <small>
              نام آیکون را از آدرس{' '}
              <a href="https://material.io/icons" target={'_blank'} className="text-blue-500	" rel="noreferrer">
                {' '}
                material.io/icons
              </a>{' '}
              وارد کنید.{' '}
            </small>
            {errors.MenuLnk_Icon ? (
              <div className="text-right">
                <small className="p-error">{errors.MenuLnk_Icon}</small>
              </div>
            ) : null}
          </span>
        </section>

        <div className="mt-10 flex justify-end justify-items-end">
          <Button loading={loading} label="ثبت" className="ml-10 text-sm mt-3 h-10 bg-indigo-600" type="submit" />
        </div>
      </form>
    </div>
  )
}

export default CreateEditMenuLink
