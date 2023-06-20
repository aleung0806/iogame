const assetPaths = require('./assetPaths.json')
const assets = {}

const loadAsset = (assetName) => new Promise((resolve, reject) => {
  const asset = new Image()
  asset.onload = () => {
    console.log(`${assetName} loaded`)
    assets[assetName] = asset
    resolve()
  }
  asset.src = `/assets/bolita_new/${assetName}`
})


export const loadAssets = () => {
  return Promise.all(assetPaths.map(loadAsset))
}

export const getAsset = assetName => assets[assetName]
