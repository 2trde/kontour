const getAttributeRec = (obj, attrList) => {
  if (!obj) return null
  if (attrList.length > 1) {
    const newList = attrList.slice(1)
    return getAttributeRec(obj[attrList[0]], newList)
  }
  else
  {
    const val = obj ? obj[attrList[0]] : null
    return val 
  }
}

const getAttribute = (obj, attrStr) => {
  if (attrStr == null) return null
  const attrList = attrStr.split('.')
  return getAttributeRec(obj, attrList)
}

const setAttributeRec = (obj, attrList, val) => {
  const newObj = Object.assign({}, obj)
  if (attrList.length > 1) {
    const newList = attrList.slice(1)
    newObj[attrList[0]] = setAttributeRec(obj[attrList[0]], newList, val)
    return newObj
  }
  else
  {
    newObj[attrList[0]] = val
    return newObj 
  }
}

const setAttribute = (obj, attrStr, val) => {
  const attrList = attrStr.split('.')
  return setAttributeRec(obj, attrList, val)
}


export {getAttribute, setAttribute}
