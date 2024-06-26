import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Airframe } from '../../data/type/airframe.h';

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
});

export const { setAirframe } = airframeSlice.actions;
export default airframeSlice.reducer;
