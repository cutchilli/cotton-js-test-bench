// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({35:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PRESSED = 1;
var RELEASED = 0;
var KEYDOWN = "keydown";
var KEYUP = "keyup";
var Keyboard = (function () {
    function Keyboard(htmlElement) {
        var _this = this;
        this.keyStates = {};
        this.keyMap = {};
        [KEYDOWN, KEYUP]
            .forEach(function (eventName) { return htmlElement.addEventListener(eventName, function (event) { return _this.handleEvent(event); }); });
    }
    Keyboard.prototype.addMapping = function (code, callback) {
        if (!this.keyMap[code]) {
            this.keyMap[code] = new Array();
        }
        this.keyMap[code].push(callback);
    };
    Keyboard.prototype.handleEvent = function (event) {
        var code = event.code;
        event.preventDefault();
        if (!this.keyMap[code]) {
            return;
        }
        var keyState = event.type === KEYDOWN ? PRESSED : RELEASED;
        if (this.keyStates[code] === keyState) {
            return;
        }
        this.keyStates[code] = keyState;
        this.keyMap[code]
            .forEach(function (callback) { return callback(keyState); });
    };
    return Keyboard;
}());
exports.Keyboard = Keyboard;
//# sourceMappingURL=keyboard.js.map
},{}],31:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var keyboard_1 = require("./keyboard");
exports.input = {
    Keyboard: keyboard_1.Keyboard,
};
//# sourceMappingURL=index.js.map
},{"./keyboard":35}],34:[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};
},{}],30:[function(require,module,exports) {
var global = (1,eval)("this");
var process = require("process");
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.4+314e4831
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && typeof require === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var TRY_CATCH_ERROR = { error: null };

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    TRY_CATCH_ERROR.error = error;
    return TRY_CATCH_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === TRY_CATCH_ERROR) {
      reject(promise, TRY_CATCH_ERROR.error);
      TRY_CATCH_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = void 0,
      failed = void 0;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (failed) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = getThen(entry);

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        handleMaybeThenable(promise, entry, _then);
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    return promise.then(function (value) {
      return constructor.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return constructor.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map

},{"process":34}],28:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var es6_promise_1 = require("es6-promise");
function loadImage(url) {
    return new es6_promise_1.Promise(function (resolve) {
        var img = new Image();
        img.addEventListener("load", function () {
            resolve(img);
        });
        img.src = url;
    });
}
exports.loadImage = loadImage;
//# sourceMappingURL=image.js.map
},{"es6-promise":30}],29:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loadJson(url) {
    return fetch(url).then(function (r) { return r.json(); });
}
exports.loadJson = loadJson;
//# sourceMappingURL=json.js.map
},{}],27:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BoundingBox = (function () {
    function BoundingBox(pos, size) {
        this.pos = pos;
        this.size = size;
    }
    BoundingBox.contains = function (a, b) {
        return !(b.left < a.left ||
            b.top < a.top ||
            b.right > a.right ||
            b.bottom > a.bottom);
    };
    BoundingBox.touches = function (a, b) {
        if (a.left > b.right || b.left > a.right) {
            return false;
        }
        if (a.top > b.bottom || b.top > a.bottom) {
            return false;
        }
        return true;
    };
    BoundingBox.overlaps = function (a, b) {
        if (a.left >= b.right || b.left >= a.right) {
            return false;
        }
        if (a.top >= b.bottom || b.top >= a.bottom) {
            return false;
        }
        return true;
    };
    BoundingBox.getOverlappingSides = function (box1, box2) {
        var left = false;
        var right = false;
        var top = false;
        var bottom = false;
        if (BoundingBox.touches(box1, box2) && box1.left < box2.left && box1.right >= box2.left) {
            right = true;
        }
        if (BoundingBox.touches(box1, box2) && box1.right > box2.right && box1.left <= box2.right) {
            left = true;
        }
        if (BoundingBox.touches(box1, box2) && box1.top < box2.bottom && box1.bottom >= box2.bottom) {
            top = true;
        }
        if (BoundingBox.touches(box1, box2) && box1.bottom > box2.top && box1.top <= box2.top) {
            bottom = true;
        }
        return {
            bottom: bottom,
            left: left,
            right: right,
            top: top,
        };
    };
    Object.defineProperty(BoundingBox.prototype, "bottom", {
        get: function () {
            return this.pos.y + this.size.y;
        },
        set: function (y) {
            this.pos.y = y - this.size.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoundingBox.prototype, "top", {
        get: function () {
            return this.pos.y;
        },
        set: function (y) {
            this.pos.y = y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoundingBox.prototype, "left", {
        get: function () {
            return this.pos.x;
        },
        set: function (x) {
            this.pos.x = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoundingBox.prototype, "right", {
        get: function () {
            return this.pos.x + this.size.x;
        },
        set: function (x) {
            this.pos.x = x - this.size.x;
        },
        enumerable: true,
        configurable: true
    });
    return BoundingBox;
}());
exports.BoundingBox = BoundingBox;
var Vector2 = (function () {
    function Vector2(x, y) {
        this.set(x, y);
    }
    Vector2.prototype.set = function (x, y) {
        this.x = x;
        this.y = y;
    };
    return Vector2;
}());
exports.Vector2 = Vector2;
exports.getRandomNumber = function (min, max) { return Math.random() * (max - min) + min; };
exports.getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};
exports.sign = function (n) { return n && n / Math.abs(n); };
//# sourceMappingURL=math.js.map
},{}],32:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var image_1 = require("./image");
var json_1 = require("./json");
var math_1 = require("./math");
exports.util = {
    BoundingBox: math_1.BoundingBox,
    Vector2: math_1.Vector2,
    getRandomInt: math_1.getRandomInt,
    getRandomNumber: math_1.getRandomNumber,
    loadImage: image_1.loadImage,
    loadJson: json_1.loadJson,
};
//# sourceMappingURL=index.js.map
},{"./image":28,"./json":29,"./math":27}],26:[function(require,module,exports) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Buffer = (function () {
    function Buffer(width, height, canvas) {
        this.canvas = canvas || document.createElement("canvas");
        this.canvas.width = canvas ? canvas.width : width;
        this.canvas.height = canvas ? canvas.height : height;
        this.context = this.canvas.getContext("2d");
        this.width = width;
        this.height = height;
    }
    Buffer.prototype.getContext = function () {
        return this.context;
    };
    Buffer.prototype.getCanvas = function () {
        return this.canvas;
    };
    Buffer.prototype.clear = function () {
        this.context.clearRect(0, 0, this.width, this.height);
    };
    return Buffer;
}());
exports.Buffer = Buffer;
//# sourceMappingURL=buffer.js.map
},{}],19:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buffer_1 = require("./buffer");
var math_1 = require("./util/math");
var Layer = (function () {
    function Layer(width, height, entityLibrary, entities) {
        if (entities === void 0) { entities = []; }
        this.entities = [];
        this.width = width;
        this.height = height;
        this.entityLibrary = entityLibrary;
        this.buffer = new buffer_1.Buffer(this.width, this.height);
        this.calculateBounds();
        this.addEntities(entities);
    }
    Layer.prototype.addEntity = function (entity) {
        this.addEntities([entity]);
    };
    Layer.prototype.addEntities = function (entities) {
        this.entities = this.entities.concat(entities);
    };
    Layer.prototype.removeEntity = function (entity) {
        this.entities = this.entities.filter(function (e) {
            return e !== entity;
        });
        this.entityLibrary.deregisterEntity(entity);
    };
    Layer.prototype.update = function (deltaTime) {
        for (var _i = 0, _a = this.entities; _i < _a.length; _i++) {
            var entity = _a[_i];
            entity.update(deltaTime);
        }
    };
    Layer.prototype.paintOn = function (context) {
        this.buffer.clear();
        for (var _i = 0, _a = this.entities; _i < _a.length; _i++) {
            var entity = _a[_i];
            if (math_1.BoundingBox.overlaps(this.bounds, entity.bounds)) {
                entity.paintOn(this.buffer.getContext());
            }
        }
        context.drawImage(this.buffer.getCanvas(), 0, 0);
    };
    Layer.prototype.calculateBounds = function () {
        this.bounds = new math_1.BoundingBox(new math_1.Vector2(0, 0), new math_1.Vector2(this.width, this.height));
    };
    return Layer;
}());
exports.Layer = Layer;
//# sourceMappingURL=layer.js.map
},{"./buffer":26,"./util/math":27}],20:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buffer_1 = require("./buffer");
var math_1 = require("./util/math");
var Entity = (function () {
    function Entity(position, size, entityLibrary, traits, debug) {
        if (traits === void 0) { traits = []; }
        if (debug === void 0) { debug = false; }
        var _this = this;
        this.name = "entity";
        this.debug = debug;
        this.position = position;
        this.velocity = new math_1.Vector2(0, 0);
        this.acceleration = new math_1.Vector2(0, 0);
        this.size = size;
        this.entityLibrary = entityLibrary;
        this.traits = traits;
        this.trait = {};
        this.traits.forEach(function (trait) {
            _this.trait[trait.getName()] = trait;
        });
        this.lifetime = 0;
        this.firstPaintComplete = false;
        this.calculateBounds();
        this.buffer = new buffer_1.Buffer(this.size.x, this.size.y);
        this.entityLibrary.registerEntity(this);
    }
    Entity.prototype.paintOn = function (context) {
        if (!this.firstPaintComplete) {
            this.draw();
            if (this.debug) {
                var bufferContext = this.buffer.getContext();
                bufferContext.strokeStyle = "green";
                bufferContext.rect(0, 0, this.size.x, this.size.y);
                bufferContext.stroke();
            }
            this.firstPaintComplete = true;
        }
        context.drawImage(this.buffer.getCanvas(), (0.5 + this.position.x) << 0, (0.5 + this.position.y) << 0);
    };
    Entity.prototype.update = function (deltaTime) {
        for (var _i = 0, _a = this.traits; _i < _a.length; _i++) {
            var trait = _a[_i];
            trait.update(this, this.entityLibrary, deltaTime);
        }
        this.lifetime += deltaTime;
    };
    Entity.prototype.getTraits = function () {
        return this.traits;
    };
    Entity.prototype.calculateBounds = function () {
        this.bounds = new math_1.BoundingBox(this.position, this.size);
    };
    return Entity;
}());
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map
},{"./buffer":26,"./util/math":27}],21:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Animator = (function () {
    function Animator(compositor, deltaTime) {
        if (deltaTime === void 0) { deltaTime = 1 / 60; }
        this.accumulatedTime = 0;
        this.lastTime = 0;
        this.deltaTime = deltaTime;
        this.compositor = compositor;
        this.animate = this.animate.bind(this);
    }
    Animator.prototype.start = function () {
        this.enqueue();
    };
    Animator.prototype.animate = function (time) {
        this.accumulatedTime += (time - this.lastTime) / 1000;
        if (this.accumulatedTime > 1) {
            this.accumulatedTime = 1;
        }
        while (this.accumulatedTime >= this.deltaTime) {
            this.compositor.update(this.deltaTime);
            this.accumulatedTime -= this.deltaTime;
        }
        this.compositor.paint();
        this.lastTime = time;
        this.enqueue();
    };
    Animator.prototype.enqueue = function () {
        window.requestAnimationFrame(this.animate);
    };
    return Animator;
}());
exports.Animator = Animator;
//# sourceMappingURL=animator.js.map
},{}],22:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buffer_1 = require("./buffer");
var CanvasElementToLayer = (function () {
    function CanvasElementToLayer(buffer, layer) {
        this.buffer = buffer;
        this.layer = layer;
    }
    return CanvasElementToLayer;
}());
var Compositor = (function () {
    function Compositor(width, height, rootElement, layers) {
        if (layers === void 0) { layers = []; }
        this.canvasElementToLayers = [];
        var newContainer = document.createElement("div");
        newContainer.style.position = "relative";
        rootElement.parentNode.replaceChild(newContainer, rootElement);
        this.rootContainer = newContainer;
        this.addLayers(width, height, layers);
    }
    Compositor.prototype.addLayers = function (width, height, layers) {
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            var layerCanvas = this.createLayerElement(width, height, i);
            this.canvasElementToLayers.push(new CanvasElementToLayer(new buffer_1.Buffer(width, height, layerCanvas), layer));
            this.rootContainer.appendChild(layerCanvas);
        }
    };
    Compositor.prototype.update = function (deltaTime) {
        for (var _i = 0, _a = this.canvasElementToLayers; _i < _a.length; _i++) {
            var canvasElementToLayer = _a[_i];
            canvasElementToLayer.layer.update(deltaTime);
        }
    };
    Compositor.prototype.paint = function () {
        for (var _i = 0, _a = this.canvasElementToLayers; _i < _a.length; _i++) {
            var canvasElementToLayer = _a[_i];
            canvasElementToLayer.buffer.clear();
            canvasElementToLayer.layer.paintOn(canvasElementToLayer.buffer.getContext());
        }
    };
    Compositor.prototype.createLayerElement = function (width, height, i) {
        var layerCanvas = document.createElement("canvas");
        layerCanvas.width = width;
        layerCanvas.height = height;
        layerCanvas.style.position = "absolute";
        layerCanvas.style.left = "0px";
        layerCanvas.style.top = "0px";
        layerCanvas.id = "layer" + i;
        layerCanvas.style.zIndex = String(i);
        return layerCanvas;
    };
    return Compositor;
}());
exports.Compositor = Compositor;
//# sourceMappingURL=compositor.js.map
},{"./buffer":26}],23:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EntityLibrary = (function () {
    function EntityLibrary() {
        this.entities = [];
        this.entitiesByTrait = {};
    }
    EntityLibrary.prototype.getEntitiesByTraitName = function (traitName) {
        return this.entitiesByTrait[traitName] || [];
    };
    EntityLibrary.prototype.registerEntity = function (entity) {
        var _this = this;
        this.entities.push(entity);
        var traits = entity.getTraits();
        traits.forEach(function (trait) {
            if (!_this.entitiesByTrait[trait.getName()]) {
                _this.entitiesByTrait[trait.getName()] = [];
            }
            _this.entitiesByTrait[trait.getName()].push(entity);
        });
    };
    EntityLibrary.prototype.deregisterEntity = function (entity) {
        var _this = this;
        var traits = entity.getTraits();
        traits.forEach(function (trait) {
            if (!_this.entitiesByTrait[trait.getName()]) {
                throw new Error("EntityLibrary out of sync");
            }
            _this.entitiesByTrait[trait.getName()] =
                _this.entitiesByTrait[trait.getName()].filter(function (e) { return e !== entity; });
            _this.entities = _this.entities.filter(function (e) { return e !== entity; });
        });
    };
    return EntityLibrary;
}());
exports.EntityLibrary = EntityLibrary;
//# sourceMappingURL=entity-library.js.map
},{}],24:[function(require,module,exports) {
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var buffer_1 = require("./buffer");
var image_1 = require("./util/image");
var json_1 = require("./util/json");
var SpriteSheet = (function () {
    function SpriteSheet(sprites) {
        this.sprites = sprites;
    }
    SpriteSheet.createSpriteSheet = function (spriteDef, spriteImage) {
        if (!spriteDef.width || !spriteDef.height) {
            throw new Error("Inalid sprite def");
        }
        var spriteWidth = spriteDef.width;
        var spriteHeight = spriteDef.height;
        var sprites = {};
        if (spriteDef.sprites) {
            spriteDef.sprites.forEach(function (sprite) {
                var spriteBuffers = [false, true].map(function (flip) {
                    var buf = new buffer_1.Buffer(spriteWidth, spriteHeight);
                    var context = buf.getContext();
                    if (flip) {
                        context.scale(-1, -1);
                        context.translate(-spriteWidth, 0);
                    }
                    context.drawImage(spriteImage, sprite.x * spriteWidth, sprite.y * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
                    return buf;
                });
                sprites[sprite.name] = spriteBuffers;
            });
        }
        return new SpriteSheet(sprites);
    };
    SpriteSheet.loadSpriteSheet = function (assetPath, name) {
        return __awaiter(this, void 0, void 0, function () {
            var spriteDef, spriteImage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, json_1.loadJson(assetPath + "/" + name + ".json")];
                    case 1:
                        spriteDef = _a.sent();
                        if (!spriteDef.imageUrl) {
                            throw new Error("Invalid SpriteDef");
                        }
                        return [4, image_1.loadImage("" + spriteDef.imageUrl)];
                    case 2:
                        spriteImage = _a.sent();
                        return [2, SpriteSheet.createSpriteSheet(spriteDef, spriteImage)];
                }
            });
        });
    };
    SpriteSheet.prototype.getSprite = function (name, flip) {
        if (!this.sprites[name]) {
            throw new Error("Invalid sprite");
        }
        return this.sprites[name][flip ? 1 : 0];
    };
    return SpriteSheet;
}());
exports.SpriteSheet = SpriteSheet;
//# sourceMappingURL=sprite-sheet.js.map
},{"./buffer":26,"./util/image":28,"./util/json":29}],25:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Trait = (function () {
    function Trait() {
    }
    Trait.prototype.update = function (entity, entityLibrary, deltaTime) {
        return;
    };
    return Trait;
}());
exports.Trait = Trait;
//# sourceMappingURL=trait.js.map
},{}],36:[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var math_1 = require("../util/math");
var BoundByGravity = (function (_super) {
    __extends(BoundByGravity, _super);
    function BoundByGravity(acceleration) {
        var _this = _super.call(this) || this;
        _this.acceleration = acceleration;
        return _this;
    }
    BoundByGravity.prototype.update = function (entity, entityLibrary, deltaTime) {
        if (!entity.acceleration) {
            entity.acceleration = new math_1.Vector2(0, 0);
        }
        entity.acceleration.y = this.acceleration.y;
        entity.acceleration.x = this.acceleration.x;
    };
    BoundByGravity.prototype.getName = function () {
        return "BoundByGravity";
    };
    return BoundByGravity;
}(__1.Trait));
exports.BoundByGravity = BoundByGravity;
//# sourceMappingURL=bound-by-gravity.js.map
},{"..":18,"../util/math":27}],37:[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var math_1 = require("../util/math");
var BoundByPhysics = (function (_super) {
    __extends(BoundByPhysics, _super);
    function BoundByPhysics(terminalVelocity) {
        var _this = _super.call(this) || this;
        _this.terminalVelocity = terminalVelocity;
        return _this;
    }
    BoundByPhysics.prototype.update = function (entity, entityLibrary, deltaTime) {
        this.updateX(entity, entityLibrary, deltaTime);
        this.updateY(entity, entityLibrary, deltaTime);
    };
    BoundByPhysics.prototype.getName = function () {
        return "BoundByPhysics";
    };
    BoundByPhysics.prototype.updateY = function (entity, entityLibrary, deltaTime) {
        entity.velocity.y += deltaTime * entity.acceleration.y;
        if (this.terminalVelocity && Math.abs(entity.velocity.y) >= Math.abs(this.terminalVelocity.y)) {
            entity.velocity.y = math_1.sign(entity.velocity.y) * this.terminalVelocity.y;
        }
        entity.position.y += deltaTime * entity.velocity.y;
    };
    BoundByPhysics.prototype.updateX = function (entity, entityLibrary, deltaTime) {
        entity.velocity.x += deltaTime * entity.acceleration.x;
        if (this.terminalVelocity && Math.abs(entity.velocity.x) >= Math.abs(this.terminalVelocity.x)) {
            entity.velocity.x = math_1.sign(entity.velocity.x) * this.terminalVelocity.x;
        }
        entity.position.x += deltaTime * entity.velocity.x;
    };
    return BoundByPhysics;
}(__1.Trait));
exports.BoundByPhysics = BoundByPhysics;
//# sourceMappingURL=bound-by-physics.js.map
},{"..":18,"../util/math":27}],38:[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = require("../util/math");
var bound_by_physics_1 = require("./bound-by-physics");
var BoundByPhysicsConstrainedByObstacles = (function (_super) {
    __extends(BoundByPhysicsConstrainedByObstacles, _super);
    function BoundByPhysicsConstrainedByObstacles(terminalVelocity) {
        return _super.call(this, terminalVelocity) || this;
    }
    BoundByPhysicsConstrainedByObstacles.prototype.update = function (entity, entityLibrary, deltaTime) {
        var obstacles = entityLibrary.getEntitiesByTraitName("Obstacle");
        this.updateX(entity, entityLibrary, deltaTime);
        this.resolveCollisionsX(entity, obstacles);
        this.updateY(entity, entityLibrary, deltaTime);
        this.resolveCollisionsY(entity, obstacles);
    };
    BoundByPhysicsConstrainedByObstacles.prototype.resolveCollisionsX = function (entity, obstacles) {
        obstacles.forEach(function (obstacle) {
            if (!math_1.BoundingBox.overlaps(entity.bounds, obstacle.bounds)) {
                return;
            }
            var sides = math_1.BoundingBox.getOverlappingSides(entity.bounds, obstacle.bounds);
            if (sides.right) {
                entity.position.x -= entity.bounds.right - obstacle.bounds.left;
            }
            if (sides.left) {
                entity.position.x += obstacle.bounds.right - entity.bounds.left;
            }
        });
    };
    BoundByPhysicsConstrainedByObstacles.prototype.resolveCollisionsY = function (entity, obstacles) {
        obstacles.forEach(function (obstacle) {
            if (!math_1.BoundingBox.overlaps(entity.bounds, obstacle.bounds)) {
                return;
            }
            var sides = math_1.BoundingBox.getOverlappingSides(entity.bounds, obstacle.bounds);
            if (sides.bottom) {
                entity.position.y -= entity.bounds.bottom - obstacle.bounds.top;
            }
            if (sides.top) {
                entity.position.y += obstacle.bounds.bottom - entity.bounds.top;
            }
        });
    };
    return BoundByPhysicsConstrainedByObstacles;
}(bound_by_physics_1.BoundByPhysics));
exports.BoundByPhysicsConstrainedByObstacles = BoundByPhysicsConstrainedByObstacles;
//# sourceMappingURL=bound-by-physics-constrained-by-obstacles.js.map
},{"../util/math":27,"./bound-by-physics":37}],39:[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var Obstacle = (function (_super) {
    __extends(Obstacle, _super);
    function Obstacle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Obstacle.prototype.getName = function () {
        return "Obstacle";
    };
    return Obstacle;
}(__1.Trait));
exports.Obstacle = Obstacle;
//# sourceMappingURL=obstacle.js.map
},{"..":18}],33:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bound_by_gravity_1 = require("./bound-by-gravity");
var bound_by_physics_1 = require("./bound-by-physics");
var bound_by_physics_constrained_by_obstacles_1 = require("./bound-by-physics-constrained-by-obstacles");
var obstacle_1 = require("./obstacle");
exports.traits = {
    BoundByGravity: bound_by_gravity_1.BoundByGravity,
    BoundByPhysics: bound_by_physics_1.BoundByPhysics,
    BoundByPhysicsConstrainedByObstacles: bound_by_physics_constrained_by_obstacles_1.BoundByPhysicsConstrainedByObstacles,
    Obstacle: obstacle_1.Obstacle,
};
//# sourceMappingURL=index.js.map
},{"./bound-by-gravity":36,"./bound-by-physics":37,"./bound-by-physics-constrained-by-obstacles":38,"./obstacle":39}],18:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var input_1 = require("./input");
exports.input = input_1.input;
var util_1 = require("./util");
exports.util = util_1.util;
var layer_1 = require("./layer");
exports.Layer = layer_1.Layer;
var entity_1 = require("./entity");
exports.Entity = entity_1.Entity;
var animator_1 = require("./animator");
exports.Animator = animator_1.Animator;
var compositor_1 = require("./compositor");
exports.Compositor = compositor_1.Compositor;
var entity_library_1 = require("./entity-library");
exports.EntityLibrary = entity_library_1.EntityLibrary;
var sprite_sheet_1 = require("./sprite-sheet");
exports.SpriteSheet = sprite_sheet_1.SpriteSheet;
var trait_1 = require("./trait");
exports.Trait = trait_1.Trait;
var traits_1 = require("./traits");
exports.traits = traits_1.traits;
//# sourceMappingURL=index.js.map
},{"./input":31,"./util":32,"./layer":19,"./entity":20,"./animator":21,"./compositor":22,"./entity-library":23,"./sprite-sheet":24,"./trait":25,"./traits":33}],17:[function(require,module,exports) {
'use strict';

var _dist = require('./dist');

var cotton = _interopRequireWildcard(_dist);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = cotton;
},{"./dist":18}],12:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _cottonJs = require("cotton-js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getRandomNumber = _cottonJs.util.getRandomNumber,
    getRandomInt = _cottonJs.util.getRandomInt;


var getRandomStarColour = function getRandomStarColour() {
  var colours = ["225,247,213", "255,189,189", "201,201,255", "241,203,255"];

  return colours[Math.floor(Math.random() * colours.length)];
};

var Star = function (_Entity) {
  _inherits(Star, _Entity);

  function Star(entityLibrary, maxWidth, maxHeight, pos, vel) {
    var radius = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 2;
    var colour = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : getRandomStarColour();
    var opacity = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : getRandomNumber(0.1, 1);
    var trail = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : getRandomInt(5, 20);

    _classCallCheck(this, Star);

    if (radius < 1 || radius > 3) throw new exception("radius must be between 2 and 4");

    var size = new _cottonJs.util.Vector2(radius * trail, radius * trail);

    var _this = _possibleConstructorReturn(this, (Star.__proto__ || Object.getPrototypeOf(Star)).call(this, pos, size, entityLibrary));

    _this.velocity = vel;
    _this.maxWidth = maxWidth;
    _this.maxHeight = maxHeight;
    _this.radius = radius;
    _this.opacity = opacity;
    _this.colour = colour;
    _this.trail = trail;
    return _this;
  }

  _createClass(Star, [{
    key: "draw",
    value: function draw() {
      var context = this.buffer.getContext();

      context.fillStyle = "rgba(" + this.colour + ", " + this.opacity + ")";
      context.shadowBlur = this.trail;
      context.shadowColor = "rgba(" + this.colour + ", " + this.opacity + ")";

      // TODO fix sizing issue with entity. This should always be passed in
      context.beginPath();
      context.arc(this.size.x / 2, this.size.y / 2, this.radius, 0, Math.PI * 2, false);
      context.fill();

      context.shadowBlur = 0;
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      _get(Star.prototype.__proto__ || Object.getPrototypeOf(Star.prototype), "update", this).call(this, deltaTime);

      this.position.x += this.velocity.x * deltaTime;
      this.position.y += this.velocity.y * deltaTime;

      if (this.position.x > this.maxWidth) this.position.x = 0 - this.size.x;
      if (this.position.x + this.size.x < 0) this.position.x = this.maxWidth + this.size.x;
      if (this.position.y > this.maxHeight) this.position.y = 0;
      if (this.position.y + this.size.y < 0) this.position.y = this.maxHeight - this.size.y;
    }
  }]);

  return Star;
}(_cottonJs.Entity);

exports.default = Star;
},{"cotton-js":17}],8:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cottonJs = require("cotton-js");

