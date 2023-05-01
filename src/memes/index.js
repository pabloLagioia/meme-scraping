const {
  getQueriableHtmlDocumentFromHtml,
  getHtmlFromUrl,
  getImgSrc
} = require('../queriable-html')

const getImagesSrcArrayFromQueriableDocument = (queriableDocument, selector) => queriableDocument(selector).map(getImgSrc).toArray()

const getMemesFromHtml = (html) => {
  const queriableDocument = getQueriableHtmlDocumentFromHtml(html)
  const imageSrcArray = getImagesSrcArrayFromQueriableDocument(queriableDocument, 'img.resp-media')

  return imageSrcArray
}

const getMemeUrlsFromUrl = async (url) => {

  const html = await getHtmlFromUrl(url)
  
  return getMemesFromHtml(html)

}

module.exports = {
  getMemeUrlsFromUrl
}