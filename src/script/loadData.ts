import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";

import { Airframe } from "../data/type/airframe.h.ts";
import { Airport } from "../data/type/airport.h.ts";

export type DataState = { 
    data: DataStore
}

type DataStore = {
    airframe: Airframe | null;
    flight_no: String | null,
    reg: String | null,
    airport: {
        origin: Airport | null,
        destination: Airport | null
    }
}

export const loadData = () => {
    const airframeState = useSelector((state: RootState) => state.airframe.selectedAirframe);
    const flightState = useSelector((state: RootState) => state.flight);
    const airportState = useSelector((state: RootState) => state.airport);

    const datas: DataStore = {
        airframe: airframeState,
        flight_no: flightState.flightNo,
        reg: flightState.registration,
        airport: {
            origin: airportState.origin,
            destination: airportState.destination
        }
    }

    return datas;
}
