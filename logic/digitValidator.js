import { baseChars } from './baseChars.js';
export const createDigitValidator = (base) => {
    const baseArray = baseChars.slice(0, base);
    return (char) => {
        if (char.length !== 1)
            return false;
        const lowerChar = char.toLowerCase();
        return baseArray.includes(lowerChar);
    };
};
