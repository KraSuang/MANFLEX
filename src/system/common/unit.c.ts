export class Vector3 {
    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    divide(scalar: number): Vector3 {
        return new Vector3(this.x / scalar, this.y / scalar, this.z / scalar);
    }

    add(vector: Vector3): Vector3 {
        return new Vector3(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }

    static zeros(): Vector3 {
        return new Vector3(0, 0, 0);
    }
}

export type MassUnit = 'kilogram' | 'pound';

export class Mass {
    value: number;
    unit: MassUnit;

    constructor(value: number, unit: MassUnit) {
        this.value = value;
        this.unit = unit;
    }

    static default(): Mass {
        return new Mass(0, 'kilogram'); // Default to 0 kilograms
    }

    static new(value: number, unit: MassUnit): Mass {
        return new Mass(value, unit); // Factory method to create a new instance
    }

    convertTo(unit: MassUnit): number {
        if (this.unit === 'kilogram' && unit === 'pound') {
            return this.value * 2.20462; // 1KG = 2.20462lbs
        } else if (this.unit === 'pound' && unit === 'kilogram') {
            return this.value / 2.20462; // 1 lbs = 0.453592KG
        } else {
            return this.value; // Return as-is if units are the same or conversion not supported
        }
    }

    equals(other: Mass): boolean {
        // Compare values after converting to the same unit
        const otherValueInCurrentUnit = other.convertTo(this.unit);
        return this.value === otherValueInCurrentUnit;
    }

    toString(): string {
        return `${this.value} ${this.unit}`;
    }

    add(other: Mass): Mass {
        const convertedOther = other.convertTo(this.unit);
        return new Mass(this.value + convertedOther, this.unit);
    }

    subtract(other: Mass): Mass {
        const convertedOther = other.convertTo(this.unit);
        return new Mass(this.value - convertedOther, this.unit);
    }

    multiply(scalar: number): Mass {``
        return new Mass(this.value * scalar, this.unit);
    }

    divide(divisor: number): Mass {
        return new Mass(this.value / divisor, this.unit);
    }

    static zero(unit: MassUnit): Mass {
        return new Mass(0, unit);
    }
}