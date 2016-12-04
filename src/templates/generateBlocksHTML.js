const ClassNames = require('classnames');
const { COL, ROW, HIDDEN_ROW } = require('../constants/CONST');

const generateBlocksHTML = frame =>
`<div class="tetris__grid" style="width:${COL * 25}px; height:${ROW * 25}px">
${frame.reduce((rows, row, i)=>
    `${rows}${row.reduce((cols, col, j)=>
        `${cols}<div
            class="${ClassNames('tetris__col', {
                [`type${col}`]: Number.isFinite(col),
                hidden: i < HIDDEN_ROW
            })}"
            style="left:${j*25}px; top:${(i - HIDDEN_ROW)*25}px"
        ></div>`
    , '')}`
, '')}
</div>
`;

module.exports = generateBlocksHTML;
