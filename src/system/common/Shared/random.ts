// TypeScript equivalent for random number generation

let randInitialized = false;
let rng: Math['random'];

function initializeRng(): void {
    if (!randInitialized) {
        rng = Math.random;
        randInitialized = true;
    }
}

export function random_number(): number {
    initializeRng();
    return Math.floor(rng() * 256);
}

export function random_from_range(from: number, to: number): number {
    initializeRng();
    return from + rng() * (to - from);
}

export function random_from_normal_distribution(mean: number, std_dev: number): number {
    initializeRng();
    const u1 = rng();
    const u2 = rng();
    const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return mean + z * std_dev;
}
