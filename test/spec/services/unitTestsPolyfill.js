'use strict';
//function-bind-polyfill for PhantomJS
if (!Function.prototype.bind) {
  /* eslint-disable no-extend-native */
  Function.prototype.bind = function bind(that) { // .length is 1
    var self = this;
    if (typeof self !== 'function') {
      throw new TypeError('Function.prototype.bind called on incompatible ' + self);
    }
    var args = Array.prototype.slice.call(arguments, 1); // for normal call
    var bound = function () {

      if (this instanceof bound) {

        var result = self.apply(
            this,
            args.concat(Array.prototype.slice.call(arguments))
        );
        if (Object(result) === result) {
          return result;
        }
        return this;

      } else {
        return self.apply(
            that,
            args.concat(Array.prototype.slice.call(arguments))
        );

      }

    };
    if (self.prototype) {
      var Empty = function () {
      };
      Empty.prototype = self.prototype;
      bound.prototype = new Empty();
    }
    return bound;
  };
}
