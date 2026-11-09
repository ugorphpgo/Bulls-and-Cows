import { generateSecret } from '../logic/secret.js';
import { createDigitValidator } from '../logic/digitValidator.js';
import { isValidGuess } from '../logic/guess.js';
import { evaluateGuess } from '../logic/evaluate.js';
const STORAGE_KEY = 'bulls-and-cows-records';
const game = {
    secret: '',
    length: 4,
    base: 10,
    history: [],
    startTime: 0,
};
function el(tag, className, ...children) {
    const node = document.createElement(tag);
    if (className)
        node.className = className;
    node.append(...children);
    return node;
}
const baseSelect = el('select', 'select');
for (const base of [2, 8, 10, 16]) {
    const option = el('option', '', String(base));
    option.value = String(base);
    baseSelect.append(option);
}
baseSelect.value = '10';
const lengthSelect = el('select', 'select');
for (let length = 2; length <= 6; length++) {
    const option = el('option', '', String(length));
    option.value = String(length);
    lengthSelect.append(option);
}
lengthSelect.value = '4';
const startButton = el('button', 'button button--primary', 'Начать игру');
const settings = el('div', 'settings', el('label', 'label', 'Система счисления', baseSelect), el('label', 'label', 'Длина', lengthSelect), startButton);
const input = el('input', 'input');
input.autocomplete = 'off';
const checkButton = el('button', 'button button--primary', 'Проверить');
const form = el('form', 'guess', input, checkButton);
const message = el('p', 'message');
const historyList = el('ol', 'history');
const newGameButton = el('button', 'button', 'Новая игра');
const gameBox = el('div', 'game', form, message, historyList, newGameButton);
gameBox.hidden = true;
const recordsBox = el('div', 'records');
document.body.append(el('main', 'app', el('h1', 'title', 'Быки и коровы'), settings, gameBox, el('h2', 'subtitle', 'Рекорды'), recordsBox));
function loadRecords() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
}
function saveRecords(records) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}
function addRecord(records, record) {
    return [...records, record]
        .sort((a, b) => a.attempts - b.attempts || a.time - b.time)
        .slice(0, 10);
}
function formatTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${String(seconds % 60).padStart(2, '0')}`;
}
function renderRecords() {
    const records = loadRecords();
    if (records.length === 0) {
        recordsBox.replaceChildren(el('p', '', 'Пока нет результатов'));
        return;
    }
    const items = records.map((r) => el('li', '', `${r.attempts} поп. · ${formatTime(r.time)} · система ${r.base}, длина ${r.length}`));
    recordsBox.replaceChildren(el('ol', 'records__list', ...items));
}
function getBase() {
    const value = Number(baseSelect.value);
    if (value === 2 || value === 8 || value === 16)
        return value;
    return 10;
}
function updateLengthOptions() {
    const isBin = getBase() === 2;
    for (const option of lengthSelect.options) {
        option.disabled = isBin && option.value !== '2';
    }
    if (isBin)
        lengthSelect.value = '2';
}
function setLocked(locked) {
    baseSelect.disabled = locked;
    lengthSelect.disabled = locked;
    startButton.hidden = locked;
    gameBox.hidden = !locked;
}
function renderHistory() {
    const items = game.history.map((attempt) => el('li', '', `${attempt.guess} — быки: ${attempt.bulls}, коровы: ${attempt.cows}`));
    historyList.replaceChildren(...items);
}
function startGame() {
    game.base = getBase();
    game.length = Number(lengthSelect.value);
    game.secret = generateSecret(game.length, game.base);
    game.history = [];
    game.startTime = Date.now();
    input.value = '';
    input.maxLength = game.length;
    input.placeholder = `${game.length} разных цифр`;
    input.disabled = false;
    checkButton.disabled = false;
    message.textContent = '';
    renderHistory();
    setLocked(true);
    input.focus();
}
function filterInput() {
    const isDigit = createDigitValidator(game.base);
    input.value = Array.from(input.value)
        .filter(isDigit)
        .join('')
        .slice(0, game.length);
}
function finishGame() {
    const time = Date.now() - game.startTime;
    const attempts = game.history.length;
    message.textContent = `Победа! Попыток: ${attempts}, время: ${formatTime(time)}`;
    input.disabled = true;
    checkButton.disabled = true;
    saveRecords(addRecord(loadRecords(), {
        attempts,
        time,
        length: game.length,
        base: game.base,
    }));
    renderRecords();
}
function checkGuess(event) {
    event.preventDefault();
    const guess = input.value.toLowerCase();
    if (!isValidGuess(guess, game.length, game.base)) {
        message.textContent = `Нужно ${game.length} разных цифр`;
        return;
    }
    if (game.history.some((attempt) => attempt.guess === guess)) {
        message.textContent = `Догадка ${guess} уже была`;
        return;
    }
    const result = evaluateGuess(game.secret, guess);
    game.history = [
        ...game.history,
        { guess, bulls: result.bulls, cows: result.cows },
    ];
    message.textContent = '';
    input.value = '';
    renderHistory();
    if (result.bulls === game.length)
        finishGame();
}
function newGame() {
    setLocked(false);
}
baseSelect.addEventListener('change', updateLengthOptions);
startButton.addEventListener('click', startGame);
input.addEventListener('input', filterInput);
form.addEventListener('submit', checkGuess);
newGameButton.addEventListener('click', newGame);
renderRecords();
