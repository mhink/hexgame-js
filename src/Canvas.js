import $ from "jquery";

const ASPECT_RATIO = (4.0 / 3.0)
const TWO_PI = Math.PI * 2

export default class Canvas {
  constructor({parent}) {
    const $parent = $(parent)
    const $canvas = $(document.createElement("canvas"))
    $canvas.attr("width", $parent.width())
    $canvas.attr("height", $parent.width() / ASPECT_RATIO)
    $parent.append($canvas)

    this.el  = $canvas[0]
    this.ctx = this.el.getContext("2d")
    this.clear()
  }

  draw(drawFn) {
    this.ctx.save()
    drawFn(this.ctx)
    this.ctx.restore()
  }

  drawPoint(x, y) {
    this.drawPath(path => {
      path.arc(x, y, 2, 0, TWO_PI, false)
    }, "rgb(0,0,0)")
  }

  drawPath(drawFn, strokeStyle, fillStyle) {
    this.draw((ctx) => {
      var path = new Path2D()
      drawFn(path)

      if(fillStyle) {
        console.log("filling")
        ctx.fillStyle = fillStyle
        ctx.fill(path)
      }

      if(strokeStyle) {
        ctx.strokeStyle = strokeStyle
        ctx.stroke(path)
      }
    })
  }

  clear() {
    this.draw(() => {
      this.ctx.clearRect(0,0,this.el.width, this.el.height)
    })
  }
}
