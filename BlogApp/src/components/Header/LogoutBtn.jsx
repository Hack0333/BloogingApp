import React from 'react'
import { logout } from '../../features/authSlice'
import authServices from '../../appWirte/authServices'
import { useDispatch } from 'react-redux'

function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authServices.logOut()
        .then(()=>{
            dispatch(logout);
        })
    }
  return (
   <button className='inline-block px-6 py-2 hover:bg-blue-100 rounded-full'>
    Logout
   </button>
  )
}

export default LogoutBtn