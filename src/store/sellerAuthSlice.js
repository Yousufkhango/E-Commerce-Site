import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null
}

const sellerAuthSlice = createSlice({
    name: "sellerAuth",
    initialState,
    reducers: {
        sellerLogin: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        sellerLogout: (state) => {
            state.status = false;
            state.userData = null;
        }
     }
})

export const {sellerLogin, sellerLogout} = sellerAuthSlice.actions;

export default sellerAuthSlice.reducer;