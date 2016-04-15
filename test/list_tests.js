var assert = require('assert');
var l = require('../list');

describe('empty lists', function() {
   it('should override toString', function() {
      assert("()" === l.EMPTY.toString());
   });
   it('should be a list', function() {
      assert(l.isList(l.EMPTY));
   });
   it('should equal itself', function() {
      assert(l.EMPTY.eq(l.EMPTY));
   });
   it('should not be modifiable', function() {
      l.EMPTY.foo = 1;
      assert(undefined === l.EMPTY.foo);
   });
   it('has no first element', function() {
      assert(undefined === l.EMPTY.first());
   });
   it('has an empty remainder', function() {
      assert(l.EMPTY.rest() === l.EMPTY);
   });
});

describe('cons', function () {
   it('should produce a list', function() {
      assert(l.isList(l.EMPTY.cons(1)));
   });
   it('should not produce an empty list', function() {
      assert(l.EMPTY.cons(1) !== l.EMPTY);
   });
   it('should produce equal values when called with same args', function() {
      assert(l.EMPTY.cons(1).eq(l.EMPTY.cons(1)));
   });
});

describe('lists', function() {
   it('should overide toString', function() {
      assert.strictEqual(l.EMPTY.cons(1).toString(), "(1)");
      assert.strictEqual(l.list([1, 2, 3]).toString(), "(1, 2, 3)");
   });
   it('should be equal when they have the same values', function() {
      assert(l.list([1,2,3]).eq(l.list([1,2,3])));
      assert(l.list([1,2,3]).eq(l.list([2,3]).cons(1)));
   });
   it('should not be equal when they have different values', function() {
      assert(!l.list([1,2,3]).eq(l.list([1,2,4])));
      assert(!l.list([1,2]).eq(l.list([1,2,3])));
   });
   it('should return the empty list when empty array is passed', function() {
      assert(l.EMPTY === l.list([]));
   });
});

describe('rest', function() {
   it('should return a new list less the first element of the list', function() {
      assert(l.list([1,2,3]).rest().eq(l.list([2,3])));
   });
});

describe('first', function() {
   it('should return the first friggin item of the list', function() {
      assert.strictEqual(l.list([1,2,3]).first(), 1);
   });
});

describe('map', function() {
   it('should should apply f to eacb list element', function() {
      var square = function(x) { return x * x; };
      assert.strictEqual(l.list([1, 2, 3]).map(square).toString(),
                         l.list([1, 4, 9]).toString());
   });
});

describe('reduce', function() {
    var add = function(x,y) { return x + y; };
    it('should return initial given the empty list', function() {
        assert.strictEqual(l.EMPTY.reduce(add, 0), 0);
    });

    it('should call f with initial and the first element', function() {
        assert.strictEqual(l.list([1]).reduce(add, 0), 1);
    });

    it('should call f for each element in the list', function() {
        assert.strictEqual(l.list([1,2,3,4]).reduce(add, 0), 10);
    });
});

describe('reverse', function() {
    it('should return empty as the reverse of empty', function() {
        assert.strictEqual(l.EMPTY.reverse(), l.EMPTY);
    });
    it('should return a single-element list unchanged', function() {
        var lst = l.list([1]);
        assert.strictEqual(lst.toString(), lst.reverse().toString());
    });
    it('should return a reversed list', function() {
        assert.strictEqual(l.list([4,3,2,1]).toString(), l.list([1,2,3,4]).reverse().toString());
    });
});

describe('range', function() {
    it('should return undefined when n < 0', function() {
        assert.strictEqual(undefined, l.range(-1));
    });
    it('should return empty when n === 0', function() {
        assert.strictEqual(l.EMPTY, l.range(0));
    });
    it('should return 0,1,...,n-1 when n > 0', function() {
        assert.strictEqual(l.list([0]).toString(), l.range(1).toString());
        assert.strictEqual(l.list([0,1,2,3,4]).toString(), l.range(5).toString());
    });
});

describe('filter', function() {
    var isEven = function(x) { return 0 === (x & 1); };
    it('should return the empty list given the empty list', function() {
        assert.strictEqual(l.EMPTY.filter(isEven), l.EMPTY);
    });
    it('should return a filtered list', function() {
        assert.strictEqual(l.list([2,4,6]).toString(),
                           l.list([1,2,3,4,5,6]).filter(isEven).toString());
    });
});

describe('concat', function() {
    it('should concat empty lists', function() {
        assert.strictEqual(l.EMPTY.concat(l.EMPTY), l.EMPTY);
    });
    it('should concat onto the empty list', function() {
        assert.strictEqual(l.EMPTY.concat(l.list([1,2])).toString(),
                           l.list([1,2]).toString());
    });
    it('should concat the empty list onto a list', function() {
        assert.strictEqual(l.list([1,2,3]).concat(l.EMPTY).toString(),
                           l.list([1,2,3]).toString());
    });
    it('should concat non-empty lists', function() {
        assert.strictEqual(l.list([1,2]).concat(l.list([3,4])).toString(),
                           l.list([1,2,3,4]).toString());
    });
});

describe('large lists', function() {
    var n = 50000;
    var largeList = l.range(n);
    var inc = function(acc,x) { return acc + 1; };
    it('should be able to reduce large lists', function() {
        assert.strictEqual(largeList.reduce(inc,0), n);
    });
    it('should be able to map and compare large lists', function() {
        assert(l.range(n+1).rest().eq(largeList.map(function(x) { return x + 1; })));
    });
    it('should be able to reverse large lists', function() {
        assert(largeList.map(function(x) { return n - x - 1; })
                        .eq(largeList.reverse()));
    });
    it('should be able to concat large lists', function() {
        assert(l.range(n/2)
                .concat(l.range(n/2)
                         .map(function(x) { return n/2 + x; }))
                .eq(largeList));
    });
    it('should be able to filter large lists', function() {
        var isPowerOf10 = function(x) { return null !== (''+x).match(/^10*$/); }
        assert.strictEqual(largeList.filter(isPowerOf10).toString(),
                           l.list([1,10,100,1000,10000]).toString());
    });
});