var _star = require("./star");

var _star2 = _interopRequireDefault(_star);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Vector2 = _cottonJs.util.Vector2,
    getRandomNumber = _cottonJs.util.getRandomNumber;

var starCount = 200;

var BackgroundLayer = function (_Layer) {
  _inherits(BackgroundLayer, _Layer);

  function BackgroundLayer(width, height) {
    _classCallCheck(this, BackgroundLayer);

    var _this = _possibleConstructorReturn(this, (BackgroundLayer.__proto__ || Object.getPrototypeOf(BackgroundLayer)).call(this, width, height, new _cottonJs.EntityLibrary()));

    _this.addEntities(_this.createStars());
    return _this;
  }

  _createClass(BackgroundLayer, [{
    key: "createStars",
    value: function createStars() {
      var stars = [];

      var maxVelocity = 100;

      for (var i = 0; i < starCount; i += 1) {
        stars.push(new _star2.default(this.entityLibrary, this.width, this.height, new Vector2(getRandomNumber(0, this.width), getRandomNumber(0, this.height)), new Vector2(getRandomNumber(-maxVelocity, maxVelocity), getRandomNumber(-maxVelocity, maxVelocity)), getRandomNumber(2, 3)));
      }

      return stars;
    }
  }]);

  return BackgroundLayer;
}(_cottonJs.Layer);

