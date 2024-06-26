import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Airport } from '../../data/type/airport.h';

export interface AirportState {
    origin: Airport | null;
    destination: Airport | null;
}

const initialState: AirportState = {
    origin: null,
    destination: null,
};

const airportSlice = createSlice({
    name: 'airport',
    initialState,
    reducers: {
        setOrigin: (state, action: PayloadAction<Airport>) => {
            state.origin = action.payload;
        },
        setDestination: (state, action: PayloadAction<Airport>) => {
            state.destination = action.payload;
        },
    },
});

export const { setOrigin, setDestination } = airportSlice.actions;
export default airportSlice.reducer;
