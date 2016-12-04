const generateBlocksHTML = require('./templates/generateBlocksHTML');
const nextBlock = require('./templates/generateNextBlockHTML');
const CONST = require('./constants/CONST');
const Block = require('./Block');
const { getTime } = require('./util');
require('tetris.scss');

class Game {
    constructor() {
        this.dom = {
            main: document.getElementById('main'),
            score: document.getElementById('score'),
            count: document.getElementById('count'),
            time: document.getElementById('time'),
            next: document.getElementById('next')
        }
        this.keyEventHandler = this.keyEventHandler.bind(this);
        this.renderPlayTime = this.renderPlayTime.bind(this);
        this.startGame();
    }

    initGame() {
        this.speed = 1;
        this.score = 0;
        this.count = 0;
        this.time = 0;
        this.tick = null;
        this.playTimer = null;
        this.frame = CONST.DEFAULT_BLOCKS.map(row=>[...row]);
        this.dom.main.innerHTML = generateBlocksHTML(this.frame);
        this.dom.next.innerHTML = nextBlock(0);
        this.dom.time.innerText = getTime(this.time);
        this.dom.score.innerText = this.score;
        this.dom.count.innerText = this.count;
    }

    startGame() {
        this.initGame();
        this.nextBlockIndex = Math.ceil(Math.random() * CONST.BLOCK_TYPES);
        this.addNewBlock();
        this.playTimer = setInterval(this.renderPlayTime, 1000);
        window.addEventListener('keydown', this.keyEventHandler, true);
    }

    endGame() {
        window.removeEventListener('keydown', this.keyEventHandler, true);
        this.block = null;
        clearInterval(this.tick);
        clearInterval(this.playTimer);

        alert('Your Score is ' + this.score);
        const restart = confirm('game over! TRY AGAIN?');
        if(restart) this.startGame();
    }

    renderMain() {
        this.addBlockToArray();
        this.dom.main.innerHTML = generateBlocksHTML(this.frame);
    }

    renderPlayTime() {
        this.dom.time.innerText = getTime(++this.time);
    }

    renderScore() {
        this.speed = Math.ceil((this.count || 1) / 10);
        this.dom.count.innerText = this.count;
        this.dom.score.innerText = this.score;
    }

    renderNext() {
        this.dom.next.innerHTML = nextBlock(this.nextBlockIndex);
    }

    keyEventHandler(e) {
        const key = CONST.KEYBOARD_NAME[e.keyCode];
        switch(key) {
            case 'down':
                this.moveDown();
                return;
            case 'left':
            case 'right':
            case 'up':
                this.transfer(key);
                return;
        }
    }

    transfer(key) {
        this.removeBlockFromArray();
        this.block.transfer(key, this.frame);
        this.renderMain();
    }

    moveDown() {
        this.removeBlockFromArray();
        const isFinished = this.block.transfer('down', this.frame);
        this.renderMain();
        if(isFinished) this.moveEnd();
    }

    moveEnd() {
        let completedRowsLength = 0;
        const uncompletedRowsArray = this.frame.filter((row, i)=> {
            if(row.every(col => col > 0)) {
                completedRowsLength += 1;
                return false;
            }
            return true;
        });
        this.score += CONST.SCORE_POINT[completedRowsLength];
        this.count += completedRowsLength;
        this.renderScore();
        this.frame = [
            ...CONST.GET_DEFAULT_HIDDEN_ROWS(),
            ...uncompletedRowsArray.slice(CONST.HIDDEN_ROW - completedRowsLength)
        ];
        if(this.block.pos.some(([x, y]) =>
            y <= CONST.HIDDEN_ROW
            && x >= 3
            && x <= 6
        )) {
            this.endGame();
            return;
        }
        this.addNewBlock();
    }

    addNewBlock() {
        clearInterval(this.tick);
        this.tick = setInterval(this.moveDown.bind(this), 1000);
        this.block = new Block(this.nextBlockIndex);
        this.nextBlockIndex = Math.ceil(Math.random() * CONST.BLOCK_TYPES);
        this.renderMain();
        this.renderNext();
    }

    removeBlockFromArray() {
        this.block.pos.forEach(([x, y]) => {
            if(this.frame[y] !== undefined
                && this.frame[y] !== null
                && this.frame[y][x] > 0
            ) {
                this.frame[y][x] = 0;
            }
        });
    }

    addBlockToArray() {
        this.block.pos.forEach(([x, y]) => {
            if(this.frame[y] !== undefined
                && this.frame[y] !== null
                && this.frame[y][x] === 0
            ) {
                this.frame[y][x] = this.block.info.type
            }
        });
    }
}

new Game();
