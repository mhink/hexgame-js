const SQRT3 = Math.sqrt(3)

export function cube2Axial({x: q, y: _, z: r}) {
  return {q, r}
}

export function axial2Cube({q: x, r: z}) {
  return {x, y: (-x-z), z}
}

export function* hexVertices (offset, r) {
  console.log(offset)
  const { x, y } = offset
  const half_r = r / 2.0
  const alt_r  = (2*r) / SQRT3

  yield {x:       r + x, y:      0 + y }
  yield {x:  half_r + x, y: -alt_r + y }
  yield {x: -half_r + x, y: -alt_r + y }
  yield {x:      -r + x, y:      0 + y }
  yield {x: -half_r + x, y:  alt_r + y }
  yield {x:  half_r + x, y:  alt_r + y }
  yield {x:       r + x, y:      0 + y }
}