exports.default = BackgroundLayer;
},{"cotton-js":17,"./star":12}],13:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _cottonJs = require("cotton-js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getRandomNumber = _cottonJs.util.getRandomNumber,
    Vector2 = _cottonJs.util.Vector2;


var getRandomLetterColour = function getRandomLetterColour() {
  var colours = ["225,247,213", "255,189,189", "201,201,255", "241,203,255"];

  return colours[Math.floor(Math.random() * colours.length)];
};

var Letter = function (_Entity) {
  _inherits(Letter, _Entity);

  function Letter(maxWidth, maxHeight, pos, letterToDrawMatrix, entityLibrary) {
    _classCallCheck(this, Letter);

    var blockSize = new Vector2(10, 10);
    var width = 0;

    letterToDrawMatrix.forEach(function (arr) {
      if (arr.length > width) {
        width = arr.length;
      }
    });

    var height = letterToDrawMatrix.length;

    var _this = _possibleConstructorReturn(this, (Letter.__proto__ || Object.getPrototypeOf(Letter)).call(this, pos, new Vector2(50, 50), entityLibrary));

    _this.velocity = new Vector2(60, 60);
    _this.blockSize = blockSize;
    _this.maxWidth = maxWidth;
    _this.maxHeight = maxHeight;
    _this.letterToDrawMatrix = letterToDrawMatrix;
    return _this;
  }

  _createClass(Letter, [{
    key: "draw",
    value: function draw() {
      var context = this.buffer.getContext();

      context.fillStyle = "rgba(" + getRandomLetterColour() + ", " + 1 + ")";
      context.shadowBlur = 0;

      for (var y = 0; y < this.letterToDrawMatrix.length; y += 1) {
        var row = this.letterToDrawMatrix[y];
        for (var x = 0; x < row.length; x += 1) {
          if (row[x]) {
            context.fillRect(x * this.blockSize.x, y * this.blockSize.y, this.blockSize.x, this.blockSize.y);
          }
        }
      }
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      _get(Letter.prototype.__proto__ || Object.getPrototypeOf(Letter.prototype), "update", this).call(this, deltaTime);

      this.position.x += this.velocity.x * deltaTime;
      this.position.y += this.velocity.y * deltaTime;

      if (this.position.x < 0 || this.position.x > this.maxWidth - this.size.x) this.velocity.x = -this.velocity.x;

      if (this.position.y < 0 || this.position.y > this.maxHeight - this.size.y) this.velocity.y = -this.velocity.y;
    }
  }]);

  return Letter;
}(_cottonJs.Entity);

exports.default = Letter;
},{"cotton-js":17}],14:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var letters = {
  A: [[0, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1], [1, 0, 1]],
  B: [[1, 1], [1, 0, 1], [1, 1, 1], [1, 0, 1], [1, 1]],
  C: [[1, 1, 1], [1], [1], [1], [1, 1, 1]],
  D: [[1, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 1]],
  E: [[1, 1, 1], [1], [1, 1, 1], [1], [1, 1, 1]],
  F: [[1, 1, 1], [1], [1, 1], [1], [1]],
  G: [[0, 1, 1], [1], [1, 0, 1, 1], [1, 0, 0, 1], [0, 1, 1]],
  H: [[1, 0, 1], [1, 0, 1], [1, 1, 1], [1, 0, 1], [1, 0, 1]],
  I: [[1, 1, 1], [0, 1], [0, 1], [0, 1], [1, 1, 1]],
  J: [[1, 1, 1], [0, 0, 1], [0, 0, 1], [1, 0, 1], [1, 1, 1]],
  K: [[1, 0, 0, 1], [1, 0, 1], [1, 1], [1, 0, 1], [1, 0, 0, 1]],
  L: [[1], [1], [1], [1], [1, 1, 1]],
  M: [[1, 1, 1, 1, 1], [1, 0, 1, 0, 1], [1, 0, 1, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1]],
  N: [[1, 0, 0, 1], [1, 1, 0, 1], [1, 0, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1]],
  O: [[1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1]],
  P: [[1, 1, 1], [1, 0, 1], [1, 1, 1], [1], [1]],
  Q: [[0, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 1, 1], [1, 1, 1, 1]],
  R: [[1, 1], [1, 0, 1], [1, 0, 1], [1, 1], [1, 0, 1]],
  S: [[1, 1, 1], [1], [1, 1, 1], [0, 0, 1], [1, 1, 1]],
  T: [[1, 1, 1], [0, 1], [0, 1], [0, 1], [0, 1]],
  U: [[1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1]],
  V: [[1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 0, 1], [0, 1, 0, 1], [0, 0, 1]],
  W: [[1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 1, 0, 1], [1, 1, 1, 1, 1]],
  X: [[1, 0, 0, 0, 1], [0, 1, 0, 1], [0, 0, 1], [0, 1, 0, 1], [1, 0, 0, 0, 1]],
  Y: [[1, 0, 1], [1, 0, 1], [0, 1], [0, 1], [0, 1]],
  Z: [[1, 1, 1, 1, 1], [0, 0, 0, 1], [0, 0, 1], [0, 1], [1, 1, 1, 1, 1]],
  0: [[1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1]],
  1: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]],
  2: [[1, 1, 1], [0, 0, 1], [1, 1, 1], [1, 0, 0], [1, 1, 1]],
  3: [[1, 1, 1], [0, 0, 1], [1, 1, 1], [0, 0, 1], [1, 1, 1]],
  4: [[1, 0, 1], [1, 0, 1], [1, 1, 1], [0, 0, 1], [0, 0, 1]],
  5: [[1, 1, 1], [1, 0, 0], [1, 1, 1], [0, 0, 1], [1, 1, 1]],
  6: [[1, 1, 1], [1, 0, 0], [1, 1, 1], [1, 0, 1], [1, 1, 1]],
  7: [[1, 1, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1]],
  8: [[1, 1, 1], [1, 0, 1], [1, 1, 1], [1, 0, 1], [1, 1, 1]],
  9: [[1, 1, 1], [1, 0, 1], [1, 1, 1], [0, 0, 1], [1, 1, 1]],
  ' ': [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
  '-': [[1, 1, 1]]
};

