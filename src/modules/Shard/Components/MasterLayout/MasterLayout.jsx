import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Navebar from '../Navebar/Navebar'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'

export default function MasterLayout({ LoginData }) {
    return (
        <div className='d-flex'>
            <Sidebar />
            <div className='w-100'>

                <Navebar LoginData={LoginData} />
                <Header />
                <Outlet />
            </div>
        </div>
    )
}
