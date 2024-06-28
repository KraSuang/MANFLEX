// redux/slice/resetSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const resetSlice = createSlice({
    name: 'reset',
    initialState: {},
    reducers: {
        resetAll: (state) => {
            return state;
        },
    },
});

export const { resetAll } = resetSlice.actions;
export default resetSlice.reducer;