exports.default = letters;
},{}],9:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cottonJs = require("cotton-js");

var _letter = require("./letter");

var _letter2 = _interopRequireDefault(_letter);

var _letters = require("./letters");

var _letters2 = _interopRequireDefault(_letters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Vector2 = _cottonJs.util.Vector2;


var createText = function createText(maxWidth, maxHeight, str, yOffset, entityLibrary) {
  var strUppered = str.toUpperCase();
  var retVal = [];

  var currX = 0;

  var _loop = function _loop(i) {
    var char = strUppered.charAt(i);
    var letterMatrix = _letters2.default[char];

    letter = new _letter2.default(maxWidth, maxHeight, new Vector2(currX, yOffset), letterMatrix, entityLibrary);

    retVal.push(letter);

    var maxLength = 0;

    letterMatrix.forEach(function (mat) {
      if (mat.length > maxLength) maxLength = mat.length;
    });

    currX += maxLength * (letter.blockSize.x + 1);
  };

  for (var i = 0; i < strUppered.length; i += 1) {
    var letter;

    _loop(i);
  }

  return retVal;
};

var TextLayer = function (_Layer) {
  _inherits(TextLayer, _Layer);

  function TextLayer(width, height, textToDisplay) {
    var yOffset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    _classCallCheck(this, TextLayer);

    var _this = _possibleConstructorReturn(this, (TextLayer.__proto__ || Object.getPrototypeOf(TextLayer)).call(this, width, height, new _cottonJs.EntityLibrary()));

    _this.addEntities(createText(width, height, textToDisplay, yOffset, _this.entityLibrary));
    return _this;
  }

  return TextLayer;
}(_cottonJs.Layer);

exports.default = TextLayer;
},{"cotton-js":17,"./letter":13,"./letters":14}],10:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cottonJs = require("cotton-js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CloudParticle = function (_Entity) {
  _inherits(CloudParticle, _Entity);

  function CloudParticle(pos, vel, size, entityLibrary) {
    _classCallCheck(this, CloudParticle);

    return _possibleConstructorReturn(this, (CloudParticle.__proto__ || Object.getPrototypeOf(CloudParticle)).call(this, pos, size, entityLibrary));
  }

  _createClass(CloudParticle, [{
    key: "draw",
    value: function draw() {
      var context = this.buffer.getContext();

      var blueCloud = context.createRadialGradient(0, 0, this.size.x / 4, this.size.x / 2, this.size.y / 2, 2000);

      blueCloud.addColorStop(0, "#061f47");
      blueCloud.addColorStop(1, "#000000");

      context.fillStyle = blueCloud;
      context.fillRect(0, 0, this.size.x, this.size.y);
    }
  }]);

  return CloudParticle;
}(_cottonJs.Entity);

