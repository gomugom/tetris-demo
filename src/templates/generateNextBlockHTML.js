const blockTypes = require('../constants/BLOCK_TYPES');

const blockData = ()=> [0, 0, 0, 0].map((_, y) =>
    [0, 0, 0, 0].map((__, x)=> `<div class="tetris__col" style="left:${x*25}px; top:${y*25}px"></div>`)
);

const nextBlock = (blockIndex) => {
    const blockGrid = blockTypes[blockIndex][0].map(([x, y])=> [x+1, y+2]);
    const nextBlock = blockData();
    if(blockIndex > 0) blockGrid.forEach(([x, y]) =>
        nextBlock[y][x] = `<div class="tetris__col type${blockIndex}" style="left:${x*25}px; top:${y*25}px"></div>`
    );
    return nextBlock.reduce((rows, row) =>
        `${rows}${row.reduce((cols, col)=>
            `${cols}${col}`
        , '')}`
    , '');
}

module.exports = nextBlock;
