import React from 'react';
import {Link} from 'react-router-dom'


const Breadcrumb = ({item}) => {
  
    return (

                <div className=' w-full border-b shadow-sm border-gray-200 '>
                    <ul className='flex h-12 place-item-center text-gray-700'>
                        <li className='pt-[11px] pr-[15px] hover:text-cyan-400'>
                            <Link to='/' > <i className='pi pi-home'/></Link>
                        </li>
                        <li className='pt-[10px] pr-2'>
                            <i className='pi pi-angle-left'/>
                        </li>
                        {item.map((label ,index) => (
                            <>
                            <li key={index} className='pt-[10px] pr-[10px]'>
                                    <Link to={label.url} className='hover:text-cyan-400'>{label.label}</Link>
                                    {index+1 < item.length && <i className='pi pi-angle-left pr-2'/>}
                            </li>
                            </>
                        ))}
                    </ul>
                </div>
    );
}
export default Breadcrumb