import { count_ones } from "@manflex/wasm";
import { Rc, Cell } from '@manflex/wasm'
import { Mass, Vector3, MassUnit } from "./unit.c.ts";
import { random_from_range } from "./Shared/random.ts";

interface numberOfPassengerProps {
    numberOfPassengers(ps: number): number;
}

export class NumberOfPassengers implements numberOfPassengerProps {

    private currentPassengers: number = 0;

    numberOfPassengers(ps: number): number {
        this.currentPassengers = ps
        return this.currentPassengers
    }
}

interface passengerPayloadProps {
    total_passenger_load(value: number, unit: MassUnit): Mass;
    total_target_passenger_load(value: number, unit: MassUnit): Mass;

    center_of_gravity(x: number, y: number, z: number): Vector3;
    fore_aft_center_of_gravity(value: number): number;
    target_center_of_gravity(x: number, y: number, z: number): Vector3;
    target_fore_aft_center_of_gravity(value: number): number
}

export class PassengerPayload implements passengerPayloadProps {
    total_passenger_load(value: number, unit: MassUnit): Mass {
        return new Mass(value, unit);
    }

    total_target_passenger_load(value: number, unit: MassUnit): Mass {
        return new Mass(value, unit)
    }



    center_of_gravity(x: number, y: number, z: number): Vector3 {
        return new Vector3(x, y, z);
    }

    fore_aft_center_of_gravity(value: number): number {
        return value;
    }

    target_center_of_gravity(x: number, y: number, z: number): Vector3 {
        return new Vector3(x, y, z);
    }

    target_fore_aft_center_of_gravity(value: number): number {
        return value;
    }
}




interface cargoPayloadProps {
    Total_Cargo_Load(value: number, unit: MassUnit): Mass;
    Total_Target_Cargo_Load(value: number, unit: MassUnit): Mass;

    Center_Of_Gravity(x: number, y: number, z: number): Vector3;
    Fore_Aft_Center_Of_Gravity(value: number): number;
    Target_Center_Of_Gravity(x: number, y: number, z: number): Vector3;
    Target_Fore_Aft_Center_Of_Gravity(value: number): number;
}

export class CargoPayload implements cargoPayloadProps {
    Total_Cargo_Load(value: number, unit: MassUnit): Mass {
        return new Mass(value, unit);
    }

    Total_Target_Cargo_Load(value: number, unit: MassUnit): Mass {
        return new Mass(value, unit);
    }



    Center_Of_Gravity(x: number, y: number, z: number): Vector3 {
        return new Vector3(x, y, z);
    }

    Fore_Aft_Center_Of_Gravity(value: number): number {
        return value;
    }

    Target_Center_Of_Gravity(x: number, y: number, z: number): Vector3 {
        return new Vector3(x, y, z);
    }

    Target_Fore_Aft_Center_Of_Gravity(value: number): number {
        return value;
    }
}




export class PassengerDeck {
    pax: Pax[];

    constructor(pax: Pax[]) {
        this.pax = pax;
    }

    Pax_Num(ps: number): number {
        return this.pax[ps].Pax_Num()
    }

    Total_Pax_Num(): number {
        return this.pax.reduce((total, ps) => total + ps.Pax_Num(), 0);
    }

    Pax_Payload(ps: number): Mass {
        return this.pax[ps].Payload();
    }

    Pax_Target_Payload(ps: number): Mass {
        return this.pax[ps].Payload_Target();
    }

    Max_Pax(ps: number): number {
        return this.pax[ps].Max_Pax();
    }

    Has_Pax(): boolean {
        return this.pax.some(ps => ps.Pax_Num() > 0);
    }

    Total_Passenger_Load(): Mass {
        return this.pax.reduce((total, ps) => total.add(ps.Payload()), Mass.default());
    }

    Total_Target_Passenger_Load(): Mass {
        return this.pax.reduce((total, ps) => total.add(ps.Payload_Target()), Mass.default());
    }

    Total_Passenger_Moment(): Vector3 {
        return this.pax.reduce((total, ps) => {
            const moment = ps.Pax_Moment();
            return new Vector3(total.x + moment.x, total.y + moment.y, total.z + moment.z);
        }, new Vector3(0, 0, 0));
    }

    Total_Target_Passenger_Moment(): Vector3 {
        return this.pax.reduce((total, ps) => {
            const moment = ps.Pax_Target_Moment();
            return new Vector3(total.x + moment.x, total.y + moment.y, total.z + moment.z);
        }, new Vector3(0, 0, 0));
    }

