# relational-join-stream

Relational Style JOIN query with streams.

A slightly different take to [hash-join](http://github.com/substack/hash-join)
but the same basic idea.


## Stability

Unstable: Expect patches and features, possible api changes.

## Example



``` js
var join = require('relational-join-stream')

join(
  [streamA, streamB], // streams to join
  function getKey(data, i) {
    //return the key to join on!
    //i is the index of the stream.

    return data.id
  },
  function map (data, i) { //OPTIONAL
    //return what you want to join for this row.
    return data
  },
  function (array, key) {
    //`array` is a matched values from each stream.
    //`key` is the key they where matched on.
    //whatever you return from
    return [key, array.length]
  })
```

`join` will merge the streams, matching on `getKey`,
(optionally) `map` input, and then `merge` matches,
then stream any successful matches.


## License

MIT
