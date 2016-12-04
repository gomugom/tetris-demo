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

const DEFAULT_BLOCKS = [...'0'.repeat(ROW + HIDDEN_ROW)].map(()=>
    new Array(COL).fill(0)
);


const CONST = {
    KEYBOARD_NAME,
    SCORE_POINT,
    COL,
    ROW,
    HIDDEN_ROW,
    INITIAL_DURATION,
    DECREASE_DURATION_FACTOR,
    BLOCK_TYPES,
    DEFAULT_BLOCKS
}

Object.freeze(CONST);

module.exports = CONST;
