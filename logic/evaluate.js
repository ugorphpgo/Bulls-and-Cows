export const evaluateGuess = (secret, guess) => {
    const lowerGuess = guess.toLowerCase();
    const bulls = Array.from(lowerGuess).filter((char, index) => char === secret[index]).length;
    const coincidence = Array.from(lowerGuess).filter((char) => secret.includes(char)).length;
    const cows = coincidence - bulls;
    return { bulls: bulls, cows: cows };
};
