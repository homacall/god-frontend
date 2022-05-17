import React, { useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import { classNames } from 'primereact/utils'
import { useFormik } from 'formik'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { Checkbox } from 'primereact/checkbox'

import { routeBreadcrumb } from '../constant/breadcrumb'
import Breadcrumb from '../../../component/breadcrumb/breadcrumb'
import { routeTypes } from '../constant/routeTypes'
import { useLocation, useParams } from 'react-router'
import { TreeView } from '../../userPermissions/components/treeView'
import {
  CreateRouteStructure,
  GetAllRoutesGodByType,
  GetByIdRouteStructure,
  UpdateRouteStructure,
} from '../../../service/routeStretcherService'
import { Alert } from '../../common/alert'
import { GetAllTagsTranslate } from '../../../service/translateService'

export const CreateAndEditStretcher = () => {
  const location = useLocation()
  const params = useParams()
  const [showMessage, setShowMessage] = useState(false)
  const [initialValues, setInitialValue] = useState({
    RoutStr_Tag_ID: '',
    RoutStr_TypeRout: '',
  })
  const [isParent, setIsParent] = useState(false)
  const [showTreeView, setShowTreeView] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState(undefined)
  const [routes, setRoutes] = useState([])
  const [tags, setTags] = useState([])
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [editMode, setEditMode] = useState(location.pathname.includes('/route-stretcher/update/'))
  const fetchTags = () => {
    GetAllTagsTranslate()
      .then(res => {
        if (res.data || res.status === 200) {
          setTags(res.data)
        }
      })
      .catch(error => console.log(error))
  }
  const fetchRoutes = () => {
    GetAllRoutesGodByType()
      .then(res => {
        if (res.data || res.status === 200) {
          setRoutes(res.data)
        }
      })
      .catch(err => console.log(err))
  }
  const fetchRouteById = id => {
    const formData = new FormData()
    formData.append('RotID', id)
    GetByIdRouteStructure(formData).then(res => {
      if (res.data || res.status === 200) {
        setSelectedRoute(res.data)
        setInitialValue({
          RoutStr_Tag_ID: res.data.routStr_Tag_ID,
          RoutStr_TypeRout: res.data.routStr_TypeRout.toString(),
        })
      }
    })
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
  }, [params.stretcherId, editMode])
  useEffect(() => {
    fetchRoutes()
    fetchTags()
  }, [])
  const insertRoute = data => {
    const formData = new FormData()
    formData.append('RoutStr_TypeRout', parseInt(data.RoutStr_TypeRout))
    formData.append('RoutStr_Tag_ID', data.RoutStr_Tag_ID)
    if (isParent || !selectedRoute) {
      formData.append('RoutStr_PID', 0)
    } else {
      formData.append('RoutStr_PID', selectedRoute.routStr_ID)
    }
    CreateRouteStructure(formData)
      .then(res => {
        setShowSuccessMessage(true)

        if (res.data || res.status === 200) {
          fetchRoutes()
          setMessage('مسیر جدید با موفقیت ثبت شد')
          setIsParent(false)
          formik.resetForm()
        } else {
          setMessage('خطا در ثبت مسیر جدید')
        }
      })
      .catch(err => console.log(err))
  }
  const editRoute = data => {
    const formData = new FormData()
    formData.append('RoutStr_TypeRout', parseInt(data.RoutStr_TypeRout))
    formData.append('RoutStr_Tag_ID', data.RoutStr_Tag_ID)
    formData.append('RoutStr_ID', params.stretcherId)
    if (isParent || !selectedRoute) {
      formData.append('RoutStr_PID', 0)
    } else {
      formData.append('RoutStr_PID', selectedRoute.routStr_ID)
    }
    UpdateRouteStructure(formData)
      .then(res => {
        setShowSuccessMessage(true)

        if (res.data || res.status === 200) {
          fetchRoutes()
          setMessage('مسیر جدید با موفقیت ثبت شد')
          setIsParent(false)
          formik.resetForm()
        } else {
          setMessage('خطا در ثبت مسیر جدید')
        }
      })
      .catch(err => console.log(err))
  }
  const formik = useFormik({
    initialValues,
    validate: data => {
      let errors = {}

      if (!data.RoutStr_Tag_ID) {
        errors.RoutStr_Tag_ID = 'Tag id را انتخاب کنید.'
      }
      if (!data.RoutStr_TypeRout) {
        errors.RoutStr_TypeRout = 'Type را انتخاب کنید.'
      }
      return errors
    },
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
  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button label="باشه" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} />
    </div>
  )
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
  return (
    <div className="w-[80%] my-4 pb-4 rounded-md m-auto container bg-white rtl">
      <Breadcrumb item={routeBreadcrumb} />
      <Alert message={message} setMessage={setMessage} setShowMessage={setShowSuccessMessage} showMessage={showSuccessMessage} />

      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ '960px': '80vw' }}
        style={{ width: '30vw' }}
      >
        <div className="flex align-items-center flex-column pt-6 px-3">
          <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
          <h5>مسیر جدید با موفقیت انتساب داده شد!</h5>
        </div>
      </Dialog>
      <form className="grid grid-cols-1 gap-4 gap-y-10 p-5 mt-10" onSubmit={formik.handleSubmit}>
        <span className="p-float-label">
          <Dropdown
            id="RoutStr_TypeRout"
            value={formik.values.RoutStr_TypeRout}
            onChange={formik.handleChange}
            name="RoutStr_TypeRout"
            options={routeTypes}
            className={classNames({ 'p-invalid': isFormFieldValid('RoutStr_TypeRout'), 'w-[60%]': true })}
            filterBy="label"
            filter
          />
          <label
            htmlFor="RoutStr_TypeRout"
            className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('RoutStr_TypeRout') })}`}
          >
            نوع ساختار
          </label>
          {getFormErrorMessage('RoutStr_TypeRout')}
        </span>
        <span className="p-float-label">
          <Dropdown
            id="RoutStr_Tag_ID"
            value={formik.values.RoutStr_Tag_ID}
            onChange={formik.handleChange}
            name="RoutStr_Tag_ID"
            optionLabel="tagTranslate_Name"
            optionValue="tag_ID"
            options={tags}
            className={classNames({ 'p-invalid': isFormFieldValid('RoutStr_Tag_ID'), 'w-[60%]': true, 'rtl': true })}
            filterBy="tagTranslate_Name"
            filter
          />
          <label htmlFor="RoutStr_Tag_ID" className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('RoutStr_Tag_ID') })}`}>
            عنوان ساختار
          </label>
          {getFormErrorMessage('RoutStr_Tag_ID')}
        </span>
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
        <Button label="ثبت" className="p-button-primary relative text-sm mt-3 h-10 w-[100px] " />
      </form>
    </div>
  )
}
