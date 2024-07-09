export class Cell<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    get(): T {
        return this.value;
    }

    set(newValue: T) {
        this.value = newValue;
    }
}

// Example usage
export class Rc<T> {
    private innerValue: T;

    constructor(initialValue: T) {
        this.innerValue = initialValue;
    }

    clone(): Rc<T> {
        return new Rc(this.innerValue);
    }

    // Example method to access the inner value
    get(): T {
        return this.innerValue;
    }

    // Example method to set the inner value
    set(newValue: T) {
        this.innerValue = newValue;
    }
}
