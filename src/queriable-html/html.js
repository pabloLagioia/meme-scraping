const axios = require('axios')
const cheerio = require('cheerio')

const getHtmlFromUrl = async (url) => { 
  const {data} = await axios.get(url)
  return data
}

const getQueriableHtmlDocumentFromHtml = (html) => cheerio.load(html)

const getQueriableHtmlDocumentFromUrl = async (url) => {
  const html = getHtmlFromUrl(url)
  const queriableDocument = getQueriableHtmlDocumentFromHtml(html)
  return queriableDocument
}

module.exports = {
  getQueriableHtmlDocumentFromUrl,
  getHtmlFromUrl,
  getQueriableHtmlDocumentFromHtml
}