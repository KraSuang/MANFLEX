import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Checklist } from './../../data/type/checklist.h.ts';
import { resetAll } from './resetAllSlice.ts';

export interface ChecklistState {
    data: Checklist | null;
}

const initialState: ChecklistState = {
    data: null
};

interface UpdatePayload {
    sectionName: String;
    itemIndex: number;
    itemType: 'top' | 'below';
    status: 'check' | 'skip' | 'none';
}

interface ResetPayload {
    sectionName: String;
}

interface UpdateSectionStatusPayload {
    sectionName: String;
    status: 'none' | 'check' | 'skip';
}

const checklistSlice = createSlice({
    name: 'checklist',
    initialState,
    reducers: {
        setChecklist: (state, action: PayloadAction<Checklist>) => {
            state.data = action.payload;
        },
        updateChecklistStatus: (state, action: PayloadAction<UpdatePayload>) => {
            const { sectionName, itemIndex, itemType, status } = action.payload;
            
            const section = state.data?.find(section => section.name === sectionName);

            if (section) {
                if (itemType === 'top' && section.top[itemIndex]) {
                    section.top[itemIndex].status = status;
                } else if (itemType === 'below' && section.below && section.below[itemIndex]) {
                    section.below[itemIndex].status = status;
                }
            }
        }, 
        resetChecklistStatus: (state, action: PayloadAction<ResetPayload>) => {
            const { sectionName } = action.payload;

            const section = state.data?.find(section => section.name === sectionName);

            if (section) {
                section.top.forEach(item => item.status = 'none');
                if (section.below) {
                    section.below.forEach(item => item.status = 'none');
                }
            }
        },

        updateSectionStatus: (state, action: PayloadAction<UpdateSectionStatusPayload>) => {
            const { sectionName, status } = action.payload;

            const section = state.data?.find(section => section.name === sectionName);

            if (section) {
                section.status = status;
            }
        },

        resetAllChecklistStatus: (state) => {
            if (state.data) {
                state.data.forEach(section => {
                    section.status = 'none';
                    section.top.forEach(item => item.status = 'none');
                    if (section.below) {
                        section.below.forEach(item => item.status = 'none');
                    }
                });
            }
        },
    },

    extraReducers: (builder) => {
        builder.addCase(resetAll, () => initialState);
    },
});

export const { setChecklist, updateChecklistStatus, resetChecklistStatus, updateSectionStatus, resetAllChecklistStatus } = checklistSlice.actions;
export default checklistSlice.reducer;
