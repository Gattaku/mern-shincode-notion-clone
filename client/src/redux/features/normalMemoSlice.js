import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
}

export const normalMemoSlice = createSlice({
    name: "normalMemo",
    initialState,
    reducers: {
        setNormalMemo: (state, action) => {
            state.value = action.payload;
        },
    },
})

export const { setNormalMemo } = normalMemoSlice.actions;
export default normalMemoSlice.reducer;
