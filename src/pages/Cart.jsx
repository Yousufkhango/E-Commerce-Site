import { useState } from 'react'
import React from 'react'
import { useSelector, useDispatch} from 'react-redux'



function Cart() {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const cartItems = cart.items
    console.log(cart)

    const clearCart = () => {
        dispatch(clearCart())
    }

    return (
        <>
            <div>
                <h1>Cart Page</h1>
                {Object.entries(cartItems).map(([key, item]) => (
                    <div key={key} className="cart-item">
                        <h2>{item.productName}</h2>
                        <p>{item.description}</p>
                        <p>Category: {item.category}</p>
                        <p>Price: {item.price}</p>
                    </div>
                ))}

                <h1>Total Price: {cart.totalPrice}</h1>
                <button onClick={clearCart}>Clear Cart</button>
            </div>
        </>
    )
}

export default Cart
