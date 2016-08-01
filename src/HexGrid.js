import $ from 'jquery'

import { hexVertices } from 'utils'

export default class HexGrid {
  constructor({canvas}) {
    this.canvas = canvas
  }

  draw() {
    this.canvas.drawPath((path) => {
      const points = hexVertices({x:100, y:100}, 50)

      for(let {x,y} of points) {
        path.lineTo(x, y)
      }
    }, "rgb(255,0,0)")
  }
}
