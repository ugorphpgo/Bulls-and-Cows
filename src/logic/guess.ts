import { Base } from './secret.js'

export const isValidGuess = (guess: string, length: number, base: Base) => {
    return base >= 0
}
