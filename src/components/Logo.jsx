import React from 'react'

function Logo({width = '200px'}) {
  return (
    <img src="/logo.png" alt="logo" style={{width}} />
  )
}

export default Logo