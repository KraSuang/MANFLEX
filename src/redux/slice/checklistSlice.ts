import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Checklist } from './../../data/type/checklist.h.ts';

export interface ChecklistState {
    checklist: Checklist | null;
}

const initialState: ChecklistState = {
    checklist: null
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
            state.checklist = action.payload;
        },
        updateChecklistStatus: (state, action: PayloadAction<UpdatePayload>) => {
            const { sectionName, itemIndex, itemType, status } = action.payload;
            
            const section = state.checklist?.data.find(section => section.name === sectionName);

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

            const section = state.checklist?.data.find(section => section.name === sectionName);

            if (section) {
                section.top.forEach(item => item.status = 'none');
                if (section.below) {
                    section.below.forEach(item => item.status = 'none');
                }
            }
        },

        updateSectionStatus: (state, action: PayloadAction<UpdateSectionStatusPayload>) => {
            const { sectionName, status } = action.payload;

            const section = state.checklist?.data.find(section => section.name === sectionName);

            if (section) {
                section.status = status;
            }
        },

        resetAllChecklistStatus: (state) => {
            if (state.checklist) {
                state.checklist.data.forEach(section => {
                    section.status = 'none';
                    section.top.forEach(item => item.status = 'none');
                    if (section.below) {
                        section.below.forEach(item => item.status = 'none');
                    }
                });
            }
        },
    },
});

export const { setChecklist, updateChecklistStatus, resetChecklistStatus, updateSectionStatus, resetAllChecklistStatus } = checklistSlice.actions;
export default checklistSlice.reducer;
