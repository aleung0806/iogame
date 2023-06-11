import { updateDirection, jump } from "./networking"
const Constants = require('../shared/constants')



const onMouseMove = (e) => {
  const x = e.clientX 
  const y = e.clientY

  const direction = Math.atan2(window.innerHeight/2 - y, window.innerWidth/2 - x) * 180 / Math.PI - 90
  //updateDirection(direction)
}

const onKeyDown = async (e) => {
  //space
  if(e.keyCode === 32){
    jump()
  }
}

const onKeyUp = (e) => {
  if(e.keyCode === 32){
                                       
  }
}


export const startCapturingInput = () => new Promise((resolve, reject) => {
  console.log('adding event listeners')
  window.addEventListener("mousemove", onMouseMove)
  window.addEventListener("keydown", onKeyDown)
  window.addEventListener("keyup", onKeyUp)


  resolve()
})