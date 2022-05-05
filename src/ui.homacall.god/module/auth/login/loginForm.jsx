import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { loginUser } from '../../../service/userService';
import axios from 'axios';

const NewLanguage = ({history}) => {
  
    const [UserName, setUserName] = useState('');
    const [PassWord, setPassword] = useState('');

    const reset = () => {
        setUserName('');
        setPassword('');
    }
    // useEffect(() => {
    //     axios({
    //         method: 'Post',
    //         url: 'http://192.168.50.34:8080/api/LoginGod/Login',
    //         data: { UserName: 'god', PassWord: '123' },
    //         headers: {
    //              "Access-Control-Allow-Origin": "*",
    //               "Access-Control-Allow-Methods": "*",
    //              "Content-Type": "application/json",
    //         },
    //     }).then(function (response) {
    //         console.log(response);
    //     }).catch(function (error) {
    //         console.log('Error', error.message, 'config',error.response.headers);
    //     });
        
    // }, []);

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const user = { UserName, PassWord }
    //     try {
    //         const { data } = await loginUser(user);
    //         // if (status === 200) {
    //             console.log(data);
    //             localStorage.setItem("token", data.token);
    //             history.replace("/");
    //             reset();
    //         //}
    //     } catch (error) {
    //         console.log(error);
            
    //     }
    // }

    return (
        <>
            <div className=' w-[30%] pb-5 bg-white m-auto shadow-lg rounded-md my-40'>
                <form  >
                    <div className='border-b border-slate-400 h-10'>
                    <span className='inline-block  float-right mr-5 leading-9'>ورود</span>
                    </div>
                    <div className=" rtl mr-[8%] mt-10 ">
                        <span className="p-float-label">
                            <InputText id="inputtext" value={UserName} onChange={(e) => setUserName(e.target.value)} className='h-9 w-[92%]'/>
                            <label htmlFor="inputtext" className='right-2 text-sm'>نام کاربری</label>
                        </span>
                    </div>
                    <div className=" rtl mr-[8%] mt-10 ">
                        <span className="p-float-label">
                            <Password id="password" value={PassWord} onChange={(e) => setPassword(e.target.value)} className='h-9 w-[92%]'/>
                            <label htmlFor="password" className='right-2 text-sm'>رمز عبور</label>
                        </span>
                    </div>
                    
                    <Button label='ورود' className='relative left-[8%] text-sm mt-7 h-10' />
                </form>
           </div>
        </>
    );
}
export default NewLanguage