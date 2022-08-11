import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toolbar } from 'primereact/toolbar'
import { Dropdown } from 'primereact/dropdown'
import { UpdateTag } from './components/UpdateTag'

import TableActions from '../common/actionBody'
import { tagColumns } from './constant/tableColumn'
import ShowTag from './components/ShowTag'
import { DeleteTag } from '../../service/tagManagerService'
import { GetAllTagsTranslate } from '../../service/translateService'
import { ToastAlert } from '../common/toastAlert'
import { createTagType } from './constant/createTagType'

import './style/translatetag.css'

export const Tag = () => {
  const [tagName, setTagName] = useState('')
  const [tagType, setTagType] = useState('')
  const [globalFilter, setGlobalFilter] = useState(null)
  const [openShow, setOpenShow] = useState(false)
  const [id, setId] = useState(0)
  const [data, setData] = useState([])
  const [fetchAgain, setFetchAgain] = useState(false)
  const [filterTagType, setFilterTagType] = useState('')
  const [dataLoading, setDataLoading] = useState(true)

  const [dataTable, setDataTable] = useState([])
  const [showUpdateDialog, setShowUpdateDialog] = useState(false)
  const [editProps, setEditProps] = useState({ formParentID: -1, id: -1, title: '', transTitle: '', type: '', typeId: -1 })

  //Get Tags List from server with api
  const fetchAllTags = () => {
    const formData = new FormData()
    formData.append('TagType', filterTagType ? filterTagType.toString() : '-1')
    formData.append('ParentID', '-1')
    GetAllTagsTranslate(formData).then(res => {
      if (res.data) {
        setDataLoading(false)
        setData(
          res.data.tagsknowledges.map(item => ({
            id: item.tag_ID,
            title: item.tag_Name,
            type: createTagType.find(element => element.value === item.tag_Type).label,
            typeId: item.tag_Type,
            transTitle: item.tagTranslate_Name || '--',
            formParentID: item.tag_ParentID,
          })),
        )
      }
    })
  }
  useEffect(() => {
    fetchAllTags()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAgain])

  const fetchAgainHandler = () => {
    setFetchAgain(perv => !perv)
  }

  const rightToolbarTemplate = () => {
    return (
      <>
        <Link to="/tag/new-tag">
          <Button label="ثبت تگ جدید" icon="pi pi-plus text-sm" className="p-button ml-2 text-sm rtl h-10" />
        </Link>
      </>
    )
  }

  const fetchTagByTypeId = id => {
    setDataLoading(true)
    if (id >= 0) {
      const formData = new FormData()
      formData.append('TagType', id.toString())
      formData.append('ParentID', '-1')
      GetAllTagsTranslate(formData).then(res => {
        if (res.data) {
          setDataLoading(false)
          setData(
            res.data.tagsknowledges.map(item => ({
              id: item.tag_ID,
              title: item.tag_Name,
              type: createTagType.find(element => element.value === item.tag_Type).label,
              typeId: item.tag_Type,
              transTitle: item.tagTranslate_Name || '--',
              formParentID: item.tag_ParentID,
            })),
          )
        }
      })
    } else {
      fetchAgainHandler()
    }
  }

  const handleFilterType = type => {
    setFilterTagType(type.value)
    fetchTagByTypeId(type.value)
  }

  const header = (
    <>
      <div className="table-header flex items-center  flex-wrap">
        <span className="p-input-icon-left">
          <i className="pi pi-search text-sm" />
          <InputText type="search" onInput={e => setGlobalFilter(e.target.value)} placeholder="جستجو ..." className="h-10 text-sm" />
        </span>

        <span className="p-input-icon-left mr-5">
          <span>فیلتر بر اساس نوع: </span>
          <Dropdown
            dir="rtl"
            showClear={filterTagType !== '' ? true : false}
            options={createTagType}
            placeholder="انتخاب نوع"
            id="tagType"
            name="tagType"
            value={filterTagType}
            filterBy="label"
            filter
            onChange={handleFilterType}
            className="h-9 w-44 tag-filter-by-ty"
          />
          {/* <label htmlFor="tagType" className="right-2 text-sm">
            نوع
          </label> */}
        </span>
      </div>
    </>
  )

  const openShowTag = (valId, valName, valType) => {
    setId(valId)
    setTagName(valName)
    setTagType(valType)
    setOpenShow(true)
  }

  const closeShowTag = () => {
    setOpenShow(false)
  }

  const deleteTag = useCallback(id => {
    const formData = new FormData()
    formData.append('ID', id)
    DeleteTag(formData)
      .then(res => {
        if (res.data || res.status === 200) {
          ToastAlert.success('تگ مورد نظر با موفقیت حذف گردید')
          fetchAgainHandler()
        } else {
          ToastAlert.error('خطا در حذف تگ')
        }
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    const newData = []
    data.forEach(item =>
      newData.push({
        ...item,
        action: (
          <TableActions
            deleteAction={() => {
              deleteTag(item.id)
            }}
            hasDelete={true}
            hasUpdate={false}
            deleteButtonClassName={' p-button-danger text-xs rtl h-10 w-25 py-1 px-3 ml-2'}
            deleteLabel="حذف"
            deleteIcon={false}
          >
            <Button
              className="p-button-warning text-xs rtl h-10 w-25 py-1 px-3 ml-2"
              label="ویرایش"
              onClick={() => {
                setEditProps({ ...item })
                setShowUpdateDialog(prev => !prev)
              }}
            />
            <Button
              onClick={() => openShowTag(item.id, item.title, item.type)}
              className="p-button-success text-xs rtl h-10 w-25 py-1 px-3 ml-2"
            >
              ترجمه
            </Button>
          </TableActions>
        ),
      }),
    )
    setDataTable(newData)
  }, [data, deleteTag])

  return (
    <>
      <ShowTag visible={openShow} tagId={id} onHide={closeShowTag} tagName={tagName} tagType={tagType} fetchAgain={fetchAgainHandler} />
      <UpdateTag
        showUpdateDialog={showUpdateDialog}
        setShowUpdateDialog={setShowUpdateDialog}
        fetchAgainHandler={fetchAgainHandler}
        editProps={editProps}
      />
      <div className="w-[95%] mt-4 m-auto container">
        <div className="card">
          <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>

          <DataTable
            loading={dataLoading}
            value={dataTable}
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
            {tagColumns.map((col, index) => (
              <Column field={col.field} header={col.header} sortable key={index} filterBy="#{data.name}" className={col.className}></Column>
            ))}
          </DataTable>
        </div>
      </div>
    </>
  )
}
