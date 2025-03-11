import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: {},
        totalQuantity: 0,
        totalPrice: 0,
    },
    reducers: {
        addItem: (state, action) => {
            if (!state.items) {
                state.items = {};
            }
            const newItem = action.payload;
            if (!(newItem.$id in state.items)) {
                state.items[newItem.$id] = {
                    ...newItem,
                    totalPrice: totalPrice + newItem.price,
                };
            } else {
                const existingItem = state.items[newItem.$id];
                existingItem.quantity += newItem.quantity;
                existingItem.totalPrice += newItem.price * newItem.quantity;
            }
            state.totalQuantity += newItem.quantity;
            state.totalPrice += newItem.price * newItem.quantity;
        },
        removeItem: (state, action) => {
            if (!state.items) {
                state.items = {};
            }
            const $id = action.payload;
            if ($id in state.items) {
                const existingItem = state.items[$id];
                state.totalQuantity -= existingItem.quantity;
                state.totalPrice -= existingItem.totalPrice;
                delete state.items[$id];
            }
        },
        // updateItemQuantity: (state, action) => {
        //     if (!state.items) {
        //         state.items = {};
        //     }
        //     const { $id, quantity } = action.payload;
        //     if ($id in state.items) {
        //         const existingItem = state.items[$id];
        //         state.totalQuantity += quantity - existingItem.quantity;
        //         state.totalPrice += existingItem.price * (quantity - existingItem.quantity);
        //         existingItem.quantity = quantity;
        //         existingItem.totalPrice = existingItem.price * quantity;
        //     }
        // },
        clearCart: (state) => {
            state.items = {};
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
    },
});

export const { addItem, removeItem, updateItemQuantity, clearCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
