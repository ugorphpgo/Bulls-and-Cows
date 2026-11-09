import { describe, expect, it } from 'vitest'
import { evaluateGuess } from './evaluate.js'

describe('evaluateGuess', () => {
    it.each([
        ['1234', '1234', 4, 0],
        ['1234', '4321', 0, 4],
        ['1234', '1243', 2, 2],
        ['1234', '5678', 0, 0],
        ['abcd', 'ABCD', 4, 0],
    ] as const)(
        'evaluateGuess("%s", "%s") → %i bulls, %i cows',
        (secret, guess, bulls, cows) => {
            expect(evaluateGuess(secret, guess)).toEqual({ bulls, cows })
        }
    )
})
