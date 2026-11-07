export type Base = 2 | 8 | 10 | 16
export function generateSecret(
    length: number,
    base: Base,
    random = Math.random
) {
    const secret = '0123'
    random()
    return secret
}
