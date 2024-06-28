import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { resetAll } from './resetAllSlice.ts';
export interface FlightState {
    registration: string;
    flightNo: string;
}

const initialState: FlightState = {
    registration: '',
    flightNo: '',
};

const flightSlice = createSlice({
    name: 'flight',
    initialState,
    reducers: {
        setRegistration: (state, action: PayloadAction<string>) => {
            state.registration = action.payload;
        },
        setFlightNo: (state, action: PayloadAction<string>) => {
            state.flightNo = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetAll, () => initialState);
    },
});

export const { setRegistration, setFlightNo } = flightSlice.actions;
export default flightSlice.reducer;
