import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toolbar } from 'primereact/toolbar'
import { UpdateTag } from './components/UpdateTag'

import TableActions from '../common/actionBody'
import { tagColumns } from './constant/tableColumn'
//import TranslateTag from './components/TranslateTag'
import ShowTag from './components/ShowTag'

export const Tag = () => {
  const [tagName, setTagName] = useState('');
  const [globalFilter, setGlobalFilter] = useState(null);
  const [openShow, setOpenShow] = useState(false);
  const [id, setId] = useState(0);
  // const [openTranslate, setOpenTranslate] = useState(false);

  //Get Tags List from server with api
  const dataL = [
    {
      id: 1,
      title: 'tag-1',
    },
    {
      id: 2,
      title: 'tag-2',
    },
  ]
  const rightToolbarTemplate = () => {
    return (
      <>
        <Link to="/tag/new-tag">
          <Button label="ثبت تگ جدید" icon="pi pi-plus text-sm" className="p-button ml-2 text-sm rtl h-10" />
        </Link>
      </>
    )
  }

  const header = (
    <div className="table-header">
        <span className="p-input-icon-left">
            <i className="pi pi-search text-sm" />
            <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value) } placeholder="جستجو ..." className='h-10 text-sm' />
        </span>
    </div>
);

// const openTranslateTag =(val) => { setOpenTranslate(true); setId(val) }

// const closeTranslateTag =(val) => { setOpenTranslate(false); }

const openShowTag =(val) => { setOpenShow(true); setId(val) }

const closeShowTag =(val) => { setOpenShow(false); }

  return (
    <>
     {/* <TranslateTag visible={openTranslate} tagId={id} onHide={closeTranslateTag} /> */}
     <ShowTag visible={openShow} tagId={id} onHide={closeShowTag} />
     <div className="w-[95%] mt-4 m-auto container">
      <div className="card">
        <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>

        <DataTable
          value={dataL}
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
          
          <Column
            field="image"
            header="عملیات"
            body={(data) => (
              <>
              <TableActions
                deleteAction={() => { alert(data.id); }}
                hasDelete={true}
                hasUpdate={true}
                updateAction={() => {
                  alert(tagName+" "+data.id)
                }}
                deleteLabel="حذف"
                updateLabel="ویرایش"
                updateView={<UpdateTag tagName={tagName} setTagName={setTagName} oldVal={data.title} />}
                deleteButtonClassName={'p-button-outlined p-button-danger ml-2 text-xs rtl h-10 w-25 py-1 px-3'}
                updateButtonClassName={'p-button-outlined p-button-warning ml-2 text-xs rtl h-10 w-25 py-1 px-3'}
              />
              {/* <Button onClick={()=>openTranslateTag(data.id)} className="p-button-outlined text-xs rtl h-10 w-25 p-1 ml-2">ترجمه</Button> */}
              <Button onClick={()=>openShowTag(data.id)} className="p-button-outlined p-button-success text-xs rtl h-10 w-25 py-1 px-3 ml-2">ترجمه</Button>
             </>
            )}
            
          ></Column>
        </DataTable>
      </div>
    </div>
    </>
  )
}
