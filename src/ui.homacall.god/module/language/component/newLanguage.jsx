import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import Breadcrumb from '../../../component/breadcrumb/breadcrumb';
import { newLanguage } from '../../../service/userService';
import { useRecoilValue } from 'recoil';
import { userData } from '../../../store/atom';

const NewLanguage = ({}) => {

    const [languageName, setLanguageName] = useState('');
    const [layout, setLayout] = useState(null);
    const [loading, setLoading] = useState(false);


    const item = [
        { id: 1, label: 'مدیریت زبان', url: '/language' },
        { id: 2, label: 'ثبت فرم جدید', url: '/language/new-form' },
    ];

    const reset = () => {
        setLanguageName('')
        setLayout(null)
    }
    const user = useRecoilValue(userData);
    const handleSubmit = async event => {
        event.preventDefault()
        const formData = new FormData();
        const isRTL = layout === 'RTL' ? true : false
        formData.append('Lang_Name', languageName);
        formData.append('Lang_Rtl', isRTL);
        setLoading(true)
        try {
            const { data, status } = await newLanguage(formData, user)
            if (status === 200) {
                console.log(data);
                setLoading(false)
                reset()
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <div className='w-[80%] my-4 pb-4 rounded-md m-auto container bg-white rtl'>
            <Breadcrumb item={item} />
            <form onSubmit={handleSubmit}>
                <div className=" flex justify-start mr-[8%] mt-10 ">
                    <span className="p-float-label">
                        <InputText id="inputtext" value={languageName} onChange={(e) => setLanguageName(e.target.value)} className='h-9 w-96' />
                        <label htmlFor="inputtext" className='right-2 text-sm'>عنوان</label>
                    </span>
                </div>
                <div className=" flex justify-start mr-[8%] mt-10">
                    <div className="field-radiobutton ml-8">
                        <RadioButton inputId="RTL" name="layout" value="RTL" onChange={(e) => { setLayout(e.target.value) }} checked={layout === 'RTL'} />
                        <label htmlFor="RTL" className='mr-4 text-sm'>راست به چپ</label>
                    </div>
                    <div className="field-radiobutton">
                        <RadioButton inputId="LTR" name="layout" value="LTR" onChange={(e) => { setLayout(e.target.value) }} checked={layout === 'LTR'} />
                        <label htmlFor="LTR" className='mr-4 text-sm'>چپ به راست</label>
                    </div>
                </div>
                <Button label='ثبت' className='relative right-[86%] text-sm mt-3 h-10' loading={loading} />
            </form>
        </div>
    );
}
export default NewLanguage