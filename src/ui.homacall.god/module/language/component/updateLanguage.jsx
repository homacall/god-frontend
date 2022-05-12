import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';


const UpdateDialog = (props) => {

    const [value, setValue] = useState(props.title);
    const [layout, setLayout] = useState(props.layout);
    useEffect(() => {
        console.log(props);

    }, [])
    return (
        <div className='w-[400px] pb-4 rounded-md m-auto container bg-white rtl'>
            <div className=" flex justify-start mr-[8%] mt-10 ">
                <span className="p-float-label">
                    <InputText id="inputtext" value={value} onChange={(e) => setValue(e.target.value)} className='h-9 w-44' />
                    <label htmlFor="inputtext" className='right-2 text-sm'>عنوان</label>
                </span>
            </div>
            <div className=" flex justify-start mr-[8%] mt-10">
                <div className="field-radiobutton ml-8">
                    <RadioButton inputId="RTL" name="layout" value="RTL" onChange={(e) => setLayout(e.value)} checked={layout === 'RTL'} />
                    <label htmlFor="RTL" className='mr-4 text-sm'>راست به چپ</label>
                </div>
                <div className="field-radiobutton">
                    <RadioButton inputId="LTR" name="layout" value="LTR" onChange={(e) => setLayout(e.value)} checked={layout === 'LTR'} />
                    <label htmlFor="LTR" className='mr-4 text-sm'>چپ به راست</label>
                </div>
            </div>
        </div>
    );
}
export default UpdateDialog