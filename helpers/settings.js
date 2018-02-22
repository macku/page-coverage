const { columns } = process.stdout;

const restColsSize = (10 + 15 + 25); // | Type │ Total Size   │ Used bytes         │
const progressBarSize = 75;
const urlColSize = Math.max(50, (columns - progressBarSize - restColsSize));

module.exports = {
  progressBarSize,
  urlColSize
};

