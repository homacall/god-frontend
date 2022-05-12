import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { UpdateLanguage } from '../../../service/languageService';


const UpdateDialog = (props) => {

    const [value, setValue] = useState(props.lang_Name);
    const [layout, setLayout] = useState(props.lang_Rtl === true ? 'RTL' : 'LTR');
    const [loading, setLoading] = useState()

    useEffect(() => {
        if (props) {
            setValue(props.lang_Name)
            setLayout(props.lang_Rtl === true ? 'RTL' : 'LTR')
        }

    }, [props])

    const footer = () => {
        return (
            <>
                <Button loading={loading} label='ثبت' className='relative right-[80%] text-sm mt-3 h-10' />
            </>
        )

    }

    const handleSubmit = async event => {
        event.preventDefault()
        const formData = new FormData();
        const isRTL = layout === 'RTL' ? true : false
        formData.append('Lang_Name', value);
        formData.append('Lang_Rtl', isRTL);
        setLoading(true)
        try {
            const { data, status } = await UpdateLanguage(formData)
            if (status === 200 || data) {
                console.log(data);
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <Dialog visible={props.showUpdateDialog}
            onHide={() => { props.setShowUpdateDialog(!props.showUpdateDialog) }}
            footer={footer}
        >
            <form onSubmit={handleSubmit}>
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
            </form>
        </Dialog>
    );
}
export default UpdateDialog