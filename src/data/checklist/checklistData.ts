import { Checklist } from './../type/checklist.h.ts';
import { a32xChecklist } from './a32xChecklist.ts';

const checklist: { [id: string]: Checklist } = {
    a20n: a32xChecklist,
};

export const getChecklistById = (id: string): Checklist | undefined => {
    return checklist[id];
};