    Is_Pax_Loaded(): boolean {
        return this.pax.every(ps => ps.Pax_Is_Target());
    }

    Override_Payload(ps: number, payload: Mass): void {
        this.pax[ps].Override_Payload(payload);
    }

    Target_None(): void {
        this.pax.forEach(ps => ps.Reset_Pax_Target());
    }
}




export class CargoDeck {
    cargo: Cargo[]

    constructor (cargo: Cargo[]) {
        this.cargo = cargo
    }

    public station(cs: number): Cargo {
        return this.cargo[cs];
    }

    Cargo(cs: number): Mass {
        return this.cargo[cs].Cargo()
    }

    Cargo_Payload(cs: number): Mass {
        return this.cargo[cs].Payload()
    }

    Total_Cargo_Load(): Mass {
        return this.cargo.reduce((total, cs) => total.add(cs.Cargo()), Mass.default());
    }

    Total_Target_Cargo_Load(): Mass {
        return this.cargo.reduce((total, cs) => total.add(cs.Cargo_Target()), Mass.default());
    }

    Total_Cargo_Moment(): Vector3 {
        return this.cargo.reduce((total: Vector3, cs) => {
            const cargoMoment = cs.Cargo_Moment();
            return total.add(cargoMoment);
        }, Vector3.zeros());
    }

    Total_Target_Cargo_Moment(): Vector3 {
        return this.cargo.reduce((total: Vector3, cs) => {
            const cargoTargetMoment = cs.Cargo_Target_Moment();
            return total.add(cargoTargetMoment);
        }, Vector3.zeros());
    }

    Max_Cargo(cs: number): Mass {
        return this.cargo[cs].Max_Capacity();
    }

    Is_Cargo_Loaded(): boolean {
        return this.cargo.every(cs => cs.Cargo_Is_Target());
    }

    Update_Cargo_Loaded(): void {
        this.cargo.forEach(cs => cs.Update_Cargo_Loaded());
    }

    Reset_Cargo_Loaded(): void {
        this.cargo.forEach(cs => cs.Reset_Cargo_Loaded());
    }

    Load_Cargo_Deck_Percent(p: number): void {
        this.cargo.forEach(cs => cs.Load_Cargo_Percent(p));
    }

    Target_None(): void {
        this.cargo.forEach(cs => cs.Reset_Cargo_Target());
    }

    Move_One_Cargo(): void {
        for (let i = 0; i < this.cargo.length; i++) {
            const cs = this.cargo[i];
            if (!cs.Cargo_Is_Target()) {
                cs.Move_One_Cargo();
                break;
            }
        }
    }

    Spawn_All_Cargo(): void {
        this.cargo.forEach(cs => {
            if (!cs.Cargo_Is_Target()) {
                cs.Spawn_Cargo();
            }
        });
    }
}




export class Pax {
    pax: number;
    per_pax_weight: Cell<Mass>;
    pax_num: number;
    pax_target: number
    payload: Mass;
    target_payload: Mass;
    max_pax: number;
    position: Vector3;

    constructor(
        pax: number,
        per_pax_weight: Cell<Mass>,
        pax_num: number,
        pax_target: number,
        payload: Mass,
        target_payload: Mass,
        max_pax: number,
        position: Vector3,
    ) {
        this.pax = pax;
        this.per_pax_weight = per_pax_weight;
        this.pax_num = pax_num;
        this.pax_target = pax_target;
        this.payload = payload;
        this.target_payload = target_payload;
        this.max_pax = max_pax;
        this.position = position;
    }

    private static JS_MAX_SAFE_INTEGER = 53;

    static new(per_pax_weight: Cell<Mass>, pax_num: number, target_payload: Mass, max_pax: number, position: Vector3) {
        return {
            pax: 0,
            per_pax_weight,
            pax_num,
            pax_target: 0,
            payload: Mass.default(),
            target_payload,
            max_pax,
            position
        }
    }

    Per_Pax_Weight(): Mass {
        return this.per_pax_weight.get();
    }

    Pax_Is_Target(): boolean {
        return this.pax === this.pax_target;
    }


    Pax(): number {
        return this.pax;
    }

    Pax_Num(): number {
        return count_ones(this.pax)
    }

    Pax_Target_Num(): number  {
        return count_ones(this.pax_target)
    }

    Max_Pax(): number {
        return this.max_pax;
    }

