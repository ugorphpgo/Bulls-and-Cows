import { baseChars } from './baseChars.js';
export function generateSecret(length, base, random = Math.random) {
    let secret = '';
    let baseArray = baseChars.slice(0, base);
    for (let i = 0; i < length; i++) {
        const indexSecret = Math.floor(random() * baseArray.length);
        secret += baseArray[indexSecret];
        baseArray = baseArray.filter((_, index) => index !== indexSecret);
    }
    return secret;
}
