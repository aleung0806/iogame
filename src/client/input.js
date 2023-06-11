import { updateDirection, jump } from "./networking"
const constants = require('../shared/constants')
const { socket } = require('./networking')


const onMouseMove = (e) => {
  const x = e.clientX 
  const y = e.clientY

  const direction = Math.atan2(window.innerHeight/2 - y, window.innerWidth/2 - x) * 180 / Math.PI - 90
  //socket.emit(constants.MSG_TYPES.INPUT, {type: 'direction', value: direction})

}

const onKeyDown = async (e) => {
  //space
  if(e.code === 'Space' || e.code === 'KeyW'){
    socket.emit(constants.MSG_TYPES.INPUT, {type: 'spaceDown'})
    console.log('Space')
  }else if(e.code === 'KeyA'){
    socket.emit(constants.MSG_TYPES.INPUT, {type: 'keyA'})                       
  }else if(e.code === 'KeyS'){
    socket.emit(constants.MSG_TYPES.INPUT, {type: 'keyS'})                       
  }else if(e.code === 'KeyD'){
    socket.emit(constants.MSG_TYPES.INPUT, {type: 'keyD'})                       
  }
}

const onKeyUp = (e) => {
  //space
  if(e.code === 'Space' || e.code === 'KeyW'){
    socket.emit(constants.MSG_TYPES.INPUT, {type: 'spaceUp'})                       
  }
}



export const startCapturingInput = () => new Promise((resolve, reject) => {
  console.log('adding event listeners')
  window.addEventListener("mousemove", onMouseMove)
  window.addEventListener("keydown", onKeyDown)
  window.addEventListener("keyup", onKeyUp)


  resolve()
})