    Payload(): Mass {
        return this.payload;
    }

    Payload_Target(): Mass {
        const payloadTargetInPounds = this.Pax_Target_Num() * this.Per_Pax_Weight().convertTo('pound');
        return new Mass(payloadTargetInPounds, 'pound');
    }

    Pax_Moment(): Vector3{
        const paxMomentX = this.Pax_Num() * this.Per_Pax_Weight().convertTo('kilogram') * this.position.x;
        const paxMomentY = this.Pax_Num() * this.Per_Pax_Weight().convertTo('kilogram') * this.position.y;
        const paxMomentZ = this.Pax_Num() * this.Per_Pax_Weight().convertTo('kilogram') * this.position.z;

        return new Vector3(paxMomentX, paxMomentY, paxMomentZ);
    }

    Pax_Target_Moment(): Vector3 {
        const paxMomentX = this.Pax_Target_Num() * this.Per_Pax_Weight().convertTo('kilogram') * this.position.x;
        const paxMomentY = this.Pax_Target_Num() * this.Per_Pax_Weight().convertTo('kilogram') * this.position.y;
        const paxMomentZ = this.Pax_Target_Num() * this.Per_Pax_Weight().convertTo('kilogram') * this.position.z;

        return new Vector3(paxMomentX, paxMomentY, paxMomentZ);
    }

    Payload_Is_Sync(): boolean {
        const expectedPayloadInPounds = this.Pax_Num() * this.Per_Pax_Weight().convertTo('pound');

        return this.payload.equals(new Mass(expectedPayloadInPounds, 'pound'));
    }

    Override_Payload(payload: Mass): void {
        this.payload = payload;
    }

    Load_Payload(): void {
        const payloadInPounds = this.Pax_Num() * this.Per_Pax_Weight().convertTo('pound');

        this.payload = new Mass(payloadInPounds,'pound');
    }

    Spawn_Pax(): void {
        this.pax = this.pax_target;
        this.Load_Payload();
    }

    Move_Num_Pax(pax: number): void {
        for (let i = 0; i < pax; i++) {
            this.Move_One_Pax();
        }
    }

    Move_One_Pax(): void {
        const pax_diff = this.Pax_Target_Num() - this.Pax_Num();

        let n = pax_diff > 0 ? ~(this.pax) & this.pax_target : this.pax & ~(this.pax_target);
        let count = count_ones(n);
        
        if (count > 0) {
            let skip = random_from_range(0, count); // Using random_from_range here

            for (let i = 0; i < Pax.JS_MAX_SAFE_INTEGER; i++) {
                let bit = 1 << i;
                if ((n & bit) > 0) {
                    if (skip <= 0) {
                        this.pax ^= bit;
                        break;
                    }
                    skip--;
                }
            }
        }
        this.Load_Payload();
    }

    Reset_Pax_Target(): void {
        this.pax_target = 0;
    }
}




export class Cargo {
    cargo: Mass;
    cargo_loaded: Mass;
    cargo_target: Mass;
    payload: Mass;

    position: Vector3;
    max_capacity: Mass;

    constructor(cargo: Mass, cargo_load: Mass, cargo_Target: Mass, payload: Mass, position: Vector3, max_capacity: Mass) {
        this.cargo = cargo;
        this.cargo_loaded = cargo_load;
        this.cargo_target = cargo_Target;
        this.payload = payload;
        this.position = position;
        this.max_capacity = max_capacity;
    }

    private static MAX_CARGO_MOVE = 60;

    public static new(cargo: Mass, cargo_loaded: Mass, cargo_target: Mass, position: Vector3, max_capacity: Mass) {
        return { 
            cargo, 
            cargo_loaded, 
            cargo_target, 
            payload: Mass.default(), 
            position, 
            max_capacity 
        }
    }

    Cargo(): Mass {
        return this.cargo;
    }

    Cargo_Target(): Mass {
        return this.cargo_target
    }

    Max_Capacity(): Mass {
        return this.max_capacity;
    }

    Update_Cargo_Loaded(): void {
        this.cargo_loaded = this.cargo
    }

    Reset_Cargo_Loaded(): void {
        this.cargo_loaded = Mass.default()
    }

    Payload(): Mass {
        return this.payload;
    }

    Payload_Is_Sync(): boolean {
        return this.payload === this.cargo
    }

