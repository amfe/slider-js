'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Items = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.getTransformOffset = getTransformOffset;
exports.getTranslate = getTranslate;

require('gesturejs');

var _amfeCubicbezier = require('amfe-cubicbezier');

var cubicbezier = _interopRequireWildcard(_amfeCubicbezier);

var _animationJs = require('animation-js');

var _animationJs2 = _interopRequireDefault(_animationJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (typeof global.window === 'undefined') {
    throw new Error('can not be running in non-browser');
}

var win = global.window;
var doc = win.document;
var ua = win.navigator.userAgent;
var Firefox = !!ua.match(/Firefox/i);
var IEMobile = !!ua.match(/IEMobile/i);
var stylePrefix = Firefox ? 'Moz' : IEMobile ? 'ms' : 'webkit';

function getTransformOffset(element) {
    var offset = {
        x: 0,
        y: 0
    };
    var transform = getComputedStyle(element)[stylePrefix + 'Transform'];
    var matched;

    if (transform !== 'none') {
        if (matched = transform.match(/^matrix3d\((?:[-\d.]+,\s*){12}([-\d.]+),\s*([-\d.]+)(?:,\s*[-\d.]+){2}\)/) || transform.match(/^matrix\((?:[-\d.]+,\s*){4}([-\d.]+),\s*([-\d.]+)\)$/)) {
            offset.x = parseFloat(matched[1]) || 0;
            offset.y = parseFloat(matched[2]) || 0;
        }
    }

    return offset;
}

var CSSMatrix = IEMobile ? 'MSCSSMatrix' : 'WebKitCSSMatrix';
var has3d = !!Firefox || CSSMatrix in win && 'm11' in new win[CSSMatrix]();
function getTranslate(x, y) {
    x = parseFloat(x);
    y = parseFloat(y);

    if (x !== 0) {
        x += 'px';
    }

    if (y !== 0) {
        y += 'px';
    }

    if (has3d) {
        return 'translate3d(' + x + ', ' + y + ', 0)';
    } else {
        return 'translate(' + x + ', ' + y + ')';
    }
}

function fireEvent(el, name, extra) {
    var ev = doc.createEvent('HTMLEvents');
    ev.initEvent(name, false, false);
    if (extra) {
        for (var key in extra) {
            ev[key] = extra[key];
        }
    }
    el.dispatchEvent(ev);
}

var Items = exports.Items = function () {
    function Items(options) {
        _classCallCheck(this, Items);

        this.parentRoot = options.parentRoot;
        this.parentElement = options.parentElement;
        this.step = options.step;
        this.length = 0;
        this.index = 0;
        this.transformOffset = 0;
    }

    _createClass(Items, [{
        key: 'add',
        value: function add(htmlElement) {
            var itemElement = document.createElement('li');
            if (typeof htmlElement === 'string') {
                itemElement.innerHTML = htmlElement;
            } else if (htmlElement.length > 1) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = htmlElement[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var el = _step.value;

                        itemElement.appendChild(el);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            } else if (htmlElement instanceof HTMLElement && htmlElement.tagName.toLowerCase() === 'li') {
                itemElement = htmlElement;
            } else {
                itemElement.appendChild(htmlElement);
            }

            itemElement.style.display = 'none';
            itemElement.style.position = 'absolute';
            itemElement.index = this.length;

            if (itemElement.parentNode !== this.parentElement) {
                this.parentElement.appendChild(itemElement);
            }

            Object.defineProperty(this, String(this.length), {
                get: function get() {
                    return itemElement;
                }
            });

            this.length++;

            return itemElement;
        }
    }, {
        key: '_normalizeIndex',
        value: function _normalizeIndex(index) {
            while (index < 0) {
                index += this.length;
            }

            while (index >= this.length) {
                index -= this.length;
            }

            return index;
        }
    }, {
        key: 'get',
        value: function get(index) {
            return this[String(this._normalizeIndex(index))];
        }
    }, {
        key: '_getCloned',
        value: function _getCloned(index) {
            index = String(this._normalizeIndex(index));
            var item = this.parentElement.querySelector('[cloned="cloned-' + index + '"]');

            if (!item) {
                item = this[index].cloneNode(true);
                item.setAttribute('cloned', 'cloned-' + index);
                item.index = index;
                this.parentElement.appendChild(item);
            }

            return item;
        }
    }, {
        key: '_activate',
        value: function _activate(index) {
            if (this.length === 0) {
                return;
            }

            var curItem = this.get(index);
            var prevItem = void 0;
            var nextItem = void 0;

            if (this.length > 1) {
                prevItem = this.get(index - 1);

                if (this.length === 2) {
                    nextItem = this._getCloned(index + 1);
                    fireEvent(this.parentRoot, 'clone', {
                        item: this.get(index + 1),
                        cloned: nextItem
                    });
                } else {
                    nextItem = this.get(index + 1);
                }

                curItem.style.left = -this.transformOffset + 'px';
                prevItem.style.left = -this.transformOffset - this.step + 'px';
                prevItem.style.display = '';
                nextItem.style.left = -this.transformOffset + this.step + 'px';
                nextItem.style.display = '';
            }

            this.index = curItem.index;
            curItem.style.display = '';

            fireEvent(this.parentRoot, 'change', {
                prevItem: prevItem,
                curItem: curItem,
                nextItem: nextItem
            });
        }
    }, {
        key: 'slide',
        value: function slide(index) {
            var _this = this;

            if (this.length === 0) {
                return;
            }

            if (this.length === 1) {
                index = 0;
            }

            var startOffset = getTransformOffset(this.parentElement).x;
            var endOffset = this.transformOffset + this.step * -index;
            var interOffset = endOffset - startOffset;

            if (interOffset === 0) {
                return;
            }

            var anim = new _animationJs2.default(400, cubicbezier.ease, function (i1, i2) {
                _this.parentElement.style[stylePrefix + 'Transform'] = getTranslate(startOffset + interOffset * i2, 0);
            });

            return anim.play().then(function () {
                _this.transformOffset = endOffset;
                _this.parentElement.style[stylePrefix + 'Transform'] = getTranslate(endOffset, 0);
                index && _this._activate(_this.index + index);
            });
        }
    }, {
        key: 'next',
        value: function next() {
            this.slide(1);
        }
    }, {
        key: 'prev',
        value: function prev() {
            this.slide(-1);
        }
    }]);

    return Items;
}();

var incId = 0;

var Slider = function () {
    function Slider() {
        _classCallCheck(this, Slider);

        this._initDom.apply(this, arguments);
        this._initGestrue.apply(this, arguments);

        this._isStarting = false;
        this._isPlaying = false;
        this._isSliding = false;
        this._isPanning = false;
        this._displacement;

        this.playInterval = this.options.playInterval || 1500;

        var autoplay = false;
        var readyToPlay = false;
        Object.defineProperty(this, 'autoplay', {
            get: function get() {
                return autoplay;
            },
            set: function set(v) {
                var _this2 = this;

                autoplay = !!v;
                if (readyToPlay) {
                    clearTimeout(readyToPlay);
                    readyToPlay = false;
                }
                if (autoplay) {
                    readyToPlay = setTimeout(function () {
                        _this2.play();
                    }, 2000);
                } else {
                    this.stop();
                }
            }
        });
        this.autoplay = !!this.options.autoplay;
    }

    _createClass(Slider, [{
        key: '_initDom',
        value: function _initDom() {
            this.id = Date.now() + '-' + ++incId;
            this.root = document.createDocumentFragment();

            if (arguments.length === 1 && !((arguments.length <= 0 ? undefined : arguments[0]) instanceof HTMLElement)) {
                this.element = null;
                this.options = (arguments.length <= 0 ? undefined : arguments[0]) || {};
            } else {
                this.element = arguments.length <= 0 ? undefined : arguments[0];
                this.options = (arguments.length <= 1 ? undefined : arguments[1]) || {};
            }

            if (!this.element) {
                this.element = document.createElement('ul');
                this.root.appendChild(this.element);
            }

            this.element.setAttribute('data-ctrl-name', 'slider');
            this.element.setAttribute('data-ctrl-id', this.id);
            this.element.style.position = 'relative';
            this.element.style[stylePrefix + 'Transform'] = getTranslate(0, 0);

            this.items = new Items({
                parentRoot: this.root,
                parentElement: this.element,
                step: this.options.step || this.element.getBoundingClientRect().width
            });

            var itemElements = this.element.querySelectorAll('li');
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = itemElements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var element = _step2.value;

                    this.items.add(element);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: '_initGestrue',
        value: function _initGestrue() {
            var _this3 = this;

            if (this.options.useGesture) {
                this.element.addEventListener('panstart', function (e) {
                    if (!e.isVertical && !(_this3._isPanning && _this3._isSliding)) {
                        e.preventDefault();
                        e.stopPropagation();

                        if (_this3.autoplay) {
                            _this3.stop();
                        }

                        _this3._displacement = 0;
                        _this3._isPanning = true;
                    }
                });

                this.element.addEventListener('panmove', function (e) {
                    if (!e.isVertical && _this3._isPanning) {
                        e.preventDefault();
                        e.stopPropagation();

                        _this3._displacement = e.displacementX;
                        _this3.element.style[stylePrefix + 'Transform'] = getTranslate(_this3.items.transformOffset + _this3._displacement, 0);
                    }
                });

                this.element.addEventListener('panend', function (e) {
                    if (!e.isVertical && _this3._isPanning) {
                        e.preventDefault();
                        e.stopPropagation();

                        _this3._isPanning = false;

                        if (e.isflick) {
                            if (_this3._displacement < 0) {
                                _this3.items.next();
                            } else {
                                _this3.items.prev();
                            }
                        } else {
                            if (Math.abs(_this3._displacement) < _this3.items.step / 2) {
                                _this3.items.slide(0);
                            } else {
                                _this3.items.slide(_this3._displacement < 0 ? 1 : -1);
                            }
                        }

                        if (_this3.autoplay) {
                            setTimeout(function () {
                                _this3.play();
                            }, 2000);
                        }
                    }
                }, false);

                this.element.addEventListener('flick', function (e) {
                    if (!e.isVertical) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });
            }
        }
    }, {
        key: 'play',
        value: function play() {
            var that = this;

            if (!this._isStarting) {
                this._isStarting = true;
                return this.items._activate(0);
            }

            if (this._isPlaying) {
                return;
            }

            function playing() {
                that._isSliding = true;
                that.items.next();
                setTimeout(function () {
                    that._isSliding = false;
                }, 500);
                that._isPlaying = setTimeout(playing, 400 + that.playInterval);
            }

            this._isPlaying = setTimeout(playing, 400 + this.playInterval);

            return this;
        }
    }, {
        key: 'stop',
        value: function stop() {
            var _this4 = this;

            if (!this._isPlaying) {
                return;
            }

            clearTimeout(this._isPlaying);

            setTimeout(function () {
                _this4._isPlaying = false;
            }, 500);

            return this;
        }
    }, {
        key: 'addEventListener',
        value: function addEventListener(name, handler) {
            this.root.addEventListener(name, handler, false);
            return this;
        }
    }, {
        key: 'removeEventListener',
        value: function removeEventListener(name, handler) {
            this.root.removeEventListener(name, handler, false);
            return this;
        }
    }]);

    return Slider;
}();

exports.default = Slider;