var Cloud = function (_Layer) {
  _inherits(Cloud, _Layer);

  function Cloud(width, height) {
    _classCallCheck(this, Cloud);

    var _this2 = _possibleConstructorReturn(this, (Cloud.__proto__ || Object.getPrototypeOf(Cloud)).call(this, width, height, new _cottonJs.EntityLibrary()));

    _this2.addEntity(new CloudParticle(new _cottonJs.util.Vector2(0, 0), new _cottonJs.util.Vector2(0, 0), new _cottonJs.util.Vector2(_this2.width, _this2.height), _this2.entityLibrary));
    return _this2;
  }

  return Cloud;
}(_cottonJs.Layer);

exports.default = Cloud;
},{"cotton-js":17}],3:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runGalaxy = undefined;

var _cottonJs = require("cotton-js");

var _backgroundLayer = require("./background-layer");

var _backgroundLayer2 = _interopRequireDefault(_backgroundLayer);

var _textLayer = require("./text-layer");

var _textLayer2 = _interopRequireDefault(_textLayer);

var _cloud = require("../common/cloud");

var _cloud2 = _interopRequireDefault(_cloud);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var runGalaxy = exports.runGalaxy = function runGalaxy() {
  var canvas = document.getElementById("yaboi");
  var width = window.innerWidth;
  var height = window.innerHeight;

  canvas.width = width;
  canvas.height = height;

  var animator = new _cottonJs.Animator(new _cottonJs.Compositor(width, height, canvas, [new _cloud2.default(width, height), new _backgroundLayer2.default(width, height), new _textLayer2.default(width, height, "team"), new _textLayer2.default(width, height, "cotton", 70)]));

  animator.start();
};
},{"cotton-js":17,"./background-layer":8,"./text-layer":9,"../common/cloud":10}],11:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _cottonJs = require("cotton-js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SimpleEntity = function (_Entity) {
  _inherits(SimpleEntity, _Entity);

  function SimpleEntity(pos, size) {
    var entityLibrary = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new _cottonJs.EntityLibrary();
    var colour = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "green";
    var traits = arguments[4];

    _classCallCheck(this, SimpleEntity);

    var _this = _possibleConstructorReturn(this, (SimpleEntity.__proto__ || Object.getPrototypeOf(SimpleEntity)).call(this, pos, size, entityLibrary, traits, false));

    _this.colour = colour;
    return _this;
  }

  _createClass(SimpleEntity, [{
    key: "update",
    value: function update(delta) {
      _get(SimpleEntity.prototype.__proto__ || Object.getPrototypeOf(SimpleEntity.prototype), "update", this).call(this, delta);
    }
  }, {
    key: "draw",
    value: function draw() {
      var context = this.buffer.getContext();
      context.fillStyle = this.colour;
      context.fillRect(0, 0, this.size.x, this.size.y);
    }
  }]);

  return SimpleEntity;
}(_cottonJs.Entity);

