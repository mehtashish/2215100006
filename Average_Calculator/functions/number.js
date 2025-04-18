const isValidID = id => ['p', 'f', 'e', 'r'].includes(id);

const filterWindow = (window, newNums, maxSize) => {
    const filtered = newNums.filter(
        num => Number.isInteger(num) && num <= 500 && !window.includes(num)
    );
    const updated = [...window, ...filtered];
    return updated.slice(-maxSize);
};

const calculateAverage = arr =>
    arr.length ? arr.reduce((sum, val) => sum + val, 0) / arr.length : 0;

module.exports = {
    isValidID,
    filterWindow,
    calculateAverage
};