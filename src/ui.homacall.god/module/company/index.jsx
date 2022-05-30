import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Image } from 'primereact/image'

import TableActions from '../common/actionBody'
import { companyColumns } from './constant/tableColumn'
import PageToolbar from './constant/PageToolbar'
import { ToastAlert } from '../common/toastAlert'
import { GetAllCompanyInfoSP, DeleteCompany } from '../../service/companyService'
import ShowAllTableData from '../common/ShowAllTableData'
import { showAllDataBreadcrumb } from './constant/createCompanyBreadcrumb'
import { useFetchPath } from '../common/fetchPath'

export const Company = () => {
  const [globalFilter, setGlobalFilter] = useState(null)
  const [companyInfo, setCompanyInfo] = useState([])
  const [fetchAgain, setFetchAgain] = useState(false)
  const [showAllData, setShowAllData] = useState(false)
  const [compId, setCompId] = useState(0)
  const [companyInfoObject, setCompanyInfoObject] = useState({})
  const [data, setData] = useState([])
  const navigate = useNavigate()

  const { pathInfo } = useFetchPath('Logo')

  const renderImage = img => (
    <Image src={img} template="نمایش" alt="تصویر" width={50} height={50} preview={true} className="w-[50px] h-[50px] rounded-full" />
  )

  useEffect(() => {
    const newData = []
    if (pathInfo) {
      GetAllCompanyInfoSP()
        .then(res => {
          if (res.data || res.status === 200) {
            if (res.data.companys.length) {
              var dateType = ''
              if (res.data.companys[0].coIn_TypeDateTime === 1) {
                dateType = 'شمسی'
              } else if (res.data.companys[0].coIn_TypeDateTime === 2) {
                dateType = 'میلادی'
              } else if (res.data.companys[0].coIn_TypeDateTime === 3) {
                dateType = 'قمری'
              }
              const logoSrc = process.env.REACT_APP_GOD_FTP_SERVER + pathInfo.filPth_Name + '/' + res.data.companys[0].coIn_Logo
              setCompanyInfoObject({
                'نام': res.data.companys[0].coIn_Name,
                'لوگو': renderImage(logoSrc),
                'تلفن': res.data.companys[0].coIn_Phone,
                'موبایل': res.data.companys[0].coIn_Mobile,
                'فکس': res.data.companys[0].coIn_Fax,
                'پنل پیامک': res.data.companys[0].coIn_SmsNumber,
                'ایمیل': res.data.companys[0].coIn_Email,
                'اینستاگرام': res.data.companys[0].coIn_Instagram,
                'سایت': res.data.companys[0].coIn_Site,
                'آدرس شرکت': res.data.companys[0].coIn_Address,
                'درباره شرکت': res.data.companys[0].coIn_About,
                'زبان پیشفرض': res.data.companys[0].coIn_LangName,
                'نوع تاریخ': dateType,
              })

              res.data.companys.forEach(comp =>
                newData.push({
                  ...comp,
                  coIn_Logo: (
                    <Image
                      src={process.env.REACT_APP_GOD_FTP_SERVER + pathInfo.filPth_Name.concat(`/${comp.coIn_Logo}`)}
                      template="نمایش"
                      alt={comp.coIn_Name}
                      width={50}
                      height={50}
                      preview={true}
                      className="w-[50px] h-[50px] rounded-full"
                    />
                  ),
                  coIn_TypeDateTime: dateType,
                }),
              )
            }

            setCompanyInfo(newData)
          }
        })
        .catch(err => {
          console.log('error: ', err)
        })
    }
  }, [fetchAgain, pathInfo])

  const fetchAgainHandler = () => {
    setFetchAgain(perv => !perv)
  }

  const header = (
    <div className="table-header">
      <span className="p-input-icon-left">
        <i className="pi pi-search text-sm" />
        <InputText type="search" onInput={e => setGlobalFilter(e.target.value)} placeholder="جستجو ..." className="h-10 text-sm" />
      </span>
    </div>
  )

  const handleOpenShowAll = id => {
    setCompId(id)
    setShowAllData(true)
  }

  const handleCloseShowAll = () => {
    setCompId(0)
    setShowAllData(false)
  }

  const handleDelete = compID => {
    const formData = new FormData()
    formData.append('ID', compID)
    DeleteCompany(formData)
      .then(res => {
        if (res.data || res.status === 200) {
          ToastAlert.success('حذف شرکت با موفقیت انجام شد')
          fetchAgainHandler()
        } else {
          ToastAlert.error('خطا در حذف شرکت ')
        }
      })
      .catch(err => {
        console.log(err)
        ToastAlert.error('خطا در حذف شرکت ')
      })
  }

  return (
    <>
      <div className="w-[95%] mt-4 m-auto container">
        <div className="card">
          <PageToolbar size={companyInfo.length} />
          <ShowAllTableData
            visible={showAllData}
            onHide={handleCloseShowAll}
            data={companyInfoObject}
            headerTitle="نمایش اطلاعات شرکت"
            hasBreadCamp={false}
            breadCamp={showAllDataBreadcrumb}
            hasButton={true}
            buttonTitle={'ویرایش'}
            buttonClasses="text-sm mt-2 h-10"
            buttonCallBack={() => navigate('/company/edit/' + compId)}
          />
          <DataTable
            value={companyInfo}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            emptyMessage="رکوردی یافت نشد"
            globalFilter={globalFilter}
            header={header}
            paginatorTemplate="NextPageLink LastPageLink PageLinks FirstPageLink PrevPageLink "
            responsiveLayout="scroll"
            className="rtl"
          >
            {companyColumns.map((col, index) => {
              return (
                <Column
                  field={col.field}
                  header={col.header}
                  sortable
                  key={index}
                  filterBy="#{data.name}"
                  className={col.className}
                ></Column>
              )
            })}

            <Column
              field="image"
              header="عملیات"
              body={data => (
                <>
                  <TableActions
                    deleteAction={() => {
                      handleDelete(data.coIn_ID)
                    }}
                    hasDelete={true}
                    hasUpdate={false}
                    updateAction={() => {
                      alert(data.coIn_ID)
                    }}
                    deleteLabel="حذف"
                    updateLabel="ویرایش"
                    deleteButtonClassName={'p-button-danger ml-1 rtl text-sm p-1 mb-2'}
                    updateButtonClassName={'p-button-warning ml-1 text-sm rtl p-1'}
                  />
                  <Link to={'/company/edit/' + data.coIn_ID}>
                    <Button className="p-button-warning ml-1 rtl text-sm p-1 ml-2 mb-2">ویرایش</Button>
                  </Link>
                  <Button onClick={() => handleOpenShowAll(data.coIn_ID)} className="p-button-help rtl text-sm p-1 mb-2">
                    نمایش همه
                  </Button>
                </>
              )}
            ></Column>
          </DataTable>
        </div>
      </div>
    </>
  )
}
