import React, { useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import { classNames } from 'primereact/utils'
import { useFormik } from 'formik'
import { Dialog } from 'primereact/dialog'
import { TreeSelect } from 'primereact/treeselect'
import { Dropdown } from 'primereact/dropdown'
import { Checkbox } from 'primereact/checkbox'

import { routeBreadcrumb } from '../constant/breadcrumb'
import Breadcrumb from '../../../component/breadcrumb/breadcrumb'
import { TreeViewData } from '../constant/treeViewData'
import { routeTypes } from '../constant/routeTypes'
import { useLocation, useParams } from 'react-router'
import { TreeView } from '../../userPermissions/components/treeView'

export const CreateAndEditStretcher = () => {
  const location = useLocation()
  const params = useParams()
  const [showMessage, setShowMessage] = useState(false)
  const [initialValues, setInitialValue] = useState({
    RoutStr_PID: '',
    RoutStr_Tag_ID: '',
    RoutStr_TypeRout: '',
  })
  const [isParent, setIsParent] = useState(false)
  const [showTreeView, setShowTreeView] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState(undefined)
  useEffect(() => {
    if (location.pathname.includes('/route-stretcher/update/')) {
      routeBreadcrumb[1].label = 'ویرایش انتساب'
      routeBreadcrumb[1].url = `/route-stretcher/update/${params.stretcherId}`

      // fetch find one data
      setInitialValue({
        RoutStr_PID: '0-0-0',
        RoutStr_Tag_ID: 1,
        RoutStr_TypeRout: '1',
      })
    }
  }, [location.pathname, params?.stretcherId])

  const formik = useFormik({
    initialValues,
    validate: data => {
      let errors = {}
      if (data.RoutStr_PID !== 0 && !data.RoutStr_PID) {
        errors.RoutStr_PID = 'Paren id را انتخاب کنید.'
      }
      if (!data.RoutStr_Tag_ID) {
        errors.RoutStr_Tag_ID = 'Tag id را انتخاب کنید.'
      }
      if (!data.RoutStr_TypeRout) {
        errors.RoutStr_TypeRout = 'Type را انتخاب کنید.'
      }
      return errors
    },
    onSubmit: data => {
      console.log(data)
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
    console.log(selectedRoute)
    if (selectedRoute) {
      setShowTreeView(false)
    }
  }, [selectedRoute])
  return (
    <div className="w-[80%] my-4 pb-4 rounded-md m-auto container bg-white rtl">
      <Breadcrumb item={routeBreadcrumb} />
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
      <form className="grid grid-cols-3 gap-4 gap-y-10 p-5 mt-10" onSubmit={formik.handleSubmit}>
        <span className="p-float-label">
          <Dropdown
            id="RoutStr_TypeRout"
            value={formik.values.RoutStr_TypeRout}
            onChange={formik.handleChange}
            name="RoutStr_TypeRout"
            options={routeTypes}
            className={classNames({ 'p-invalid': isFormFieldValid('RoutStr_TypeRout'), 'w-full': true })}
          />
          <label
            htmlFor="RoutStr_TypeRout"
            className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('RoutStr_TypeRout') })}`}
          >
            Route Type
          </label>
          {getFormErrorMessage('RoutStr_TypeRout')}
        </span>
        <span className="p-float-label">
          <Dropdown
            id="RoutStr_Tag_ID"
            value={formik.values.RoutStr_Tag_ID}
            onChange={formik.handleChange}
            name="RoutStr_Tag_ID"
            options={[{ value: 1, label: 'a' }]}
            className={classNames({ 'p-invalid': isFormFieldValid('RoutStr_Tag_ID'), 'w-full': true })}
          />
          <label htmlFor="RoutStr_Tag_ID" className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('RoutStr_Tag_ID') })}`}>
            Tag id
          </label>
          {getFormErrorMessage('RoutStr_Tag_ID')}
        </span>
        <span className="p-float-label relative">
          <div
            className="outline-2 h-[50px] w-full block border border-1 rounded-lg border-gray-300 hover:border-blue-600	cursor-pointer	relative"
            onClick={() => (!isParent ? setShowTreeView(perv => !perv) : {})}
          >
            <div className="w-30 h-30 absolute ">
              <i className="pi-angle-down  " style={{ fontSize: '2em' }}></i>
            </div>
          </div>
          <Dialog
            visible={showTreeView}
            onHide={() => setShowTreeView(false)}
            position="center"
            footer={treeViewDialogFooter}
            showHeader={false}
            breakpoints={{ '960px': '80vw' }}
            style={{ width: '50vw' }}
          >
            <TreeView setSelectedRoute={setSelectedRoute} />
          </Dialog>
          {/* <TreeSelect
            filter
            selectionMode="single"
            id="RoutStr_PID"
            value={formik.values.RoutStr_PID}
            onChange={formik.handleChange}
            name="RoutStr_PID"
            options={TreeViewData}
            className={classNames({ 'p-invalid': isFormFieldValid('RoutStr_PID'), 'w-full': true })}
            disabled={true}
            onClick={() => alert('hi')}
          /> */}
          <label
            htmlFor="RoutStr_PID"
            className={`right-2 text-sm ${classNames({ 'p-error': isFormFieldValid('RoutStr_PID'), 'p-disabled': isParent })}`}
          >
            {selectedRoute ? selectedRoute.tagName : 'Parent id'}
          </label>
          <div className="col-12 absolute ">
            <Checkbox
              inputId="cb1"
              value={isParent}
              onChange={() => {
                setIsParent(perv => !perv)
              }}
              checked={isParent}
              className={'top-[10px]'}
            ></Checkbox>
            <small htmlFor="cb1" className="p-checkbox-label mr-2 opacity-[75%] absolute w-[200px] top-[13px]">
              مسیر اصلی
            </small>
          </div>
          {getFormErrorMessage('RoutStr_PID')}
        </span>
        <Button label="ثبت" className="p-button-primary relative right-[86%] text-sm mt-3 h-10" />
      </form>
    </div>
  )
}
