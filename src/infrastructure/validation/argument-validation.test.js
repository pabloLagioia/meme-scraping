const { validateThreads, validateAmount } = require('./argument-validation')

describe('argument validation', () => {

  describe('validate threads', () => {

    it('should allow for a number between 1 and 5', () => {

      expect(() => validateThreads(1)).not.toThrow()
      expect(() => validateThreads(2)).not.toThrow()
      expect(() => validateThreads(3)).not.toThrow()
      expect(() => validateThreads(4)).not.toThrow()
      expect(() => validateThreads(5)).not.toThrow()

    })

    it('should throw when number is less than 1', () => {

      expect(() => validateThreads(0)).toThrow()
      expect(() => validateThreads(-1)).toThrow()

    })

    it('should throw when number is greater than 5', () => {

      expect(() => validateThreads(6)).toThrow()
      expect(() => validateThreads(10)).toThrow()

    })

  })

  describe('validate amount', () => {

    it('should throw if amount is a string', () => {
      expect(() => validateAmount('test')).toThrow()
    })

    it('should throw if amount is less than 1', () => {
      expect(() => validateAmount(0)).toThrow()
    })

    it('should not throw if amount is greater than 0', () => {
      expect(() => validateAmount(1)).not.toThrow()
    })

  })

});