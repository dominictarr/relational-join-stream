var from    = require('from')
var through = require('through')

var a = [
  {key: 'a', data: 'apple'      },
  {key: 'b', data: 'banana'     },
  {key: 'c', data: 'cherry'     },
  {key: 'd', data: 'durian'     },
  {key: 'e', data: 'elder-berry'}
]

var b = [
  {key: 'a', data: 'aardvark'},
  {key: 'b', data: 'baracuda'},
  {key: 'c', data: 'cheeta'},
  {key: 'd', data: 'dingo'},
  {key: 'e', data: 'elephant'}
]

var v = [
  {key: 'a', data: 'A'},
  {key: 'e', data: 'E'},
  {key: 'i', data: 'I'},
  {key: 'o', data: 'O'},
  {key: 'u', data: 'U'},
]

var join = require('../')

var test = require('tape')

test('fruit to animals', function (t) {

  var all = []

  join([from(a), from(b)]
    , 'key', 'data'
    , function (a) {
        return a.join('--')
    })
  .on('data', console.log)
  .pipe(through(function (data) {
      all.push(data)
    }, function () {
      t.deepEqual(all, [ 
        'apple--aardvark',
        'banana--baracuda',
        'cherry--cheeta',
        'durian--dingo',
        'elder-berry--elephant'
      ])
      t.end()
    }))
})

test('fruit to vowels', function (t) {
  var all = []
  join([from(a), from(v)]
    , 'key', 'data'
    , function (a) {
        console.log(a)
        return a.join('--')
    })
  .on('data', console.log)
  .pipe(through(function (data) {
      all.push(data)
    }, function () {
      t.deepEqual(all, [ 
        'apple--A',
        'elder-berry--E'
      ])
      t.end()
    }))

})
