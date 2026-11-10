import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function Sidebar() {
    const navegate = useNavigate();
    const Logout = () => {
        localStorage.removeItem("token")
        navegate("/login")
        toast.success("Logout success")


    }
    return (
        <div className='bg-success'>Sidebar
            <button className='btn btn-primary' onClick={() => Logout()}>logout</button>
        </div>
    )
}
