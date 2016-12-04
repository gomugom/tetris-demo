const generateBlocksHTML = require('./templates/generateBlocksHTML');
const CONST = require('./constants/CONST');
const Block = require('./Block');
require('tetris.scss');

class Game {
    constructor() {
        this.dom = {
            main: document.getElementById('main')
        }
        this.block = 0;
        this.frame = CONST.DEFAULT_BLOCKS.map(row=>[...row]);
        this.dom.main.innerHTML = generateBlocksHTML(this.frame);
        this.addNewBlock();

        window.addEventListener('keydown', this.keyEventHandler.bind(this), true);
    }

    renderMain() {
        this.addBlockToArray();
        this.dom.main.innerHTML = generateBlocksHTML(this.frame);
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
        this.frame = [
            ...CONST.GET_DEFAULT_HIDDEN_ROWS(),
            ...uncompletedRowsArray.slice(CONST.HIDDEN_ROW - completedRowsLength)
        ];
        this.addNewBlock();
    }

    addNewBlock() {
        const nextBlockIndex = Math.ceil(Math.random()* CONST.BLOCK_TYPES);
        this.block = new Block(nextBlockIndex);
        this.renderMain();
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
