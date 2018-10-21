
function getRegistry() {
  if (!global.registry)
    global.registry = {}

  return global.registry

}

const toKey = (component, part) => {
  return component + '-' + part
}

const setRenderer = (component, part, rendererInst) => {
  const registry = getRegistry()
  //console.log('SET RENDERER', component, part, rendererInst)
  const key = toKey(component, part)
  registry [key] = rendererInst
  //console.log('renderer', registry )
}

const getRenderer = (component, part, defaultRenderer) => {
  const registry = getRegistry()
  const key = toKey(component, part)
  //console.log('renderer', registry )
  //console.log('GET RENDERER', component, part, registry[key])
  return registry[key]
}

export {getRenderer, setRenderer}
