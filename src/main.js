import $ from 'jquery'
import Canvas from 'Canvas'
import HexGrid from 'HexGrid'
import ScaleForm from 'ScaleForm'

require("./styles.css")

$(document).ready(() => {
  const canvas = new Canvas({
    parent: $("main#app")
  })

  const hexGrid = new HexGrid({
    canvas:       canvas,
    hexDistance:  3,
    hexRadius:    25,
    origin: {
      x: canvas.el.width / 2,
      y: canvas.el.height / 2
    }
  })

  hexGrid.draw()
})
