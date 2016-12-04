const BLOCK_TYPES = require('./constants/BLOCK_TYPES');
const CONST = require('./constants/CONST');

class Block {
    constructor(type) {
        this.info = {
            type,
            rotate : 0,
            shape: BLOCK_TYPES[type],
            offset: [ Math.floor(CONST.COL / 2) - 1, CONST.HIDDEN_ROW - 2 ]
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

    checkAvailability(frame) {
        return this.pos.every(([x, y])=>
            x >= 0 &&
            x < CONST.COL &&
            y >= 0 &&
            y < CONST.ROW + CONST.HIDDEN_ROW &&
            frame[y][x] === 0
        )
    }

    rotate(dir = 'cw') {
        this.info.rotate = (this.info.rotate + (dir === 'cw' ? 1 : 3)) % 4;
        this.setPos(0, 0);
    }

    transfer(dir, frame) {
        let pos = [];
        switch(dir) {
            case 'up': {
                this.rotate('cw');
                if(!this.checkAvailability(frame)) this.rotate('ccw');
                return;
            }
            case 'left': pos = [-1, 0]; break;
            case 'right': pos = [1, 0]; break;
            case 'down': pos = [0, 1]; break;
            default: return;
        }
        this.setPos(...pos);
        const isAvailable = this.checkAvailability(frame);
        if(!isAvailable) {
            this.setPos(...pos.map(v=> v*-1));
            if(dir === 'down') return true;
        }
    }
}

module.exports = Block;
