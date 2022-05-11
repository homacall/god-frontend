import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';

import { showTagTableColumns } from './constant/showTableColumn';
import TranslateTag from './TranslateTag';
import UpdateTranslateTag from './UpdateTranslateTag';

import GetTranslateLanguage from './utils/getLanguages';

//Get one tag translations list from server with api
const dataL = [
  {
    id: 1,
    name: 'اضافه',
    language: 'fa',
    lang_id: 1
  },
  {
    id: 2,
    name: 'add',
    language: 'en',
    lang_id: 2
  },
]

const ShowTag = ({visible, tagId, onHide, tagName}) => {

  const [globalFilter, setGlobalFilter] = useState(null);
  const [openTranslate, setOpenTranslate] = useState(false);
  const [openUpdateTranslate, setOpenUpdateTranslate] = useState(false);
  const [oldName, setOldName] = useState(false);
  const [oldLang, setOpldLang] = useState(false);
  const [id, setId] = useState(0);
  const [data, setData] = useState(dataL);
  

const languagesToTranslate = GetTranslateLanguage(...dataL);



const openTranslateTag =() => { setOpenTranslate(true); }

const closeTranslateTag =() => { setOpenTranslate(false); }

const openUpdateTranslateTag =(tagId, name, lang) => { 
    setId(tagId);
    setOldName(name);
    setOpldLang(lang);
    setOpenUpdateTranslate(true); 
   
}

const closeUpdateTranslateTag =() => { setOpenUpdateTranslate(false); }

const rightToolbarTemplate = () => {
    return (
      <>
      {languagesToTranslate.length > 0 ?
         <Button onClick={openTranslateTag} label="افزودن ترجمه" icon="pi pi-plus text-sm" className="p-button ml-2 text-sm rtl h-10" /> 
        :
         <h2 className="text-[#00dd00]">تگ به تمام زبانها ترجمه شده است.</h2>
      }
      </>
    )
}

const header = (
    <div className="table-header">
        <span className="p-input-icon-left">
            <i className="pi pi-search text-sm" />
            <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value) } placeholder="جستوجو ..." className='h-10 text-sm' />
        </span>
    </div>
);
      
return (
      <>
       <TranslateTag visible={openTranslate} tagId={tagId} onHide={closeTranslateTag} data={data} setData={setData} languages={languagesToTranslate} tagName={tagName} />
       <UpdateTranslateTag visible={openUpdateTranslate} tagId={id} oldVal={oldName} langId={oldLang} onHide={closeUpdateTranslateTag} data={data} setData={setData}/>
       <Dialog visible={visible} onHide={onHide}>
         <div className="w-[60vw] pb-4 rounded-md m-auto container bg-white rtl">
         <div className="card">
        <Toolbar className="mb-4" left={rightToolbarTemplate}></Toolbar>

        <DataTable
          value={data}
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
          {showTagTableColumns.map((col, index) => (
            <Column field={col.field} header={col.header} sortable key={index} filterBy="#{data.name}" className={col.className}></Column>
            ))}
          
          <Column
            field="image"
            header="عملیات"
            body={(data) => (
              <>
               <Button onClick={()=>openUpdateTranslateTag(data.id, data.name, data.language)} className="p-button-outlined p-button-success text-xs rtl h-10 w-25 py-1 px-3 ml-2">ویرایش</Button>
             </>
            )}
            
          ></Column>
        </DataTable>
      </div>
         </div>
        </Dialog>
      </>
    )
}

export default ShowTag
  