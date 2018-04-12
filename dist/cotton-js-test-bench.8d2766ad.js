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
})({34:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CottonImage {
    loadImage(url) {
        return new Promise(resolve => {
            const img = new Image();
            img.addEventListener('load', () => {
                resolve(img);
            });
            img.src = url;
        });
    }
}
exports.default = CottonImage;

},{}],35:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Json {
    loadJson(url) {
        return fetch(url).then(r => r.json());
    }
}
exports.default = Json;

},{}],33:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BoundingBox {
    constructor(pos, size) {
        this.pos = pos;
        this.size = size;
    }
    overlaps(box) {
        return (this.bottom > box.top &&
            this.top < box.bottom &&
            this.left < box.right &&
            this.right > box.left);
    }
    get bottom() {
        return this.pos.y + this.size.y;
    }
    set bottom(y) {
        this.pos.y = y - this.size.y;
    }
    get top() {
        return this.pos.y;
    }
    set top(y) {
        this.pos.y = y;
    }
    get left() {
        return this.pos.x;
    }
    set left(x) {
        this.pos.x = x;
    }
    get right() {
        return this.pos.x + this.size.x;
    }
    set right(x) {
        this.pos.x = x - this.size.x;
    }
}
exports.BoundingBox = BoundingBox;
class Vec {
    constructor(x, y) {
        this.set(x, y);
    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
}
exports.Vec = Vec;
exports.getRandomNumber = (min, max) => Math.random() * (max - min) + min;

},{}],27:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = require("./image");
const json_1 = require("./json");
const math_1 = require("./math");
exports.default = Object.assign(image_1.default, json_1.default, {
    BoundingBox: math_1.BoundingBox,
    getRandomNumber: math_1.getRandomNumber,
    Vec: math_1.Vec
});

},{"./image":34,"./json":35,"./math":33}],23:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Layer {
    constructor(width, height, entities = []) {
        this.entities = entities;
        this.width = width;
        this.height = height;
        this.buffer = document.createElement("canvas");
        this.buffer.width = width;
        this.buffer.height = height;
        this.bufferContext = this.buffer.getContext("2d");
    }
    addEntity(entity) {
        this.entities.push(entity);
    }
    removeEntity(entity) {
        this.entities = this.entities.filter((e) => {
            return e !== entity;
        });
    }
    update(deltaTime) {
        this.entities.forEach(entity => entity.update(deltaTime));
    }
    draw(context) {
        this.bufferContext.clearRect(0, 0, this.width, this.height);
        this.entities.forEach(entity => entity.draw(context));
        context.drawImage(this.buffer, 0, 0);
    }
}
exports.default = Layer;

},{}],24:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const math_1 = require("./util/math");
class Entity {
    constructor(pos, vel, size, traits = []) {
        this.name = "entity";
        this.pos = pos;
        this.vel = vel;
        this.size = size;
        this.lifetime = 0;
        this.calculateBounds();
        this.initialiseTraits(traits);
        this.buffer = document.createElement("canvas");
        this.buffer.width = this.size.x;
        this.buffer.height = this.size.y;
        this.bufferContext = this.buffer.getContext("2d");
    }
    initialiseTraits(traits) {
        traits.forEach(trait => {
            this.traits[trait.getName()] = trait;
        });
    }
    addTrait(trait) {
        this.traits[trait.getName()] = trait;
    }
    removeTrait(trait) {
        delete this.traits[trait.getName()];
    }
    calculateBounds() {
        this.bounds = new math_1.BoundingBox(this.pos, this.size);
    }
    draw(context) {
        context.drawImage(this.buffer, this.pos.x, this.pos.y);
    }
    update(deltaTime) {
        for (var trait in this.traits) {
            this.traits[trait].update(this, deltaTime);
        }
        this.lifetime += deltaTime;
    }
}
exports.default = Entity;

},{"./util/math":33}],25:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Animator {
    constructor(compositor, context, deltaTime = 1 / 60) {
        this.accumulatedTime = 0;
        this.lastTime = 0;
        this.deltaTime = deltaTime;
        this.compositor = compositor;
        this.context = context;
    }
    enqueue() {
        window.requestAnimationFrame(this.update);
    }
    update(time) {
        this.accumulatedTime += (time - this.lastTime) / 1000;
        if (this.accumulatedTime > 1) {
            this.accumulatedTime = 1;
        }
        while (this.accumulatedTime > this.deltaTime) {
            this.animate(this.deltaTime);
            this.accumulatedTime -= this.deltaTime;
        }
        this.lastTime = time;
        this.enqueue();
    }
    animate(deltaTime) {
        this.compositor.update(deltaTime);
        this.compositor.draw(this.context);
    }
    start() {
        this.enqueue();
    }
}
exports.default = Animator;

},{}],26:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Compositor {
    constructor(width, height, layers = []) {
        this.layers = layers;
        this.buffer = document.createElement('canvas');
        this.buffer.width = width;
        this.buffer.height = height;
        this.bufferContext = this.buffer.getContext('2d');
    }
    addLayer(layer) {
        this.layers.push(layer);
    }
    removeLayer(layer) {
        this.layers = this.layers.filter((l) => {
            return l !== layer;
        });
    }
    update(deltaTime) {
        this.layers.forEach(layer => layer.update(deltaTime));
    }
    draw(context) {
        this.layers.forEach(layer => layer.draw(this.bufferContext));
        context.drawImage(this.buffer, 0, 0);
    }
}
exports.default = Compositor;

},{}],21:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./util/index");
exports.util = index_1.default;
var layer_1 = require("./layer");
exports.Layer = layer_1.default;
var entity_1 = require("./entity");
exports.Entity = entity_1.default;
var animator_1 = require("./animator");
exports.Animator = animator_1.default;
var compositor_1 = require("./compositor");
exports.Compositor = compositor_1.default;

},{"./util/index":27,"./layer":23,"./entity":24,"./animator":25,"./compositor":26}],14:[function(require,module,exports) {
const loader = require('./dist');

module.exports = loader;

},{"./dist":21}],13:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _cottonJs = require('@agierens/cotton-js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getRandomNumber = _cottonJs.util.getRandomNumber;


var getRandomStarColour = function getRandomStarColour() {
  var colours = ['225,247,213', '255,189,189', '201,201,255', '241,203,255'];

  return colours[Math.floor(Math.random() * colours.length)];
};

var Star = function (_Entity) {
  _inherits(Star, _Entity);

  function Star(maxWidth, maxHeight, pos, vel) {
    var colour = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : getRandomStarColour();
    var opacity = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : Math.random();
    var trail = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : getRandomNumber(0, 40);
    var size = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : getRandomNumber(0.2, 0.9);

    _classCallCheck(this, Star);

    var _this = _possibleConstructorReturn(this, (Star.__proto__ || Object.getPrototypeOf(Star)).call(this));

    _this.pos = pos;
    _this.vel = vel;
    _this.size = size;
    _this.maxWidth = maxWidth;
    _this.maxHeight = maxHeight;
    _this.maxRadius = 4;
    _this.radius = _this.maxRadius * _this.size;
    _this.opacity = opacity;
    _this.colour = colour;
    _this.trail = trail;

    // TODO fix sizing issue with entity. This should always be passed in
    _this.buffer = document.createElement('canvas');
    _this.bufferContext = _this.buffer.getContext('2d');
    _this.buffer.width = _this.maxRadius * 2;
    _this.buffer.height = _this.maxRadius * 2;
    _this.bufferContext.fillStyle = 'rgba(' + _this.colour + ', ' + _this.opacity + ')';
    _this.bufferContext.shadowBlur = _this.trail;
    _this.bufferContext.shadowColor = 'rgba(' + _this.colour + ', ' + _this.opacity + ')';
    _this.bufferContext.beginPath();
    _this.bufferContext.arc(0, 0, _this.radius, 0, Math.PI * 2, false);
    _this.bufferContext.fill();

    _this.bufferContext.shadowBlur = 0;
    return _this;
  }

  _createClass(Star, [{
    key: 'update',
    value: function update(deltaTime) {
      _get(Star.prototype.__proto__ || Object.getPrototypeOf(Star.prototype), 'update', this).call(this, deltaTime);

      this.pos.x += this.vel.x * deltaTime;
      this.pos.y += this.vel.y * deltaTime;

      if (this.pos.x > this.maxWidth) this.pos.x = 0;
      if (this.pos.x < 0) this.pos.x = this.maxWidth;
      if (this.pos.y > this.maxHeight) this.pos.y = 0;
      if (this.pos.y < 0) this.pos.y = this.maxHeight;
    }
  }]);

  return Star;
}(_cottonJs.Entity);

exports.default = Star;
},{"@agierens/cotton-js":14}],7:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cottonJs = require('@agierens/cotton-js');

