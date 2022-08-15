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
import { DeleteCompany, GetAllCompanyInfo } from '../../service/companyService'
import ShowAllTableData from '../common/ShowAllTableData'
import { showAllDataBreadcrumb } from './constant/createCompanyBreadcrumb'

export const Company = () => {
  const [globalFilter, setGlobalFilter] = useState(null)
  const [companyInfo, setCompanyInfo] = useState([])
  const [fetchAgain, setFetchAgain] = useState(false)
  const [showAllData, setShowAllData] = useState(false)
  const [compId, setCompId] = useState(0)
  const [companyInfoObject, setCompanyInfoObject] = useState({})
  const [dataLoading, setDataLoading] = useState(true)
  const navigate = useNavigate()

  // const renderImage = img => (
  //   <Image src={img} template="نمایش" alt="تصویر" width={50} height={50} preview={true} className="w-[50px] h-[50px] rounded-full" />
  // )

  useEffect(() => {
    const newData = []
    GetAllCompanyInfo()
      .then(res => {
        if (res.data || res.status === 200) {
          if (res.data.companyInfos.length) {
            res.data.companyInfos.forEach(comp =>
              newData.push({
                ...comp,
                coIn_Logo: (
                  <Image
                    src={process.env.REACT_APP_GOD_FTP_SERVER.concat(comp.coIn_Logo)}
                    template="نمایش"
                    alt={comp.coIn_Name}
                    width={50}
                    height={50}
                    preview={true}
                    className="w-[50px] h-[50px] rounded-full"
                  />
                ),
                coIn_TypeDateTime: comp.coIn_TypeDateTime === 1 ? 'شمسی' : comp.coIn_TypeDateTime === 2 ? 'میلادی' : 'قمری',
              }),
            )
          }

          setCompanyInfo(newData)
        }
      })
      .catch(err => {
        ToastAlert.error('خطا در برقراری ارتباط با سرور')
      })
      .finally(() => setDataLoading(false))
  }, [fetchAgain])

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
  const handleShowAllObject = selectedID => {
    const result = companyInfo.find(item => item.coIn_ID === selectedID)
    // var dateType = ''
    // if (result.coIn_TypeDateTime === 1) {
    //   dateType = 'شمسی'
    // } else if (result.coIn_TypeDateTime === 2) {
    //   dateType = 'میلادی'
    // } else if (result.coIn_TypeDateTime === 3) {
    //   dateType = 'قمری'
    // }
    setCompanyInfoObject({
      'نام': result.transTag,
      'لوگو': result.coIn_Logo,
      'تلفن': result.coIn_Phone,
      'موبایل': result.coIn_Mobile,
      'فکس': result.coIn_Fax,
      'پنل پیامک': result.coIn_SmsNumber,
      'ایمیل': result.coIn_Email,
      'اینستاگرام': result.coIn_Instagram,
      'سایت': result.coIn_Site,
      'آدرس شرکت': result.coIn_Address,
      'درباره شرکت': result.coIn_About,
      'زبان پیشفرض': result.coIn_LangName,
      'نوع تاریخ': result.coIn_TypeDateTime,
    })
  }
  const handleOpenShowAll = id => {
    setCompId(id)
    handleShowAllObject(id)
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
            loading={dataLoading}
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
