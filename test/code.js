(function () {
	'use strict';

	function unwrapExports (x) {
		return x && x.__esModule ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
	};

	/**
	 * Returns `true` if provided input is Element.
	 * @name isElement
	 * @param {*} [input]
	 * @returns {boolean}
	 */
	function index (input) {
	  return input != null && (typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object' && input.nodeType === 1 && _typeof(input.style) === 'object' && _typeof(input.ownerDocument) === 'object';
	}

var index$1 = Object.freeze({
	  default: index
	});

	// Production steps of ECMA-262, Edition 6, 22.1.2.1
	// Reference: http://www.ecma-international.org/ecma-262/6.0/#sec-array.from
	var __moduleExports$1 = function () {
	  var isCallable = function (fn) {
	    return typeof fn === 'function';
	  };
	  var toInteger = function (value) {
	    var number = Number(value);
	    if (isNaN(number)) {
	      return 0;
	    }
	    if (number === 0 || !isFinite(number)) {
	      return number;
	    }
	    return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
	  };
	  var maxSafeInteger = Math.pow(2, 53) - 1;
	  var toLength = function (value) {
	    var len = toInteger(value);
	    return Math.min(Math.max(len, 0), maxSafeInteger);
	  };
	  var iteratorProp = function (value) {
	    if (value != null) {
	      if (['string', 'number', 'boolean', 'symbol'].indexOf(typeof value) > -1) {
	        return Symbol.iterator;
	      } else if (typeof Symbol !== 'undefined' && 'iterator' in Symbol && Symbol.iterator in value) {
	        return Symbol.iterator;
	      }
	      // Support "@@iterator" placeholder, Gecko 27 to Gecko 35
	      else if ('@@iterator' in value) {
	          return '@@iterator';
	        }
	    }
	  };
	  var getMethod = function (O, P) {
	    // Assert: IsPropertyKey(P) is true.
	    if (O != null && P != null) {
	      // Let func be GetV(O, P).
	      var func = O[P];
	      // ReturnIfAbrupt(func).
	      // If func is either undefined or null, return undefined.
	      if (func == null) {
	        return void 0;
	      }
	      // If IsCallable(func) is false, throw a TypeError exception.
	      if (!isCallable(func)) {
	        throw new TypeError(func + ' is not a function');
	      }
	      return func;
	    }
	  };
	  var iteratorStep = function (iterator) {
	    // Let result be IteratorNext(iterator).
	    // ReturnIfAbrupt(result).
	    var result = iterator.next();
	    // Let done be IteratorComplete(result).
	    // ReturnIfAbrupt(done).
	    var done = Boolean(result.done);
	    // If done is true, return false.
	    if (done) {
	      return false;
	    }
	    // Return result.
	    return result;
	  };

	  // The length property of the from method is 1.
	  return function from(items /*, mapFn, thisArg */) {
	    'use strict';

	    // 1. Let C be the this value.

	    var C = this;

	    // 2. If mapfn is undefined, let mapping be false.
	    var mapFn = arguments.length > 1 ? arguments[1] : void 0;

	    var T;
	    if (typeof mapFn !== 'undefined') {
	      // 3. else
	      //   a. If IsCallable(mapfn) is false, throw a TypeError exception.
	      if (!isCallable(mapFn)) {
	        throw new TypeError('Array.from: when provided, the second argument must be a function');
	      }

	      //   b. If thisArg was supplied, let T be thisArg; else let T
	      //      be undefined.
	      if (arguments.length > 2) {
	        T = arguments[2];
	      }
	      //   c. Let mapping be true (implied by mapFn)
	    }

	    var A, k;

	    // 4. Let usingIterator be GetMethod(items, @@iterator).
	    // 5. ReturnIfAbrupt(usingIterator).
	    var usingIterator = getMethod(items, iteratorProp(items));

	    // 6. If usingIterator is not undefined, then
	    if (usingIterator !== void 0) {
	      // a. If IsConstructor(C) is true, then
	      //   i. Let A be the result of calling the [[Construct]]
	      //      internal method of C with an empty argument list.
	      // b. Else,
	      //   i. Let A be the result of the abstract operation ArrayCreate
	      //      with argument 0.
	      // c. ReturnIfAbrupt(A).
	      A = isCallable(C) ? Object(new C()) : [];

	      // d. Let iterator be GetIterator(items, usingIterator).
	      var iterator = usingIterator.call(items);

	      // e. ReturnIfAbrupt(iterator).
	      if (iterator == null) {
	        throw new TypeError('Array.from requires an array-like or iterable object');
	      }

	      // f. Let k be 0.
	      k = 0;

	      // g. Repeat
	      var next, nextValue;
	      while (true) {
	        // i. Let Pk be ToString(k).
	        // ii. Let next be IteratorStep(iterator).
	        // iii. ReturnIfAbrupt(next).
	        next = iteratorStep(iterator);

	        // iv. If next is false, then
	        if (!next) {

	          // 1. Let setStatus be Set(A, "length", k, true).
	          // 2. ReturnIfAbrupt(setStatus).
	          A.length = k;

	          // 3. Return A.
	          return A;
	        }
	        // v. Let nextValue be IteratorValue(next).
	        // vi. ReturnIfAbrupt(nextValue)
	        nextValue = next.value;

	        // vii. If mapping is true, then
	        //   1. Let mappedValue be Call(mapfn, T, «nextValue, k»).
	        //   2. If mappedValue is an abrupt completion, return
	        //      IteratorClose(iterator, mappedValue).
	        //   3. Let mappedValue be mappedValue.[[value]].
	        // viii. Else, let mappedValue be nextValue.
	        // ix.  Let defineStatus be the result of
	        //      CreateDataPropertyOrThrow(A, Pk, mappedValue).
	        // x. [TODO] If defineStatus is an abrupt completion, return
	        //    IteratorClose(iterator, defineStatus).
	        if (mapFn) {
	          A[k] = mapFn.call(T, nextValue, k);
	        } else {
	          A[k] = nextValue;
	        }
	        // xi. Increase k by 1.
	        k++;
	      }
	      // 7. Assert: items is not an Iterable so assume it is
	      //    an array-like object.
	    } else {

	      // 8. Let arrayLike be ToObject(items).
	      var arrayLike = Object(items);

	      // 9. ReturnIfAbrupt(items).
	      if (items == null) {
	        throw new TypeError('Array.from requires an array-like object - not null or undefined');
	      }

	      // 10. Let len be ToLength(Get(arrayLike, "length")).
	      // 11. ReturnIfAbrupt(len).
	      var len = toLength(arrayLike.length);

	      // 12. If IsConstructor(C) is true, then
	      //     a. Let A be Construct(C, «len»).
	      // 13. Else
	      //     a. Let A be ArrayCreate(len).
	      // 14. ReturnIfAbrupt(A).
	      A = isCallable(C) ? Object(new C(len)) : new Array(len);

	      // 15. Let k be 0.
	      k = 0;
	      // 16. Repeat, while k < len… (also steps a - h)
	      var kValue;
	      while (k < len) {
	        kValue = arrayLike[k];
	        if (mapFn) {
	          A[k] = mapFn.call(T, kValue, k);
	        } else {
	          A[k] = kValue;
	        }
	        k++;
	      }
	      // 17. Let setStatus be Set(A, "length", len, true).
	      // 18. ReturnIfAbrupt(setStatus).
	      A.length = len;
	      // 19. Return A.
	    }
	    return A;
	  };
	}();

	var __moduleExports = typeof Array.from === 'function' ? Array.from : __moduleExports$1;

	/**
	 * isArray
	 */

	var isArray = Array.isArray;

	/**
	 * toString
	 */

	var str = Object.prototype.toString;

	/**
	 * Whether or not the given `val`
	 * is an array.
	 *
	 * example:
	 *
	 *        isArray([]);
	 *        // > true
	 *        isArray(arguments);
	 *        // > false
	 *        isArray('');
	 *        // > false
	 *
	 * @param {mixed} val
	 * @return {bool}
	 */

	var __moduleExports$2 = isArray || function (val) {
	  return !!val && '[object Array]' == str.call(val);
	};

	var require$$2 = ( index$1 && index$1['default'] ) || index$1;

	var bundle = createCommonjsModule(function (module, exports) {
	'use strict';

	Object.defineProperty(exports, '__esModule', { value: true });

	function _interopDefault(ex) {
	    return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
	}

	var isElement = _interopDefault(require$$2);
	var arrayFrom = _interopDefault(__moduleExports);
	var isArray = _interopDefault(__moduleExports$2);

	function indexOfElement(elements, element) {
	    element = resolveElement(element, true);
	    if (!isElement(element)) return -1;
	    for (var i = 0; i < elements.length; i++) {
	        if (elements[i] === element) {
	            return i;
	        }
	    }
	    return -1;
	}

	function hasElement(elements, element) {
	    return -1 !== indexOfElement(elements, element);
	}

	function domListOf(arr) {

	    if (!arr) return [];

	    try {
	        if (typeof arr === 'string') {
	            return arrayFrom(document.querySelectorAll(arr));
	        } else if (isArray(arr)) {
	            return arr.map(resolveElement);
	        } else {
	            if (typeof arr.length === 'undefined') {
	                return [resolveElement(arr)];
	            }

	            return arrayFrom(arr, resolveElement);
	        }
	    } catch (e) {
	        throw new Error(e);
	    }
	}

	function concatElementLists() {
	    for (var _len = arguments.length, lists = Array(_len), _key = 0; _key < _len; _key++) {
	        lists[_key] = arguments[_key];
	    }

	    return lists.reduce(function (last, list) {
	        return list.length ? last : last.concat(domListOf(list));
	    }, []);
	}

	function pushElements(elements, toAdd) {

	    for (var i = 0; i < toAdd.length; i++) {
	        if (!hasElement(elements, toAdd[i])) elements.push(toAdd[i]);
	    }

	    return toAdd;
	}

	function addElements(elements) {
	    for (var _len2 = arguments.length, toAdd = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        toAdd[_key2 - 1] = arguments[_key2];
	    }

	    toAdd = toAdd.map(resolveElement);
	    return pushElements(elements, toAdd);
	}

	function removeElements(elements) {
	    for (var _len3 = arguments.length, toRemove = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	        toRemove[_key3 - 1] = arguments[_key3];
	    }

	    return toRemove.map(resolveElement).reduce(function (last, e) {

	        var index = indexOfElement(elements, e);

	        if (index !== -1) return last.concat(elements.splice(index, 1));
	        return last;
	    }, []);
	}

	function resolveElement(element, noThrow) {
	    if (typeof element === 'string') {
	        try {
	            return document.querySelector(element);
	        } catch (e) {
	            throw e;
	        }
	    }

	    if (!isElement(element) && !noThrow) {
	        throw new TypeError(element + ' is not a DOM element.');
	    }
	    return element;
	}

	exports.indexOfElement = indexOfElement;
	exports.hasElement = hasElement;
	exports.domListOf = domListOf;
	exports.concatElementLists = concatElementLists;
	exports.addElements = addElements;
	exports.removeElements = removeElements;
	exports.resolveElement = resolveElement;
	});

	unwrapExports(bundle);
	var removeElements = bundle.removeElements;
	var addElements = bundle.addElements;
	var domListOf = bundle.domListOf;

	function MyOperator(elements) {
	    this.elements = domListOf(elements);
	}

	MyOperator.prototype.add = function (elements) {
	    addElements(this.elements, elements);
	    return this;
	};
	MyOperator.prototype.remove = function (elements) {
	    return removeElements(this.elements, elements);
	};
	//All operations can take elements, or selectors.
	var things = [document.querySelector('.thing1'), '.thing2'];
	var myOps = new MyOperator(things);
	myOps.add(document.querySelector('.thing3'));
	console.log(myOps.elements);
	myOps.remove('.thing1');
	console.log(myOps.elements);

}());
//# sourceMappingURL=code.js.map
