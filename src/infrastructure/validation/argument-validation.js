const { isBetween } = require("../../utils")

const validateThreads = (threads) => {
  if (!isBetween(1, 5, threads)) {
    throw new Error(`Error: invalid number of threads, must be between 1 and ${MAX_THREADS}`);
  }
}

const validateAmount = (amount) => {
  const parsedAmount = parseInt(amount)
  if (isNaN(parsedAmount) || parsedAmount < 1) {
    throw new Error(`Error: invalid value for amount, must be a number greater than 1`);
  }
}

module.exports = {
  validateAmount, validateThreads
}