exports.default = SimpleEntity;
},{"cotton-js":17}],4:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.runInputTest = undefined;

var _cloud = require("../common/cloud");

var _cloud2 = _interopRequireDefault(_cloud);

var _cottonJs = require("cotton-js");

var _simpleEntity = require("../common/simple-entity");

var _simpleEntity2 = _interopRequireDefault(_simpleEntity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var runInputTest = exports.runInputTest = function runInputTest() {
    var rootEl = document.getElementById('yaboi');
    var width = window.innerWidth;
    var height = window.innerHeight;

    var movableEntity = new _simpleEntity2.default(new _cottonJs.util.Vector2(0, 0), new _cottonJs.util.Vector2(50, 50));

    var inputHandler = new _cottonJs.input.Keyboard(window);

    inputHandler.addMapping('ArrowLeft', function () {
        movableEntity.position.x -= 10;
    });

    inputHandler.addMapping('ArrowRight', function () {
        movableEntity.position.x += 10;
    });

    inputHandler.addMapping('ArrowUp', function () {
        movableEntity.position.y -= 10;
    });

    inputHandler.addMapping('ArrowDown', function () {
        movableEntity.position.y += 10;
    });

    var animator = new _cottonJs.Animator(new _cottonJs.Compositor(width, height, rootEl, [new _cottonJs.Layer(width, height, new _cottonJs.EntityLibrary(), [movableEntity])]));

    animator.start();
};
},{"../common/cloud":10,"cotton-js":17,"../common/simple-entity":11}],5:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runTraitTest = undefined;

