import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Airframe } from '../../data/type/airframe.h';
import { resetAll } from './resetAllSlice';

export interface AirframeState {
    selectedAirframe: Airframe | null;
}

const initialState: AirframeState = {
    selectedAirframe: null,
};

const airframeSlice = createSlice({
    name: 'airframe',
    initialState,
    reducers: {
        setAirframe: (state, action: PayloadAction<Airframe>) => {
            state.selectedAirframe = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetAll, () => initialState);
    },
});

export const { setAirframe } = airframeSlice.actions;
export default airframeSlice.reducer;
