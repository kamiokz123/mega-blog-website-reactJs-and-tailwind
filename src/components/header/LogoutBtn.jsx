import React from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import authServices from "../../appwrite/auth.js"
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = ()=>{
      console.log("logout");
      
      authServices.logout().then(()=>{
        dispatch(logout());
        navigate("/login")
      })
    }
  return (
    <button
    className= ' bg-red-500 hover:bg-red-400 rounded-md p-2'
    onClick={handleLogout}
    >
        logout
    </button>
  )
}

export default LogoutBtn
