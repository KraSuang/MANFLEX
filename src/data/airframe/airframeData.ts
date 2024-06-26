import { a20n } from './a20n.ts';
import { Airframe } from '../type/airframe.h.ts';

const airframes: { [id: string]: Airframe } = {
    a20n: a20n,
};

export const getAirframeById = (id: string): Airframe | undefined => {
    return airframes[id];
};
