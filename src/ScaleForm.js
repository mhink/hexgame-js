import $ from 'jquery'
import { createCallback } from 'utils'
import { toNumber } from 'lodash'

export default class ScaleForm {
  constructor({el, callback}) {
    const $el = $(el)

    this.el = $el[0]

    this.xSlider = $el.find("input[type='range']#scaleX")
    this.ySlider = $el.find("input[type='range']#scaleY")

    this.xSlider.on("input", this.onChangeX.bind(this))
    this.ySlider.on("input", this.onChangeY.bind(this))

    this.scale = {
      x: 50,
      y: 50,
    }
    this.callback = callback
  }

  onChangeX(event) {
    this.scale = {
      ...this.scale,
      x: toNumber($(event.target).val())
    }
    this.callback(this.scale)
  }

  onChangeY(event) {
    this.scale = {
      ...this.scale,
      y: toNumber($(event.target).val())
    }
    this.callback(this.scale)
  }
}
