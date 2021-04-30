export const API_BASE = "http://localhost:8080";

export const clamp = (num: number, hi: number, lo: number) => {
    if (num > hi) return hi;
    if (num < lo) return lo;
    return num;
}
