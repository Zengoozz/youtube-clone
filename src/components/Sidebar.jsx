import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCategory } from '../redux/features/previewSlice'
import { categories } from '../utils/constants'

function SidebarItem({ name, icon }) {
    const dispatch = useDispatch()

    return (
        <Link to={`/${name}`}>
            <div onClick={() => { dispatch(selectCategory(name)) }}
                className='flex py-[10px] pl-[20px] pr-[35px] my-[5px] items-center text-red-600 rounded-[30px] hover:bg-red-600 hover:text-white'>
                <span className=' mr-[10px]'>
                    {icon}
                </span>
                <p className='text-white text-[15px] font-medium whitespace-nowrap'>
                    {name}
                </p>
            </div>
        </Link>
    )
}

export default function Sidebar() {
    return (
        <div className='flex flex-col'>
            {categories.map((item) => {
                return (
                    <SidebarItem
                        key={item.name}
                        name={item.name}
                        icon={item.icon}
                    />
                )
            })}
        </div>
    )
}
