const KEYBOARD_NAME = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};

const SCORE_POINT = [0, 100, 500, 1000, 2000];

const COL = 10;
const ROW = 20;
const HIDDEN_ROW = 4;

const INITIAL_DURATION = 1000;
const DECREASE_DURATION_FACTOR = 4.5;
const BLOCK_TYPES = 7;

const getEmptyArray = rows => [...'0'.repeat(rows)].map(()=> new Array(COL).fill(0));

const GET_DEFAULT_HIDDEN_ROWS = ()=> getEmptyArray(HIDDEN_ROW);
const DEFAULT_BLOCKS = getEmptyArray(ROW + HIDDEN_ROW);

const CONST = {
    KEYBOARD_NAME,
    SCORE_POINT,
    COL,
    ROW,
    HIDDEN_ROW,
    INITIAL_DURATION,
    DECREASE_DURATION_FACTOR,
    BLOCK_TYPES,
    GET_DEFAULT_HIDDEN_ROWS,
    DEFAULT_BLOCKS
}

Object.freeze(CONST);

module.exports = CONST;