var _star = require('./star');

var _star2 = _interopRequireDefault(_star);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Vec = _cottonJs.util.Vec,
    getRandomNumber = _cottonJs.util.getRandomNumber;

var starCount = getRandomNumber(900, 1000);

var BackgroundLayer = function (_Layer) {
  _inherits(BackgroundLayer, _Layer);

  function BackgroundLayer(width, height) {
    _classCallCheck(this, BackgroundLayer);

    var _this = _possibleConstructorReturn(this, (BackgroundLayer.__proto__ || Object.getPrototypeOf(BackgroundLayer)).call(this, width, height));

    _this.entities = _this.createStars();
    return _this;
  }

  _createClass(BackgroundLayer, [{
    key: 'createStars',
    value: function createStars() {
      var stars = [];

      for (var i = 0; i < starCount; i += 1) {
        stars.push(new _star2.default(this.width, this.height, new Vec(getRandomNumber(0, this.width), getRandomNumber(0, this.height)), new Vec(-2, -2)));
      }

      return stars;
    }
  }]);

  return BackgroundLayer;
}(_cottonJs.Layer);

exports.default = BackgroundLayer;
},{"@agierens/cotton-js":14,"./star":13}],15:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _cottonJs = require('@agierens/cotton-js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getRandomLetterColour = function getRandomLetterColour() {
  var colours = ['225,247,213', '255,189,189', '201,201,255', '241,203,255'];

  return colours[Math.floor(Math.random() * colours.length)];
};

