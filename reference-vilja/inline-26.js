
	window.resolveExternalsRegistryPromise = null
    const externalRegistryPromise = new Promise((r) => window.resolveExternalsRegistryPromise = r)
    window.resolveExternalsRegistryModule = (name) => externalRegistryPromise.then(() => window.externalsRegistry[name].onload())