var _cloud = require("../common/cloud");

var _cloud2 = _interopRequireDefault(_cloud);

var _simpleEntity = require("../common/simple-entity");

var _simpleEntity2 = _interopRequireDefault(_simpleEntity);

var _cottonJs = require("cotton-js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Obstacle = _cottonJs.traits.Obstacle,
    BoundByGravity = _cottonJs.traits.BoundByGravity,
    BoundByPhysicsConstrainedByObstacles = _cottonJs.traits.BoundByPhysicsConstrainedByObstacles;
var Vector2 = _cottonJs.util.Vector2,
    getRandomNumber = _cottonJs.util.getRandomNumber,
    getRandomInt = _cottonJs.util.getRandomInt;


var rootEl = document.getElementById('yaboi');
var width = window.innerWidth;
var height = window.innerHeight;

var getRandomColour = function getRandomColour() {
  var colours = ["225,247,213", "255,189,189", "201,201,255", "241,203,255"];

  return colours[Math.floor(Math.random() * colours.length)];
};

var Block = function (_SimpleEntity) {
  _inherits(Block, _SimpleEntity);

  function Block(pos, entityLibrary) {
    _classCallCheck(this, Block);

    return _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).call(this, pos, new Vector2(10, 10), entityLibrary, 'white', [new Obstacle()]));
  }

  return Block;
}(_simpleEntity2.default);

var Yaboi = function (_SimpleEntity2) {
  _inherits(Yaboi, _SimpleEntity2);

  function Yaboi(pos, entityLibrary, traits) {
    _classCallCheck(this, Yaboi);

    return _possibleConstructorReturn(this, (Yaboi.__proto__ || Object.getPrototypeOf(Yaboi)).call(this, pos, new Vector2(20, 20), entityLibrary, "rgba(" + getRandomColour() + ", " + getRandomInt(50, 100) + ")", traits));
  }

  return Yaboi;
}(_simpleEntity2.default);