var Letter = function (_Entity) {
  _inherits(Letter, _Entity);

  function Letter(pos, letterToDrawMatrix) {
    _classCallCheck(this, Letter);

    var _this = _possibleConstructorReturn(this, (Letter.__proto__ || Object.getPrototypeOf(Letter)).call(this));

    _this.pos = pos;
    _this.vel = new _cottonJs.util.Vec(50, 50);
    _this.size = 10;
    _this.letterToDrawMatrix = letterToDrawMatrix;

    _this.buffer = document.createElement('canvas');
    _this.bufferContext = _this.buffer.getContext('2d');

    _this.drawLetter();
    setInterval(function () {
      _this.drawLetter();
    }, 250);
    return _this;
  }

  _createClass(Letter, [{
    key: 'drawLetter',
    value: function drawLetter() {
      var _this2 = this;

      this.width = this.letterToDrawMatrix[0].length;
      this.letterToDrawMatrix.forEach(function (arr) {
        if (arr.length > _this2.width) {
          _this2.width = arr.length;
        }
      });
      this.height = this.letterToDrawMatrix.length;
      this.buffer.width = this.size * this.width;
      this.buffer.height = this.size * this.height;
      this.bufferContext.fillStyle = 'rgba(' + getRandomLetterColour() + ', ' + 1 + ')';
      this.bufferContext.shadowBlur = 0;

      for (var y = 0; y < this.letterToDrawMatrix.length; y += 1) {
        var row = this.letterToDrawMatrix[y];
        for (var x = 0; x < row.length; x += 1) {
          if (row[x]) {
            this.bufferContext.fillRect(x * this.size, y * this.size, this.size, this.size);
          }
        }
      }
    }
  }, {
    key: 'update',
    value: function update(deltaTime) {
      _get(Letter.prototype.__proto__ || Object.getPrototypeOf(Letter.prototype), 'update', this).call(this, deltaTime);

      this.pos.y += this.vel.y * deltaTime;
      this.pos.x += this.vel.x * deltaTime;

      if (this.vel.x === 1 || this.vel.x === -1) this.vel.x = 0;
      if (this.vel.y === 1 || this.vel.y === -1) this.vel.y = 0;

      this.vel.x = _cottonJs.util.getRandomNumber(this.vel.x - 0.1, this.vel.x + 0.1);
      this.vel.y = _cottonJs.util.getRandomNumber(this.vel.y - 0.1, this.vel.y + 0.1);

      if (this.pos.y < 0) this.vel.y = -this.vel.y;
      if (this.pos.x < 0) this.vel.x = -this.vel.x;
      if (this.pos.y > window.innerHeight / 2 - this.size * this.height) this.vel.y = -this.vel.y;
      if (this.pos.x > window.innerWidth / 2 - this.size * this.width) this.vel.x = -this.vel.x;
    }
  }]);

  return Letter;
}(_cottonJs.Entity);

