var Stream = require('stream')

function toFunction (f) {
  if('string' == typeof f)
    return function (e) {
      return e[f]
    }
  return f
}

function all(a, l) {
  while(l--) {
    if(!a[l]) return false
  }
  return true
}

module.exports = function (streams, getKey, map, reduce) {

  var joins = {}, ended = 0

  var rs = new Stream()
  rs.readable = true

  if(!reduce)
    reduce = map, map = function (e) { return e }

  getKey = toFunction(getKey)

  if(map) map = toFunction(map)

  streams.forEach(function (stream, i) {
    stream.on('data', function (e) {
      var key = getKey(e)
      ;(joins[key] = joins[key] || [])[i] = map(e)
      if(all(joins[key], streams.length))
        rs.emit('data', reduce(joins[key]))
    })
    stream.on('end', function () {
      if((++ ended) !== streams.length) return
      rs.emit('end')
      process.nextTick(rs.destroy)
    })
  })

  rs.destroy = function () {
    streams.forEach(function (e) {
      if(e.destroy) e.destroy()
    })
  }

  return rs
}
