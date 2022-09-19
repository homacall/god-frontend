import React, { useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import { classNames } from 'primereact/utils'
import { useFormik } from 'formik'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { Checkbox } from 'primereact/checkbox'
import { routeBreadcrumb } from '../constant/breadcrumb'
import Breadcrumb from '../../../component/breadcrumb/breadcrumb'
import { useLocation, useParams } from 'react-router'
import { TreeView } from '../../userPermissions/components/treeView'
import {
  CreateRouteStructure,
  GetAllRoutesGodByTypeRouteTree,
  GetAllRouteStructureTreeByTagID,
  GetByIdRouteStructure,
  GetRSIDByTagID,
  UpdateRouteStructure,
} from '../../../service/routeStretcherService'
import { GetAllTagsTranslate } from '../../../service/translateService'
import { ToastAlert } from '../../common/toastAlert'
import { createTagType } from '../../tag/constant/createTagType'
import { useMemo } from 'react'

export const CreateAndEditStretcher = () => {
  const location = useLocation()
  const params = useParams()
  const [initialValues, setInitialValue] = useState({
    RoutStr_Tag_ID: '',
    RoutStr_TypeRout: '',
  })
  const [isParent, setIsParent] = useState(false)
  const [showTreeView, setShowTreeView] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState(undefined)
  const [routes, setRoutes] = useState([])
  const [editMode, setEditMode] = useState(location.pathname.includes('/route-stretcher/update/'))
  const [formTags, setFormTags] = useState([])
  const [systemsTags, setSystemsTags] = useState([])
  const [systemIdInEditMode, setSystemIdInEditMode] = useState()
  const fetchTags = async (type, parentId) => {
    const formData = new FormData()
    formData.append('TagType', type)
    if (type === 3 || type === 4) {
      formData.append('ParentID', -1)
    } else {
      formData.append('ParentID', parentId)
    }
    const result = GetAllTagsTranslate(formData)
      .then(res => {
        if (res.data || res.status === 200) {
          return res.data.tagsknowledges
        } else return []
      })
      .catch(error => {
        console.log(error)
        return []
      })
    return result
  }
  const fetchRoutes = tagId => {
    const formData = new FormData()
    formData.append('TagID', tagId)
    GetAllRouteStructureTreeByTagID(formData)
      .then(res => {
        if (res.data.routeStructuresTree || res.status === 200) {
          setRoutes(res.data.routeStructuresTree)
        }
      })
      .catch(err => console.log(err))
  }
  const fetchRouteById = id => {
    const formData = new FormData()
    formData.append('RotID', id)
    GetByIdRouteStructure(formData)
      .then(res => {
        if (res.data || res.status === 200) {
          const data = res.data.routeStructures

          fetchTags(data.routStr_TypeRout).then(() => {
            setSelectedRoute(data)
            setSystemIdInEditMode(data.find(str => str.routStr_PID === 0).routStr_PID)
            setInitialValue({
              RoutStr_Tag_ID: data.routStr_Tag_ID,
              RoutStr_TypeRout: data.routStr_TypeRout,
            })
          })
        }
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    if (location.pathname.includes('/route-stretcher/update/')) {
      setEditMode(true)
    } else {
      setEditMode(false)
    }
  }, [location.pathname, params?.stretcherId])
  useEffect(() => {
    if (editMode) {
      routeBreadcrumb[1].label = 'ویرایش انتساب'
      routeBreadcrumb[1].url = `/route-stretcher/update/${params.stretcherId}`
      fetchRouteById(params.stretcherId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.stretcherId, editMode])
  // useEffect(() => {
  //   if (selectedType?.toString()) {
  //     fetchTags(selectedType).then(res => {
  //       if (res) setTags(res)
  //     })
  //   }
  // }, [selectedType])

  const insertRoute = data => {
    const formData = new FormData()
    formData.append('RoutStr_TypeRout', data.RoutStr_TypeRout)
    formData.append('RoutStr_Tag_ID', data.RoutStr_TypeRout === 1 ? data.RoutStr_FormTagId : data['RoutStr_'.concat(titleObject.key)])
    if ((isParent && !selectedRoute) || data.RoutStr_TypeRout >= 2) {
      const sysTagId = new FormData()
      sysTagId.append('TagID', data.RoutStr_TypeRout >= 2 ? data.RoutStr_FormTagId : data.RoutStr_SystemName)
      GetRSIDByTagID(sysTagId)
        .then(res => {
          if (res.data || res.status === 200) {
            formData.append('RoutStr_PID', res.data.rsid)
            CreateRouteStructure(formData)
              .then(res => {
                if (res.data || res.status === 200) {
                  // fetchRoutes()
                  ToastAlert.success('مسیر جدید با موفقیت ثبت شد')
                  setIsParent(false)
                  formik.resetForm()
                } else {
                  ToastAlert.error('خطا در ثبت مسیر جدید')
                }
              })
              .catch(err => console.log(err))
          }
        })
        .catch(error => console.log(error))
    } else {
      formData.append('RoutStr_PID', selectedRoute.routStr_ID)
      CreateRouteStructure(formData)
        .then(res => {
          if (res.data || res.status === 200) {
            // fetchRoutes()
            ToastAlert.success('مسیر جدید با موفقیت ثبت شد')
            setIsParent(false)
            formik.resetForm()
          } else {
            ToastAlert.error('خطا در ثبت مسیر جدید')
          }
        })
        .catch(err => console.log(err))
    }
  }
  const editRoute = data => {
    const formData = new FormData()
    formData.append('RoutStr_TypeRout', data.RoutStr_TypeRout === 8 ? 0 : data.RoutStr_TypeRout)
    formData.append('RoutStr_Tag_ID', data.RoutStr_Tag_ID)
    formData.append('RoutStr_ID', params.stretcherId)
    if (isParent || !selectedRoute) {
      formData.append('RoutStr_PID', 0)
    } else {
      formData.append('RoutStr_PID', selectedRoute.routStr_ID)
    }
    UpdateRouteStructure(formData)
      .then(res => {
        if (res.data || res.status === 200) {
          // fetchRoutes()
          ToastAlert.success('مسیر جدید با موفقیت ثبت شد')
          setIsParent(false)
          formik.resetForm()
        } else {
          ToastAlert.error('خطا در ثبت مسیر جدید')
        }
      })
      .catch(err => console.log(err))
  }
  const formik = useFormik({
    initialValues,
    // validate: data => {
    //   let errors = {}

    //   if (!data.RoutStr_Tag_ID) {
    //     errors.RoutStr_Tag_ID = 'Tag id را انتخاب کنید.'
    //   }
    //   if (!data.RoutStr_TypeRout) {
    //     errors.RoutStr_TypeRout = 'Type را انتخاب کنید.'
    //   }
    //   return errors
    // },
    onSubmit: data => {
      if (editMode) {
        editRoute(data)
      } else {
        insertRoute(data)
      }
    },
    enableReinitialize: true,
  })
  const isFormFieldValid = name => !!(formik.touched[name] && formik.errors[name])
  const getFormErrorMessage = name => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>
  }

  const treeViewDialogFooter = (
    <div className="flex justify-content-center">
      <Button label="بازگشت" className="p-button-text" autoFocus onClick={() => setShowTreeView(false)} />
    </div>
  )
  useEffect(() => {
    if (selectedRoute && routes.length) {
      setShowTreeView(false)
    }
  }, [selectedRoute, routes.length])
  useEffect(() => {
    if (isParent) {
      setShowTreeView(false)
    }
    if (!formik.values.RoutStr_SystemName) {
      setShowTreeView(false)
    }
  }, [isParent, formik.values.RoutStr_SystemName])
  useEffect(() => {
    fetchTags(8, -1).then(res => {
      if (res) setSystemsTags(res)
    })
  }, [])

  const [currentTags, setCurrentTags] = useState([])
  useEffect(() => {
    if (formik.values.RoutStr_TypeRout === 0 && formik.values.RoutStr_TypeRout.toString()) {
      fetchTags(formik.values.RoutStr_TypeRout, formik.values.RoutStr_SystemName).then(res => {
        if (res) setCurrentTags(res)
      })
    }
  }, [formik.values.RoutStr_TypeRout])

  const titleObject = useMemo(() => {
    switch (formik.values.RoutStr_TypeRout) {
      case 0:
        return {
          title: 'انتخاب مسیر',
          key: 'Route_ID',
        }
      case 2:
        return {
          title: 'انتخاب اکشن',
          key: 'Action_ID',
        }
      case 3:
        return {
          title: 'انتخاب عناوین',
          key: 'Title_ID',
        }
      case 4:
        return {
          title: 'انتخاب پیغام ها',
          key: 'Alert_ID',
        }
      default:
        return {}
    }
  }, [formik.values.RoutStr_TypeRout])
  const formTagsHandler = parentId => {
    fetchTags(1, parentId).then(res => setFormTags(res))
  }
  useEffect(() => {
    if (formik.values?.RoutStr_SystemName?.toString()) {
      formTagsHandler(formik.values.RoutStr_SystemName)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.RoutStr_SystemName])
  const formChangeHandler = formId => {
    if (formik.values.RoutStr_TypeRout < 2) return
    fetchTags(formik.values.RoutStr_TypeRout, formId).then(res => setCurrentTags(res))
  }
  useEffect(() => {
    if (editMode) {
      if (systemIdInEditMode) {
        fetchRoutes(systemIdInEditMode)
      }
    } else {
      if (formik.values.RoutStr_SystemName) {
        fetchRoutes(formik.values.RoutStr_SystemName)
      }
    }
  }, [systemIdInEditMode, editMode, formik.values.RoutStr_SystemName])
  return (
    <div className="w-[80%] my-4 pb-4 rounded-md m-auto container bg-white rtl">
      <Breadcrumb item={routeBreadcrumb} />

      <form className="grid grid-cols-1 gap-4 gap-y-10 p-5 mt-10" onSubmit={formik.handleSubmit}>
        <span className="p-float-label">
          <Dropdown
            id="RoutStr_SystemName"
            value={formik.values.RoutStr_SystemName}
            onChange={e => {
              formik.handleChange(e)
            }}
            name="RoutStr_SystemName"
            options={systemsTags}
            optionLabel="tagTranslate_Name"
            optionValue="tag_ID"
            className={classNames({ 'p-invalid': isFormFieldValid('RoutStr_SystemName'), 'w-[60%]': true })}
            filterBy="label"
            filter
          />
          <label
            htmlFor="RoutStr_SystemName"
            className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('RoutStr_SystemName') })}`}
          >
            نام سیستم
          </label>
          {getFormErrorMessage('RoutStr_SystemName')}
        </span>
        <span className="p-float-label">
          <Dropdown
            id="RoutStr_TypeRout"
            value={formik.values.RoutStr_TypeRout}
            onChange={e => {
              formik.handleChange(e)
            }}
            name="RoutStr_TypeRout"
            options={createTagType.filter(tagType => tagType.value <= 4)}
            className={classNames({ 'p-invalid': isFormFieldValid('RoutStr_TypeRout'), 'w-[60%]': true })}
            filterBy="label"
            filter
            disabled={!formik.values.RoutStr_SystemName}
          />
          <label
            htmlFor="RoutStr_TypeRout"
            className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('RoutStr_TypeRout') })}`}
          >
            انتخاب ساختار
          </label>
          {getFormErrorMessage('RoutStr_TypeRout')}
        </span>

        {formik.values.RoutStr_TypeRout.toString() && formik.values.RoutStr_TypeRout <= 1 ? (
          <span className="p-float-label flex">
            <div
              className="outline-2 h-[50px] w-[60%] block border border-1 rounded-lg border-gray-300 hover:border-blue-600 	cursor-pointer	relative"
              onClick={() => (!isParent ? setShowTreeView(perv => !perv) : {})}
            >
              <label
                htmlFor="RoutStr_PID"
                className={`right-2 text-sm  ${classNames({
                  'p-error': isFormFieldValid('RoutStr_PID'),
                  'text-[#ccc]': isParent,
                  'text-[#6f757d]': !isParent,
                })}`}
              >
                {selectedRoute ? selectedRoute.routStr_Trans_Tag_Name : 'مسیر  والد'}
              </label>
            </div>
            <div className="  mr-4">
              <Checkbox
                inputId="cb1"
                value={isParent}
                onChange={() => {
                  setIsParent(perv => !perv)
                }}
                checked={isParent}
                className={'top-[10px]'}
              ></Checkbox>
              <small htmlFor="cb1" className="p-checkbox-label mr-2 opacity-[75%] block mr-[30px]  mt-[-11px] w-[200px] ">
                مسیر اصلی
              </small>
            </div>
            <Dialog
              visible={showTreeView}
              onHide={() => setShowTreeView(false)}
              position="center"
              footer={treeViewDialogFooter}
              showHeader={false}
              breakpoints={{ '960px': '80vw' }}
              style={{ width: '40vw' }}
            >
              <TreeView setSelectedRoute={setSelectedRoute} data={routes} />
            </Dialog>
          </span>
        ) : (
          <></>
        )}
        {formik.values.RoutStr_TypeRout ? (
          <span className="p-float-label">
            <Dropdown
              id="RoutStr_FormTagId"
              value={formik.values.RoutStr_FormTagId}
              onChange={e => {
                formik.handleChange(e)
                formChangeHandler(e.value)
              }}
              name="RoutStr_FormTagId"
              optionLabel="tagTranslate_Name"
              optionValue="tag_ID"
              options={formTags}
              className={classNames({ 'p-invalid': isFormFieldValid('RoutStr_FormTagId'), 'w-[60%]': true, 'rtl': true })}
              filterBy="tagTranslate_Name"
              filter
            />
            <label
              htmlFor="RoutStr_FormTagId"
              className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('RoutStr_FormTagId') })}`}
            >
              انتخاب فرم
            </label>
            {getFormErrorMessage('RoutStr_FormTagId')}
          </span>
        ) : (
          <></>
        )}
        {formik.values.RoutStr_TypeRout !== 1 && formik.values.RoutStr_TypeRout.toString() ? (
          <span className="p-float-label">
            <Dropdown
              id={'RoutStr_'.concat(titleObject.key)}
              value={formik.values['RoutStr_'.concat(titleObject.key)]}
              onChange={formik.handleChange}
              name={'RoutStr_'.concat(titleObject.key)}
              optionLabel="tagTranslate_Name"
              optionValue="tag_ID"
              options={currentTags}
              className={classNames({ 'p-invalid': isFormFieldValid('RoutStr_'.concat(titleObject.key)), 'w-[60%]': true, 'rtl': true })}
              filterBy="tagTranslate_Name"
              filter
            />
            <label
              htmlFor="'RoutStr_'.concat(titleObject.key)"
              className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('RoutStr_'.concat(titleObject.key)) })}`}
            >
              {titleObject.title}
            </label>
            {getFormErrorMessage('RoutStr_'.concat(titleObject.key))}
          </span>
        ) : (
          <></>
        )}

        <Button label="ثبت" className="p-button-primary relative text-sm mt-3 h-10 w-[100px] " type="submit " />
      </form>
    </div>
  )
}
