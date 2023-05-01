const { getDestinationPath, getExtensionFromContentType } = require('./download')

describe('download', () => {
  describe('getExtensionFromContentType', () => {
    it('should return what is after the slash', () => {
      expect(getExtensionFromContentType('image/jpg')).toEqual('jpg')   
    })
    it('should return undefined when there is no slash', () => {
      expect(getExtensionFromContentType('jpg')).toBeUndefined()   
    })
    it('should return undefined when there is argument', () => {
      expect(getExtensionFromContentType('')).toBeUndefined()   
      expect(getExtensionFromContentType()).toBeUndefined()   
    })
  })
  describe('getDestinationPath', () => {
    it('should return destinationPath when it has extension', () => {
      expect(getDestinationPath('some/path/with.extension')).toEqual('some/path/with.extension')
    })
    it('should return destinationPath with extension obtained from contentType when destinationPath has no extension', () => {
      expect(getDestinationPath('some/path/withoutExtension', 'image/jpg')).toEqual('some/path/withoutExtension.jpg')
    })
  })
})