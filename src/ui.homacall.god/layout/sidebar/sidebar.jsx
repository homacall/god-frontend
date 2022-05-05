import React from 'react'
import { useRecoilState } from 'recoil';
import {Link} from 'react-router-dom'
import { handleId } from '../../store/atom';
import items from '../../utils/constants/sidebar/sidebar';


const Sidebar = () => {
  
    const [id, setId] = useRecoilState(handleId);

    return (
        <>
            <div className='w-60  h-[633px] bg-slate-50 fixed right-0 top-20 z-10 shadow-md'>
                <ul className='text-center  text-sm text-slate-800 sidebarFont'>
                    {items.map((items) => (
                        <li key={items.id} onClick={() => setId(items.id)}
                            className={`${id === items.id &&
                            'text-indigo-600 border-r-8 border-indigo-600 rounded-sm'}
                             py-4 shadow-sm cursor-pointer hover:text-indigo-600 sidebarFont`}>
                            <Link to={items.url} className='w-full h-full'>
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