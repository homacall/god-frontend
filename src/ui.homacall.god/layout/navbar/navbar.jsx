import React from 'react'
import { useRecoilState } from 'recoil';
import { showSidebar } from '../../store/atom';

const Navbar = () => {
    const [show, setShow] = useRecoilState(showSidebar);

    const handleShow = () => {
        setShow(!show);
    }

    return (
        <>
            <div className='w-full z-20 fixed'>
                <div className='h-20 shadow-md bg-white flex flex-row'>
                <div className=' basis-1/4 h-20'>
                    {/* <div className='w-14 mt-3 h-14 m-auto border rounded-full border-red-500 '></div> */}
                </div>
                <div className=' basis-1/2 h-20 '>
                    {/* <div className='w-[30%] mt-4 h-12 m-auto border border-red-500'></div> */}
                </div>
                    <div className=' basis-1/4 '>
                        {show === true ?
                            <span onClick={handleShow} className='cursor-pointer w-7 mr-[5%] mt-7 float-right pi pi-times text-xl text-gray-400' /> :
                            <span onClick={handleShow} className='cursor-pointer w-7 mr-[5%] mt-7 float-right pi pi-align-justify text-xl text-gray-400' />
                        }   
                     </div>
            </div></div>
           
        </>
    );
}
export default Navbar