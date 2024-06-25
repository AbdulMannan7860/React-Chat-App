import React, { useContext } from 'react'
import { BiLogOut } from 'react-icons/bi'
import UserContext from '../Context/User/userContext'
const Logout = () => {
    const context = useContext(UserContext);
    const { logout, loading } = context;

    const handleLogout = () => {
        logout();
    }

    return (
        <div className='mt-auto'>
            {
                !loading ? (
                    <BiLogOut className='w-6 h-6 text-3xl text-white cursor-pointer' onClick={handleLogout} />
                ) : (
                    <span className='loading loading-spinner'></span>
                )
            }
        </div>
    )
}

export default Logout