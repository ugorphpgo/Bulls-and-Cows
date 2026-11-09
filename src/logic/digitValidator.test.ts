import { describe, expect, it } from 'vitest'
import { createDigitValidator } from './digitValidator.js'

describe('createDigitValidator', () => {
    it.each([
        [2, '1', true],
        [2, '2', false],
        [8, '7', true],
        [8, '8', false],
        [10, '9', true],
        [10, 'a', false],
        [10, 'A', false],
        [16, 'f', true],
        [16, 'F', true],
        [16, 'g', false],
        [10, '', false],
        [10, '12', false],
        [10, ' ', false],
    ] as const)('base %i содержит "%s" ->  %s', (base, char, expected) => {
        const baseValidator = createDigitValidator(base) // 1) получить валидатор для base
        expect(baseValidator(char)).toBe(expected) // 2) спросить его про char и сравнить с expected
    })
})
