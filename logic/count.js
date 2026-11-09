const cache = new Map();
export const countPossibleSecrets = (length, base) => {
    const key = `${length}-${base}`;
    const saved = cache.get(key);
    if (saved !== undefined)
        return saved;
    if (length === 0)
        return 1;
    const result = base * countPossibleSecrets(length - 1, base - 1);
    cache.set(key, result);
    return result;
};
