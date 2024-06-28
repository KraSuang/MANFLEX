import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadSheet } from '../../data/type/loadSheet.ts';
import { resetAll } from './resetAllSlice.ts';

export interface PerformanceState {
    loadSheet: LoadSheet
}

const initialState: PerformanceState = {
    loadSheet: {
        CREW: {
            fdc: 0,
            cbc: 0
        },
        LMTWEIGHT: {
            MTOW: 0,
            MLW: 0,
            MZFW: 0
        },
        DRYOP: {
            DOW: 0, 
            DOCG: 0
        },
        PAX: {
            front: 0,
            middle: 0,
            rear: 0
        },
        CARGO: {
            front: 0,
            middle: 0,
            rear: 0
        },
        FUEL: {
            FOB: 0,
            TripFuel: 0,
            TaxiFuel: 0
        }
    }
};

interface UpdateCrew {
    fdc: number 
    cbc: number
}

const performanceSlice = createSlice({
    name: 'performance',
    initialState,
    reducers: {
        setCrew: (state, action: PayloadAction<UpdateCrew>) => {
            const { fdc, cbc } = action.payload;

            state.loadSheet.CREW.fdc = fdc;
            state.loadSheet.CREW.cbc = cbc;

        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetAll, () => initialState);
    },
})

export const {
    setCrew,
} = performanceSlice.actions;
export default performanceSlice.reducer;
