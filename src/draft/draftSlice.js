import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    draftData: null
}

const draftSlice = createSlice({
    name: "draft",
    initialState,
    reducers: {
        createDraft: (state, action) => {
            state.draftData = action.payload.draftData;
        },
        clearDraft: (state) => {
            state.draftData = null;
        }
     }
})

export const {createDraft, clearDraft} = draftSlice.actions;

export default draftSlice.reducer;