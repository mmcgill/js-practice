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
      assert("(1)" === l.EMPTY.cons(1).toString());
      assert("(1, 2, 3)" === l.list([1, 2, 3]).toString());
   });
   it('should be equal when they have the same values', function() {
      assert(l.list([1,2,3]).eq(l.list([1,2,3])));
      assert(l.list([1,2,3]).eq(l.list([2,3]).cons(1)));
   });
   it('should not be equal when they have different values', function() {
      assert(!l.list([1,2,3]).eq(l.list([1,2,4])));
      assert(!l.list([1,2]).eq(l.list([1,2,3])));
   });
});

describe('rest', function() {
});

describe('first', function() {
});

describe('map', function() {
});

describe('reduce', function() {
});

describe('reverse', function() {
});

