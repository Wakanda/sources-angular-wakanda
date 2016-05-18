//angular-wakanda.js - v1.1.1 - 2016-05-18
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["WakandaClient"] = factory();
	else
		root["WakandaClient"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(2);
	__webpack_require__(24);
	__webpack_require__(57);
	__webpack_require__(60);
	__webpack_require__(81);
	var wakanda_client_1 = __webpack_require__(86);
	exports.WakandaClient = wakanda_client_1.default;
	var browser_http_client_1 = __webpack_require__(116);
	var catalog_base_service_1 = __webpack_require__(91);
	exports.CatalogBaseService = catalog_base_service_1.CatalogBaseService;
	var collection_base_service_1 = __webpack_require__(105);
	exports.CollectionBaseService = collection_base_service_1.CollectionBaseService;
	var dataclass_base_service_1 = __webpack_require__(102);
	exports.DataClassBaseService = dataclass_base_service_1.DataClassBaseService;
	var directory_base_service_1 = __webpack_require__(114);
	exports.DirectoryBaseService = directory_base_service_1.DirectoryBaseService;
	var entity_base_service_1 = __webpack_require__(97);
	exports.EntityBaseService = entity_base_service_1.EntityBaseService;
	var media_base_service_1 = __webpack_require__(109);
	exports.MediaBaseService = media_base_service_1.MediaBaseService;
	wakanda_client_1.default.HttpClient = browser_http_client_1.default;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	module.exports = __webpack_require__(6).Function.bind;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
	var $export = __webpack_require__(4);
	
	$export($export.P, 'Function', {bind: __webpack_require__(22)});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(5)
	  , core      = __webpack_require__(6)
	  , hide      = __webpack_require__(7)
	  , redefine  = __webpack_require__(17)
	  , ctx       = __webpack_require__(20)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
	    , key, own, out, exp;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if(target)redefine(target, key, out, type & $export.U);
	    // export
	    if(exports[key] != out)hide(exports, key, exp);
	    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 5 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 6 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.1.2'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(8)
	  , createDesc = __webpack_require__(16);
	module.exports = __webpack_require__(12) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(9)
	  , IE8_DOM_DEFINE = __webpack_require__(11)
	  , toPrimitive    = __webpack_require__(15)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(12) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(10);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(12) && !__webpack_require__(13)(function(){
	  return Object.defineProperty(__webpack_require__(14)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(13)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(10)
	  , document = __webpack_require__(5).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(10);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(5)
	  , hide      = __webpack_require__(7)
	  , has       = __webpack_require__(18)
	  , SRC       = __webpack_require__(19)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);
	
	__webpack_require__(6).inspectSource = function(it){
	  return $toString.call(it);
	};
	
	(module.exports = function(O, key, val, safe){
	  var isFunction = typeof val == 'function';
	  if(isFunction)has(val, 'name') || hide(val, 'name', key);
	  if(O[key] === val)return;
	  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if(O === global){
	    O[key] = val;
	  } else {
	    if(!safe){
	      delete O[key];
	      hide(O, key, val);
	    } else {
	      if(O[key])O[key] = val;
	      else hide(O, key, val);
	    }
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString(){
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 18 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(21);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var aFunction  = __webpack_require__(21)
	  , isObject   = __webpack_require__(10)
	  , invoke     = __webpack_require__(23)
	  , arraySlice = [].slice
	  , factories  = {};
	
	var construct = function(F, len, args){
	  if(!(len in factories)){
	    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
	    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  } return factories[len](F, args);
	};
	
	module.exports = Function.bind || function bind(that /*, args... */){
	  var fn       = aFunction(this)
	    , partArgs = arraySlice.call(arguments, 1);
	  var bound = function(/* args... */){
	    var args = partArgs.concat(arraySlice.call(arguments));
	    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
	  };
	  if(isObject(fn.prototype))bound.prototype = fn.prototype;
	  return bound;
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(25);
	__webpack_require__(51);
	module.exports = __webpack_require__(6).Array.from;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(26)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(29)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(27)
	  , defined   = __webpack_require__(28);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(30)
	  , $export        = __webpack_require__(4)
	  , redefine       = __webpack_require__(17)
	  , hide           = __webpack_require__(7)
	  , has            = __webpack_require__(18)
	  , Iterators      = __webpack_require__(31)
	  , $iterCreate    = __webpack_require__(32)
	  , setToStringTag = __webpack_require__(47)
	  , getPrototypeOf = __webpack_require__(49)
	  , ITERATOR       = __webpack_require__(48)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = false;

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(33)
	  , descriptor     = __webpack_require__(16)
	  , setToStringTag = __webpack_require__(47)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(7)(IteratorPrototype, __webpack_require__(48)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(9)
	  , dPs         = __webpack_require__(34)
	  , enumBugKeys = __webpack_require__(45)
	  , IE_PROTO    = __webpack_require__(43)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(14)('iframe')
	    , i      = enumBugKeys.length
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(46).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(8)
	  , anObject = __webpack_require__(9)
	  , getKeys  = __webpack_require__(35);
	
	module.exports = __webpack_require__(12) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(36)
	  , enumBugKeys = __webpack_require__(45);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(18)
	  , toIObject    = __webpack_require__(37)
	  , arrayIndexOf = __webpack_require__(40)(false)
	  , IE_PROTO     = __webpack_require__(43)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(38)
	  , defined = __webpack_require__(28);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(39);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(37)
	  , toLength  = __webpack_require__(41)
	  , toIndex   = __webpack_require__(42);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(27)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(27)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(44)('keys')
	  , uid    = __webpack_require__(19);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(5)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(5).document && document.documentElement;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(8).f
	  , has = __webpack_require__(18)
	  , TAG = __webpack_require__(48)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(44)('wks')
	  , uid        = __webpack_require__(19)
	  , Symbol     = __webpack_require__(5).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(18)
	  , toObject    = __webpack_require__(50)
	  , IE_PROTO    = __webpack_require__(43)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(28);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx         = __webpack_require__(20)
	  , $export     = __webpack_require__(4)
	  , toObject    = __webpack_require__(50)
	  , call        = __webpack_require__(52)
	  , isArrayIter = __webpack_require__(53)
	  , toLength    = __webpack_require__(41)
	  , getIterFn   = __webpack_require__(54);
	$export($export.S + $export.F * !__webpack_require__(56)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        result[index] = mapping ? mapfn(O[index], index) : O[index];
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(9);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(31)
	  , ITERATOR   = __webpack_require__(48)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(55)
	  , ITERATOR  = __webpack_require__(48)('iterator')
	  , Iterators = __webpack_require__(31);
	module.exports = __webpack_require__(6).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(39)
	  , TAG = __webpack_require__(48)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(48)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(58);
	module.exports = __webpack_require__(6).Array.isArray;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
	var $export = __webpack_require__(4);
	
	$export($export.S, 'Array', {isArray: __webpack_require__(59)});

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(39);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(61);
	__webpack_require__(25);
	__webpack_require__(62);
	__webpack_require__(66);
	__webpack_require__(78);
	module.exports = __webpack_require__(6).Map;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var classof = __webpack_require__(55)
	  , test    = {};
	test[__webpack_require__(48)('toStringTag')] = 'z';
	if(test + '' != '[object z]'){
	  __webpack_require__(17)(Object.prototype, 'toString', function toString(){
	    return '[object ' + classof(this) + ']';
	  }, true);
	}

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var $iterators    = __webpack_require__(63)
	  , redefine      = __webpack_require__(17)
	  , global        = __webpack_require__(5)
	  , hide          = __webpack_require__(7)
	  , Iterators     = __webpack_require__(31)
	  , wks           = __webpack_require__(48)
	  , ITERATOR      = wks('iterator')
	  , TO_STRING_TAG = wks('toStringTag')
	  , ArrayValues   = Iterators.Array;
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype
	    , key;
	  if(proto){
	    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
	    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	    Iterators[NAME] = ArrayValues;
	    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
	  }
	}

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(64)
	  , step             = __webpack_require__(65)
	  , Iterators        = __webpack_require__(31)
	  , toIObject        = __webpack_require__(37);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(29)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = __webpack_require__(48)('unscopables')
	  , ArrayProto  = Array.prototype;
	if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(7)(ArrayProto, UNSCOPABLES, {});
	module.exports = function(key){
	  ArrayProto[UNSCOPABLES][key] = true;
	};

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(67);
	
	// 23.1 Map Objects
	module.exports = __webpack_require__(73)('Map', function(get){
	  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var dP          = __webpack_require__(8).f
	  , create      = __webpack_require__(33)
	  , hide        = __webpack_require__(7)
	  , redefineAll = __webpack_require__(68)
	  , ctx         = __webpack_require__(20)
	  , anInstance  = __webpack_require__(69)
	  , defined     = __webpack_require__(28)
	  , forOf       = __webpack_require__(70)
	  , $iterDefine = __webpack_require__(29)
	  , step        = __webpack_require__(65)
	  , setSpecies  = __webpack_require__(71)
	  , DESCRIPTORS = __webpack_require__(12)
	  , fastKey     = __webpack_require__(72).fastKey
	  , SIZE        = DESCRIPTORS ? '_s' : 'size';
	
	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};
	
	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = create(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        anInstance(this, C, 'forEach');
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)dP(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
	
	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(17);
	module.exports = function(target, src, safe){
	  for(var key in src)redefine(target, key, src[key], safe);
	  return target;
	};

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(20)
	  , call        = __webpack_require__(52)
	  , isArrayIter = __webpack_require__(53)
	  , anObject    = __webpack_require__(9)
	  , toLength    = __webpack_require__(41)
	  , getIterFn   = __webpack_require__(54);
	module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(5)
	  , dP          = __webpack_require__(8)
	  , DESCRIPTORS = __webpack_require__(12)
	  , SPECIES     = __webpack_require__(48)('species');
	
	module.exports = function(KEY){
	  var C = global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(19)('meta')
	  , isObject = __webpack_require__(10)
	  , has      = __webpack_require__(18)
	  , setDesc  = __webpack_require__(8).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(13)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global            = __webpack_require__(5)
	  , $export           = __webpack_require__(4)
	  , redefine          = __webpack_require__(17)
	  , redefineAll       = __webpack_require__(68)
	  , meta              = __webpack_require__(72)
	  , forOf             = __webpack_require__(70)
	  , anInstance        = __webpack_require__(69)
	  , isObject          = __webpack_require__(10)
	  , fails             = __webpack_require__(13)
	  , $iterDetect       = __webpack_require__(56)
	  , setToStringTag    = __webpack_require__(47)
	  , inheritIfRequired = __webpack_require__(74);
	
	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  var fixMethod = function(KEY){
	    var fn = proto[KEY];
	    redefine(proto, KEY,
	      KEY == 'delete' ? function(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a){
	        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
	        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	    meta.NEED = true;
	  } else {
	    var instance             = new C
	      // early implementations not supports chaining
	      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
	      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
	      // most early implementations doesn't supports iterables, most modern - not close it correctly
	      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
	      // for early implementations -0 and +0 not the same
	      , BUGGY_ZERO = !IS_WEAK && fails(function(){
	        // V8 ~ Chromium 42- fails only with 5+ elements
	        var $instance = new C()
	          , index     = 5;
	        while(index--)$instance[ADDER](index, index);
	        return !$instance.has(-0);
	      });
	    if(!ACCEPT_ITERABLES){ 
	      C = wrapper(function(target, iterable){
	        anInstance(target, C, NAME);
	        var that = inheritIfRequired(new Base, target, C);
	        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if(IS_WEAK && proto.clear)delete proto.clear;
	  }
	
	  setToStringTag(C, NAME);
	
	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F * (C != Base), O);
	
	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);
	
	  return C;
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var isObject       = __webpack_require__(10)
	  , setPrototypeOf = __webpack_require__(75).set;
	module.exports = function(that, target, C){
	  var P, S = target.constructor;
	  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
	    setPrototypeOf(that, P);
	  } return that;
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(10)
	  , anObject = __webpack_require__(9);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(20)(Function.call, __webpack_require__(76).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(77)
	  , createDesc     = __webpack_require__(16)
	  , toIObject      = __webpack_require__(37)
	  , toPrimitive    = __webpack_require__(15)
	  , has            = __webpack_require__(18)
	  , IE8_DOM_DEFINE = __webpack_require__(11)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(12) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 77 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(4);
	
	$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(79)('Map')});

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = __webpack_require__(55)
	  , from    = __webpack_require__(80);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var forOf = __webpack_require__(70);
	
	module.exports = function(iter, ITERATOR){
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(61);
	__webpack_require__(25);
	__webpack_require__(62);
	__webpack_require__(82);
	module.exports = __webpack_require__(6).Promise;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(30)
	  , global             = __webpack_require__(5)
	  , ctx                = __webpack_require__(20)
	  , classof            = __webpack_require__(55)
	  , $export            = __webpack_require__(4)
	  , isObject           = __webpack_require__(10)
	  , anObject           = __webpack_require__(9)
	  , aFunction          = __webpack_require__(21)
	  , anInstance         = __webpack_require__(69)
	  , forOf              = __webpack_require__(70)
	  , setProto           = __webpack_require__(75).set
	  , speciesConstructor = __webpack_require__(83)
	  , task               = __webpack_require__(84).set
	  , microtask          = __webpack_require__(85)
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;
	
	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise      = $Promise.resolve(1)
	      , FakePromise1 = promise.constructor = function(exec){ exec(empty, empty); }
	      , FakePromise2 = function(exec){ exec(empty, empty); };
	    __webpack_require__(8).f(FakePromise1, __webpack_require__(48)('species'), {value: FakePromise2});
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise2;
	  } catch(e){ /* empty */ }
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          result = handler === true ? value : handler(value);
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(68)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok   = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(47)($Promise, PROMISE);
	__webpack_require__(71)(PROMISE);
	Wrapper = __webpack_require__(6)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(56)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(9)
	  , aFunction = __webpack_require__(21)
	  , SPECIES   = __webpack_require__(48)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(20)
	  , invoke             = __webpack_require__(23)
	  , html               = __webpack_require__(46)
	  , cel                = __webpack_require__(14)
	  , global             = __webpack_require__(5)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(39)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(5)
	  , macrotask = __webpack_require__(84).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(39)(process) == 'process'
	  , head, last, notify;
	
	var flush = function(){
	  var parent, domain, fn;
	  if(isNode && (parent = process.domain)){
	    process.domain = null;
	    parent.exit();
	  }
	  while(head){
	    domain = head.domain;
	    fn     = head.fn;
	    if(domain)domain.enter();
	    fn(); // <- currently we use it only for Promise - try / catch not required
	    if(domain)domain.exit();
	    head = head.next;
	  } last = undefined;
	  if(parent)parent.enter();
	};
	
	// Node.js
	if(isNode){
	  notify = function(){
	    process.nextTick(flush);
	  };
	// browsers with MutationObserver
	} else if(Observer){
	  var toggle = 1
	    , node   = document.createTextNode('');
	  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	  notify = function(){
	    node.data = toggle = -toggle;
	  };
	// environments with maybe non-completely correct, but existent Promise
	} else if(Promise && Promise.resolve){
	  notify = function(){
	    Promise.resolve().then(flush);
	  };
	// for other environments - macrotask based on:
	// - setImmediate
	// - MessageChannel
	// - window.postMessag
	// - onreadystatechange
	// - setTimeout
	} else {
	  notify = function(){
	    // strange IE + webpack dev server bug - use .call(global)
	    macrotask.call(global, flush);
	  };
	}
	
	module.exports = function(fn){
	  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
	  if(last)last.next = task;
	  if(!head){
	    head = task;
	    notify();
	  } last = task;
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var catalog_business_1 = __webpack_require__(87);
	var directory_business_1 = __webpack_require__(112);
	var entity_1 = __webpack_require__(99);
	var collection_1 = __webpack_require__(110);
	var packageOptions = __webpack_require__(115);
	var WakandaClient = (function () {
	    function WakandaClient(host) {
	        this._httpClient = new WakandaClient.HttpClient({
	            apiPrefix: (host || '') + '/rest'
	        });
	        var directoryBusiness = new directory_business_1.default({
	            wakJSC: this
	        });
	        this.directory = {
	            login: function (username, password, duration) {
	                return directoryBusiness.login(username, password, duration);
	            },
	            logout: function () {
	                return directoryBusiness.logout();
	            },
	            currentUser: function () {
	                return directoryBusiness.currentUser();
	            },
	            currentUserBelongsTo: function (group) {
	                return directoryBusiness.currentUserBelongsTo(group);
	            }
	        };
	        this.helper = {
	            isEntity: function (object) {
	                return object instanceof entity_1.default;
	            },
	            isCollection: function (object) {
	                return object instanceof collection_1.default;
	            }
	        };
	    }
	    WakandaClient.prototype.getCatalog = function (dataClasses) {
	        var catalogBusiness = new catalog_business_1.default({
	            wakJSC: this
	        });
	        return catalogBusiness.get(dataClasses);
	    };
	    WakandaClient.prototype.version = function () {
	        return packageOptions.version;
	    };
	    return WakandaClient;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = WakandaClient;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var abstract_business_1 = __webpack_require__(88);
	var catalog_service_1 = __webpack_require__(89);
	var catalog_1 = __webpack_require__(92);
	var dataclass_1 = __webpack_require__(93);
	var dataclass_business_1 = __webpack_require__(94);
	var CatalogBusiness = (function (_super) {
	    __extends(CatalogBusiness, _super);
	    function CatalogBusiness(obj) {
	        _super.call(this, obj);
	        this.service = new catalog_service_1.default({
	            wakJSC: this.wakJSC
	        });
	    }
	    CatalogBusiness.prototype.needDataClass = function (dcName) {
	        if (this.seenDataClasses.indexOf(dcName) === -1) {
	            this.seenDataClasses.push(dcName);
	        }
	    };
	    CatalogBusiness.prototype.get = function (dataClasses) {
	        var _this = this;
	        this.seenDataClasses = [];
	        return this.service.get(dataClasses).then(function (dataClassDBOArray) {
	            var dcArray = [];
	            for (var _i = 0, dataClassDBOArray_1 = dataClassDBOArray; _i < dataClassDBOArray_1.length; _i++) {
	                var dcDBO = dataClassDBOArray_1[_i];
	                var attributes = [];
	                for (var _a = 0, _b = dcDBO.attributes; _a < _b.length; _a++) {
	                    var attr = _b[_a];
	                    switch (attr.kind) {
	                        case 'relatedEntity':
	                            attributes.push(new dataclass_1.AttributeRelated({
	                                name: attr.name,
	                                type: attr.type,
	                                kind: attr.kind
	                            }));
	                            _this.needDataClass(attr.type);
	                            break;
	                        case 'storage':
	                        case 'calculated':
	                        case 'alias':
	                            var readOnly = attr.readOnly || (attr.type === 'image' || attr.type === 'blob');
	                            attributes.push(new dataclass_1.Attribute({
	                                name: attr.name,
	                                type: attr.type,
	                                readOnly: readOnly,
	                                kind: attr.kind
	                            }));
	                            break;
	                        case 'relatedEntities':
	                            var attrCollection = new dataclass_1.AttributeCollection({
	                                name: attr.name,
	                                type: attr.type,
	                                kind: attr.kind
	                            });
	                            attributes.push(attrCollection);
	                            _this.needDataClass(attrCollection.entityType);
	                            break;
	                        default:
	                            throw new Error('[WakandaClient] Unhandled ' + attr.kind + ' attribute type');
	                    }
	                }
	                var methods = {
	                    entity: [],
	                    collection: [],
	                    dataClass: []
	                };
	                for (var _c = 0, _d = dcDBO.methods; _c < _d.length; _c++) {
	                    var method = _d[_c];
	                    switch (method.applyTo) {
	                        case 'entity':
	                            methods.entity.push(method.name);
	                            break;
	                        case 'entityCollection':
	                            methods.collection.push(method.name);
	                            break;
	                        case 'dataClass':
	                            methods.dataClass.push(method.name);
	                            break;
	                        default:
	                            throw new Error('[WakandaClient] Unrecognized ' + method.applyTo + ' method type');
	                    }
	                }
	                var dataClass = new dataclass_1.DataClass({
	                    name: dcDBO.name,
	                    collectionName: dcDBO.collectionName,
	                    attributes: attributes,
	                    methods: methods
	                });
	                //Binding framework methods to the dataclass
	                var dataClassBusiness = new dataclass_business_1.default({
	                    wakJSC: _this.wakJSC,
	                    dataClass: dataClass,
	                    methods: methods
	                });
	                dataClassBusiness._decorateDataClass();
	                dcArray.push(dataClass);
	            }
	            var catalog = new catalog_1.default({
	                dataClasses: dcArray
	            });
	            //Check if we have all needed dataClasses on the catalog
	            for (var _e = 0, _f = _this.seenDataClasses; _e < _f.length; _e++) {
	                var dcName = _f[_e];
	                if (!catalog[dcName]) {
	                    throw new Error('Needed ' + dcName + ' dataClass is not present on catalog');
	                }
	            }
	            return catalog;
	        });
	    };
	    return CatalogBusiness;
	}(abstract_business_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = CatalogBusiness;


/***/ },
/* 88 */
/***/ function(module, exports) {

	"use strict";
	var AbstractBusiness = (function () {
	    function AbstractBusiness(_a) {
	        var wakJSC = _a.wakJSC;
	        this.wakJSC = wakJSC;
	    }
	    return AbstractBusiness;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = AbstractBusiness;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var abstract_service_1 = __webpack_require__(90);
	var catalog_base_service_1 = __webpack_require__(91);
	var CatalogService = (function (_super) {
	    __extends(CatalogService, _super);
	    function CatalogService() {
	        _super.apply(this, arguments);
	    }
	    CatalogService.prototype.get = function (dataClasses) {
	        return catalog_base_service_1.CatalogBaseService.get({
	            httpClient: this.httpClient,
	            dataClasses: dataClasses
	        });
	    };
	    return CatalogService;
	}(abstract_service_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = CatalogService;


/***/ },
/* 90 */
/***/ function(module, exports) {

	"use strict";
	var AbstractService = (function () {
	    function AbstractService(_a) {
	        var wakJSC = _a.wakJSC;
	        this.wakJSC = wakJSC;
	        this.httpClient = wakJSC._httpClient;
	    }
	    return AbstractService;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = AbstractService;


/***/ },
/* 91 */
/***/ function(module, exports) {

	"use strict";
	var CatalogBaseService = (function () {
	    function CatalogBaseService() {
	    }
	    CatalogBaseService.get = function (_a) {
	        var httpClient = _a.httpClient, dataClasses = _a.dataClasses;
	        var strDataclasses = '/';
	        if (Array.isArray(dataClasses)) {
	            strDataclasses += dataClasses.join();
	        }
	        else if (typeof dataClasses === 'undefined') {
	            strDataclasses += '$all';
	        }
	        else {
	            throw new Error('Catalog.get: first parameter should be an array');
	        }
	        return httpClient.get({ uri: '/$catalog' + strDataclasses })
	            .then(function (res) {
	            var catalog = [];
	            var rawObj = JSON.parse(res.body);
	            for (var _i = 0, _a = rawObj.dataClasses; _i < _a.length; _i++) {
	                var d = _a[_i];
	                var attributes = [];
	                if (d.attributes) {
	                    for (var _b = 0, _c = d.attributes; _b < _c.length; _b++) {
	                        var attr = _c[_b];
	                        attributes.push({
	                            name: attr.name,
	                            kind: attr.kind,
	                            type: attr.type,
	                            readOnly: attr.readOnly
	                        });
	                    }
	                }
	                var methods = [];
	                if (d.methods) {
	                    for (var _d = 0, _e = d.methods; _d < _e.length; _d++) {
	                        var m = _e[_d];
	                        methods.push({
	                            name: m.name,
	                            applyTo: m.applyTo
	                        });
	                    }
	                }
	                catalog.push({
	                    name: d.name,
	                    collectionName: d.collectionName,
	                    attributes: attributes,
	                    methods: methods
	                });
	            }
	            return catalog;
	        });
	    };
	    return CatalogBaseService;
	}());
	exports.CatalogBaseService = CatalogBaseService;


/***/ },
/* 92 */
/***/ function(module, exports) {

	"use strict";
	var Catalog = (function () {
	    function Catalog(_a) {
	        var dataClasses = _a.dataClasses;
	        for (var _i = 0, dataClasses_1 = dataClasses; _i < dataClasses_1.length; _i++) {
	            var dc = dataClasses_1[_i];
	            this[dc.name] = dc;
	        }
	    }
	    return Catalog;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Catalog;


/***/ },
/* 93 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var DataClass = (function () {
	    function DataClass(_a) {
	        var name = _a.name, collectionName = _a.collectionName, attributes = _a.attributes, methods = _a.methods;
	        this.name = name;
	        this.collectionName = collectionName;
	        this.attributes = attributes;
	        this.methods = methods;
	    }
	    return DataClass;
	}());
	exports.DataClass = DataClass;
	var Attribute = (function () {
	    function Attribute(_a) {
	        var name = _a.name, type = _a.type, readOnly = _a.readOnly, kind = _a.kind;
	        this.name = name;
	        this.type = type;
	        this.readOnly = readOnly === true;
	        this.kind = kind;
	    }
	    return Attribute;
	}());
	exports.Attribute = Attribute;
	var AttributeRelated = (function (_super) {
	    __extends(AttributeRelated, _super);
	    function AttributeRelated() {
	        _super.apply(this, arguments);
	    }
	    return AttributeRelated;
	}(Attribute));
	exports.AttributeRelated = AttributeRelated;
	var AttributeCollection = (function (_super) {
	    __extends(AttributeCollection, _super);
	    function AttributeCollection(_a) {
	        var name = _a.name, type = _a.type, readOnly = _a.readOnly, kind = _a.kind;
	        _super.call(this, { name: name, type: type, readOnly: readOnly, kind: kind });
	        this.entityType = type.substring(0, type.length - 10);
	    }
	    return AttributeCollection;
	}(Attribute));
	exports.AttributeCollection = AttributeCollection;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var abstract_business_1 = __webpack_require__(88);
	var entity_business_1 = __webpack_require__(95);
	var dataclass_service_1 = __webpack_require__(101);
	var collection_business_1 = __webpack_require__(103);
	var media_business_1 = __webpack_require__(107);
	var entity_1 = __webpack_require__(99);
	var collection_1 = __webpack_require__(110);
	var dataclass_1 = __webpack_require__(93);
	var media_1 = __webpack_require__(111);
	var const_1 = __webpack_require__(106);
	var method_adapter_1 = __webpack_require__(100);
	//This map stores all DataClassBusiness instances of existing dataClasses
	var _dataClassBusinessMap = new Map();
	var DataClassBusiness = (function (_super) {
	    __extends(DataClassBusiness, _super);
	    function DataClassBusiness(_a) {
	        var wakJSC = _a.wakJSC, dataClass = _a.dataClass, methods = _a.methods;
	        _super.call(this, { wakJSC: wakJSC });
	        this.dataClass = dataClass;
	        this.methods = methods;
	        this.service = new dataclass_service_1.default({
	            wakJSC: this.wakJSC,
	            dataClass: dataClass
	        });
	        _dataClassBusinessMap.set(dataClass.name, this);
	        this._dataClassBusinessMap = _dataClassBusinessMap;
	    }
	    DataClassBusiness.prototype._decorateDataClass = function () {
	        //Do not forget to bind(this) to have "this" pointing on business instance
	        //instead of given dataclass instance
	        this.dataClass.find = this.find.bind(this);
	        this.dataClass.query = this.query.bind(this);
	        this.dataClass.create = this.create.bind(this);
	        this._addUserDefinedMethods();
	    };
	    DataClassBusiness.prototype._addUserDefinedMethods = function () {
	        var _this = this;
	        var self = this;
	        this.methods.dataClass.forEach(function (method) {
	            //Voluntary don't use fat arrow notation to use arguments object without a bug
	            _this.dataClass[method] = function () {
	                var params = Array.from(arguments);
	                return self.callMethod(method, params);
	            };
	        });
	    };
	    DataClassBusiness.prototype.callMethod = function (methodName, parameters) {
	        var _this = this;
	        return this.service.callMethod(methodName, parameters)
	            .then(function (obj) {
	            return method_adapter_1.MethodAdapter.transform(obj, _this._dataClassBusinessMap);
	        });
	    };
	    DataClassBusiness.prototype.find = function (id, options) {
	        var _this = this;
	        var opt = options || {};
	        if (opt.filter !== undefined || opt.params !== undefined || opt.pageSize !== undefined ||
	            opt.start !== undefined || opt.orderBy !== undefined) {
	            throw new Error('Dataclass.find: options filter, params, pageSize, start and orderBy are not allowed');
	        }
	        return this.service.find(id, opt).then(function (entity) {
	            return _this._presentationEntityFromDbo({
	                dbo: entity
	            });
	        });
	    };
	    DataClassBusiness.prototype.query = function (options) {
	        var _this = this;
	        var opt = options || {};
	        var initialSelect = opt.select;
	        if (opt.method && opt.method.length > 0) {
	            throw new Error('Dataclass.query: option method is not allowed');
	        }
	        if (!opt.pageSize) {
	            opt.pageSize = const_1.default.DEFAULT_PAGE_SIZE;
	        }
	        return this.service.query(opt).then(function (collection) {
	            return _this._presentationCollectionFromDbo({
	                dbo: collection,
	                pageSize: opt.pageSize,
	                initialSelect: initialSelect
	            });
	        });
	    };
	    DataClassBusiness.prototype.create = function (pojo) {
	        var entityToAttach = {};
	        if (pojo) {
	            for (var prop in pojo) {
	                if (pojo[prop] instanceof entity_1.default) {
	                    entityToAttach[prop] = pojo[prop];
	                    delete pojo[prop];
	                }
	            }
	        }
	        var entity = this._presentationEntityFromDbo({
	            dbo: pojo || {}
	        });
	        for (var prop in entityToAttach) {
	            if (Object.prototype.hasOwnProperty.call(entityToAttach, prop)) {
	                entity[prop] = entityToAttach[prop];
	            }
	        }
	        return entity;
	    };
	    DataClassBusiness.prototype._createEntity = function (_a) {
	        var key = _a.key, deferred = _a.deferred;
	        var entity = new entity_1.default({
	            key: key,
	            deferred: deferred,
	            dataClass: this.dataClass
	        });
	        var business = new entity_business_1.default({
	            wakJSC: this.wakJSC,
	            dataClass: this.dataClass,
	            entity: entity,
	            dataClassBusiness: this
	        });
	        business._decorateEntity();
	        return entity;
	    };
	    DataClassBusiness.prototype._createCollection = function (_a) {
	        var uri = _a.uri, deferred = _a.deferred, pageSize = _a.pageSize, initialSelect = _a.initialSelect;
	        var collection = new collection_1.default({
	            deferred: deferred,
	            dataClass: this.dataClass
	        });
	        var business = new collection_business_1.default({
	            wakJSC: this.wakJSC,
	            dataClass: this.dataClass,
	            dataClassBusiness: this,
	            collection: collection,
	            collectionUri: uri,
	            pageSize: pageSize,
	            initialSelect: initialSelect
	        });
	        business._decorateCollection();
	        return collection;
	    };
	    DataClassBusiness.prototype._createMedia = function (_a) {
	        var uri = _a.uri, isImage = _a.isImage, attributeName = _a.attributeName, entity = _a.entity;
	        var media = new media_1.default({ uri: uri });
	        var business = new media_business_1.default({
	            wakJSC: this.wakJSC,
	            media: media,
	            dataClassBusiness: this,
	            isImage: isImage,
	            attributeName: attributeName,
	            entity: entity
	        });
	        business._decorateMedia();
	        return media;
	    };
	    DataClassBusiness.prototype._presentationEntityFromDbo = function (_a) {
	        var dbo = _a.dbo;
	        var entity;
	        if (!dbo) {
	            entity = null;
	        }
	        if (dbo.__deferred) {
	            entity = this._createEntity({
	                key: dbo.__deferred.__KEY,
	                deferred: true
	            });
	        }
	        else {
	            entity = this._createEntity({
	                key: dbo.__KEY
	            });
	            entity._stamp = dbo.__STAMP;
	            for (var _i = 0, _b = this.dataClass.attributes; _i < _b.length; _i++) {
	                var attr = _b[_i];
	                var dboAttribute = dbo[attr.name];
	                if (dboAttribute !== null && dboAttribute !== undefined) {
	                    if (attr instanceof dataclass_1.AttributeRelated) {
	                        //Kind of recursive call with a potententialy different instance of
	                        //DataClassBusiness
	                        var business = _dataClassBusinessMap.get(attr.type);
	                        entity[attr.name] = business._presentationEntityFromDbo({
	                            dbo: dboAttribute
	                        });
	                    }
	                    else if (attr instanceof dataclass_1.AttributeCollection) {
	                        var business = _dataClassBusinessMap.get(attr.entityType);
	                        entity[attr.name] = business._presentationCollectionFromDbo({
	                            dbo: dboAttribute
	                        });
	                    }
	                    else if (attr.type === 'image' || attr.type === 'blob') {
	                        var uri = void 0;
	                        if (dboAttribute && dboAttribute.__deferred && dboAttribute.__deferred.uri) {
	                            uri = dboAttribute.__deferred.uri;
	                        }
	                        else {
	                            uri = null;
	                        }
	                        entity[attr.name] = this._createMedia({
	                            uri: uri,
	                            isImage: attr.type === 'image',
	                            attributeName: attr.name,
	                            entity: entity
	                        });
	                    }
	                    else {
	                        entity[attr.name] = dboAttribute;
	                    }
	                }
	                else {
	                    //Even if the property is null, we need a media for this kind of attributes
	                    //to handle the upload part
	                    if (attr.type === 'image' || attr.type === 'blob') {
	                        entity[attr.name] = this._createMedia({
	                            uri: null,
	                            isImage: attr.type === 'image',
	                            attributeName: attr.name,
	                            entity: entity
	                        });
	                    }
	                    else {
	                        entity[attr.name] = null;
	                    }
	                }
	            }
	        }
	        return entity;
	    };
	    DataClassBusiness.prototype._presentationCollectionFromDbo = function (_a) {
	        var dbo = _a.dbo, pageSize = _a.pageSize, initialSelect = _a.initialSelect;
	        var collection;
	        if (!dbo) {
	            collection = null;
	        }
	        else if (dbo.__deferred) {
	            collection = this._createCollection({
	                deferred: true,
	                uri: dbo.__deferred.uri
	            });
	        }
	        else {
	            collection = this._createCollection({
	                uri: dbo.__ENTITYSET,
	                pageSize: pageSize || dbo.__ENTITIES.length,
	                initialSelect: initialSelect
	            });
	            collection._count = dbo.__COUNT;
	            collection._first = dbo.__FIRST;
	            collection._sent = dbo.__SENT;
	            collection._pageSize = pageSize;
	            for (var _i = 0, _b = dbo.__ENTITIES; _i < _b.length; _i++) {
	                var dboEntity = _b[_i];
	                collection.entities.push(this._presentationEntityFromDbo({
	                    dbo: dboEntity
	                }));
	            }
	        }
	        return collection;
	    };
	    return DataClassBusiness;
	}(abstract_business_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = DataClassBusiness;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var abstract_business_1 = __webpack_require__(88);
	var entity_service_1 = __webpack_require__(96);
	var dataclass_1 = __webpack_require__(93);
	var entity_1 = __webpack_require__(99);
	var method_adapter_1 = __webpack_require__(100);
	var EntityBusiness = (function (_super) {
	    __extends(EntityBusiness, _super);
	    function EntityBusiness(_a) {
	        var wakJSC = _a.wakJSC, entity = _a.entity, dataClass = _a.dataClass, dataClassBusiness = _a.dataClassBusiness;
	        _super.call(this, { wakJSC: wakJSC });
	        this.entity = entity;
	        this.dataClass = dataClass;
	        this.dataClassBusiness = dataClassBusiness;
	        this.service = new entity_service_1.default({
	            wakJSC: wakJSC,
	            entity: entity,
	            dataClass: dataClass
	        });
	    }
	    EntityBusiness.prototype._decorateEntity = function () {
	        this.entity.save = this.save.bind(this);
	        this.entity.delete = this.delete.bind(this);
	        this.entity.fetch = this.fetch.bind(this);
	        this.entity.recompute = this.recompute.bind(this);
	        this._addUserDefinedMethods();
	    };
	    EntityBusiness.prototype._addUserDefinedMethods = function () {
	        var _this = this;
	        var self = this;
	        this.dataClassBusiness.methods.entity.forEach(function (method) {
	            //Voluntary don't use fat arrow notation to use arguments object without a bug
	            _this.entity[method] = function () {
	                var params = Array.from(arguments);
	                return self.callMethod(method, params);
	            };
	        });
	    };
	    EntityBusiness.prototype.fetch = function (options) {
	        var _this = this;
	        var opt = options || {};
	        if (opt.filter !== undefined || opt.params !== undefined || opt.pageSize !== undefined ||
	            opt.start !== undefined || opt.orderBy !== undefined) {
	            throw new Error('Entity.fetch: options filter, params, pageSize, start and orderBy are not allowed');
	        }
	        return this.dataClassBusiness.find(this.entity._key, options).then(function (fresherEntity) {
	            _this._refreshEntity({ fresherEntity: fresherEntity });
	            return _this.entity;
	        });
	    };
	    EntityBusiness.prototype.callMethod = function (methodName, parameters) {
	        var _this = this;
	        if (!this.entity._key) {
	            throw new Error('Entity.' + methodName + ': can not be called on an unsaved entity');
	        }
	        return this.service.callMethod(methodName, parameters)
	            .then(function (obj) {
	            return method_adapter_1.MethodAdapter.transform(obj, _this.dataClassBusiness._dataClassBusinessMap);
	        });
	    };
	    EntityBusiness.prototype.delete = function () {
	        var _this = this;
	        if (!this.entity._key) {
	            throw new Error('Entity.delete: can not delete unsaved entity');
	        }
	        return this.service.delete().then(function () {
	            _this.entity = null;
	        });
	    };
	    EntityBusiness.prototype.save = function () {
	        var _this = this;
	        var data = this.prepareDataForSave();
	        //If first-level related entities were already expanded, we will save the
	        //entity and ask the server to expand theses attributes on its response
	        //So, the user keeps its entities expanded
	        var expand = this._getExpandString();
	        return this.service.save(data, expand).then(function (entityDbo) {
	            var fresherEntity = _this.dataClassBusiness._presentationEntityFromDbo({
	                dbo: entityDbo
	            });
	            _this._refreshEntity({ fresherEntity: fresherEntity });
	            return _this.entity;
	        });
	    };
	    EntityBusiness.prototype.recompute = function () {
	        var _this = this;
	        var data = this.prepareDataForSave();
	        return this.service.recompute(data)
	            .then(function (dbo) {
	            var fresherEntity = _this.dataClassBusiness._presentationEntityFromDbo({
	                dbo: dbo
	            });
	            _this._refreshEntity({ fresherEntity: fresherEntity });
	            return _this.entity;
	        });
	    };
	    EntityBusiness.prototype.prepareDataForSave = function () {
	        var data = {};
	        var entityIsNew = false;
	        if (this.entity._key && this.entity._stamp) {
	            data.__KEY = this.entity._key;
	            data.__STAMP = this.entity._stamp;
	        }
	        else {
	            entityIsNew = true;
	        }
	        for (var _i = 0, _a = this.dataClass.attributes; _i < _a.length; _i++) {
	            var attr = _a[_i];
	            var objAttr = this.entity[attr.name];
	            if (objAttr === undefined) {
	                objAttr = null;
	            }
	            if (attr instanceof dataclass_1.AttributeRelated) {
	                data[attr.name] = objAttr ? objAttr._key : null;
	            }
	            else if (!(attr instanceof dataclass_1.AttributeCollection) && !attr.readOnly) {
	                //Don't send null value for a newly created attribute (to don't override value eventually set on init event)
	                //except for ID (which is null), because if an empty object is send, save is ignored
	                if (!entityIsNew || objAttr !== null || attr.name === 'ID') {
	                    data[attr.name] = objAttr;
	                }
	            }
	        }
	        return data;
	    };
	    EntityBusiness.prototype._refreshEntity = function (_a) {
	        var fresherEntity = _a.fresherEntity;
	        for (var prop in fresherEntity) {
	            if (fresherEntity.hasOwnProperty(prop) && (typeof fresherEntity[prop] !== 'function')) {
	                this.entity[prop] = fresherEntity[prop];
	            }
	        }
	    };
	    EntityBusiness.prototype._getExpandString = function () {
	        var expand = '';
	        for (var _i = 0, _a = this.dataClass.attributes; _i < _a.length; _i++) {
	            var attr = _a[_i];
	            if (attr instanceof dataclass_1.AttributeRelated || attr instanceof dataclass_1.AttributeCollection) {
	                if (this.entity[attr.name] instanceof entity_1.default) {
	                    expand += attr.name + ',';
	                }
	            }
	        }
	        return expand.length > 0 ? expand.slice(0, -1) : null;
	    };
	    return EntityBusiness;
	}(abstract_business_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = EntityBusiness;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var abstract_service_1 = __webpack_require__(90);
	var entity_base_service_1 = __webpack_require__(97);
	var EntityService = (function (_super) {
	    __extends(EntityService, _super);
	    function EntityService(_a) {
	        var wakJSC = _a.wakJSC, entity = _a.entity, dataClass = _a.dataClass;
	        _super.call(this, { wakJSC: wakJSC });
	        this.entity = entity;
	        this.dataClass = dataClass;
	    }
	    EntityService.prototype.save = function (data, expand) {
	        return entity_base_service_1.EntityBaseService.save({
	            httpClient: this.httpClient,
	            dataClassName: this.dataClass.name,
	            expand: expand,
	            data: data
	        });
	    };
	    EntityService.prototype.recompute = function (data) {
	        return entity_base_service_1.EntityBaseService.recompute({
	            httpClient: this.httpClient,
	            dataClassName: this.dataClass.name,
	            data: data
	        });
	    };
	    EntityService.prototype.callMethod = function (methodName, parameters) {
	        return entity_base_service_1.EntityBaseService.callMethod({
	            httpClient: this.httpClient,
	            dataClassName: this.dataClass.name,
	            methodName: methodName,
	            parameters: parameters,
	            entityKey: this.entity._key
	        });
	    };
	    EntityService.prototype.delete = function () {
	        return entity_base_service_1.EntityBaseService.delete({
	            httpClient: this.httpClient,
	            dataClassName: this.dataClass.name,
	            entityKey: this.entity._key
	        });
	    };
	    return EntityService;
	}(abstract_service_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = EntityService;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util_1 = __webpack_require__(98);
	var EntityBaseService = (function () {
	    function EntityBaseService() {
	    }
	    EntityBaseService.save = function (_a) {
	        var httpClient = _a.httpClient, data = _a.data, expand = _a.expand, dataClassName = _a.dataClassName;
	        var expandStr = '';
	        if (expand) {
	            expandStr = '&$expand=' + expand;
	        }
	        return httpClient.post({
	            uri: '/' + dataClassName + '?$method=update' + expandStr,
	            data: data
	        }).then(function (res) {
	            var entity = JSON.parse(res.body);
	            delete entity.__entityModel;
	            util_1.default.removeRestInfoFromEntity(entity);
	            return entity;
	        });
	    };
	    EntityBaseService.recompute = function (_a) {
	        var httpClient = _a.httpClient, dataClassName = _a.dataClassName, data = _a.data;
	        return httpClient.post({
	            uri: '/' + dataClassName + '?$method=update&$refresh=true',
	            data: data
	        }).then(function (res) {
	            var dbo = JSON.parse(res.body);
	            delete dbo.__entityModel;
	            util_1.default.removeRestInfoFromEntity(dbo);
	            return dbo;
	        });
	    };
	    EntityBaseService.callMethod = function (_a) {
	        var httpClient = _a.httpClient, dataClassName = _a.dataClassName, methodName = _a.methodName, parameters = _a.parameters, entityKey = _a.entityKey;
	        return httpClient.post({
	            uri: '/' + dataClassName + '(' + entityKey + ')/' + methodName,
	            data: parameters
	        }).then(function (res) {
	            var obj = JSON.parse(res.body);
	            return obj.result || obj || null;
	        });
	    };
	    EntityBaseService.delete = function (_a) {
	        var httpClient = _a.httpClient, dataClassName = _a.dataClassName, entityKey = _a.entityKey;
	        return httpClient.post({
	            uri: '/' + dataClassName + '(' + entityKey + ')?$method=delete'
	        }).then(function (res) {
	            var obj = JSON.parse(res.body);
	            if (!(obj && obj.ok === true)) {
	                return Promise.reject(new Error());
	            }
	            else {
	                return true;
	            }
	        });
	    };
	    return EntityBaseService;
	}());
	exports.EntityBaseService = EntityBaseService;


/***/ },
/* 98 */
/***/ function(module, exports) {

	"use strict";
	var Util = (function () {
	    function Util() {
	    }
	    Util.handleOptions = function (options) {
	        if (!options) {
	            return '';
	        }
	        var select = options.select, filter = options.filter, params = options.params, pageSize = options.pageSize, start = options.start, orderBy = options.orderBy, method = options.method, emMethod = options.emMethod;
	        var ret = '?';
	        if (select) {
	            ret += '&$expand=' + select;
	        }
	        if (filter) {
	            ret += '&$filter=\"' + filter + '\"';
	        }
	        if (orderBy) {
	            ret += '&$orderby=' + orderBy;
	        }
	        if (params) {
	            if (!Array.isArray(params)) {
	                throw new Error('params option must be an array');
	            }
	            if (params.length > 0) {
	                var p = '[';
	                for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
	                    var elt = params_1[_i];
	                    if (typeof elt === 'string') {
	                        p += '\"' + elt + '\",';
	                    }
	                    else {
	                        p += elt + ',';
	                    }
	                }
	                p = p.slice(0, -1);
	                p += ']';
	                ret += '&$params=\'' + p + '\'';
	            }
	        }
	        if (pageSize) {
	            if (!this.isInteger(pageSize)) {
	                throw new Error('pageSize option must be an integer');
	            }
	            ret += '&$limit=' + pageSize;
	        }
	        if (start) {
	            if (!this.isInteger(start)) {
	                throw new Error('start option must be an integer');
	            }
	            ret += '&$skip=' + start;
	        }
	        if (method) {
	            ret += '&$method=' + method;
	        }
	        if (emMethod) {
	            ret += '&$emMethod=' + emMethod;
	        }
	        if (ret.length > 1 && ret[1] === '&') {
	            ret = ret.replace('?&', '?');
	        }
	        return ret === '?' ? '' : ret;
	    };
	    Util.isInteger = function (n) {
	        return typeof n === 'number' && !isNaN(n) && (n % 1) === 0;
	    };
	    Util.removeRestInfoFromEntity = function (entity) {
	        for (var prop in entity) {
	            if (Object.prototype.hasOwnProperty.call(entity, prop)) {
	                var p = entity[prop];
	                if (p && p.__deferred && p.__deferred.__KEY) {
	                    delete p.__deferred.uri;
	                }
	            }
	        }
	    };
	    return Util;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Util;


/***/ },
/* 99 */
/***/ function(module, exports) {

	"use strict";
	var Entity = (function () {
	    function Entity(_a) {
	        var entityKey = _a.key, deferred = _a.deferred, dataClass = _a.dataClass;
	        this._key = entityKey;
	        this._deferred = deferred === true;
	        Object.defineProperty(this, '_dataClass', {
	            enumerable: false,
	            configurable: false,
	            writable: false,
	            value: dataClass
	        });
	    }
	    return Entity;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Entity;


/***/ },
/* 100 */
/***/ function(module, exports) {

	"use strict";
	var MethodAdapter = (function () {
	    function MethodAdapter() {
	    }
	    MethodAdapter.transform = function (object, dcBusinessMap) {
	        if (object && object.__entityModel) {
	            var business = dcBusinessMap.get(object.__entityModel);
	            if (business) {
	                //Returned object is a collection
	                if (typeof object.__COUNT !== 'undefined' &&
	                    typeof object.__ENTITIES !== 'undefined' &&
	                    typeof object.__FIRST !== 'undefined' &&
	                    typeof object.__SENT !== 'undefined') {
	                    return business._presentationCollectionFromDbo({
	                        dbo: object
	                    });
	                }
	                else if (object.__KEY && object.__STAMP) {
	                    return business._presentationEntityFromDbo({
	                        dbo: object
	                    });
	                }
	            }
	        }
	        return object;
	    };
	    return MethodAdapter;
	}());
	exports.MethodAdapter = MethodAdapter;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var abstract_service_1 = __webpack_require__(90);
	var dataclass_base_service_1 = __webpack_require__(102);
	var DataClassService = (function (_super) {
	    __extends(DataClassService, _super);
	    function DataClassService(_a) {
	        var wakJSC = _a.wakJSC, dataClass = _a.dataClass;
	        _super.call(this, { wakJSC: wakJSC });
	        this.dataClass = dataClass;
	    }
	    DataClassService.prototype.find = function (id, options) {
	        return dataclass_base_service_1.DataClassBaseService.find({
	            httpClient: this.httpClient,
	            key: id,
	            options: options,
	            dataClassName: this.dataClass.name
	        });
	    };
	    DataClassService.prototype.query = function (options) {
	        return dataclass_base_service_1.DataClassBaseService.query({
	            httpClient: this.httpClient,
	            options: options,
	            dataClassName: this.dataClass.name
	        });
	    };
	    DataClassService.prototype.callMethod = function (methodName, parameters) {
	        return dataclass_base_service_1.DataClassBaseService.callMethod({
	            httpClient: this.httpClient,
	            dataClassName: this.dataClass.name,
	            methodName: methodName,
	            parameters: parameters
	        });
	    };
	    return DataClassService;
	}(abstract_service_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = DataClassService;


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util_1 = __webpack_require__(98);
	var DataClassBaseService = (function () {
	    function DataClassBaseService() {
	    }
	    DataClassBaseService.find = function (_a) {
	        var httpClient = _a.httpClient, key = _a.key, options = _a.options, dataClassName = _a.dataClassName;
	        if (typeof key !== 'string' && typeof key !== 'number') {
	            throw new Error('DataClass.find: Invalid id type');
	        }
	        var optString = util_1.default.handleOptions(options);
	        return httpClient.get({
	            uri: '/' + dataClassName + '(' + key + ')' + optString
	        })
	            .then(function (res) {
	            var entity = JSON.parse(res.body);
	            delete entity.__entityModel;
	            util_1.default.removeRestInfoFromEntity(entity);
	            return entity;
	        });
	    };
	    DataClassBaseService.query = function (_a) {
	        var httpClient = _a.httpClient, options = _a.options, dataClassName = _a.dataClassName;
	        options.method = 'entityset';
	        if (Array.isArray(options.params)) {
	            options.params = this._sanitizeOptionParams(options.params);
	        }
	        var optString = util_1.default.handleOptions(options);
	        return httpClient.get({
	            uri: '/' + dataClassName + optString
	        }).then(function (res) {
	            var collection = JSON.parse(res.body);
	            delete collection.__entityModel;
	            for (var _i = 0, _a = collection.__ENTITIES; _i < _a.length; _i++) {
	                var entity = _a[_i];
	                util_1.default.removeRestInfoFromEntity(entity);
	            }
	            return collection;
	        });
	    };
	    DataClassBaseService.callMethod = function (_a) {
	        var httpClient = _a.httpClient, methodName = _a.methodName, parameters = _a.parameters, dataClassName = _a.dataClassName;
	        return httpClient.post({
	            uri: '/' + dataClassName + '/' + methodName,
	            data: parameters
	        }).then(function (res) {
	            var obj = JSON.parse(res.body);
	            return obj.result || obj || null;
	        });
	    };
	    DataClassBaseService._sanitizeOptionParams = function (params) {
	        return params.map(function (element) {
	            if (element instanceof Date) {
	                return element.toISOString();
	            }
	            else {
	                return element;
	            }
	        });
	    };
	    return DataClassBaseService;
	}());
	exports.DataClassBaseService = DataClassBaseService;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var abstract_business_1 = __webpack_require__(88);
	var collection_service_1 = __webpack_require__(104);
	var const_1 = __webpack_require__(106);
	var method_adapter_1 = __webpack_require__(100);
	var CollectionBusiness = (function (_super) {
	    __extends(CollectionBusiness, _super);
	    function CollectionBusiness(_a) {
	        var wakJSC = _a.wakJSC, dataClass = _a.dataClass, collection = _a.collection, dataClassBusiness = _a.dataClassBusiness, collectionUri = _a.collectionUri, pageSize = _a.pageSize, initialSelect = _a.initialSelect;
	        _super.call(this, { wakJSC: wakJSC });
	        this.collection = collection;
	        this.dataClass = dataClass;
	        this.dataClassBusiness = dataClassBusiness;
	        this.service = new collection_service_1.default({
	            wakJSC: wakJSC,
	            collection: collection,
	            dataClass: dataClass,
	            collectionUri: collectionUri
	        });
	        this.pageSize = pageSize;
	        this.initialSelect = initialSelect;
	    }
	    CollectionBusiness.prototype._decorateCollection = function () {
	        this.collection.fetch = this.fetch.bind(this);
	        this.collection.nextPage = this.nextPage.bind(this);
	        this.collection.prevPage = this.prevPage.bind(this);
	        this.collection.more = this.more.bind(this);
	        this._addUserDefinedMethods();
	    };
	    CollectionBusiness.prototype.fetch = function (options) {
	        var _this = this;
	        var opt = options || {};
	        if (opt.method && opt.method.length > 0) {
	            throw new Error('Collection.fetch: option method is not allowed');
	        }
	        if (!opt.pageSize) {
	            opt.pageSize = this.pageSize ? this.pageSize : const_1.default.DEFAULT_PAGE_SIZE;
	        }
	        if (opt.select) {
	            this.initialSelect = opt.select;
	        }
	        this.pageSize = opt.pageSize;
	        return this.service.fetch(opt).then(function (collectionDBO) {
	            var fresherCollection = _this.dataClassBusiness._presentationCollectionFromDbo({
	                dbo: collectionDBO,
	                pageSize: _this.pageSize
	            });
	            _this._refreshCollection({ fresherCollection: fresherCollection });
	            return _this.collection;
	        });
	    };
	    CollectionBusiness.prototype.more = function () {
	        var _this = this;
	        if (this.collection._deferred === true) {
	            throw new Error('Collection.more: can not call more on a deferred collection');
	        }
	        var options = {
	            start: this.collection._first + this.collection._sent,
	            pageSize: this.pageSize
	        };
	        if (this.initialSelect) {
	            options.select = this.initialSelect;
	        }
	        return this.service.fetch(options)
	            .then(function (dbo) {
	            _this.collection._sent += dbo.__ENTITIES.length;
	            for (var _i = 0, _a = dbo.__ENTITIES; _i < _a.length; _i++) {
	                var entity = _a[_i];
	                _this.collection.entities.push(_this.dataClassBusiness._presentationEntityFromDbo({
	                    dbo: entity
	                }));
	            }
	            return _this.collection;
	        });
	    };
	    CollectionBusiness.prototype.nextPage = function () {
	        if (this.collection._deferred === true) {
	            throw new Error('Collection.nextPage: can not call nextPage on a deferred collection');
	        }
	        var options = {
	            start: this.collection._first + this.pageSize,
	            pageSize: this.pageSize
	        };
	        if (this.initialSelect) {
	            options.select = this.initialSelect;
	        }
	        return this.fetch(options);
	    };
	    CollectionBusiness.prototype.prevPage = function () {
	        if (this.collection._deferred === true) {
	            throw new Error('Collection.prevPage: can not call prevPage on a deferred collection');
	        }
	        var options = {
	            start: this.collection._first - this.pageSize,
	            pageSize: this.pageSize
	        };
	        if (this.initialSelect) {
	            options.select = this.initialSelect;
	        }
	        return this.fetch(options);
	    };
	    CollectionBusiness.prototype._addUserDefinedMethods = function () {
	        var _this = this;
	        var self = this;
	        this.dataClassBusiness.methods.collection.forEach(function (method) {
	            //Voluntary don't use fat arrow notation to use arguments object without a bug
	            _this.collection[method] = function () {
	                var params = Array.from(arguments);
	                return self.callMethod(method, params);
	            };
	        });
	    };
	    CollectionBusiness.prototype.callMethod = function (methodName, parameters) {
	        var _this = this;
	        if (this.collection._deferred) {
	            throw new Error('Collection.' + methodName + ': can not be called on a deferred collection');
	        }
	        return this.service.callMethod(methodName, parameters)
	            .then(function (obj) {
	            return method_adapter_1.MethodAdapter.transform(obj, _this.dataClassBusiness._dataClassBusinessMap);
	        });
	    };
	    CollectionBusiness.prototype._refreshCollection = function (_a) {
	        var fresherCollection = _a.fresherCollection;
	        for (var prop in fresherCollection) {
	            if (Object.prototype.hasOwnProperty.call(fresherCollection, prop)) {
	                if (typeof fresherCollection[prop] !== 'function') {
	                    this.collection[prop] = fresherCollection[prop];
	                }
	            }
	        }
	    };
	    return CollectionBusiness;
	}(abstract_business_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = CollectionBusiness;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var abstract_service_1 = __webpack_require__(90);
	var collection_base_service_1 = __webpack_require__(105);
	var CollectionService = (function (_super) {
	    __extends(CollectionService, _super);
	    function CollectionService(_a) {
	        var wakJSC = _a.wakJSC, collection = _a.collection, dataClass = _a.dataClass, collectionUri = _a.collectionUri;
	        _super.call(this, { wakJSC: wakJSC });
	        this.collection = collection;
	        this.dataClass = dataClass;
	        this.collectionUri = collectionUri;
	        this.isEntitySet = collection_base_service_1.isEntitySetUri(collectionUri);
	    }
	    CollectionService.prototype.fetch = function (options) {
	        var _this = this;
	        return collection_base_service_1.CollectionBaseService.fetch({
	            httpClient: this.httpClient,
	            collectionUri: this.collectionUri,
	            isEntitySet: this.isEntitySet,
	            options: options
	        })
	            .then(function (dbo) {
	            if (dbo.__ENTITYSET) {
	                _this.collectionUri = dbo.__ENTITYSET;
	                _this.isEntitySet = collection_base_service_1.isEntitySetUri(dbo.__ENTITYSET);
	            }
	            return dbo;
	        });
	    };
	    CollectionService.prototype.callMethod = function (methodName, parameters) {
	        return collection_base_service_1.CollectionBaseService.callMethod({
	            httpClient: this.httpClient,
	            collectionUri: this.collectionUri,
	            isEntitySet: this.isEntitySet,
	            methodName: methodName,
	            parameters: parameters
	        });
	    };
	    return CollectionService;
	}(abstract_service_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = CollectionService;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util_1 = __webpack_require__(98);
	var CollectionBaseService = (function () {
	    function CollectionBaseService() {
	    }
	    CollectionBaseService.fetch = function (_a) {
	        var httpClient = _a.httpClient, collectionUri = _a.collectionUri, isEntitySet = _a.isEntitySet, options = _a.options;
	        if (!isEntitySet) {
	            if (options.select && options.select.length > 0) {
	                throw new Error('Collection.fetch: option select is not allowed when collection is deferred');
	            }
	        }
	        options.method = 'subentityset';
	        var optString = util_1.default.handleOptions(options);
	        //Remove the first ? on optString if it's not an entitySet (because there is also
	        //?$expand=... on collectionUri), and add a &
	        if (!isEntitySet) {
	            optString = '&' + optString.slice(1);
	        }
	        //Remove the /rest/ part of the URI as our service will add it on its own
	        // let uri = this.collectionUri.slice(5);
	        var uri = this._removeRestFromUri(collectionUri);
	        return httpClient.get({
	            uri: uri + optString
	        }).then(function (res) {
	            var obj = JSON.parse(res.body);
	            delete obj.__entityModel;
	            for (var _i = 0, _a = obj.__ENTITIES; _i < _a.length; _i++) {
	                var entity = _a[_i];
	                util_1.default.removeRestInfoFromEntity(entity);
	            }
	            return obj;
	        });
	    };
	    CollectionBaseService.callMethod = function (_a) {
	        var httpClient = _a.httpClient, collectionUri = _a.collectionUri, isEntitySet = _a.isEntitySet, methodName = _a.methodName, parameters = _a.parameters;
	        //Two cases. If it's an entity set, just call the method
	        //If not, call it with emMethod and subentityset parameters
	        var uri = this._removeRestFromUri(collectionUri);
	        if (isEntitySet) {
	            uri += '/' + methodName;
	        }
	        else {
	            var optString = util_1.default.handleOptions({
	                method: 'subentityset',
	                emMethod: methodName
	            });
	            uri += '&' + optString.slice(1);
	        }
	        return httpClient.post({
	            uri: uri,
	            data: parameters
	        }).then(function (res) {
	            var obj = JSON.parse(res.body);
	            return obj.result || obj || null;
	        });
	    };
	    CollectionBaseService._removeRestFromUri = function (uri) {
	        return uri.slice(5);
	    };
	    return CollectionBaseService;
	}());
	exports.CollectionBaseService = CollectionBaseService;
	function isEntitySetUri(uri) {
	    return /^\/rest\/\w+\/\$entityset\/[A-Z0-9]+(\?.*)?$/i.test(uri);
	}
	exports.isEntitySetUri = isEntitySetUri;


/***/ },
/* 106 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    DEFAULT_PAGE_SIZE: 40,
	    DEFAULT_SESSION_DURATION: 3600 //seconds
	};


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var abstract_business_1 = __webpack_require__(88);
	var media_service_1 = __webpack_require__(108);
	var MediaBusiness = (function (_super) {
	    __extends(MediaBusiness, _super);
	    function MediaBusiness(_a) {
	        var wakJSC = _a.wakJSC, media = _a.media, dataClassBusiness = _a.dataClassBusiness, isImage = _a.isImage, attributeName = _a.attributeName, entity = _a.entity;
	        _super.call(this, { wakJSC: wakJSC });
	        this.media = media;
	        this.entity = entity;
	        this.dataClassBusiness = dataClassBusiness;
	        this.isImage = isImage === true;
	        this.service = new media_service_1.default({
	            wakJSC: wakJSC,
	            mediaBusiness: this,
	            media: media,
	            attributeName: attributeName,
	            dataClassBusiness: dataClassBusiness
	        });
	    }
	    MediaBusiness.prototype._decorateMedia = function () {
	        this.media.upload = this.upload.bind(this);
	        this.media.delete = this.delete.bind(this);
	    };
	    MediaBusiness.prototype.upload = function (file) {
	        var _this = this;
	        if (!this.entity._key) {
	            throw new Error('Media.upload: entity must be saved before uploading a media');
	        }
	        return this.service.upload(file, file.type).then(function (dbo) {
	            return dbo; //FIXME
	        }).then(function () {
	            //FIXME - crappy, force a refresh of the entity to get proper stamp and media uri
	            return _this.entity.fetch();
	        });
	    };
	    MediaBusiness.prototype.delete = function () {
	        var _this = this;
	        if (!this.entity._key) {
	            throw new Error('Media.upload: entity must be saved before deleting a media');
	        }
	        return this.service.delete().then(function () {
	            //FIXME - crappy, force a refresh of the entity to get proper stamp and media uri
	            return _this.entity.fetch();
	        });
	    };
	    return MediaBusiness;
	}(abstract_business_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = MediaBusiness;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var abstract_service_1 = __webpack_require__(90);
	var media_base_service_1 = __webpack_require__(109);
	var MediaService = (function (_super) {
	    __extends(MediaService, _super);
	    function MediaService(_a) {
	        var wakJSC = _a.wakJSC, mediaBusiness = _a.mediaBusiness, media = _a.media, attributeName = _a.attributeName, dataClassBusiness = _a.dataClassBusiness;
	        _super.call(this, { wakJSC: wakJSC });
	        this.dataClassName = dataClassBusiness.dataClass.name;
	        this.entity = mediaBusiness.entity;
	        this.isImage = mediaBusiness.isImage;
	        this.media = media;
	        this.attributeName = attributeName;
	    }
	    MediaService.prototype.upload = function (file, mimeType) {
	        return media_base_service_1.MediaBaseService.upload({
	            httpClient: this.httpClient,
	            dataClassName: this.dataClassName,
	            entityKey: this.entity._key,
	            attributeName: this.attributeName,
	            isImage: this.isImage,
	            file: file
	        });
	    };
	    MediaService.prototype.delete = function () {
	        return media_base_service_1.MediaBaseService.delete({
	            httpClient: this.httpClient,
	            dataClassName: this.dataClassName,
	            entityKey: this.entity._key,
	            entityStamp: this.entity._stamp,
	            attributeName: this.attributeName
	        });
	    };
	    return MediaService;
	}(abstract_service_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = MediaService;


/***/ },
/* 109 */
/***/ function(module, exports) {

	"use strict";
	var MediaBaseService = (function () {
	    function MediaBaseService() {
	    }
	    MediaBaseService.upload = function (_a) {
	        var httpClient = _a.httpClient, dataClassName = _a.dataClassName, entityKey = _a.entityKey, attributeName = _a.attributeName, file = _a.file, isImage = _a.isImage;
	        var uri = this._buildUri(dataClassName, entityKey, attributeName);
	        if (isImage) {
	            uri += '?$rawPict=' + file.type;
	        }
	        //FIXME - real crappy not to return some piece of information to refresh entity
	        return httpClient.post({
	            uri: uri,
	            data: file,
	            binary: true
	        });
	    };
	    MediaBaseService.delete = function (_a) {
	        var httpClient = _a.httpClient, dataClassName = _a.dataClassName, entityKey = _a.entityKey, entityStamp = _a.entityStamp, attributeName = _a.attributeName;
	        var uri = '/' + dataClassName + '(' + entityKey + ')';
	        var data = {
	            __KEY: entityKey,
	            __STAMP: entityStamp
	        };
	        data[attributeName] = null;
	        //FIXME - crappy
	        return httpClient.post({
	            uri: uri,
	            data: data
	        });
	    };
	    MediaBaseService._buildUri = function (dataClassName, entityKey, attributeName) {
	        return '/' + dataClassName + '(' + entityKey + ')' + '/' + attributeName;
	    };
	    return MediaBaseService;
	}());
	exports.MediaBaseService = MediaBaseService;


/***/ },
/* 110 */
/***/ function(module, exports) {

	"use strict";
	var Collection = (function () {
	    function Collection(_a) {
	        var deferred = _a.deferred, dataClass = _a.dataClass;
	        this.entities = [];
	        this._deferred = deferred === true;
	        Object.defineProperty(this, '_dataClass', {
	            enumerable: false,
	            configurable: false,
	            writable: false,
	            value: dataClass
	        });
	    }
	    return Collection;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Collection;


/***/ },
/* 111 */
/***/ function(module, exports) {

	"use strict";
	var Media = (function () {
	    function Media(_a) {
	        var uri = _a.uri;
	        this.uri = uri;
	    }
	    return Media;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Media;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var abstract_business_1 = __webpack_require__(88);
	var directory_service_1 = __webpack_require__(113);
	var const_1 = __webpack_require__(106);
	var DirectoryBusiness = (function (_super) {
	    __extends(DirectoryBusiness, _super);
	    function DirectoryBusiness(_a) {
	        var wakJSC = _a.wakJSC;
	        _super.call(this, { wakJSC: wakJSC });
	        this.service = new directory_service_1.default({ wakJSC: wakJSC });
	    }
	    DirectoryBusiness.prototype.login = function (username, password, duration) {
	        var durationTime = duration || const_1.default.DEFAULT_SESSION_DURATION;
	        if (!(typeof durationTime === 'number') || durationTime <= 0) {
	            throw new Error('Directory.login: invalid duration parameter');
	        }
	        return this.service.login(username, password, durationTime)
	            .catch(function () {
	            return Promise.reject(new Error('Directory.login: Unauthorized'));
	        });
	    };
	    DirectoryBusiness.prototype.logout = function () {
	        return this.service.logout()
	            .catch(function () {
	            return Promise.reject(new Error('Directory.logout: logout failed'));
	        });
	    };
	    DirectoryBusiness.prototype.currentUser = function () {
	        return this.service.currentUser()
	            .then(function (dbo) {
	            return dbo;
	        })
	            .catch(function () {
	            return Promise.reject(new Error('Directory.currentUser: user is not logged in'));
	        });
	    };
	    DirectoryBusiness.prototype.currentUserBelongsTo = function (group) {
	        if (!(typeof group === 'string')) {
	            throw new Error('Directory.currentUserBelongsTo: group must be a string');
	        }
	        return this.service.currentUserBelongsTo(group)
	            .then(function () {
	            return true;
	        })
	            .catch(function () {
	            return false;
	        });
	    };
	    return DirectoryBusiness;
	}(abstract_business_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = DirectoryBusiness;


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var abstract_service_1 = __webpack_require__(90);
	var directory_base_service_1 = __webpack_require__(114);
	var DirectoryService = (function (_super) {
	    __extends(DirectoryService, _super);
	    function DirectoryService() {
	        _super.apply(this, arguments);
	    }
	    DirectoryService.prototype.login = function (username, password, duration) {
	        return directory_base_service_1.DirectoryBaseService.login({
	            httpClient: this.httpClient,
	            username: username,
	            password: password,
	            duration: duration
	        });
	    };
	    DirectoryService.prototype.logout = function () {
	        return directory_base_service_1.DirectoryBaseService.logout({
	            httpClient: this.httpClient
	        });
	    };
	    DirectoryService.prototype.currentUser = function () {
	        return directory_base_service_1.DirectoryBaseService.currentUser({
	            httpClient: this.httpClient
	        });
	    };
	    DirectoryService.prototype.currentUserBelongsTo = function (group) {
	        return directory_base_service_1.DirectoryBaseService.currentUserBelongsTo({
	            httpClient: this.httpClient,
	            group: group
	        });
	    };
	    return DirectoryService;
	}(abstract_service_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = DirectoryService;


/***/ },
/* 114 */
/***/ function(module, exports) {

	"use strict";
	var DirectoryBaseService = (function () {
	    function DirectoryBaseService() {
	    }
	    DirectoryBaseService.login = function (_a) {
	        var httpClient = _a.httpClient, username = _a.username, password = _a.password, duration = _a.duration;
	        return httpClient.post({
	            uri: '/$directory/login',
	            data: [username, password, duration]
	        }).then(function () {
	            return true;
	        });
	    };
	    DirectoryBaseService.logout = function (_a) {
	        var httpClient = _a.httpClient;
	        return httpClient.get({
	            uri: '/$directory/logout'
	        }).then(function (res) {
	            var obj = JSON.parse(res.body);
	            if (obj.result && obj.result === true) {
	                return true;
	            }
	            else {
	                return Promise.reject(new Error());
	            }
	        });
	    };
	    DirectoryBaseService.currentUser = function (_a) {
	        var httpClient = _a.httpClient;
	        return httpClient.get({
	            uri: '/$directory/currentUser'
	        })
	            .then(function (res) {
	            var obj = JSON.parse(res.body);
	            if (obj.result && obj.result.ID) {
	                return obj.result;
	            }
	            else {
	                return Promise.reject(new Error());
	            }
	        });
	    };
	    DirectoryBaseService.currentUserBelongsTo = function (_a) {
	        var httpClient = _a.httpClient, group = _a.group;
	        return httpClient.post({
	            uri: '/$directory/currentUserBelongsTo',
	            data: [group]
	        }).then(function (res) {
	            var obj = JSON.parse(res.body);
	            if (obj && obj.result && obj.result === true) {
	                return true;
	            }
	            else {
	                return Promise.reject(new Error());
	            }
	        });
	    };
	    return DirectoryBaseService;
	}());
	exports.DirectoryBaseService = DirectoryBaseService;


/***/ },
/* 115 */
/***/ function(module, exports) {

	module.exports = {
		"name": "wakanda-client",
		"main": "dist/wakanda-client.node.js",
		"version": "0.3.2",
		"description": "Wakanda Client allows you to easily interact with Wakanda Server on a JavaScript (browser or node) environment",
		"typings": "dist/wakanda-client.d.ts",
		"browser": "dist/wakanda-client.min.js",
		"repository": "wakanda/wakanda-javascript-client",
		"scripts": {
			"webpack-watch": "node ./node_modules/webpack/bin/webpack.js --progress --colors --watch",
			"webpack-build": "node ./node_modules/webpack/bin/webpack.js --progress --colors",
			"webpack-build:ci": "node ./node_modules/webpack/bin/webpack.js --progress --colors --config webpack.ci.js",
			"webpack-build:prod": "node ./node_modules/webpack/bin/webpack.js --progress --colors --config webpack.prod.js",
			"test:karma:single": "node ./node_modules/karma/bin/karma start",
			"test:karma:full": "npm run webpack-build && npm run test:karma:single",
			"test:node:single": "http_proxy=\"\" node ./node_modules/mocha/bin/mocha test/bootstrap.js test/spec/**/*.spec.js",
			"test:node:full": "npm run webpack-build && npm run test:node:single",
			"test-single": "./test.sh single",
			"test": "./test.sh",
			"test-server:start": "node test/connect/server.js & echo $! > testserver.pid && sleep 1",
			"test-server:stop": "kill `cat testserver.pid` && rm testserver.pid",
			"test-server:record": "node test/connect/server.js record & echo $! > testserver.pid",
			"test-server:init": "rm -rf test/connect/mocks && npm run test-server:record && npm run webpack-build && npm run test:node:single && npm run test:karma:single && npm run test-server:stop",
			"codecov": "cat coverage/*/lcov.info | codecov",
			"tsc": "node ./node_modules/typescript/bin/tsc",
			"serve": "node ./node_modules/.bin/concurrently -r \"npm run webpack-watch\" \"node ./node_modules/.bin/gulp serve\""
		},
		"author": "Wakanda SAS",
		"license": "MIT",
		"devDependencies": {
			"babel-core": "^6.3.17",
			"babel-loader": "^6.2.0",
			"babel-polyfill": "^6.3.14",
			"babel-preset-es2015": "^6.3.13",
			"body-parser": "^1.14.2",
			"chai": "^3.4.1",
			"chalk": "^1.1.1",
			"codecov.io": "^0.1.6",
			"concurrently": "^2.0.0",
			"connect": "^3.4.0",
			"connect-prism": "mrblackus/connect-prism",
			"eslint": "^1.10.3",
			"eslint-loader": "^1.2.0",
			"express": "^4.13.3",
			"grunt": "^0.4.5",
			"gulp": "^3.9.0",
			"gulp-connect": "^2.2.0",
			"http-proxy-middleware": "^0.9.0",
			"isparta": "^4.0.0",
			"isparta-loader": "^2.0.0",
			"json-loader": "^0.5.4",
			"karma": "^0.13.15",
			"karma-chai": "^0.1.0",
			"karma-coverage": "^0.5.3",
			"karma-mocha": "^0.2.1",
			"karma-phantomjs-launcher": "^0.2.1",
			"karma-verbose-reporter": "0.0.3",
			"mocha": "^2.3.4",
			"path": "^0.12.7",
			"phantomjs": "^1.9.19",
			"serve-static": "^1.10.2",
			"ts-loader": "^0.8.1",
			"tslint": "^3.9.0",
			"tslint-loader": "^2.1.4",
			"typescript": "^1.8.10",
			"webpack": "^1.12.15"
		},
		"dependencies": {
			"core-js": "^2.1.2",
			"request": "^2.67.0"
		}
	};

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var http_client_1 = __webpack_require__(117);
	var http_response_1 = __webpack_require__(118);
	var AureliaHttpClient = __webpack_require__(119).HttpClient;
	var BrowserHttpClient = (function (_super) {
	    __extends(BrowserHttpClient, _super);
	    function BrowserHttpClient(_a) {
	        var apiPrefix = _a.apiPrefix;
	        _super.call(this, { apiPrefix: apiPrefix });
	        this.client = new AureliaHttpClient();
	    }
	    BrowserHttpClient.prototype.get = function (_a) {
	        var uri = _a.uri, params = _a.params;
	        try {
	            var res = _super.prototype.get.call(this, { uri: uri, params: params });
	            if (res !== null) {
	                return Promise.resolve(res);
	            }
	        }
	        catch (e) {
	            return Promise.reject(e);
	        }
	        var result = this._getWithoutInterceptor({ uri: uri, params: params });
	        return _super.prototype.responseGet.call(this, uri, result);
	    };
	    BrowserHttpClient.prototype._getWithoutInterceptor = function (_a) {
	        var uri = _a.uri;
	        var request = this.client.createRequest(this.prefix + uri)
	            .asGet()
	            .send();
	        return this._httpResponseAdaptor({ request: request });
	    };
	    BrowserHttpClient.prototype.post = function (_a) {
	        var uri = _a.uri, data = _a.data, binary = _a.binary;
	        try {
	            var res = _super.prototype.post.call(this, { uri: uri, data: data, binary: binary });
	            if (res !== null) {
	                return Promise.resolve(res);
	            }
	        }
	        catch (e) {
	            return Promise.reject(e);
	        }
	        var request = this.client.createRequest(this.prefix + uri)
	            .asPost()
	            .withContent(data)
	            .send();
	        var result = this._httpResponseAdaptor({ request: request });
	        return _super.prototype.responsePost.call(this, uri, result);
	    };
	    BrowserHttpClient.prototype._httpResponseAdaptor = function (_a) {
	        var request = _a.request;
	        return request.then(function (res) {
	            return new http_response_1.default({
	                statusCode: res.statusCode,
	                headers: [],
	                body: res.response
	            });
	        });
	    };
	    return BrowserHttpClient;
	}(http_client_1.HttpClient));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = BrowserHttpClient;


/***/ },
/* 117 */
/***/ function(module, exports) {

	"use strict";
	var HttpClient = (function () {
	    function HttpClient(_a) {
	        var apiPrefix = _a.apiPrefix;
	        this.prefix = apiPrefix;
	        this._getRequestInterceptors = [];
	        this._postRequestInterceptors = [];
	        this._getResponseInterceptors = [];
	        this._postResponseInterceptors = [];
	    }
	    HttpClient.prototype.get = function (options) {
	        for (var i = 0; i < this._getRequestInterceptors.length; i++) {
	            var interceptor = this._getRequestInterceptors[i];
	            var res = interceptor(options);
	            if (res !== null && (typeof res !== 'undefined')) {
	                return res;
	            }
	        }
	        return null;
	    };
	    HttpClient.prototype.post = function (options) {
	        for (var i = 0; i < this._postRequestInterceptors.length; i++) {
	            var interceptor = this._postRequestInterceptors[i];
	            var res = interceptor(options);
	            if (res !== null && (typeof res !== 'undefined')) {
	                return res;
	            }
	        }
	        return null;
	    };
	    /**
	     * @return {Promise} Returns either the underlying HTTP request result, or the promise returned by the interceptor if any
	     */
	    HttpClient.prototype.responseGet = function (requestUri, promise) {
	        //Execute response interceptors
	        for (var _i = 0, _a = this._getResponseInterceptors; _i < _a.length; _i++) {
	            var interceptor = _a[_i];
	            var res = interceptor(requestUri, promise);
	            if (res) {
	                return res;
	            }
	        }
	        return promise;
	    };
	    /**
	     * @return {Promise} Returns either the underlying HTTP request result, or the promise returned by the interceptor if any
	     */
	    HttpClient.prototype.responsePost = function (requestUri, promise) {
	        //Execute response interceptors
	        for (var _i = 0, _a = this._postResponseInterceptors; _i < _a.length; _i++) {
	            var interceptor = _a[_i];
	            var res = interceptor(requestUri, promise);
	            if (res) {
	                return res;
	            }
	        }
	        return promise;
	    };
	    /**
	     * @param {array|string} type - HTTP verb of the request to intercept
	     * @param {function} callback - The interceptor function to execute before HTTP request. If it returns something different than null, the underlying HTTP request won't be executed
	     * @returns {null|object} Returns null or an object, if an object is returned, the underlying HTTP request won't be executed
	     */
	    HttpClient.prototype.registerRequestInterceptor = function (type, callback) {
	        var _this = this;
	        var interceptorType = this._interceptorTypeToArray(type);
	        interceptorType.forEach(function (t) {
	            if (t === 'get') {
	                _this._getRequestInterceptors.push(callback);
	            }
	            else if (t === 'post') {
	                _this._postRequestInterceptors.push(callback);
	            }
	        });
	    };
	    HttpClient.prototype.registerResponseInterceptor = function (type, callback) {
	        var _this = this;
	        var interceptorType = this._interceptorTypeToArray(type);
	        interceptorType.forEach(function (t) {
	            if (t === 'get') {
	                _this._getResponseInterceptors.push(callback);
	            }
	            else if (t === 'post') {
	                _this._postResponseInterceptors.push(callback);
	            }
	        });
	    };
	    HttpClient.prototype._interceptorTypeToArray = function (type) {
	        var _this = this;
	        var interceptorType = [];
	        if (typeof type === 'string') {
	            if (!this._isValidInterceptorType(type.toLowerCase())) {
	                throw new Error('HttpClient.registerInterceptor: invalid interceptor type');
	            }
	            else {
	                interceptorType.push(type.toLowerCase());
	            }
	        }
	        else if (Array.isArray(type)) {
	            type.forEach(function (t) {
	                if (!_this._isValidInterceptorType(t.toLowerCase())) {
	                    throw new Error('HttpClient.registerInterceptor: invalid interceptor type');
	                }
	                else {
	                    interceptorType.push(t.toLowerCase());
	                }
	            });
	        }
	        else {
	            throw new Error('HttpClient.registerInterceptor: type must be a string or an array');
	        }
	        return interceptorType;
	    };
	    HttpClient.prototype._isValidInterceptorType = function (type) {
	        var validTypes = ['get', 'post'];
	        return validTypes.indexOf(type) !== -1;
	    };
	    return HttpClient;
	}());
	exports.HttpClient = HttpClient;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = HttpClient;


/***/ },
/* 118 */
/***/ function(module, exports) {

	"use strict";
	var HttpResponse = (function () {
	    function HttpResponse(_a) {
	        var statusCode = _a.statusCode, headers = _a.headers, body = _a.body;
	        this.statusCode = statusCode;
	        this.headers = headers || [];
	        this.body = body;
	    }
	    return HttpResponse;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = HttpResponse;


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _httpClient = __webpack_require__(120);
	
	Object.defineProperty(exports, 'HttpClient', {
	  enumerable: true,
	  get: function get() {
	    return _httpClient.HttpClient;
	  }
	});
	
	var _httpRequestMessage = __webpack_require__(124);
	
	Object.defineProperty(exports, 'HttpRequestMessage', {
	  enumerable: true,
	  get: function get() {
	    return _httpRequestMessage.HttpRequestMessage;
	  }
	});
	
	var _httpResponseMessage = __webpack_require__(126);
	
	Object.defineProperty(exports, 'HttpResponseMessage', {
	  enumerable: true,
	  get: function get() {
	    return _httpResponseMessage.HttpResponseMessage;
	  }
	});
	
	var _jsonpRequestMessage = __webpack_require__(128);
	
	Object.defineProperty(exports, 'JSONPRequestMessage', {
	  enumerable: true,
	  get: function get() {
	    return _jsonpRequestMessage.JSONPRequestMessage;
	  }
	});
	
	var _headers = __webpack_require__(121);
	
	Object.defineProperty(exports, 'Headers', {
	  enumerable: true,
	  get: function get() {
	    return _headers.Headers;
	  }
	});
	
	var _requestBuilder = __webpack_require__(122);
	
	Object.defineProperty(exports, 'RequestBuilder', {
	  enumerable: true,
	  get: function get() {
	    return _requestBuilder.RequestBuilder;
	  }
	});

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.HttpClient = undefined;
	
	var _headers = __webpack_require__(121);
	
	var _requestBuilder = __webpack_require__(122);
	
	var _httpRequestMessage = __webpack_require__(124);
	
	var _jsonpRequestMessage = __webpack_require__(128);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function trackRequestStart(client, processor) {
	  client.pendingRequests.push(processor);
	  client.isRequesting = true;
	}
	
	function trackRequestEnd(client, processor) {
	  var index = client.pendingRequests.indexOf(processor);
	
	  client.pendingRequests.splice(index, 1);
	  client.isRequesting = client.pendingRequests.length > 0;
	
	  if (!client.isRequesting) {
	    var evt = new window.CustomEvent('aurelia-http-client-requests-drained', { bubbles: true, cancelable: true });
	    setTimeout(function () {
	      return document.dispatchEvent(evt);
	    }, 1);
	  }
	}
	
	/**
	* The main HTTP client object.
	*
	* @class HttpClient
	* @constructor
	*/
	
	var HttpClient = exports.HttpClient = (function () {
	  function HttpClient() {
	    _classCallCheck(this, HttpClient);
	
	    this.requestTransformers = [];
	    this.requestProcessorFactories = new Map();
	    this.requestProcessorFactories.set(_httpRequestMessage.HttpRequestMessage, _httpRequestMessage.createHttpRequestMessageProcessor);
	    this.requestProcessorFactories.set(_jsonpRequestMessage.JSONPRequestMessage, _jsonpRequestMessage.createJSONPRequestMessageProcessor);
	    this.pendingRequests = [];
	    this.isRequesting = false;
	  }
	
	  /**
	   * Configure this HttpClient with default settings to be used by all requests.
	   *
	   * @method configure
	   * @param {Function} fn A function that takes a RequestBuilder as an argument.
	   * @chainable
	   */
	
	  _createClass(HttpClient, [{
	    key: 'configure',
	    value: function configure(fn) {
	      var builder = new _requestBuilder.RequestBuilder(this);
	      fn(builder);
	      this.requestTransformers = builder.transformers;
	      return this;
	    }
	
	    /**
	     * Returns a new RequestBuilder for this HttpClient instance that can be used to build and send HTTP requests.
	     *
	     * @method createRequest
	     * @param uri The target URI.
	     * @type RequestBuilder
	     */
	
	  }, {
	    key: 'createRequest',
	    value: function createRequest(uri) {
	      var builder = new _requestBuilder.RequestBuilder(this);
	
	      if (uri) {
	        builder.withUri(uri);
	      }
	
	      return builder;
	    }
	
	    /**
	     * Sends a message using the underlying networking stack.
	     *
	     * @method send
	     * @param message A configured HttpRequestMessage or JSONPRequestMessage.
	     * @param {Array} transformers A collection of transformers to apply to the HTTP request.
	     * @return {Promise} A cancellable promise object.
	     */
	
	  }, {
	    key: 'send',
	    value: function send(message, transformers) {
	      var _this = this;
	
	      var createProcessor = this.requestProcessorFactories.get(message.constructor),
	          processor,
	          promise,
	          i,
	          ii;
	
	      if (!createProcessor) {
	        throw new Error('No request message processor factory for ' + message.constructor + '.');
	      }
	
	      processor = createProcessor();
	      trackRequestStart(this, processor);
	
	      transformers = transformers || this.requestTransformers;
	
	      for (i = 0, ii = transformers.length; i < ii; ++i) {
	        transformers[i](this, processor, message);
	      }
	
	      promise = processor.process(this, message);
	
	      promise.abort = promise.cancel = function () {
	        processor.abort();
	      };
	
	      return promise.then(function (response) {
	        trackRequestEnd(_this, processor);
	        return response;
	      }).catch(function (response) {
	        trackRequestEnd(_this, processor);
	        throw response;
	      });
	    }
	
	    /**
	     * Sends an HTTP DELETE request.
	     *
	     * @method delete
	     * @param {String} uri The target URI.
	     * @return {Promise} A cancellable promise object.
	     */
	
	  }, {
	    key: 'delete',
	    value: function _delete(uri) {
	      return this.createRequest(uri).asDelete().send();
	    }
	
	    /**
	     * Sends an HTTP GET request.
	     *
	     * @method get
	     * @param {String} uri The target URI.
	     * @return {Promise} A cancellable promise object.
	     */
	
	  }, {
	    key: 'get',
	    value: function get(uri) {
	      return this.createRequest(uri).asGet().send();
	    }
	
	    /**
	     * Sends an HTTP HEAD request.
	     *
	     * @method head
	     * @param {String} uri The target URI.
	     * @return {Promise} A cancellable promise object.
	     */
	
	  }, {
	    key: 'head',
	    value: function head(uri) {
	      return this.createRequest(uri).asHead().send();
	    }
	
	    /**
	     * Sends a JSONP request.
	     *
	     * @method jsonp
	     * @param {String} uri The target URI.
	     * @return {Promise} A cancellable promise object.
	     */
	
	  }, {
	    key: 'jsonp',
	    value: function jsonp(uri) {
	      var callbackParameterName = arguments.length <= 1 || arguments[1] === undefined ? 'jsoncallback' : arguments[1];
	
	      return this.createRequest(uri).asJsonp(callbackParameterName).send();
	    }
	
	    /**
	     * Sends an HTTP OPTIONS request.
	     *
	     * @method options
	     * @param {String} uri The target URI.
	     * @return {Promise} A cancellable promise object.
	     */
	
	  }, {
	    key: 'options',
	    value: function options(uri) {
	      return this.createRequest(uri).asOptions().send();
	    }
	
	    /**
	     * Sends an HTTP PUT request.
	     *
	     * @method put
	     * @param {String} uri The target URI.
	     * @param {Object} uri The request payload.
	     * @return {Promise} A cancellable promise object.
	     */
	
	  }, {
	    key: 'put',
	    value: function put(uri, content) {
	      return this.createRequest(uri).asPut().withContent(content).send();
	    }
	
	    /**
	     * Sends an HTTP PATCH request.
	     *
	     * @method patch
	     * @param {String} uri The target URI.
	     * @param {Object} uri The request payload.
	     * @return {Promise} A cancellable promise object.
	     */
	
	  }, {
	    key: 'patch',
	    value: function patch(uri, content) {
	      return this.createRequest(uri).asPatch().withContent(content).send();
	    }
	
	    /**
	     * Sends an HTTP POST request.
	     *
	     * @method post
	     * @param {String} uri The target URI.
	     * @param {Object} uri The request payload.
	     * @return {Promise} A cancellable promise object.
	     */
	
	  }, {
	    key: 'post',
	    value: function post(uri, content) {
	      return this.createRequest(uri).asPost().withContent(content).send();
	    }
	  }]);
	
	  return HttpClient;
	})();

/***/ },
/* 121 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Headers = exports.Headers = (function () {
	  function Headers() {
	    var headers = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    _classCallCheck(this, Headers);
	
	    this.headers = headers;
	  }
	
	  _createClass(Headers, [{
	    key: 'add',
	    value: function add(key, value) {
	      this.headers[key] = value;
	    }
	  }, {
	    key: 'get',
	    value: function get(key) {
	      return this.headers[key];
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      this.headers = {};
	    }
	  }, {
	    key: 'configureXHR',
	    value: function configureXHR(xhr) {
	      var headers = this.headers,
	          key;
	
	      for (key in headers) {
	        xhr.setRequestHeader(key, headers[key]);
	      }
	    }
	
	    /**
	     * XmlHttpRequest's getAllResponseHeaders() method returns a string of response
	     * headers according to the format described here:
	     * http://www.w3.org/TR/XMLHttpRequest/#the-getallresponseheaders-method
	     * This method parses that string into a user-friendly key/value pair object.
	     */
	
	  }], [{
	    key: 'parse',
	    value: function parse(headerStr) {
	      var headers = new Headers();
	      if (!headerStr) {
	        return headers;
	      }
	
	      var headerPairs = headerStr.split('\r\n');
	      for (var i = 0; i < headerPairs.length; i++) {
	        var headerPair = headerPairs[i];
	        // Can't use split() here because it does the wrong thing
	        // if the header value has the string ": " in it.
	        var index = headerPair.indexOf(': ');
	        if (index > 0) {
	          var key = headerPair.substring(0, index);
	          var val = headerPair.substring(index + 2);
	          headers.add(key, val);
	        }
	      }
	
	      return headers;
	    }
	  }]);
	
	  return Headers;
	})();

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.RequestBuilder = undefined;
	
	var _aureliaPath = __webpack_require__(123);
	
	var _httpRequestMessage = __webpack_require__(124);
	
	var _jsonpRequestMessage = __webpack_require__(128);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	* A builder class allowing fluent composition of HTTP requests.
	*
	* @class RequestBuilder
	* @constructor
	*/
	
	var RequestBuilder = exports.RequestBuilder = (function () {
		function RequestBuilder(client) {
			_classCallCheck(this, RequestBuilder);
	
			this.client = client;
			this.transformers = client.requestTransformers.slice(0);
			this.useJsonp = false;
		}
	
		/**
	 * Adds a user-defined request transformer to the RequestBuilder.
	 *
	 * @method addHelper
	 * @param {String} name The name of the helper to add.
	 * @param {Function} fn The helper function.
	 * @chainable
	 */
	
		_createClass(RequestBuilder, [{
			key: 'send',
	
			/**
	  * Sends the request.
	  *
	  * @method send
	  * @return {Promise} A cancellable promise object.
	  */
			value: function send() {
				var message = this.useJsonp ? new _jsonpRequestMessage.JSONPRequestMessage() : new _httpRequestMessage.HttpRequestMessage();
				return this.client.send(message, this.transformers);
			}
		}], [{
			key: 'addHelper',
			value: function addHelper(name, fn) {
				RequestBuilder.prototype[name] = function () {
					this.transformers.push(fn.apply(this, arguments));
					return this;
				};
			}
		}]);
	
		return RequestBuilder;
	})();
	
	RequestBuilder.addHelper('asDelete', function () {
		return function (client, processor, message) {
			message.method = 'DELETE';
		};
	});
	
	RequestBuilder.addHelper('asGet', function () {
		return function (client, processor, message) {
			message.method = 'GET';
		};
	});
	
	RequestBuilder.addHelper('asHead', function () {
		return function (client, processor, message) {
			message.method = 'HEAD';
		};
	});
	
	RequestBuilder.addHelper('asOptions', function () {
		return function (client, processor, message) {
			message.method = 'OPTIONS';
		};
	});
	
	RequestBuilder.addHelper('asPatch', function () {
		return function (client, processor, message) {
			message.method = 'PATCH';
		};
	});
	
	RequestBuilder.addHelper('asPost', function () {
		return function (client, processor, message) {
			message.method = 'POST';
		};
	});
	
	RequestBuilder.addHelper('asPut', function () {
		return function (client, processor, message) {
			message.method = 'PUT';
		};
	});
	
	RequestBuilder.addHelper('asJsonp', function (callbackParameterName) {
		this.useJsonp = true;
		return function (client, processor, message) {
			message.callbackParameterName = callbackParameterName;
		};
	});
	
	RequestBuilder.addHelper('withUri', function (uri) {
		return function (client, processor, message) {
			message.uri = uri;
		};
	});
	
	RequestBuilder.addHelper('withContent', function (content) {
		return function (client, processor, message) {
			message.content = content;
		};
	});
	
	RequestBuilder.addHelper('withBaseUri', function (baseUri) {
		return function (client, processor, message) {
			message.baseUri = baseUri;
		};
	});
	
	RequestBuilder.addHelper('withParams', function (params) {
		return function (client, processor, message) {
			message.params = params;
		};
	});
	
	RequestBuilder.addHelper('withResponseType', function (responseType) {
		return function (client, processor, message) {
			message.responseType = responseType;
		};
	});
	
	RequestBuilder.addHelper('withTimeout', function (timeout) {
		return function (client, processor, message) {
			message.timeout = timeout;
		};
	});
	
	RequestBuilder.addHelper('withHeader', function (key, value) {
		return function (client, processor, message) {
			message.headers.add(key, value);
		};
	});
	
	RequestBuilder.addHelper('withCredentials', function (value) {
		return function (client, processor, message) {
			message.withCredentials = value;
		};
	});
	
	RequestBuilder.addHelper('withReviver', function (reviver) {
		return function (client, processor, message) {
			message.reviver = reviver;
		};
	});
	
	RequestBuilder.addHelper('withReplacer', function (replacer) {
		return function (client, processor, message) {
			message.replacer = replacer;
		};
	});
	
	RequestBuilder.addHelper('withProgressCallback', function (progressCallback) {
		return function (client, processor, message) {
			message.progressCallback = progressCallback;
		};
	});
	
	RequestBuilder.addHelper('withCallbackParameterName', function (callbackParameterName) {
		return function (client, processor, message) {
			message.callbackParameterName = callbackParameterName;
		};
	});

/***/ },
/* 123 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.relativeToFile = relativeToFile;
	exports.join = join;
	exports.buildQueryString = buildQueryString;
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	function trimDots(ary) {
	  var i, part;
	  for (i = 0; i < ary.length; ++i) {
	    part = ary[i];
	    if (part === '.') {
	      ary.splice(i, 1);
	      i -= 1;
	    } else if (part === '..') {
	      // If at the start, or previous value is still ..,
	      // keep them so that when converted to a path it may
	      // still work when converted to a path, even though
	      // as an ID it is less than ideal. In larger point
	      // releases, may be better to just kick out an error.
	      if (i === 0 || i == 1 && ary[2] === '..' || ary[i - 1] === '..') {
	        continue;
	      } else if (i > 0) {
	        ary.splice(i - 1, 2);
	        i -= 2;
	      }
	    }
	  }
	}
	
	function relativeToFile(name, file) {
	  var lastIndex,
	      normalizedBaseParts,
	      fileParts = file && file.split('/');
	
	  name = name.trim();
	  name = name.split('/');
	
	  if (name[0].charAt(0) === '.' && fileParts) {
	    //Convert file to array, and lop off the last part,
	    //so that . matches that 'directory' and not name of the file's
	    //module. For instance, file of 'one/two/three', maps to
	    //'one/two/three.js', but we want the directory, 'one/two' for
	    //this normalization.
	    normalizedBaseParts = fileParts.slice(0, fileParts.length - 1);
	    name = normalizedBaseParts.concat(name);
	  }
	
	  trimDots(name);
	
	  return name.join('/');
	}
	
	function join(path1, path2) {
	  var url1, url2, url3, i, ii, urlPrefix;
	
	  if (!path1) {
	    return path2;
	  }
	
	  if (!path2) {
	    return path1;
	  }
	
	  urlPrefix = path1.indexOf('//') === 0 ? '//' : path1.indexOf('/') === 0 ? '/' : '';
	
	  url1 = path1.split('/');
	  url2 = path2.split('/');
	  url3 = [];
	
	  for (i = 0, ii = url1.length; i < ii; ++i) {
	    if (url1[i] == '..') {
	      url3.pop();
	    } else if (url1[i] == '.' || url1[i] == '') {
	      continue;
	    } else {
	      url3.push(url1[i]);
	    }
	  }
	
	  for (i = 0, ii = url2.length; i < ii; ++i) {
	    if (url2[i] == '..') {
	      url3.pop();
	    } else if (url2[i] == '.' || url2[i] == '') {
	      continue;
	    } else {
	      url3.push(url2[i]);
	    }
	  }
	
	  return urlPrefix + url3.join('/').replace(/\:\//g, '://');;
	}
	
	var r20 = /%20/g,
	    rbracket = /\[\]$/,
	    class2type = {};
	
	'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach(function (name, i) {
	  class2type['[object ' + name + ']'] = name.toLowerCase();
	});
	
	function type(obj) {
	  if (obj == null) {
	    return obj + "";
	  }
	
	  // Support: Android<4.0 (functionish RegExp)
	  return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' || typeof obj === 'function' ? class2type[toString.call(obj)] || 'object' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
	}
	
	function buildQueryString(a, traditional) {
	  var prefix,
	      s = [],
	      add = function add(key, value) {
	    // If value is a function, invoke it and return its value
	    value = typeof value === 'function' ? value() : value == null ? '' : value;
	    s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
	  };
	
	  for (prefix in a) {
	    _buildQueryString(prefix, a[prefix], traditional, add);
	  }
	
	  // Return the resulting serialization
	  return s.join('&').replace(r20, '+');
	}
	
	function _buildQueryString(prefix, obj, traditional, add) {
	  var name;
	
	  if (Array.isArray(obj)) {
	    // Serialize array item.
	    obj.forEach(function (v, i) {
	      if (traditional || rbracket.test(prefix)) {
	        // Treat each array item as a scalar.
	        add(prefix, v);
	      } else {
	        // Item is non-scalar (array or object), encode its numeric index.
	        _buildQueryString(prefix + '[' + ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object' ? i : '') + ']', v, traditional, add);
	      }
	    });
	  } else if (!traditional && type(obj) === 'object') {
	    // Serialize object item.
	    for (name in obj) {
	      _buildQueryString(prefix + '[' + name + ']', obj[name], traditional, add);
	    }
	  } else {
	    // Serialize scalar item.
	    add(prefix, obj);
	  }
	}

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.HttpRequestMessage = undefined;
	exports.createHttpRequestMessageProcessor = createHttpRequestMessageProcessor;
	
	var _headers = __webpack_require__(121);
	
	var _requestMessageProcessor = __webpack_require__(125);
	
	var _transformers = __webpack_require__(127);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var HttpRequestMessage = exports.HttpRequestMessage = function HttpRequestMessage(method, uri, content, headers) {
	  _classCallCheck(this, HttpRequestMessage);
	
	  this.method = method;
	  this.uri = uri;
	  this.content = content;
	  this.headers = headers || new _headers.Headers();
	  this.responseType = 'json'; //text, arraybuffer, blob, document
	};
	
	function createHttpRequestMessageProcessor() {
	  return new _requestMessageProcessor.RequestMessageProcessor(XMLHttpRequest, [_transformers.timeoutTransformer, _transformers.credentialsTransformer, _transformers.progressTransformer, _transformers.responseTypeTransformer, _transformers.headerTransformer, _transformers.contentTransformer]);
	}

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RequestMessageProcessor = undefined;
	
	var _httpResponseMessage = __webpack_require__(126);
	
	var _aureliaPath = __webpack_require__(123);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function buildFullUri(message) {
	  var uri = (0, _aureliaPath.join)(message.baseUri, message.uri),
	      qs;
	
	  if (message.params) {
	    qs = (0, _aureliaPath.buildQueryString)(message.params);
	    uri = qs ? uri + '?' + qs : uri;
	  }
	
	  message.fullUri = uri;
	}
	
	var RequestMessageProcessor = exports.RequestMessageProcessor = (function () {
	  function RequestMessageProcessor(xhrType, transformers) {
	    _classCallCheck(this, RequestMessageProcessor);
	
	    this.XHRType = xhrType;
	    this.transformers = transformers;
	  }
	
	  _createClass(RequestMessageProcessor, [{
	    key: 'abort',
	    value: function abort() {
	      //The logic here is if the xhr object is not set then there is nothing to abort so the intent was carried out
	      if (this.xhr) {
	        this.xhr.abort();
	      }
	    }
	  }, {
	    key: 'process',
	    value: function process(client, message) {
	      var _this = this;
	
	      return new Promise(function (resolve, reject) {
	        var xhr = _this.xhr = new _this.XHRType(),
	            transformers = _this.transformers,
	            i,
	            ii;
	
	        buildFullUri(message);
	        xhr.open(message.method, message.fullUri, true);
	
	        for (i = 0, ii = transformers.length; i < ii; ++i) {
	          transformers[i](client, _this, message, xhr);
	        }
	
	        xhr.onload = function (e) {
	          var response = new _httpResponseMessage.HttpResponseMessage(message, xhr, message.responseType, message.reviver);
	          if (response.isSuccess) {
	            resolve(response);
	          } else {
	            reject(response);
	          }
	        };
	
	        xhr.ontimeout = function (e) {
	          reject(new _httpResponseMessage.HttpResponseMessage(message, {
	            response: e,
	            status: xhr.status,
	            statusText: xhr.statusText
	          }, 'timeout'));
	        };
	
	        xhr.onerror = function (e) {
	          reject(new _httpResponseMessage.HttpResponseMessage(message, {
	            response: e,
	            status: xhr.status,
	            statusText: xhr.statusText
	          }, 'error'));
	        };
	
	        xhr.onabort = function (e) {
	          reject(new _httpResponseMessage.HttpResponseMessage(message, {
	            response: e,
	            status: xhr.status,
	            statusText: xhr.statusText
	          }, 'abort'));
	        };
	
	        xhr.send(message.content);
	      });
	    }
	  }]);
	
	  return RequestMessageProcessor;
	})();

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.HttpResponseMessage = undefined;
	
	var _headers = __webpack_require__(121);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var HttpResponseMessage = exports.HttpResponseMessage = (function () {
	  function HttpResponseMessage(requestMessage, xhr, responseType, reviver) {
	    _classCallCheck(this, HttpResponseMessage);
	
	    this.requestMessage = requestMessage;
	    this.statusCode = xhr.status;
	    this.response = xhr.response;
	    this.isSuccess = xhr.status >= 200 && xhr.status < 400;
	    this.statusText = xhr.statusText;
	    this.responseType = responseType;
	    this.reviver = reviver;
	
	    if (xhr.getAllResponseHeaders) {
	      this.headers = _headers.Headers.parse(xhr.getAllResponseHeaders());
	    } else {
	      this.headers = new _headers.Headers();
	    }
	  }
	
	  _createClass(HttpResponseMessage, [{
	    key: 'content',
	    get: function get() {
	      try {
	        if (this._content !== undefined) {
	          return this._content;
	        }
	
	        if (this.response === undefined || this.response === null) {
	          return this._content = this.response;
	        }
	
	        if (this.responseType === 'json') {
	          return this._content = JSON.parse(this.response, this.reviver);
	        }
	
	        if (this.reviver) {
	          return this._content = this.reviver(this.response);
	        }
	
	        return this._content = this.response;
	      } catch (e) {
	        if (this.isSuccess) {
	          throw e;
	        }
	
	        return this._content = null;
	      }
	    }
	  }]);
	
	  return HttpResponseMessage;
	})();

/***/ },
/* 127 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.timeoutTransformer = timeoutTransformer;
	exports.callbackParameterNameTransformer = callbackParameterNameTransformer;
	exports.credentialsTransformer = credentialsTransformer;
	exports.progressTransformer = progressTransformer;
	exports.responseTypeTransformer = responseTypeTransformer;
	exports.headerTransformer = headerTransformer;
	exports.contentTransformer = contentTransformer;
	function timeoutTransformer(client, processor, message, xhr) {
	  if (message.timeout !== undefined) {
	    xhr.timeout = message.timeout;
	  }
	}
	
	function callbackParameterNameTransformer(client, processor, message, xhr) {
	  if (message.callbackParameterName !== undefined) {
	    xhr.callbackParameterName = message.callbackParameterName;
	  }
	}
	
	function credentialsTransformer(client, processor, message, xhr) {
	  if (message.withCredentials !== undefined) {
	    xhr.withCredentials = message.withCredentials;
	  }
	}
	
	function progressTransformer(client, processor, message, xhr) {
	  if (message.progressCallback) {
	    xhr.upload.onprogress = message.progressCallback;
	  }
	}
	
	function responseTypeTransformer(client, processor, message, xhr) {
	  var responseType = message.responseType;
	
	  if (responseType === 'json') {
	    responseType = 'text'; //IE does not support json
	  }
	
	  xhr.responseType = responseType;
	}
	
	function headerTransformer(client, processor, message, xhr) {
	  message.headers.configureXHR(xhr);
	}
	
	function contentTransformer(client, processor, message, xhr) {
	  if (window.FormData && message.content instanceof FormData) {
	    return;
	  }
	
	  if (window.Blob && message.content instanceof Blob) {
	    return;
	  }
	
	  if (window.ArrayBufferView && message.content instanceof ArrayBufferView) {
	    return;
	  }
	
	  if (message.content instanceof Document) {
	    return;
	  }
	
	  if (typeof message.content === 'string') {
	    return;
	  }
	
	  if (message.content === null || message.content === undefined) {
	    return;
	  }
	
	  message.content = JSON.stringify(message.content, message.replacer);
	}

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.JSONPRequestMessage = undefined;
	exports.createJSONPRequestMessageProcessor = createJSONPRequestMessageProcessor;
	
	var _headers = __webpack_require__(121);
	
	var _requestMessageProcessor = __webpack_require__(125);
	
	var _transformers = __webpack_require__(127);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var JSONPRequestMessage = exports.JSONPRequestMessage = function JSONPRequestMessage(uri, callbackParameterName) {
	  _classCallCheck(this, JSONPRequestMessage);
	
	  this.method = 'JSONP';
	  this.uri = uri;
	  this.content = undefined;
	  this.headers = new _headers.Headers();
	  this.responseType = 'jsonp';
	  this.callbackParameterName = callbackParameterName;
	};
	
	var JSONPXHR = (function () {
	  function JSONPXHR() {
	    _classCallCheck(this, JSONPXHR);
	  }
	
	  _createClass(JSONPXHR, [{
	    key: 'open',
	    value: function open(method, uri) {
	      this.method = method;
	      this.uri = uri;
	      this.callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
	    }
	  }, {
	    key: 'send',
	    value: function send() {
	      var _this = this;
	
	      var uri = this.uri + (this.uri.indexOf('?') >= 0 ? '&' : '?') + this.callbackParameterName + '=' + this.callbackName;
	
	      window[this.callbackName] = function (data) {
	        delete window[_this.callbackName];
	        document.body.removeChild(script);
	
	        if (_this.status === undefined) {
	          _this.status = 200;
	          _this.statusText = 'OK';
	          _this.response = data;
	          _this.onload(_this);
	        }
	      };
	
	      var script = document.createElement('script');
	      script.src = uri;
	      document.body.appendChild(script);
	
	      if (this.timeout !== undefined) {
	        setTimeout(function () {
	          if (_this.status === undefined) {
	            _this.status = 0;
	            _this.ontimeout(new Error('timeout'));
	          }
	        }, this.timeout);
	      }
	    }
	  }, {
	    key: 'abort',
	    value: function abort() {
	      if (this.status === undefined) {
	        this.status = 0;
	        this.onabort(new Error('abort'));
	      }
	    }
	  }, {
	    key: 'setRequestHeader',
	    value: function setRequestHeader() {}
	  }]);
	
	  return JSONPXHR;
	})();
	
	function createJSONPRequestMessageProcessor() {
	  return new _requestMessageProcessor.RequestMessageProcessor(JSONPXHR, [_transformers.timeoutTransformer, _transformers.callbackParameterNameTransformer]);
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=wakanda-client.js.map
var wakanda = angular.module('wakanda', []);

wakanda.constant('wakandaClient', new WakandaClient.WakandaClient());

wakanda.factory('$wakanda', ['datastoreFactory', 'directoryFactory', 'transformFactory',
  function(datastoreFactory, directoryFactory, transformFactory) {

    var wakandaFactory = {};

    //Init and dataStore
    wakandaFactory.init         = datastoreFactory.init;
    wakandaFactory.getDatastore = datastoreFactory.getDataStore;
    Object.defineProperty(wakandaFactory, '$ds', {
      get: wakandaFactory.getDatastore,
      enumerable: true
    });

    //Directory
    wakandaFactory.$login                 = directoryFactory.login;
    wakandaFactory.$loginByPassword       = directoryFactory.login;
    wakandaFactory.$logout                = directoryFactory.logout;
    wakandaFactory.$currentUser           = directoryFactory.currentUser;
    wakandaFactory.$currentUserBelongsTo  = directoryFactory.currentUserBelongsTo;

    //Transform
    wakandaFactory.$transform = {
      $objectToEntity:      transformFactory.toEntity,
      $objectToCollection:  transformFactory.toCollection
    };

    return wakandaFactory;
  }
]);

wakanda.provider('$wakandaConfig', ['wakandaClient', function(wakandaClient) {
  var hostname = '';
  this.$get = function() {
    return {
      getHostname: function() {
        return hostname;
      }
    };
  };
  this.setHostname = function(_hostname) {
    wakandaClient._httpClient.prefix = _hostname + '/rest';
    hostname = _hostname;
  };
}]);

var wakanda = angular.module('wakanda');

wakanda.factory('collectionFactory', ['$injector', '$q', 'rootScopeSafeApply', 'wakandaClient',
  function ($injector, $q, rootScopeSafeApply, wakandaClient) {
    var collectionFactory = {};

    function _decorate(ngCollection, ngDataClass) {
      //WakandaClient collection container
      Object.defineProperty(ngCollection, '$_collection', {
        enumerable: false,
        configurable: false,
        writable: true,
        value: null
      });

      Object.defineProperty(ngCollection, '$_dataClass', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: ngDataClass
      });

      Object.defineProperty(ngCollection, '$totalCount', {
        enumerable: true,
        configurable: false,
        get: function () {
          return ngCollection.$_collection._count;
        }
      });

      Object.defineProperty(ngCollection, '$queryParams', {
        enumerable: true,
        configurable: false,
        get: function () {
          return {
            pageSize: ngCollection.$_collection._pageSize,
            start: ngCollection.$_collection._first
          };
        }
      });

      ngCollection.$fetch     = fetch;
      ngCollection.$nextPage  = nextPage;
      ngCollection.$prevPage  = prevPage;
      ngCollection.$toJSON    = toJSON;
      ngCollection.$more      = more;

      addUserDefinedMethods(ngCollection, ngDataClass);
    }

    function fetch(options) {

      var opt = options || {};

      if (opt.orderBy) {
        throw new Error("orderBy can't be change on a $fetch (query collection's cached on server side)");
      }

      if (opt.select) {
        throw new Error("select can't be change on a $fetch (query collection's cached on server side)");
      }

      var deferred = $q.defer();
      var promise = deferred.promise;

      this.$_collection.fetch(options)
        .then(function (res) {
          rootScopeSafeApply(function () {
            emptyNgCollection(this);
            addEntities(this, this.$_collection.entities);

            deferred.resolve({
              result: this
            });
          }.bind(this));
        }.bind(this))
        .catch(function (e) {
          rootScopeSafeApply(function () {
            deferred.reject(e);
          });
        });

      promise.$promise = promise;
      return promise;
    }

    function more() {

      var deferred = $q.defer();
      var promise = deferred.promise;

      this.$_collection.more()
        .then(function (res) {
          rootScopeSafeApply(function () {
            emptyNgCollection(this);
            addEntities(this, this.$_collection.entities);

            deferred.resolve({
              result: this
            });
          }.bind(this));
        }.bind(this))
        .catch(function (e) {
          rootScopeSafeApply(function () {
            deferred.reject(e);
          });
        });

      promise.$promise = promise;
      return promise;
    }

    function nextPage() {
      var deferred = $q.defer();
      var promise = deferred.promise;

      this.$_collection.nextPage()
        .then(function (res) {
          rootScopeSafeApply(function () {
            emptyNgCollection(this);
            addEntities(this, this.$_collection.entities);

            deferred.resolve({
              result: this
            });
          }.bind(this))
        }.bind(this))
        .catch(function (e) {
          rootScopeSafeApply(function () {
            deferred.reject(e);
          });
        });

      promise.$promise = promise;
      return promise;
    }

    function prevPage() {
      var deferred = $q.defer();
      var promise = deferred.promise;

      this.$_collection.prevPage()
        .then(function (res) {
          rootScopeSafeApply(function () {
            emptyNgCollection(this);
            addEntities(this, this.$_collection.entities);

            deferred.resolve({
              result: this
            });
          }.bind(this))
        }.bind(this))
        .catch(function (e) {
          rootScopeSafeApply(function () {
            deferred.reject(e);
          })
        })

      promise.$promise = promise;
      return promise;
    }

    function toJSON() {
      //Two things: it eliminates internal properties, and it output as real
      //array, as JS doesn't see NgCollection as an array
      var array = [];
      for (var i = 0; i < this.length; i++) {
        array.push(this[i]);
      }

      return JSON.stringify(array);
    }

    function addUserDefinedMethods(ngCollection, ngDataClass) {
      ngDataClass.$_dataClass.methods.collection.forEach(function (methodName) {
        ngCollection[methodName] = function () {
          var args = arguments;
          var deferred = $q.defer();
          var promise = deferred.promise;

          ngCollection.$_collection[methodName].apply(ngCollection.$_collection, args)
            .then(function (res) {
              rootScopeSafeApply(function () {
                var result = res;

                if (wakandaClient.helper.isEntity(res)) {
                  var ngDataClass = ngCollection.$_dataClass.$_catalog[res._dataClass.name];
                  if (ngDataClass) {
                    var entityFactory = $injector.get('entityFactory');
                    result = entityFactory.createNgEntity(ngDataClass);
                    result.$_entity = res;
                  }
                }
                else if (wakandaClient.helper.isCollection(res)) {
                  var ngDataClass = ngCollection.$_dataClass.$_catalog[res._dataClass.name];
                  if (ngDataClass) {
                    result = collectionFactory.createNgCollection(ngDataClass)
                    result.$_collection = res;
                    collectionFactory.addEntities(result, res.entities);
                  }
                }

                deferred.resolve({
                  result: result
                });
              });
            })
            .catch(function (e) {
              rootScopeSafeApply(function () {
                deferred.reject(e);
              })
            });

          promise.$promise = promise;
          return promise;
        };
      });
    }

    function emptyNgCollection(ngCollection) {
      for (var i = 0; i < ngCollection.length; i++) {
        delete ngCollection[i];
      }
      ngCollection.length = 0;
    };

    function addEntities(ngCollection, entities) {
      //Dynamic injection to avoid circular dependency crisis thrown by Angular
      var entityFactory = $injector.get('entityFactory');

      for (var i = 0; i < entities.length; i++) {
        var ngEntity = entityFactory.createNgEntity(ngCollection.$_dataClass);
        ngEntity.$_entity = entities[i];

        ngCollection.push(ngEntity);
      }
    };

    collectionFactory.isNgCollection = function (object) {
      //Direct return returns undefined... Strange.
      var r =
        typeof object === 'object' &&
        typeof object.$fetch === 'function' &&
        typeof object.$more === 'function' &&
        typeof object.$prevPage === 'function' &&
        typeof object.$nextPage === 'function' &&
        typeof object.$toJSON === 'function';

      return r;
    };

    collectionFactory.emptyNgCollection = emptyNgCollection;
    collectionFactory.addEntities       = addEntities;

    collectionFactory.createNgCollection = function (ngDataClass) {
      var ngCollection = [];
      _decorate(ngCollection, ngDataClass);

      return ngCollection;
    };

    return collectionFactory;
  }]);

var wakanda = angular.module('wakanda');

wakanda.factory('dataclassFactory', ['$q', 'entityFactory', 'collectionFactory', 'rootScopeSafeApply', 'wakandaClient',
  function ($q, entityFactory, collectionFactory, rootScopeSafeApply, wakandaClient) {
    var dcFactory = {};

    function NgDataClass(dataClass, catalog) {
      Object.defineProperty(this, '$_dataClass', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: dataClass
      });

      Object.defineProperty(this, '$_catalog', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: catalog
      });

      this.$name            = dataClass.name;
      this.$collectionName  = dataClass.collectionName;

      addUserDefinedMethods(this);
    }

    NgDataClass.prototype.$find               = find;
    NgDataClass.prototype.$create             = create;
    NgDataClass.prototype.$query              = query;
    NgDataClass.prototype.$all                = all;
    NgDataClass.prototype.$attr               = attributeInfo;
    NgDataClass.prototype.$entityMethods      = getEntityMethods;
    NgDataClass.prototype.$collectionMethods  = getCollectionMethods;
    NgDataClass.prototype.$dataClassMethods   = getDataClassMethods;

    function find(key, options) {
      var ngEntity = entityFactory.createNgEntity(this);
      var deferred = $q.defer();
      var promise = deferred.promise;

      this.$_dataClass.find(key, options)
        .then(function (entity) {
          rootScopeSafeApply(function () {
            ngEntity.$_entity = entity;
            deferred.resolve({
              result: ngEntity
            });
          });
        })
        .catch(function (e) {
          rootScopeSafeApply(function () {
            deferred.reject(e);
          });
        });

      ngEntity.$promise = promise;
      return ngEntity;
    }

    function create(pojo) {
      var relatedToSet = {};

      if (pojo && typeof pojo === 'object') {
        for (var attr in pojo) {
          if (pojo.hasOwnProperty(attr)) {
            if (entityFactory.isNgEntity(pojo[attr])) {
              relatedToSet[attr] = pojo[attr];
              delete pojo[attr];
            }
          }
        }
      }

      var jscEntity = this.$_dataClass.create(pojo);
      var ngEntity  = entityFactory.createNgEntity(this);
      ngEntity.$_entity = jscEntity;

      for (var attr in relatedToSet) {
        if (relatedToSet.hasOwnProperty(attr)) {
          ngEntity[attr] = relatedToSet[attr];
        }
      };

      return ngEntity;
    }

    function query(options) {
      var ngCollection =  collectionFactory.createNgCollection(this);
      var deferred = $q.defer();
      var promise = deferred.promise;

      this.$_dataClass.query(options)
        .then(function (collection) {
          rootScopeSafeApply(function () {
            ngCollection.$_collection = collection;
            collectionFactory.addEntities(ngCollection, collection.entities);
            deferred.resolve({
              result: ngCollection
            });
          });
        })
        .catch(function (e) {
          rootScopeSafeApply(function () {
            deferred.reject(e);
          });
        });

      ngCollection.$promise = promise;
      return ngCollection;
    }

    function all(options) {
      var opt = options || {};

      if (opt.filter || opt.params) {
        console.warn('params and filter parameters on options object are not allowed on calling $all() method. They will be ignored');
      }

      opt.filter = null;
      opt.params = null;

      return this.$query(opt);
    }

    function addUserDefinedMethods (ngDataClass) {
      ngDataClass.$_dataClass.methods.dataClass.forEach(function (methodName) {
        ngDataClass[methodName] = function () {
          var deferred = $q.defer();
          var promise = deferred.promise;
          var args = arguments;

          ngDataClass.$_dataClass[methodName].apply(ngDataClass.$_dataClass, args)
            .then(function (res) {
              rootScopeSafeApply(function () {
                var result = res;

                if (wakandaClient.helper.isEntity(res)) {
                  var targetDataClass = ngDataClass.$_catalog[res._dataClass.name];
                  if (targetDataClass) {
                    result = entityFactory.createNgEntity(targetDataClass);
                    result.$_entity = res;
                  }
                }
                else if (wakandaClient.helper.isCollection(res)) {
                  var targetDataClass = ngDataClass.$_catalog[res._dataClass.name];
                  if (targetDataClass) {
                    result = collectionFactory.createNgCollection(targetDataClass);
                    result.$_collection = res;
                    collectionFactory.addEntities(result, res.entities);
                  }
                }

                deferred.resolve({
                  result: result
                });
              });
            })
            .catch(function (e) {
              rootScopeSafeApply(function () {
                deferred.reject(e);
              });
            });

          promise.$promise = promise;
          return promise;
        };
      });
    }

    function attributeInfo(attrName) {
      var attributes = this.$_dataClass.attributes;

      if (attrName) {
        for (var i = 0; i < attributes.length; i++) {
          if (attributes[i].name === attrName) {
            return attributes[i];
          }
        }
        return null;
      }

      var attributeMap = {};
      for (var i = 0; i < attributes.length; i++) {
        attributeMap[attributes[i].name] = attributes[i];
      }
      return attributeMap;
    }

    function getCollectionMethods() {
      return getMethods(this, 'collection');
    }

    function getEntityMethods() {
      return getMethods(this, 'entity');
    }

    function getDataClassMethods() {
      return getMethods(this, 'dataClass');
    }

    function getMethods(ngDataClass, type) {
      return ngDataClass.$_dataClass.methods[type];
    }

    dcFactory.createNgDataClass = function (dataClass, catalog) {
      return new NgDataClass(dataClass, catalog);
    }

    return dcFactory;
  }]);

var wakanda = angular.module('wakanda');

wakanda.factory('datastoreFactory', ['$q', 'dataclassFactory', 'wakandaClient',
  function ($q, dataclassFactory, wakandaClient) {
    var dsFactory = {};
    var ds = null;

    var _dsMap = {};

    dsFactory.init = function(catalogStr) {
      var catalog;
      var promise;


      if (typeof catalogStr !== "string" || catalogStr === '*' || catalogStr === '') {
        catalog = undefined;
      } else {
        catalog = catalogStr.split(',');
      }

      var cachedCatalog = _dsMap[hashCatalogName(catalog)];

      if (!cachedCatalog) {
        promise = wakandaClient.getCatalog(catalog).then(function(_ds) {
          var dataClasses = {};

          for (var dcName in _ds) {
            if (_ds.hasOwnProperty(dcName)) {
              dataClasses[dcName] = dataclassFactory.createNgDataClass(_ds[dcName], dataClasses);
            }
          }

          //Will be deleted at the same time that $wakanda.$ds and $wakanda.getDataStore
          if (!ds) {
            ds = dataClasses;
          }

          _dsMap[hashCatalogName(catalog)] = dataClasses;

          return dataClasses;
        });
      }
      else {
        deferred = $q.defer();
        deferred.resolve(cachedCatalog);
        promise = deferred.promise;
      }
      promise.$promise = promise;

      return promise;
  };

  dsFactory.getDataStore = function() {
    console.warn('$wakanda.getDataStore() and $wakanda.$ds are deprecated. Use $wakanda.init() instead.');
    if (!ds) {
      throw new Error('The Datastore isn\'t initialized please execute $wakanda.init(catalog) before you run your app.');
    }
    return ds;
  }

  function hashCatalogName(catalog) {
    return JSON.stringify(catalog || '*');
  }

  return dsFactory;
}]);

var wakanda = angular.module('wakanda');

wakanda.factory('directoryFactory', ['$q', 'rootScopeSafeApply', 'wakandaClient',
  function ($q, rootScopeSafeApply, wakandaClient) {
  var directoryFactory = {};

  directoryFactory.login = function (login, password) {
    var deferred = $q.defer();
    var promise = deferred.promise;

    wakandaClient.directory.login(login, password)
      .then(function (res) {
        rootScopeSafeApply(function () {
          deferred.resolve({
            result: res
          });
        });
      })
      .catch(function (res) {
        rootScopeSafeApply(function () {
          deferred.resolve({
            result: false
          });
        });
      });

    promise.$promise = promise;
    return promise;
  };

  directoryFactory.logout = function () {
    var deferred = $q.defer();
    var promise = deferred.promise;

    wakandaClient.directory.logout()
      .then(function (res) {
        rootScopeSafeApply(function () {
          deferred.resolve({
            result: res
          });
        });
      })
      .catch(function (e) {
        rootScopeSafeApply(function () {
          deferred.reject(e);
        });
      });

    promise.$promise = promise;
    return promise;
  };

  directoryFactory.currentUser = function () {
    var deferred = $q.defer();
    var promise = deferred.promise;

    wakandaClient.directory.currentUser()
      .then(function (res) {
        rootScopeSafeApply(function () {
          deferred.resolve({
            result: res
          });
        });
      })
      .catch(function () {
        rootScopeSafeApply(function () {
          deferred.resolve({
            result: null
          });
        });
      });

    promise.$promise = promise;
    return promise;
  };

  directoryFactory.currentUserBelongsTo = function (groupName) {
    var deferred = $q.defer();
    var promise = deferred.promise;

    wakandaClient.directory.currentUserBelongsTo(groupName || '')
      .then(function (res) {
        rootScopeSafeApply(function () {
          deferred.resolve({
            result: res
          });
        });
      })
      .catch(function (e) {
        rootScopeSafeApply(function () {
          deferred.reject(e);
        });
      });

    promise.$promise = promise;
    return promise;
  };

  return directoryFactory;
}]);

var wakanda = angular.module('wakanda');

wakanda.factory('entityFactory', ['$injector', '$q', 'mediaFactory', 'rootScopeSafeApply', 'wakandaClient',
  function ($injector, $q, mediaFactory, rootScopeSafeApply, wakandaClient) {
    var entityFactory = {};

    //Entity class for Angular-Wakanda connector
    function NgEntity(ngDataClass) {
      //Wakanda-Client entity container
      Object.defineProperty(this, '$_entity', {
        enumerable: false,
        configurable: false,
        writable: true,
        value: null
      });

      //Container to store related entities and collections
      Object.defineProperty(this, '$_relatedAttributes', {
        enumerable: false,
        configurable: false,
        writable: true,
        value: {}
      });

      Object.defineProperty(this, '$_dataClass', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: ngDataClass
      });

      //Creating property accessors for the entity
      ngDataClass.$_dataClass.attributes.forEach(function (attr) {
        if (attr.kind === 'relatedEntity') {
          defineEntityProperty(this, attr);
        }
        else if (attr.kind === 'relatedEntities') {
          defineCollectionProperty(this, attr);
        }
        else if (attr.kind === 'storage' && (attr.type === 'image' || attr.type === 'blob')) {
          defineMediaProperty(this, attr);
        }
        else {
          defineScalarProperty(this, attr);
        }
      }.bind(this));

      addUserDefinedMethods(this, ngDataClass);
    };

    NgEntity.prototype.$save        = save;
    NgEntity.prototype.$remove      = remove;
    NgEntity.prototype.$fetch       = fetch;
    NgEntity.prototype.$toJSON      = toJSON;
    NgEntity.prototype.$key         = key;
    NgEntity.prototype.$stamp       = stamp;
    NgEntity.prototype.$isNew       = isNew;
    NgEntity.prototype.$isDeferred  = isDeferred;
    NgEntity.prototype.$recompute   = recompute;

    function key() {
      if (this.$_entity) {
        return this.$_entity._key;
      }
    }

    function stamp() {
      if (this.$_entity) {
        return this.$_entity._stamp;
      }
    }

    function isNew() {
      return this.$_entity._key === undefined;
    }

    function isDeferred() {
      return this.$_entity._deferred;
    }

    function save() {
      var deferred = $q.defer();
      var promise = deferred.promise;

      this.$_entity.save()
        .then(function (entity) {
          rootScopeSafeApply(function () {
            //Related entities or collections might have changed server-side,
            //cleaning entity-level "cache"
            this.$_relatedAttributes = {};

            deferred.resolve({
              result: this
            });
          }.bind(this));
        }.bind(this))
        .catch(function (e) {
          rootScopeSafeApply(function () {
            deferred.reject(e);
          });
        });

      promise.$promise = promise;
      return promise;
    }

    function recompute() {
      var deferred = $q.defer();
      var promise = deferred.promise;

      this.$_entity.recompute()
        .then(function () {
          rootScopeSafeApply(function () {
            //Related entities or collections might have changed server-side,
            //cleaning entity-level "cache"
            this.$_relatedAttributes = {};

            deferred.resolve({
              result: this
            });
          }.bind(this));
        }.bind(this))
        .catch(function (e) {
          rootScopeSafeApply(function () {
            deferred.reject(e);
          });
        });

      promise.$promise = promise;
      return promise;
    }

    function remove() {
      var deferred = $q.defer();
      var promise = deferred.promise;

      this.$_entity.delete()
        .then(function (res) {
          rootScopeSafeApply(function () {
            this.$_entity = null;

            deferred.resolve({
              result: res
            });
          }.bind(this));
        }.bind(this))
        .catch(function (e) {
          rootScopeSafeApply(function () {
            deferred.reject(e);
          });
        });

      promise.$promise = promise;
      return promise;
    }

    function fetch() {
      if (!this.$_entity._key) {
        throw new Error("$fetch error - no key nor pointer was found");
      }

      var deferred = $q.defer();
      var promise = deferred.promise;

      this.$_entity.fetch()
        .then(function () {
          rootScopeSafeApply(function () {
            deferred.resolve({
              result: this.$_entity
            });
          }.bind(this));
        }.bind(this))
        .catch(function (e) {
          rootScopeSafeApply(function () {
            deferred.reject(e);
          });
        });

      promise.$promise = promise;
      return promise;
    }

    function toJSON() {
      return JSON.stringify(this, function (key, value) {
        if (key === '$promise') {
          return undefined;
        }
        return value;
      });
    }

    function addUserDefinedMethods (ngEntity, ngDataClass) {
      ngDataClass.$_dataClass.methods.entity.forEach(function (methodName) {
        ngEntity[methodName] = function () {
          var args = arguments;
          var deferred = $q.defer();
          var promise = deferred.promise;

          ngEntity.$_entity[methodName].apply(ngEntity.$_entity, args)
            .then(function (res) {
              rootScopeSafeApply(function () {
                var result = res;

                if (wakandaClient.helper.isEntity(res)) {
                  var targetDataClass = ngDataClass.$_catalog[res._dataClass.name];
                  if (targetDataClass) {
                    result = entityFactory.createNgEntity(targetDataClass);
                    result.$_entity = res;
                  }
                }
                else if (wakandaClient.helper.isCollection(res)) {
                  var targetDataClass = ngDataClass.$_catalog[res._dataClass.name];
                  if (targetDataClass) {
                    var collectionFactory = $injector.get('collectionFactory');
                    result = collectionFactory.createNgCollection(targetDataClass);
                    result.$_collection = res;
                    collectionFactory.addEntities(result, res.entities);
                  }
                }

                deferred.resolve({
                  result: result
                });
              });
            })
            .catch(function (e) {
              rootScopeSafeApply(function () {
                deferred.reject(e);
              });
            });

          promise.$promise = promise;
          return promise;
        };
      });
    }

    function defineEntityProperty(ngEntity, attr) {
      Object.defineProperty(ngEntity, attr.name, {
        enumerable: true,
        get: function () {
          if (!this.$_entity) {
            return null;
          }

          if (this.$_entity[attr.name]) {
            if (!ngEntity.$_relatedAttributes[attr.name]) {
              var ngDataClass = ngEntity.$_dataClass.$_catalog[attr.type];
              var relatedNgEntity = new NgEntity(ngDataClass);

              relatedNgEntity.$_entity = ngEntity.$_entity[attr.name];
              ngEntity.$_relatedAttributes[attr.name] = relatedNgEntity;
            }
            return ngEntity.$_relatedAttributes[attr.name];
          }
          else {
            return null;
          }
        },
        set: function (value) {
          if (!(value instanceof NgEntity) && value !== null) {
            throw new Error('Passed value must be an entity or null');
          }

          rootScopeSafeApply(function () {
            if (value) {
              ngEntity.$_relatedAttributes[attr.name] = value;
              ngEntity.$_entity[attr.name] = value.$_entity;
            }
            else {
              delete ngEntity.$_relatedAttributes[attr.name];
              ngEntity.$_entity[attr.name] = null;
            }
          });
        }
      });
    }

    function defineCollectionProperty(ngEntity, attr) {
      Object.defineProperty(ngEntity, attr.name, {
        enumerable: true,
        get: function () {
          if (!this.$_entity) {
            return null;
          }

          if (this.$_entity[attr.name]) {
            if (!ngEntity.$_relatedAttributes[attr.name]) {
              var ngDataClass = ngEntity.$_dataClass.$_catalog[attr.entityType];
              var collectionFactory = $injector.get('collectionFactory');
              var ngCollection = collectionFactory.createNgCollection(ngDataClass);

              collectionFactory.addEntities(ngCollection, this.$_entity[attr.name].entities);
              ngCollection.$_collection = this.$_entity[attr.name];
              ngEntity.$_relatedAttributes[attr.name] = ngCollection;
            }
            return ngEntity.$_relatedAttributes[attr.name];
          }
          else {
            return null;
          }
        },
        set: function () {
          throw new Error("Can't set relatedEntities attribute " + attr.name + ".");
        }
      });
    }

    function defineMediaProperty(ngEntity, attr) {
      Object.defineProperty(ngEntity, attr.name, {
        enumerable: true,
        get: function () {
          if (!this.$_entity) {
            return null;
          }

          if (!this.$_relatedAttributes[attr.name]) {
            var ngMedia = mediaFactory.createNgMedia(this.$_entity[attr.name]);
            this.$_relatedAttributes[attr.name] = ngMedia;
          }
          return this.$_relatedAttributes[attr.name];
        },
        set: function () {
          throw new Error("Can't set media attribute " + attr.name + ".");
        }
      });
    }

    function defineScalarProperty(ngEntity, attr) {
      Object.defineProperty(ngEntity, attr.name, {
        enumerable: true,
        get: function () {
          if (!this.$_entity) {
            return null;
          }

          return ngEntity.$_entity[attr.name] || null;
        },
        set: function (value) {
          rootScopeSafeApply(function () {
            ngEntity.$_entity[attr.name] = value;
          });
        }
      });
    }

    entityFactory.isNgEntity = function (object) {
      return object instanceof NgEntity === true;
    };

    entityFactory.createNgEntity = function (ngDataClass) {
      return new NgEntity(ngDataClass);
    };

    return entityFactory;
  }]);

angular.module('wakanda')
  .factory('$wakandaManager', ['$wakanda', '$q', function ($wakanda, $q) {

      var factory = {};

      factory.getDataStore = function (catalog) {
        return $wakanda.init(catalog);
      };

      factory.user = {};

      factory.currentUser = function () {
        return $wakanda.$currentUser().$promise
          .then(function (e) {
            if (e && e.result) {
              return e.result;
            }
            else {
              return $q.reject();
            }
          });
      };

      factory.currentUserBelongsTo = function (groupName) {
        return $wakanda.$currentUserBelongsTo(groupName)
          .then(function (e) {
            if (e && e.result === true) {
              return true;
            }
            else {
              return $q.reject();
            }
          });
      };

      return factory;
  }]);

var wakanda = angular.module('wakanda');

wakanda.factory('mediaFactory', [
  function () {
    var mediaFactory = {};

    function NgMedia(media) {
      Object.defineProperty(this, '$_media', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: media
      });

      Object.defineProperty(this, 'uri', {
        enumerable: true,
        configurable: false,
        get: function () {
          return this.$_media.uri;
        },
        set: function () {
          throw new Error('Can\'t set media uri.');
        }
      });
    }

    NgMedia.prototype.$upload = upload;
    NgMedia.prototype.$remove = remove;

    function upload(file) {
      var promise = this.$_media.upload(file, file.type).then(function (res) {
        return {
          result: res
        };
      });

      promise.$promise = promise;
      return promise;
    }

    function remove() {
      var promise = this.$_media.delete().then(function (res) {
        return {
          result: res
        };
      });

      promise.$promise = promise;
      return promise;
    }

    mediaFactory.createNgMedia = function (media) {
      return new NgMedia(media);
    };

    return mediaFactory;
  }]);

angular.module('wakanda')
  .service('rootScopeSafeApply', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
  'use strict';

    /**
     * Safe $rootScope.$apply which check for $apply or $digest phase before
     *
     * @param {Function} fn
     * @returns {undefined}
     */
    var rootScopeSafeApply = function(fn) {
      var phase = $rootScope.$$phase;
      if (phase === '$apply' || phase === '$digest') {
        if (fn && (typeof (fn) === 'function')) {
          fn();
        }
      } else {
        $rootScope.$apply(fn);
      }
    };

    return rootScopeSafeApply;

  }]);

var wakanda = angular.module('wakanda');

//Just here for backward compatibility
wakanda.factory('transformFactory', ['entityFactory', 'collectionFactory',
  function (entityFactory, collectionFactory) {
    var transformFactory = {};

    transformFactory.toEntity = function (object) {
      console.warn('$transform.$objectToEntity is deprecated. This transformation is done automatically.');

      if(!entityFactory.isNgEntity(object)) {
        throw new Error('$transform.$objectToEntity: invalid object');
      }

      return object;
    };

    transformFactory.toCollection = function (object) {
      console.warn('$transform.$objectToCollection is deprecated. This transformation is done automatically.');

      if(!collectionFactory.isNgCollection(object)) {
        throw new Error('$transform.$objectToCollection: invalid object');
      }

      return object;
    };

    return transformFactory;
  }]);
