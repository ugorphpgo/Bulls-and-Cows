export const evaluateGuess = (
    secret: string,
    guess: string
): { bulls: number; cows: number } => {
    const lowerGuess = guess.toLowerCase()
    const bulls = Array.from(lowerGuess).filter(
        (char: string, index: number) => char === secret[index]
    ).length
    const coincidence = Array.from(lowerGuess).filter((char) =>
        secret.includes(char)
    ).length
    const cows = coincidence - bulls
    return { bulls: bulls, cows: cows }
}
