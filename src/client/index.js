import './css/main.css'
import { connectToServer } from './networking'
import { loadAssets } from './assets'
import { startRender } from './render'
import { startCapturingInput } from './input'
import { joinGame, autoJoinGame } from './menu'


const loadGame = () => {
  return Promise.all([
    connectToServer(),
    loadAssets(),
    //joinGame()
    autoJoinGame()

  ])
}

loadGame().then(() => {
  startRender()
  startCapturingInput()
})

