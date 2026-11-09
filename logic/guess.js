import { createDigitValidator } from './digitValidator.js';
export const isValidGuess = (guess, length, base) => {
    const isDigit = createDigitValidator(base);
    const validateDigits = Array.from(guess).every(isDigit);
    const lengthCheck = guess.length === length;
    const returnCheck = new Set(guess.toLowerCase()).size === guess.length;
    return lengthCheck && validateDigits && returnCheck;
};
