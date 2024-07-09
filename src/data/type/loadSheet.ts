export type LoadSheet = {
    CREW: {
        fdc: number
        cbc: number
    }
    LMTWEIGHT: {
        MTOW: number // Maximum Takeoff Weight In Ton
        MLW: number // Maximum Landing Weight In Ton
        MZFW: number // Maximum Zero Fuel Weight In Ton
    }
    DRYOP: {
        DOW: number,
        DOCG: number
    },
    PAX: {
        front: number,
        middle: number,
        rear: number
    },
    CARGO: {
        front: number,
        middle: number,
        rear: number
    },
    FUEL: {
        FOB: number
        TripFuel: number
        TaxiFuel: number
    }
}