class Orientation {
  constructor(f, b, start_angle) {
    this.f = f
    this.b = b
    this.start_angle = start_angle
  }
}

const SQRT3 = Math.sqrt(3)
const ORIENTATION_FLAT = new Orientation(
  [3/2, 0, SQRT3/2,   SQRT3],
  [2/3, 0,    -1/3, SQRT3/3],
  0
)

export default class HexLayout {
  constructor({orientation, radius, ratio, origin}) {
    this.orientation = orientation || ORIENTATION_FLAT
    this.radius      = radius || 10
    this.ratio       = ratio  || 1
    this.origin      = origin || {x: 0, y: 0}
  }

  hexToPixelOrigin({q, r}) {
    const [f0, f1, f2, f3] = this.orientation.f
    const {x: x0, y: y0}   = this.origin

    const x = (f0*q + f1*r) * this.radius + x0
    const y = (f2*q + f3*r) * this.radius * this.ratio + y0

    return {x, y}
  }

  pixelToHexOrigin({x, y}) {
    const [b0, b1, b2, b3]   = this.orientation.b
    const {x: x0, y: y0}     = this.origin

    const _x = (x - x0) / this.radius
    const _y = (y - y0) / this.radius / this.ratio

    const q = b0*_x + b1*_y
    const r = b2*_x + b3*_y
    const s = -q - r

    let qi = Math.round(q)
    let ri = Math.round(r)
    let si = Math.round(s)

    const dq = Math.abs(qi- q)
    const dr = Math.abs(ri- r)
    const ds = Math.abs(si- s)

    if(dq > dr && dq > ds) {
      qi = -ri - si
    } else if (dr > ds) {
      ri = -qi - si
    } else {
      si = -qi - ri
    }

    return {q:qi, r:ri}
  }

  *hexToPixelVertices({q, r}) {
    const rad = this.radius
    const sy = this.ratio * (3/4)
    const { x: x0, y: y0} = this.hexToPixelOrigin({q,r})

    const half_rad   = rad / 2.0
    const alt_rad    = (2*rad) / SQRT3

    yield {x: (      rad) + x0, y: (       0 * sy) + y0 }
    yield {x: ( half_rad) + x0, y: (-alt_rad * sy) + y0 }
    yield {x: (-half_rad) + x0, y: (-alt_rad * sy) + y0 }
    yield {x: (     -rad) + x0, y: (       0 * sy) + y0 }
    yield {x: (-half_rad) + x0, y: ( alt_rad * sy) + y0 }
    yield {x: ( half_rad) + x0, y: ( alt_rad * sy) + y0 }
    yield {x: (      rad) + x0, y: (       0 * sy) + y0 }
  }

}
