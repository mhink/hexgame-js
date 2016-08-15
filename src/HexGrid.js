import $ from 'jquery'
import { hexesWithinDistance } from 'utils'
import { isUndefined } from 'lodash'
import HexLayout from "HexLayout"

export default class HexGrid {
  constructor({canvas, origin, hexDistance, hexRadius}) {
    this.canvas       = canvas
    this.origin       = origin
    this.hexDistance  = hexDistance
    this.hexRadius    = hexRadius

    this.layout = new HexLayout({
      origin: this.origin,
      radius: this.hexRadius
    })

    $(this.canvas.el).on("mousemove", this.detectHex.bind(this))
  }

  draw() {
    for(let hex of hexesWithinDistance(this.hexDistance)) {
      const {x:x0, y:y0} = this.layout.hexToPixelOrigin(hex)

      let fillStyle = ""
      if(!isUndefined(this.selectedHex) && hex.q == this.selectedHex.q && hex.r == this.selectedHex.r) {
        fillStyle = "rgb(127,127,127)"
      }

      this.canvas.drawPath(path => {
        for(let {x,y} of this.layout.hexToPixelVertices(hex)) {
          path.lineTo(x, y)
        }
      }, "rgb(0,0,0)", fillStyle)

      this.canvas.drawPoint(x0, y0)
    }
  }

  detectHex(event) {
    this.selectedHex = this.layout.pixelToHexOrigin({
      x: event.offsetX,
      y: event.offsetY
    })
    this.canvas.clear()
    this.draw()
  }
}
