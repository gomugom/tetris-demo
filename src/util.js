const getDigit = num => (num < 10) ? '0' + num : num;

const getTime = time => {
    const minute = Math.floor(time / 60);
    const second = time % 60;
    return getDigit(minute) + ':' + getDigit(second);
}

module.exports = {
    getTime
};
