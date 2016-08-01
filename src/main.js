import $ from 'jquery'
import Canvas from 'Canvas'
import HexGrid from 'HexGrid'

require("./styles.css")

$(document).ready(() => {
  const canvas = new Canvas({
    parent: $("main#app")
  })

  const hexGrid = new HexGrid({
    canvas: canvas
  })

  hexGrid.draw()
})
