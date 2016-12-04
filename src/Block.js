const BLOCK_TYPES = require('./constants/BLOCK_TYPES');
const CONST = require('./constants/CONST');

class Block {
    constructor(type) {
        this.info = {
            type,
            rotate : 0,
            shape: BLOCK_TYPES[type],
            offset: [ Math.floor(CONST.COL / 2) - 1, CONST.HIDDEN_ROW - 1 ]
        };
        this.setPos(0, 0);
    }

    setPos(dx, dy) {
        this.info.offset = [ this.info.offset[0] + dx, this.info.offset[1] + dy ];
        this.pos = this.info.shape[this.info.rotate].map(([x, y])=> [
            x + this.info.offset[0],
            y + this.info.offset[1]
        ]);
    }

    rotate() {
        this.info.rotate = (this.info.rotate + 1) % 4;
        this.setPos(0, 0);
    }

    transfer(dir) {
        let pos = [];
        switch(dir) {
            case 'up': this.rotate('cw'); return;
            case 'left': pos = [-1, 0]; break;
            case 'right': pos = [1, 0]; break;
            case 'down': pos = [0, 1]; break;
            default: return;
        }
        this.setPos(...pos);
    }
}

module.exports = Block;
