const axios = require('axios')
const path = require('path')
const fs = require('fs')

const getExtensionFromContentType = (contentType = '') => contentType.split('/')[1]

const getDestinationPath = (destinationPath, contentType) => {
  if (path.extname(destinationPath)) {
    return destinationPath
  }
  return `${destinationPath}.${getExtensionFromContentType(contentType)}`
}

const downloadFromUrl = async (url, destinationPath = `./${path.basename(url)}`) => {

  const response = await axios.get(url, { responseType: 'stream' });
  const writeStream = fs.createWriteStream(getDestinationPath(destinationPath, response.headers['content-type']));
  
  response.data.pipe(writeStream);
  
  return new Promise((resolve, reject) => {
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });

}

module.exports = {
  downloadFromUrl,
  getDestinationPath,
  getExtensionFromContentType
}