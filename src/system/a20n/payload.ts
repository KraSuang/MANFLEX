import { Rc, Cell } from '@manflex/wasm'
import { Vector3, Mass } from '../common/unit.c.ts';
import { 
    CargoDeck,
    PassengerDeck,
    PayloadManager,
} from "../common/payload.c.ts";
import { PaxInfo, CargoInfo } from "../common/type/payload.h.ts";

export enum A20NPax {
    A,
    B,
    C,
    D
}

export class A20NPaxConverter {
    static toNumber(value: A20NPax): number {
        return value;
    }

    static fromNumber(value: number): A20NPax {
        switch (value) {
            case 0:
                return A20NPax.A;
            case 1:
                return A20NPax.B;
            case 2:
                return A20NPax.C;
            case 3:
                return A20NPax.D;
            default:
                throw new Error(`Cannot convert from ${value} to A20NPax.`);
        }
    }
}

export enum A20NCargo {
    FWDBaggage,
    AFTContainer,
    AFTBaggage,
    AFTBulkLoose
}

export class A20NCargoConverter {
    static toNumber(value: A20NCargo): number {
        return value;
    }

    static fromNumber(value: number): A20NCargo {
        switch (value) {
            case 0:
                return A20NCargo.FWDBaggage;
            case 1:
                return A20NCargo.AFTContainer;
            case 2:
                return A20NCargo.AFTBaggage;
            case 3:
                return A20NCargo.AFTBulkLoose;
            default:
                throw new Error(`Cannot convert from ${value} to A20NCargo.`);
        }
    }
}

export class A20NPayload {
    payload_manager: PayloadManager;

    constructor(payload_manager: PayloadManager) {
        this.payload_manager = payload_manager;
    }

    public static DEFAULT_PER_PAX_WEIGHT_KG = 84;

    static A20N_PAX: PaxInfo[] = [
        {
            max_pax: 36,
            position: [20.5, 0, 5],
            pax_id: "PAX_A",
        },
        {
            max_pax: 42,
            position: [1.5, 0, 5.1],
            pax_id: "PAX_B",
        },
        {
            max_pax: 48,
            position: [-16.6, 0, 5.3],
            pax_id: "PAX_C",
        },
        {
            max_pax: 48,
            position: [-35.6, 0, 5.3],
            pax_id: "PAX_D",
        },
    ];

    static A20N_CARGO: CargoInfo[] = [
        {
            max_cargo_kg: 3402,
            position: [17.3, 0, 0],
            cargo_id: "CARGO_FWD_BAGGAGE_CONTAINER",
        },
        {
            max_cargo_kg: 2426,
            position: [-24.1, 0, 1],
            cargo_id: "CARGO_AFT_CONTAINER",
        },
        {
            max_cargo_kg: 2110,
            position: [-34.1, 0, 1.2],
            cargo_id: "CARGO_AFT_BAGGAGE",
        },
        {
            max_cargo_kg: 1497,
            position: [-42.4, 0, 1.4],
            cargo_id: "CARGO_AFT_BULK_LOOSE",
        },
    ];

    static createWithDefaultWeight(): A20NPayload {
        const per_pax_weight = new Rc(new Cell(Mass.new(A20NPayload.DEFAULT_PER_PAX_WEIGHT_KG, 'kilogram')));

        const pax: any = A20NPayload.A20N_PAX.map(p => {
            return (
                per_pax_weight.clone(),
                new Vector3(p.position[0], p.position[1], p.position[2]),
                p.max_pax
            );
        });

        // Initialize cargo or any other setup logic here

        const cargo: any = A20NPayload.A20N_CARGO.map(c => {
            return (
                per_pax_weight.clone(), // Example initialization; adjust as per Cargo setup
                new Vector3(c.position[0], c.position[1], c.position[2]),
                c.max_cargo_kg
            );
        });

        const passenger_deck = new PassengerDeck(pax)
        const cargo_deck = new CargoDeck(cargo); // Example setup; adjust as per your CargoDeck setup

        // Other initialization logic if needed

        const payload_manager = new PayloadManager(
            per_pax_weight,
            passenger_deck,
            cargo_deck,
        );

        return new A20NPayload(payload_manager);
    }

    Pax_Num(ps: number): number {
        return this.payload_manager.Pax_Num(ps);
    }

    Total_Pax_Num(): number {
        return this.payload_manager.Total_Pax_Num();
    }

    Total_Passenger_Load(): Mass {
        return this.payload_manager.Total_Passenger_Load();
    }

    Total_Target_Passenger_Load(): Mass {
        return this.payload_manager.Total_Target_Passenger_Load();
    }

    Total_Passenger_Moment(): Vector3 {
        return this.payload_manager.Total_Passenger_Moment();
    }

    Total_Target_Passenger_Moment(): Vector3 {
        return this.payload_manager.Total_Target_Passenger_Moment();
    }


    Total_Cargo_Load(): Mass {
        return this.payload_manager.Total_Cargo_Load();
    }
    
    Total_Target_Cargo_Load(): Mass {
        return this.payload_manager.Total_Target_Cargo_Load();
    }

    Total_Cargo_Moment(): Vector3 {
        return this.payload_manager.Total_Cargo_Moment();
    }

    Total_Target_Cargo_Moment(): Vector3 {
        return this.payload_manager.Total_Target_Cargo_Moment();
    }

    Passenger_Center_Of_Gravity(): Vector3 {
        const total_pax_load = this.Total_Passenger_Load().convertTo('kilogram');
        if (total_pax_load > 0) {
            return this.Total_Cargo_Moment().divide(total_pax_load);
        } else {
            return Vector3.zeros(); // Assuming Vector3 class has a static method for zeros()
        }
    }

    Target_Passenger_Center_Of_Gravity(): Vector3 {
        const Total_Target_pax_load = this.Total_Target_Passenger_Load().convertTo('kilogram');
        if (Total_Target_pax_load > 0) {
            return this.Total_Target_Passenger_Moment().divide(Total_Target_pax_load);
        } else {
            return Vector3.zeros(); // Assuming Vector3 class has a static method for zeros()
        }
    }

    Cargo_Center_Of_Gravity(): Vector3 {
        const total_cargo_load = this.Total_Cargo_Load().convertTo('kilogram');
        if (total_cargo_load > 0) {
            return this.Total_Cargo_Moment().divide(total_cargo_load);
        } else {
            return Vector3.zeros(); // Assuming Vector3 class has a static method for zeros()
        }
    }

    Target_Cargo_Center_Of_Gravity(): Vector3 {
        const Total_Target_cargo_load = this.Total_Target_Cargo_Load().convertTo('kilogram');
        if (Total_Target_cargo_load > 0) {
            return this.Total_Target_Cargo_Moment().divide(Total_Target_cargo_load);
        } else {
            return Vector3.zeros(); // Assuming Vector3 class has a static method for zeros()
        }
    }

    // Methods for testing (these would be conditionally compiled in Rust)
    Max_Pax(ps: number): number {
        return this.payload_manager.Max_Pax(ps);
    }

    Cargo(cs: number): Mass {
        return this.payload_manager.Cargo(cs);
    }

    Cargo_Payload(cs: number): Mass {
        return this.payload_manager.Cargo_Payload(cs);
    }

    Pax_Payload(ps: number): Mass {
        return this.payload_manager.Pax_Payload(ps);
    }
}