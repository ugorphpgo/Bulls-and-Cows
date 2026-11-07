import { describe, expect, it } from 'vitest'
import { generateSecret } from './secret.js'

describe('generateSecret', () => {
    const length = 4
    const base = 10
    const sequence = (values: number[]) => {
        let count = 0
        return () => {
            const value = values[count]
            count = count + 1
            if (count > values.length) {
                throw new Error('Sequence exhausted')
            }
            return value
        }
    }
    it('should generate a secret of the correct length', () => {
        const secret = generateSecret(length, base, () => 0)
        expect(secret).toHaveLength(length)
    })
    it('should generate a secret without repeated characters', () => {
        const secret = generateSecret(length, base, () => 0)
        expect(new Set(secret).size).toBe(secret.length)
    })
    it('returns the same secret when the random function is mocked', () => {
        const mockRandom = () => 0.5
        const secret1 = generateSecret(length, base, mockRandom)
        const secret2 = generateSecret(length, base, mockRandom)
        expect(secret1).toBe(secret2)
    })
    it('returns the secret calculated by hand for a known random sequence', () => {
        const random = sequence([0.5, 0, 0.99, 0])
        expect(generateSecret(4, 10, random)).toBe('5091')
    })
})
