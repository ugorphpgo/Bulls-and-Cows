export type Base = 2 | 8 | 10 | 16

const baseChars: string[] = Array.from('0123456789abcdef')

export function generateSecret(
    length: number,
    base: Base,
    random = Math.random
) {
    let secret = ''
    let baseArray = baseChars.slice(0, base)
    for (let i = 0; i < length; i++) {
        const indexSecret = Math.floor(random() * baseArray.length)
        secret += baseArray[indexSecret]
        baseArray = baseArray.filter((_, index) => index !== indexSecret)
    }
    return secret
}
