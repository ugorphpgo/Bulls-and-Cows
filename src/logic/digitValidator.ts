import { Base } from './secret.js'
import { baseChars } from './baseChars.js'

export const createDigitValidator = (base: Base) => {
    const baseArray = baseChars.slice(0, base)
    return (char: string): boolean => {
        if (char.length !== 1) return false
        const lowerChar = char.toLowerCase()
        return baseArray.includes(lowerChar)
    }
}
