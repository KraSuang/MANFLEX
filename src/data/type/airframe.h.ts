export type Airframe = {
    variant: string;
    icao: string;
    name: string;
    wingtype?: string;
    engines: string;
    performance: Performance;
    PAXandCARGO: PAXandCARGO;
    ISAIncrease: number;
    Trim: TrimTable;
    Takeoff: AirframeTakeoff;
    Landing: AirframeLanding;
    VSpeeds: AirframeVSpeeds;
};

export type Performance = {
    OEW: number;
    OEP: number[];
    PAX_W_RATE: number;
    MAC: number;
    LEMAC: number;
    MAXGW: number;
    MTOW: number;
    MLW: number;
    ZFW: {
        min: number;
        max: number;
    };
    MAXGWCG: number;
    MAXZFWCG: number;
    MAXCARGO: number;
    MAXFUEL: number;
};

export type PAXandCARGO = {
    seatMap: SeatMap[];
    cargo: Cargo[];
};

export type SeatMap = {
    name: string;
    deck: number;
    capacity: number;
    rows: SeatRow[];
    stationIndex: number;
    position: number;
    id: string;
};

export type SeatRow = {
    seats: Seat[];
    x: number;
    y: number;
    xOffset: number;
    yOffset: number;
};

export type Seat = {
    type: number;
    yOffset?: number;
};

export type Cargo = {
    name: string;
    weight: number;
    stationIndex: number;
    position: number;
    progressBarWidth: number;
    id: string;
};

export type TrimTable = {
    MinCG: number;
    MaxCG: number;
    MinTrim: number;
    MaxTrim: number;
};

export type AirframeTakeoff = {
    RotateISA: number;
    WeightReferenceISA: number[];
    TakeoffDistanceTable: number[];
    TakeoffDistanceTableISA: number[];
    AltitudeAdjustment: number;
    TMAXFlex: number;
    TREFAICE: number;
    ThrustMultiplier: number;
    FlapsMultiplier: number[];
    TakeoffRef2Alt2000: number;
    TakeoffRef2Alt4000: number;
    TakeoffRef2Alt6000: number;
    TakeoffRef2Alt8000: number;
};

export type AirframeLanding = {
    WeightReferenceISA: number[];
    DistanceReferenceISA: number[];
    FlapsMultiplier: number[];
    RunwayConditionMultiplier: number[];
    AltitudeCorrectionTable: number[];
    StopDistanceDiffs: number[];
};

export type AirframeVSpeeds = {
    [flaps: string]: {
        [weight: string]: number;
    };
};
