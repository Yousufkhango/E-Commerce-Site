import React from 'react'
import {useSelector} from 'react-redux'


function cart() {
  const cartS = useSelector((state) => state.cartSlice.status)
  console.log(cartS)
  return (
    <h1>This is Cart</h1>
  )
}

export default cart
