const getAttributeRec = (obj, attrList) => {
  if (attrList.length > 1) {
    const newList = attrList.slice(1)
    return getAttributeRec(obj[attrList[0]], newList)
  }
  else
  {
    const val = obj[attrList[0]]
    return val 
  }
}

const getAttribute = (obj, attrStr) => {
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
