const toValue = (_, current) => current.value
const getAttribute = (element, attributeName) => element.attributes.filter(attribute => attribute.name === attributeName).reduce(toValue, undefined)
const getDataSrc = element => getAttribute(element, 'data-src')
const getSrc = element => getAttribute(element, 'src')
const getImgSrc = (_, element) => getDataSrc(element) || getSrc(element)

module.exports = {
  getAttribute,
  getDataSrc,
  getSrc,
  getImgSrc
}