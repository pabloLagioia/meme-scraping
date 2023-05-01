const { getDownloadsPerThread } = require('./thread')

describe('main thread', () => {

  describe('getDownloadCountPerThread', () => {

    it('should get same number for each thread', () => {
      expect(getDownloadsPerThread(5, 5)).toEqual([1, 1, 1, 1, 1])
      expect(getDownloadsPerThread(4, 4)).toEqual([1, 1, 1, 1])
      expect(getDownloadsPerThread(2, 2)).toEqual([1, 1])
    })

    it('should get multiples for each thread', () => {
      expect(getDownloadsPerThread(2, 4)).toEqual([2, 2])
      expect(getDownloadsPerThread(3, 6)).toEqual([2, 2, 2])
      expect(getDownloadsPerThread(5, 15)).toEqual([3, 3, 3, 3, 3])
    })
    
    it('should get split them gracefully among threads', () => {
      expect(getDownloadsPerThread(2, 5)).toEqual([2, 3])
      expect(getDownloadsPerThread(5, 16)).toEqual([3, 3, 3, 3, 4])
      expect(getDownloadsPerThread(2, 3)).toEqual([1, 2])
      expect(getDownloadsPerThread(1, 3)).toEqual([3])
    })

    it('should not get workers if one can handle it all', () => {
      expect(getDownloadsPerThread(5, 1)).toEqual([1])
      expect(getDownloadsPerThread(5, 2)).toEqual([1, 1])
      expect(getDownloadsPerThread(5, 3)).toEqual([1, 1, 1])
      expect(getDownloadsPerThread(5, 4)).toEqual([1, 1, 1, 1])
    })

  })

})