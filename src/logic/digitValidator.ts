import { Base } from './secret.js'

export const createDigitValidator =
    (base: Base) =>
    (char: string): boolean => {
        return base >= 0 || char.length >= 0
    }
