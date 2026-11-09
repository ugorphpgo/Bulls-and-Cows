import { describe, expect, it } from 'vitest'
import { countPossibleSecrets } from './count.js'

describe('countPossibleSecrets', () => {
    it.each([
        [0, 10, 1],
        [1, 10, 10],
        [3, 10, 720],
        [4, 10, 5040],
        [2, 2, 2],
        [2, 16, 240],
    ] as const)(
        'countPossibleSecrets(%i X %i to be %i)',
        (length, base, expected) => {
            expect(countPossibleSecrets(length, base)).toBe(expected)
        }
    )
})
