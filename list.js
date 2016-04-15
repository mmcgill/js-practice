/*
 * list.js
 *
 * An immutable linked list data structure and a library
 * of accompanying functions.
 *
 */

// See the CommonJS Modules spec for a description of
// JavaScript modules: http://www.commonjs.org/specs/modules/1.0/

///////////// EMPTY LIST ///////////////

var EMPTY = {}

////////////// LIST CONSTRUCTOR ////////////////

function List(x, tail) {
   this.x = x;
   this.tail = tail;
   Object.freeze(this);
}

function isList(o) {
   return o === EMPTY
          || ('object' === typeof o
              && Object.getPrototypeOf(o) === List.prototype);
}

/////////// cons ////////////////

/* Append x to the front of the list.
 */
EMPTY.cons = function(x) { return new List(x, this); };
List.prototype.cons = EMPTY.cons;

/////////// eq //////////////////

EMPTY.eq = function(l2) { return l2 === EMPTY; };
List.prototype.eq = function(l2) {
   if (!isList(l2)) return false;
   var x_eq = isList(this.x) ? this.x.eq(l2.x) : this.x === l2.x;
   return x_eq && this.tail.eq(l2.tail);
}

/////////// toString ////////////

EMPTY.toString = function() { return "()"; };
EMPTY.inspect = EMPTY.toString;

List.prototype.toString = function() {
   var node = this;
   var s = "(";
   while (node != EMPTY) {
      if (node !== this) s += ", ";
      s += node.x.toString();
      node = node.tail;
   }
   return s + ")";
}
List.prototype.inspect = List.prototype.toString

//////////// first //////////////

/* Returns the first element of the list, or null if the list is empty. */
EMPTY.first = function() {
   return undefined;
};
List.prototype.first = function() {
   return this.x;
};

//////////// rest ////////////////

/* Returns the list with the first element removed. When called
 * on the empty list, returns the empty list.
 */
EMPTY.rest = function() {
   return EMPTY;
}
List.prototype.rest = function() {
   return this.tail;
};

//////////// map //////////////////

/* Returns the list produced by calling f on each
 * element of the list.
 */
EMPTY.map = function(f) {
   return EMPTY;
}
List.prototype.map = function(f) {
   return this.tail.map(f).cons(f(this.x));
}

//////////// reduce ///////////////

/* Reduce f over the list.
 *
 * If the list is empty, returns initial.
 * Otherwise, calls f with arguments initial and the first
 * list element,  then calls f with the result and the next
 * list element, and so on for all elements. Returns the
 * result of the final invocation of f.
 *
 * Examples:
 *   var add = function(a,b) { return a + b; };
 *
 *   0 === list([]).reduce(add, 0)
 *   1 === list([1]).reduce(add, 0)
 *   10 === list([1,2,3,4]).reduce(add, 0)
 */
EMPTY.reduce = function(f, initial) {
   // TODO
}
List.prototype.reduce = function(f, initial) {
   // TODO
}

////////////// reverse //////////////

/* Return the reverse of the list.
 */
EMPTY.reverse = function() {
   // TODO
}

List.prototype.reverse = function() {
   // TODO
}

///////////// TOP-LEVEL FUNCTIONS ////////////

/* Accept a variable number of arguments, returning them as a list.
 *
 * Examples:
 *   list([]) // the empty list
 *   list([1, 2, 3]) // the list (1,2,3)
 */
function list(items) {
   var list = EMPTY;
   for (i=items.length - 1; i >= 0; i--) {
      list = list.cons(items[i]);
   }
   return list;
}

/* Return the range [0,n) as a list.
 *
 * Examples:
 *   range(0) // returns EMPTY
 *   range(5) // returns list([0,1,2,3,4])
 */
function range(n) {
   // TODO
}

// Make sure EMPTY is immutable!
Object.freeze(EMPTY);

module.exports = {
   EMPTY: EMPTY,
   isList: isList,
   list: list,
   range: range
};
