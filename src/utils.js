const SQRT3 = Math.sqrt(3)

export function cube2Axial({x: q, y: _, z: r}) {
  return {q, r}
}

export function axial2Cube({q: x, r: z}) {
  return {x, y: (-x-z), z}
}

export function* hexesWithinDistance(N) {
  for(let dx = -N; dx <= N; dx++) {
    let lowerBound = Math.max(-N, -dx-N)
    let upperBound = Math.min( N, -dx+N)

    for(let dy = lowerBound; dy <= upperBound; dy++) {
      let dz = -dx-dy
      yield cube2Axial({x: dx, y: dy, z: dz})
    }
  }
}

export function createCallback(callbackFn) {
  let self = this
  return function() {
    let args = arguments
    setTimeout(function() {
      callbackFn.apply(self, args)
    }, 0)
  }
}