exports.default = Letter;
},{"@agierens/cotton-js":14}],16:[function(require,module,exports) {
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
},{}],8:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cottonJs = require('@agierens/cotton-js');

var _letter = require('./letter');

var _letter2 = _interopRequireDefault(_letter);

var _letters = require('./letters');

var _letters2 = _interopRequireDefault(_letters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Vec = _cottonJs.util.Vec;


var createText = function createText(str, yOffset) {
  var strUppered = str.toUpperCase();
  var retVal = [];

  var currX = 0;

  var _loop = function _loop(i) {
    var char = strUppered.charAt(i);
    var letterMatrix = _letters2.default[char];

    retVal.push(new _letter2.default(new Vec(currX, yOffset), letterMatrix));
    var maxLength = 0;

    letterMatrix.forEach(function (mat) {
      if (mat.length > maxLength) maxLength = mat.length;
    });
    currX += maxLength * 22;
  };

  for (var i = 0; i < strUppered.length; i += 1) {
    _loop(i);
  }

  return retVal;
};

var TextLayer = function (_Layer) {
  _inherits(TextLayer, _Layer);

  function TextLayer(width, height, textToDisplay) {
    var yOffset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    _classCallCheck(this, TextLayer);

    return _possibleConstructorReturn(this, (TextLayer.__proto__ || Object.getPrototypeOf(TextLayer)).call(this, width, height, createText(textToDisplay, yOffset)));
  }

  return TextLayer;
}(_cottonJs.Layer);

exports.default = TextLayer;
},{"@agierens/cotton-js":14,"./letter":15,"./letters":16}],9:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cottonJs = require('@agierens/cotton-js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cloud = function (_Layer) {
  _inherits(Cloud, _Layer);

  function Cloud(width, height) {
    _classCallCheck(this, Cloud);

    return _possibleConstructorReturn(this, (Cloud.__proto__ || Object.getPrototypeOf(Cloud)).call(this, width, height, []));
  }

  _createClass(Cloud, [{
    key: 'draw',
    value: function draw(context) {
      var blueCloud = context.createRadialGradient(0, 0, this.width / 4, this.width / 2, this.height / 2, 2000);
      blueCloud.addColorStop(0, '#061f47');
      blueCloud.addColorStop(1, '#000000');
      context.fillStyle = blueCloud;
      context.fillRect(0, 0, this.width, this.height);
    }
  }]);

  return Cloud;
}(_cottonJs.Layer);

exports.default = Cloud;
},{"@agierens/cotton-js":14}],5:[function(require,module,exports) {
'use strict';

var _cottonJs = require('@agierens/cotton-js');

var _backgroundLayer = require('./background-layer');

var _backgroundLayer2 = _interopRequireDefault(_backgroundLayer);

var _textLayer = require('./text-layer');

var _textLayer2 = _interopRequireDefault(_textLayer);

var _cloud = require('./cloud');

var _cloud2 = _interopRequireDefault(_cloud);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById('yaboi');
var width = window.innerWidth;
var height = window.innerHeight;

canvas.width = width;
canvas.height = height;

undefined.animator = new _cottonJs.Animator(new _cottonJs.Compositor(width, height, [new _cloud2.default(width, height), new _backgroundLayer2.default(width, height), new _textLayer2.default(width, height, 'aswin'), new _textLayer2.default(width, height, 'lakshman', 70), new _textLayer2.default(width, height, '--------', 70 * 2), new _textLayer2.default(width, height, 'designer', 70 * 3), new _textLayer2.default(width, height, 'developer', 70 * 4)]), canvas.getContext('2d'));

undefined.animator.start();
},{"@agierens/cotton-js":14,"./background-layer":7,"./text-layer":8,"./cloud":9}],36:[function(require,module,exports) {

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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '58075' + '/');
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
},{}]},{},[36,5])
//# sourceMappingURL=/cotton-js-test-bench.8d2766ad.map