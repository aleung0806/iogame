import { updateDirection } from "./networking"
const Constants = require('../shared/constants')

const onMouseMove = (e) => {
  const x = e.clientX 
  const y = e.clientY

  const direction = Math.atan2(window.innerHeight/2 - y, window.innerWidth/2 - x) * 180 / Math.PI - 90
  updateDirection(direction)
}


export const startCapturingInput = () => {
  console.log('adding mousemove listener')
  window.addEventListener("mousemove", onMouseMove)
}