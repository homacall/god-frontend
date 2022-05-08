import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import items from '../../utils/constants/sidebar/sidebar';


const Sidebar = () => {

    const location = useLocation();
    return (
        <>
            <div className='w-60  h-[100vh] bg-slate-50 fixed right-0 top-20 z-10 shadow-md'>
                <ul className='text-center  text-sm text-slate-800 sidebarFont'>
                    {items.map((items) => (
                        <li key={items.id}
                            className={`${location.pathname === items.url &&
                                'text-indigo-600 border-r-8 border-indigo-600 rounded-sm'}
                             py-4 shadow-sm cursor-pointer hover:text-indigo-600 sidebarFont w-full h-full`}>
                            <Link to={items.url} className='inline-block w-full'>
                                {items.label}
                            </Link>
                        </li>
                    ))}

                </ul>
            </div>
        </>
    );
}
export default Sidebar