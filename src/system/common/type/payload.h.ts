import { Vector3, Mass } from "../unit.c";

export class LoadsheetInfo {
    operating_empty_weight_kg: number;
    operating_empty_position: [number, number, number];
    per_pax_weight_kg: number;
    mean_aerodynamic_chord_size: number;
    leading_edge_mean_aerodynamic_chord: number;

    constructor(operating_empty_weight_kg: number, operating_empty_position: [number, number, number], per_pax_weight_kg: number, mean_aerodynamic_chord_size: number, leading_edge_mean_aerodynamic_chord: number) {
        this.operating_empty_weight_kg = operating_empty_weight_kg;
        this.operating_empty_position = operating_empty_position;
        this.per_pax_weight_kg = per_pax_weight_kg;
        this.mean_aerodynamic_chord_size = mean_aerodynamic_chord_size;
        this.leading_edge_mean_aerodynamic_chord = leading_edge_mean_aerodynamic_chord;
    }
}

export class PaxInfo {
    max_pax: number;
    position: [number, number, number];
    pax_id: string

    constructor(max_pax: number, position: [number, number, number], pax_id: string) {
        this.max_pax = max_pax;
        this.position = position;
        this.pax_id = pax_id;
    }
}

export class CargoInfo {
    max_cargo_kg: number;
    position: [number, number, number];
    cargo_id: string;

    constructor(max_cargo_kg: number, position: [number, number, number], cargo_id: string) {
        this.max_cargo_kg = max_cargo_kg,
        this.position = position
        this.cargo_id = cargo_id
    }
}

export class PaxProps {
    pax: number;
    per_pax_weight: Mass;
    pax_num: number;
    pax_target: number
    payload: Mass;
    target_payload: Mass;
    max_pax: number;
    position: Vector3;

    constructor(pax: number, per_pax_weight: Mass, pax_target: number, pax_num: number, payload: Mass, target_payload: Mass, max_pax: number, position: Vector3){
        this.pax = pax
        this.per_pax_weight = per_pax_weight;
        this.pax_target = pax_target
        this.pax_num = pax_num;
        this.payload = payload;
        this.target_payload = target_payload;
        this.max_pax = max_pax;
        this.position = position;
    }
}

export interface CargoProps {
    cargo: Mass;
    cargo_load: Mass;
    cargo_target: Mass;
    payload: Mass;

    position: Vector3;
    max_capacity: Mass;
}



