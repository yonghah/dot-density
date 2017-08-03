'use strict'

let random = require('turf-random')
let extent = require('turf-extent')
let inside = require('turf-inside')

module.exports = function randomPointInside (feature, tag, value) {
  let opts = { bbox: extent(feature) }
  let point
  let tries = 1000
  do {
    point = random('point', 1, opts).features[0]
    if (tag) { 
      point["properties"] = {'tag':tag}
    } 
    if (value) { 
      point["properties"] = {'value':value}
    }
  } while (!inside(point, feature) && tries-- > 0)
  return point
}
