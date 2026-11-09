import { describe, expect, it } from 'vitest'
import { isValidGuess } from './guess.js'

describe('isValidGuess', () => {
    it.each([
        ['1234', 4, 10, true],
        ['1234', 5, 10, false],
        ['12345', 4, 10, false],
        ['a123', 4, 10, false],
        ['1238', 4, 8, false],
        ['aab1', 4, 16, false],
        ['ABCD', 4, 16, true],
        ['AaCD', 4, 16, false],
    ] as const)(
        'isValidGuess("%s", %i, %i) → %s',
        (guess, length, base, expected) => {
            expect(isValidGuess(guess, length, base)).toBe(expected)
        }
    )
})
