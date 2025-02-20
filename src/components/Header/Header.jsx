import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './Header.css'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const sellerAuthStatus = useSelector((state) => state.sellerAuth.status)
  const navigate = useNavigate()
  const [showMobileMenu, setShowMobileMenu] = React.useState(false)
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  // {
  //     name: "All Posts",
  //     slug: "/all-posts",
  //     active: authStatus,
  // },
  {
      name: "Add Item",
      slug: "/add-post",
      active: sellerAuthStatus,
  },
  ]

 


  return (
    <header>
      <Container>
        <nav className='navbar'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='7rem'   />

              </Link>
          </div>
          <ul className='navUl'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='navBtn'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
          <button className='navBtnOnlyMobile' onClick={() => setShowMobileMenu(!showMobileMenu)}>
          ☰
          </button>
        </nav>
          <div className='navulOnlyMobile' {...showMobileMenu ? {style: {transform: "translateX(100%)"}} : {style: {transform: "translateX(-100%)"}}}>
          <ul className='navUlMobile'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='navBtnMobile'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
          </div>
        </Container>
    </header>
  )
}

export default Header