    Cargo_Moment(): Vector3{
        const momentX = this.cargo.convertTo('kilogram') * this.position.x;
        const momentY = this.cargo.convertTo('kilogram') * this.position.y;
        const momentZ = this.cargo.convertTo('kilogram') * this.position.z;

        return new Vector3(momentX, momentY, momentZ)
    }

    Cargo_Target_Moment(): Vector3 {
        const momentX = this.cargo_target.convertTo('kilogram') * this.position.x;
        const momentY = this.cargo_target.convertTo('kilogram') * this.position.y;
        const momentZ = this.cargo_target.convertTo('kilogram') * this.position.z;

        return new Vector3(momentX, momentY, momentZ)
    }

    Cargo_Is_Target(): boolean {
        return this.cargo === this.cargo_target
    }

    Load_Payload(): void {
        this.cargo = this.payload;
    }

    Spawn_Cargo(): void {
        this.cargo = this.cargo_target;
        this.Load_Payload()
    }

    Move_One_Cargo(): void {
        const max_move = Cargo.MAX_CARGO_MOVE;
        const cargoDelta = Math.abs(this.cargo_target.convertTo('kilogram') - this.cargo.convertTo('kilogram'));

        const qty = new Mass(Math.min(cargoDelta, max_move), 'kilogram');

        if (this.cargo.value < this.cargo_target.value) {
            this.cargo = this.cargo.add(qty);
        } else if (this.cargo.value > this.cargo_target.value) {
            this.cargo = this.cargo.subtract(qty);
        }

        this.Load_Payload();
    }

    Load_Cargo_Percent(p: number): void {
        if (this.cargo_loaded.value > 0) {
            this.cargo = this.cargo_loaded.multiply(p / 100);
        } else {
            this.cargo = this.cargo_target.multiply(p / 100);
        }

        this.Load_Payload();
    }

    Reset_Cargo_Target(): void {
        this.cargo_target = Mass.default();
    }
}



export class PayloadManager {
    per_pax_weight: Rc<Cell<Mass>>;
    passenger_deck: PassengerDeck;
    cargo_deck: CargoDeck;

    constructor (per_pax_weight: Rc<Cell<Mass>>,passenger_deck: PassengerDeck, cargo_deck: CargoDeck) {
        this.per_pax_weight = per_pax_weight;
        this.passenger_deck = passenger_deck
        this.cargo_deck = cargo_deck
    }

    public static new(per_pax_weight: Rc<Cell<Mass>>, passenger_deck: PassengerDeck, cargo_deck: CargoDeck) {
        return {
            per_pax_weight,
            passenger_deck,
            cargo_deck,
        }
    }

    public Pax_Num(ps: number): number {
        return this.passenger_deck.Pax_Num(ps)
    }

    public Total_Pax_Num(): number {
        return this.passenger_deck.Total_Pax_Num()
    }

    public Total_Passenger_Load(): Mass {
        return this.passenger_deck.Total_Passenger_Load();
    }

    public Total_Target_Passenger_Load(): Mass {
        return this.passenger_deck.Total_Target_Passenger_Load();
    }

    Total_Passenger_Moment(): Vector3 {
        return this.passenger_deck.Total_Passenger_Moment();
    }

    Total_Target_Passenger_Moment(): Vector3 {
        return this.passenger_deck.Total_Target_Passenger_Moment();
    }

    Total_Cargo_Load(): Mass {
        return this.cargo_deck.Total_Cargo_Load();
    }

    Total_Target_Cargo_Load(): Mass {
        return this.cargo_deck.Total_Target_Cargo_Load();
    }

    Total_Cargo_Moment(): Vector3 {
        return this.cargo_deck.Total_Cargo_Moment();
    }

    Total_Target_Cargo_Moment(): Vector3 {
        return this.cargo_deck.Total_Target_Cargo_Moment();
    }

    Max_Pax(ps: number): number {
        return this.passenger_deck.Max_Pax(ps);
    }

    Pax_Payload(ps: number): Mass {
        return this.passenger_deck.Pax_Payload(ps);
    }

    Pax_Target_Payload(ps: number): Mass {
        return this.passenger_deck.Pax_Target_Payload(ps);
    }

    Cargo(cs: number): Mass {
        return this.cargo_deck.Cargo(cs);
    }

    Cargo_Payload(cs: number): Mass {
        return this.cargo_deck.Cargo_Payload(cs);
    }

    Max_Cargo(cs: number): Mass {
        return this.cargo_deck.Max_Cargo(cs);
    }
    
}