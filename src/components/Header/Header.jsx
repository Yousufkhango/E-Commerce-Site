import React, { useEffect } from 'react'
import { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './Header.css'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)


  const navigate = useNavigate()
  const [showMobileMenu, setShowMobileMenu] = React.useState(false)
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Electronics",
      slug: "/category/electronics",
      active: true,
    },
    {
      name: "Fashion",
      slug: "/category/fashion",
      active: true,
    },
    {
      name: "Platform (100kg-2000kg)",
      slug: "/category/platform",
      active: true,
    },
    {
      name: "ACS (1g-40kg)",
      slug: "/category/acs",
      active: true,
    },
    {
      name: "Table Scale (5g-100kg)",
      slug: "/category/table-scale",
      active: true,
    },
    {
      name: "Kitchen / Health Scale",
      slug: "/category/kitchen-health-scale",
      active: true,
    },
    {
      name: "Crane Scale",
      slug: "/category/crane-scale",
      active: true,
    },
    {
      name: "Handy Scale",
      slug: "/category/handy-scale",
      active: true,
    },
    {
      name: "Spring/Dial Scale",
      slug: "/category/spring-dial-scale",
      active: true,
    },
  ]




  return (
    <header>
      <Container>
        <nav className='navbar'>
          <div className='logo'>
            <Link to='/'>
              <Logo width='12rem' />
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
        <nav className='navulOnlyMobile' {...showMobileMenu ? { style: { transform: "translateX(100%)" } } : { style: { transform: "translateX(-100%)" } }}>
          <div className="top">
            <div className="left">
              <div className="logo" onClick={() => setShowMobileMenu(false)}>
                <Link to='/'>
                  <Logo width='100%' />
                </Link>
              </div>
              <div className="text">
                <div className="logout-btn">
                  {authStatus ? (
                    <LogoutBtn />
                  ) : (
                    <Link to='/login' onClick={() => setShowMobileMenu(false)}>
                      <button className='login-btn'>Login</button>
                    </Link>
                  )
                  }
                </div>
              </div>
            </div>
            <div className="close-btn">
              <button onClick={() => setShowMobileMenu(false)}>X</button>
            </div>
          </div>
          <div className="category">
            <ul className='navUlMobile'>
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        navigate(item.slug)
                        setShowMobileMenu(false)
                      }}
                      className='navBtnMobile'
                    >
                      <span>{item.name}</span>
                      <span>&gt;</span>

                    </button>
                  </li>
                ) : null
              )}

            </ul>
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header