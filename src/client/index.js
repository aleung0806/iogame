import './css/main.css'
import { connect, onDisconnect, onGameUpdate, startReceivingUpdates } from './networking'
import { loadAssets } from './assets'
import { startRender } from './render'
import { startCapturingInput } from './input'
import { joinGame } from './menu'


const loadGame = () => {
  return Promise.all([
    connect(),
    loadAssets(),
    joinGame()
  ])
}

loadGame().then(() => {
  startRender()
  startCapturingInput()
})

