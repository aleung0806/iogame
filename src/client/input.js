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
  if(e.code === 'space'){
    socket.emit(constants.MSG_TYPES.INPUT, {type: 'spaceDown'})
  }else if(e.code === 'keyA'){
    socket.emit(constants.MSG_TYPES.INPUT, {type: 'keyA'})                       
  }else if(e.code === 'keyS'){
    socket.emit(constants.MSG_TYPES.INPUT, {type: 'keyS'})                       
  }else if(e.code === 'keyD'){
    socket.emit(constants.MSG_TYPES.INPUT, {type: 'keyD'})                       
  }
}

const onKeyUp = (e) => {
  //space
  if(e.code === 'space'){
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