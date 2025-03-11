import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
import "./Footer.css"

function Footer() {
    return (
        <section className="footer">
            <div className="logo-sec">
                <div className="logo">
                    <Link to='/'><Logo width="100%" /></Link>
                </div>
                <div>
                    <p className="copy-right">
                        &copy; Copyright 2025. All Rights Reserved by Rhino Scales.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Footer