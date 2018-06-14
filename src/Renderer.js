let renderer = {}

const toKey = (component, part) => {
  return component + '-' + part
}

const setRenderer = (component, part, rendererInst) => {
  const key = toKey(component, part)
  renderer[key] = rendererInst
}

const getRenderer = (component, part, defaultRenderer) => {
  const key = toKey(component, part)
  return renderer[key] || defaultRenderer
}

export {getRenderer, setRenderer}