var runTraitTest = exports.runTraitTest = function runTraitTest() {

  var entityLibrary = new _cottonJs.EntityLibrary();

  var entities = [];

  // Create the floor
  var x = 0;
  var y = height - 10;

  while (x < width) {
    entities.push(new Block(new Vector2(x, y), entityLibrary));
    x += 10;
  }

  // Create the roof
  x = 0;
  y = 0;

  while (x < width) {
    entities.push(new Block(new Vector2(x, y), entityLibrary));
    x += 10;
  }

  // Create left wall
  x = 0;
  y = 0;

  while (y < height) {
    entities.push(new Block(new Vector2(x, y), entityLibrary));
    y += 10;
  }

  // Create right wall
  x = width - 10;
  y = 0;

  while (y < height) {
    entities.push(new Block(new Vector2(x, y), entityLibrary));
    y += 10;
  }

  for (var i = 0; i < 150; i += 1) {
    entities.push(new Yaboi(new Vector2(getRandomInt(20, width - 20), getRandomInt(20, height - 20)), entityLibrary, [new BoundByGravity(new Vector2(getRandomNumber(-30, 30), getRandomNumber(-30, 30))), new BoundByPhysicsConstrainedByObstacles(new Vector2(120, 120)), new Obstacle()]));
  }

  var animator = new _cottonJs.Animator(new _cottonJs.Compositor(width, height, rootEl, [new _cloud2.default(width, height), new _cottonJs.Layer(width, height, new _cottonJs.EntityLibrary(), entities)]));

  animator.start();
};
},{"../common/cloud":10,"../common/simple-entity":11,"cotton-js":17}],15:[function(require,module,exports) {
module.exports = {
  "imageUrl": "./atlas.png",
  "width": 22,
  "height": 32,
  "sprites": [{
    "name": "idle1",
    "x": 2.85,
    "y": 7.05
  }, {
    "name": "idle2",
    "x": 3.85,
    "y": 7.05
  }, {
    "name": "idle3",
    "x": 4.85,
    "y": 7.05
  }, {
    "name": "idle4",
    "x": 5.85,
    "y": 7.05
  }, {
    "name": "run1",
    "x": 6.85,
    "y": 7.05
  }, {
    "name": "run2",
    "x": 7.85,
    "y": 7.05
  }, {
    "name": "run3",
    "x": 8.85,
    "y": 7.05
  }, {
    "name": "run4",
    "x": 9.85,
    "y": 7.05
  }, {
    "name": "run5",
    "x": 10.85,
    "y": 7.05
  }, {
    "name": "run6",
    "x": 11.85,
    "y": 7.05
  }, {
    "name": "run7",
    "x": 12.85,
    "y": 7.05
  }, {
    "name": "run8",
    "x": 13.85,
    "y": 7.05
  }]
};
},{}],16:[function(require,module,exports) {
module.exports="/atlas.59fb8b15.png";
},{}],6:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runtSpriteTest = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _cottonJs = require('cotton-js');

var _atlas = require('./atlas.json');

var _atlas2 = _interopRequireDefault(_atlas);

var _atlas3 = require('./atlas.png');

var _atlas4 = _interopRequireDefault(_atlas3);

var _cloud = require('../common/cloud');

var _cloud2 = _interopRequireDefault(_cloud);

var _simpleEntity = require('../common/simple-entity');

var _simpleEntity2 = _interopRequireDefault(_simpleEntity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Obstacle = _cottonJs.traits.Obstacle,
    BoundByGravity = _cottonJs.traits.BoundByGravity,
    BoundByPhysicsConstrainedByObstacles = _cottonJs.traits.BoundByPhysicsConstrainedByObstacles;
var Vector2 = _cottonJs.util.Vector2,
    getRandomNumber = _cottonJs.util.getRandomNumber,
    getRandomInt = _cottonJs.util.getRandomInt;


var rootEl = document.getElementById('yaboi');
var width = window.innerWidth;
var height = window.innerHeight;

var Ground = function (_SimpleEntity) {
  _inherits(Ground, _SimpleEntity);

  function Ground(pos, entityLibrary, groundTileSize, colour) {
    _classCallCheck(this, Ground);

    return _possibleConstructorReturn(this, (Ground.__proto__ || Object.getPrototypeOf(Ground)).call(this, pos, new Vector2(groundTileSize, groundTileSize), entityLibrary, colour, [new Obstacle()]));
  }

  return Ground;
}(_simpleEntity2.default);

function createGround(groundTileSize, entityLibrary, colour) {
  var entities = [];

  var x = 0;
  var y = height - groundTileSize;

  while (x < width) {
    entities.push(new Ground(new Vector2(x, y), entityLibrary, 10, colour));
    x += groundTileSize;
  }

  return entities;
};

var Bruz = function (_Entity) {
  _inherits(Bruz, _Entity);

  function Bruz(spriteSheet, pos, size, entityLib, traits) {
    _classCallCheck(this, Bruz);

    var _this2 = _possibleConstructorReturn(this, (Bruz.__proto__ || Object.getPrototypeOf(Bruz)).call(this, pos, size, entityLib, traits, false));

    _this2.spriteSheet = spriteSheet;
    _this2.frameNum = 1;
    _this2.frame = function () {
      return 'idle' + _this2.frameNum;
    };
    return _this2;
  }

  _createClass(Bruz, [{
    key: 'update',
    value: function update(delta) {
      _get(Bruz.prototype.__proto__ || Object.getPrototypeOf(Bruz.prototype), 'update', this).call(this, delta);
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.buffer.clear();
      var context = this.buffer.getContext();
      context.drawImage(this.spriteSheet.getSprite('' + this.frame()).getCanvas(), 0, 0);
    }
  }]);

  return Bruz;
}(_cottonJs.Entity);

;

var runtSpriteTest = exports.runtSpriteTest = function runtSpriteTest() {
  var img = new Image();
  img.onload = function () {
    var spriteSheet = _cottonJs.SpriteSheet.createSpriteSheet(_atlas2.default, img);

    var ees = [];

    var eLib = new _cottonJs.EntityLibrary();

    ees = createGround(10, eLib, 'red');
    ees.push(new Bruz(spriteSheet, new Vector2(width / 2, height / 2), new Vector2(22, 32), eLib, [new BoundByGravity(new Vector2(0, 9.8)), new BoundByPhysicsConstrainedByObstacles(new Vector2(120, 120))]));

    var animator = new _cottonJs.Animator(new _cottonJs.Compositor(width, height, rootEl, [new _cloud2.default(width, height), new _cottonJs.Layer(width, height, eLib, ees)]));

    animator.start();
  };

  img.src = _atlas4.default;
};
},{"cotton-js":17,"./atlas.json":15,"./atlas.png":16,"../common/cloud":10,"../common/simple-entity":11}],2:[function(require,module,exports) {
'use strict';

var _teamCottonGalaxy = require('./team-cotton-galaxy');

var _inputTest = require('./input-test');

var _traitTest = require('./trait-test');

var _spriteTest = require('./sprite-test');

var tests = [_teamCottonGalaxy.runGalaxy, _inputTest.runInputTest, _traitTest.runTraitTest, _spriteTest.runtSpriteTest];

var rootEl = document.getElementById('test-buttons');

tests.forEach(function (test) {
  var testButton = document.createElement('button');
  testButton.innerHTML = test.name;
  testButton.style = 'margin: 10px;';
  testButton.onclick = function () {
    test();
    rootEl.hidden = true;
  };
  rootEl.appendChild(testButton);
});
},{"./team-cotton-galaxy":3,"./input-test":4,"./trait-test":5,"./sprite-test":6}],40:[function(require,module,exports) {

var OVERLAY_ID = '__parcel__error__overlay__';

var global = (1, eval)('this');
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '50243' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[40,2])
//# sourceMappingURL=/cotton-js-test-bench.8d2766ad.map