export function count_ones(num: number): number {
    const binaryString = num.toString(2);
    
    return binaryString.split('').reduce((acc, bit) => acc + (bit === '1' ? 1 : 0), 0);
}