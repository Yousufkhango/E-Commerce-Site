import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import {sellerLogout} from '../../store/sellerAuthSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
            dispatch(sellerLogout())
        })
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    }
  return (
    <button
    className='navBtn'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn