import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: 'coding'
}

const previewSlice = createSlice({
    name:'preview',
    initialState,
    reducers:{
        selectCategory:(state,action) => {
            state.category = action.payload;
        },
    }
})

export const {selectCategory} = previewSlice.actions;

export default previewSlice.reducer;