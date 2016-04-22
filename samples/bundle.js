this["slider"] =
/******/ (function(modules) { // webpackBootstrap
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

	__webpack_require__(1);
	module.exports = __webpack_require__(5);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./index.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./index.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "[data-ctrl-name=\"slider\"] {\n  position: relative;\n  -webkit-transform: translateZ(1px);\n  -ms-transform: translateZ(1px);\n  transform: translateZ(1px);\n}\n", ""]);
	
	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Items = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.getTransformOffset = getTransformOffset;
	exports.getTranslate = getTranslate;
	
	__webpack_require__(6);
	
	var _amfeCubicbezier = __webpack_require__(7);
	
	var cubicbezier = _interopRequireWildcard(_amfeCubicbezier);
	
	var _animationJs = __webpack_require__(8);
	
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
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	typeof window === 'undefined' && (window = { ctrl: {}, lib: {} });!window.ctrl && (window.ctrl = {});!window.lib && (window.lib = {});!function (a) {
	  "use strict";
	  function b(a, b) {
	    for (var c = a; c;) {
	      if (c.contains(b) || c == b) return c;c = c.parentNode;
	    }return null;
	  }function c(a, b, c) {
	    var d = i.createEvent("HTMLEvents");if (d.initEvent(b, !0, !0), "object" == (typeof c === "undefined" ? "undefined" : _typeof(c))) for (var e in c) {
	      d[e] = c[e];
	    }a.dispatchEvent(d);
	  }function d(a, b, c, d, e, f, g, h) {
	    var i = Math.atan2(h - f, g - e) - Math.atan2(d - b, c - a),
	        j = Math.sqrt((Math.pow(h - f, 2) + Math.pow(g - e, 2)) / (Math.pow(d - b, 2) + Math.pow(c - a, 2))),
	        k = [e - j * a * Math.cos(i) + j * b * Math.sin(i), f - j * b * Math.cos(i) - j * a * Math.sin(i)];return { rotate: i, scale: j, translate: k, matrix: [[j * Math.cos(i), -j * Math.sin(i), k[0]], [j * Math.sin(i), j * Math.cos(i), k[1]], [0, 0, 1]] };
	  }function e(a) {
	    0 === Object.keys(l).length && (j.addEventListener("touchmove", f, !1), j.addEventListener("touchend", g, !1), j.addEventListener("touchcancel", h, !1));for (var d = 0; d < a.changedTouches.length; d++) {
	      var e = a.changedTouches[d],
	          i = {};for (var m in e) {
	        i[m] = e[m];
	      }var n = { startTouch: i, startTime: Date.now(), status: "tapping", element: a.srcElement || a.target, pressingHandler: setTimeout(function (b, d) {
	          return function () {
	            "tapping" === n.status && (n.status = "pressing", c(b, "longpress", { touch: d, touches: a.touches, changedTouches: a.changedTouches, touchEvent: a })), clearTimeout(n.pressingHandler), n.pressingHandler = null;
	          };
	        }(a.srcElement || a.target, a.changedTouches[d]), 500) };l[e.identifier] = n;
	    }if (2 == Object.keys(l).length) {
	      var o = [];for (var m in l) {
	        o.push(l[m].element);
	      }c(b(o[0], o[1]), "dualtouchstart", { touches: k.call(a.touches), touchEvent: a });
	    }
	  }function f(a) {
	    for (var e = 0; e < a.changedTouches.length; e++) {
	      var f = a.changedTouches[e],
	          g = l[f.identifier];if (!g) return;g.lastTouch || (g.lastTouch = g.startTouch), g.lastTime || (g.lastTime = g.startTime), g.velocityX || (g.velocityX = 0), g.velocityY || (g.velocityY = 0), g.duration || (g.duration = 0);var h = Date.now() - g.lastTime,
	          i = (f.clientX - g.lastTouch.clientX) / h,
	          j = (f.clientY - g.lastTouch.clientY) / h,
	          k = 70;h > k && (h = k), g.duration + h > k && (g.duration = k - h), g.velocityX = (g.velocityX * g.duration + i * h) / (g.duration + h), g.velocityY = (g.velocityY * g.duration + j * h) / (g.duration + h), g.duration += h, g.lastTouch = {};for (var m in f) {
	        g.lastTouch[m] = f[m];
	      }g.lastTime = Date.now();var n = f.clientX - g.startTouch.clientX,
	          o = f.clientY - g.startTouch.clientY,
	          p = Math.sqrt(Math.pow(n, 2) + Math.pow(o, 2));("tapping" === g.status || "pressing" === g.status) && p > 10 && (g.status = "panning", g.isVertical = !(Math.abs(n) > Math.abs(o)), c(g.element, "panstart", { touch: f, touches: a.touches, changedTouches: a.changedTouches, touchEvent: a, isVertical: g.isVertical }), c(g.element, (g.isVertical ? "vertical" : "horizontal") + "panstart", { touch: f, touchEvent: a })), "panning" === g.status && (g.panTime = Date.now(), c(g.element, "panmove", { displacementX: n, displacementY: o, touch: f, touches: a.touches, changedTouches: a.changedTouches, touchEvent: a, isVertical: g.isVertical }), g.isVertical ? c(g.element, "verticalpanmove", { displacementY: o, touch: f, touchEvent: a }) : c(g.element, "horizontalpanmove", { displacementX: n, touch: f, touchEvent: a }));
	    }if (2 == Object.keys(l).length) {
	      for (var q, r = [], s = [], t = [], e = 0; e < a.touches.length; e++) {
	        var f = a.touches[e],
	            g = l[f.identifier];r.push([g.startTouch.clientX, g.startTouch.clientY]), s.push([f.clientX, f.clientY]);
	      }for (var m in l) {
	        t.push(l[m].element);
	      }q = d(r[0][0], r[0][1], r[1][0], r[1][1], s[0][0], s[0][1], s[1][0], s[1][1]), c(b(t[0], t[1]), "dualtouch", { transform: q, touches: a.touches, touchEvent: a });
	    }
	  }function g(a) {
	    if (2 == Object.keys(l).length) {
	      var d = [];for (var e in l) {
	        d.push(l[e].element);
	      }c(b(d[0], d[1]), "dualtouchend", { touches: k.call(a.touches), touchEvent: a });
	    }for (var i = 0; i < a.changedTouches.length; i++) {
	      var n = a.changedTouches[i],
	          o = n.identifier,
	          p = l[o];if (p) {
	        if (p.pressingHandler && (clearTimeout(p.pressingHandler), p.pressingHandler = null), "tapping" === p.status && (p.timestamp = Date.now(), c(p.element, "tap", { touch: n, touchEvent: a }), m && p.timestamp - m.timestamp < 300 && c(p.element, "doubletap", { touch: n, touchEvent: a }), m = p), "panning" === p.status) {
	          var q = Date.now(),
	              r = q - p.startTime,
	              s = ((n.clientX - p.startTouch.clientX) / r, (n.clientY - p.startTouch.clientY) / r, n.clientX - p.startTouch.clientX),
	              t = n.clientY - p.startTouch.clientY,
	              u = Math.sqrt(p.velocityY * p.velocityY + p.velocityX * p.velocityX),
	              v = u > .5 && q - p.lastTime < 100,
	              w = { duration: r, isflick: v, velocityX: p.velocityX, velocityY: p.velocityY, displacementX: s, displacementY: t, touch: n, touches: a.touches, changedTouches: a.changedTouches, touchEvent: a, isVertical: p.isVertical };c(p.element, "panend", w), v && (c(p.element, "swipe", w), p.isVertical ? c(p.element, "verticalswipe", w) : c(p.element, "horizontalswipe", w));
	        }"pressing" === p.status && c(p.element, "pressend", { touch: n, touchEvent: a }), delete l[o];
	      }
	    }0 === Object.keys(l).length && (j.removeEventListener("touchmove", f, !1), j.removeEventListener("touchend", g, !1), j.removeEventListener("touchcancel", h, !1));
	  }function h(a) {
	    if (2 == Object.keys(l).length) {
	      var d = [];for (var e in l) {
	        d.push(l[e].element);
	      }c(b(d[0], d[1]), "dualtouchend", { touches: k.call(a.touches), touchEvent: a });
	    }for (var i = 0; i < a.changedTouches.length; i++) {
	      var m = a.changedTouches[i],
	          n = m.identifier,
	          o = l[n];o && (o.pressingHandler && (clearTimeout(o.pressingHandler), o.pressingHandler = null), "panning" === o.status && c(o.element, "panend", { touch: m, touches: a.touches, changedTouches: a.changedTouches, touchEvent: a }), "pressing" === o.status && c(o.element, "pressend", { touch: m, touchEvent: a }), delete l[n]);
	    }0 === Object.keys(l).length && (j.removeEventListener("touchmove", f, !1), j.removeEventListener("touchend", g, !1), j.removeEventListener("touchcancel", h, !1));
	  }var i = a.document,
	      j = i.documentElement,
	      k = Array.prototype.slice,
	      l = {},
	      m = null;j.addEventListener("touchstart", e, !1);
	}(window);;module.exports = window.lib['gesturejs'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.generate = generate;
	function generate(p1x, p1y, p2x, p2y) {
	    var ZERO_LIMIT = 1e-6;
	    // Calculate the polynomial coefficients,
	    // implicit first and last control points are (0,0) and (1,1).
	    var ax = 3 * p1x - 3 * p2x + 1;
	    var bx = 3 * p2x - 6 * p1x;
	    var cx = 3 * p1x;
	
	    var ay = 3 * p1y - 3 * p2y + 1;
	    var by = 3 * p2y - 6 * p1y;
	    var cy = 3 * p1y;
	
	    function sampleCurveDerivativeX(t) {
	        // `ax t^3 + bx t^2 + cx t' expanded using Horner 's rule.
	        return (3 * ax * t + 2 * bx) * t + cx;
	    }
	
	    function sampleCurveX(t) {
	        return ((ax * t + bx) * t + cx) * t;
	    }
	
	    function sampleCurveY(t) {
	        return ((ay * t + by) * t + cy) * t;
	    }
	
	    // Given an x value, find a parametric value it came from.
	    function solveCurveX(x) {
	        var t2 = x;
	        var derivative;
	        var x2;
	
	        // https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation
	        // First try a few iterations of Newton's method -- normally very fast.
	        // http://en.wikipedia.org/wiki/Newton's_method
	        for (var i = 0; i < 8; i++) {
	            // f(t)-x=0
	            x2 = sampleCurveX(t2) - x;
	            if (Math.abs(x2) < ZERO_LIMIT) {
	                return t2;
	            }
	            derivative = sampleCurveDerivativeX(t2);
	            // == 0, failure
	            /* istanbul ignore if */
	            if (Math.abs(derivative) < ZERO_LIMIT) {
	                break;
	            }
	            t2 -= x2 / derivative;
	        }
	
	        // Fall back to the bisection method for reliability.
	        // bisection
	        // http://en.wikipedia.org/wiki/Bisection_method
	        var t1 = 1;
	        /* istanbul ignore next */
	        var t0 = 0;
	
	        /* istanbul ignore next */
	        t2 = x;
	        /* istanbul ignore next */
	        while (t1 > t0) {
	            x2 = sampleCurveX(t2) - x;
	            if (Math.abs(x2) < ZERO_LIMIT) {
	                return t2;
	            }
	            if (x2 > 0) {
	                t1 = t2;
	            } else {
	                t0 = t2;
	            }
	            t2 = (t1 + t0) / 2;
	        }
	
	        // Failure
	        return t2;
	    }
	
	    function solve(x) {
	        return sampleCurveY(solveCurveX(x));
	    }
	
	    return solve;
	}
	
	var linear = exports.linear = generate(0, 0, 1, 1);
	var ease = exports.ease = generate(.25, .1, .25, 1);
	var easeIn = exports.easeIn = generate(.42, 0, 1, 1);
	var easeOut = exports.easeOut = generate(0, 0, .58, 1);
	var easeInOut = exports.easeInOut = generate(.42, 0, .58, 1);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () {
	    function defineProperties(target, props) {
	        for (var i = 0; i < props.length; i++) {
	            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	        }
	    }return function (Constructor, protoProps, staticProps) {
	        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	    };
	}();
	
	var _amfeCubicbezier = __webpack_require__(7);
	
	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	        throw new TypeError("Cannot call a class as a function");
	    }
	}
	
	var FPS = 60;
	var INTERVAL = 1000 / FPS;
	
	function setTimeoutFrame(cb) {
	    return setTimeout(cb, INTERVAL);
	}
	
	function clearTimeoutFrame(tick) {
	    clearTimeout(tick);
	}
	
	var requestAnimationFrame = window.requestAnimationFrame || window.msRequestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || setTimeoutFrame;
	
	var cancelAnimationFrame = window.cancelAnimationFrame || window.msCancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || clearTimeoutFrame;
	
	if (requestAnimationFrame === setTimeoutFrame || cancelAnimationFrame === clearTimeoutFrame) {
	    requestAnimationFrame = setTimeoutFrame;
	    cancelAnimationFrame = clearTimeoutFrame;
	}
	
	function PromiseDefer() {
	    var deferred = {};
	    var promise = new Promise(function (resolve, reject) {
	        deferred.resolve = resolve;
	        deferred.reject = reject;
	    });
	    deferred.promise = promise;
	    return deferred;
	}
	
	function PromiseMixin(promise, context) {
	    var _promise = promise;
	    ['then', 'catch'].forEach(function (method) {
	        context[method] = function () {
	            return promise[method].apply(_promise, arguments);
	        };
	    });
	    return context;
	}
	
	function getFrameQueue(duration, frames) {
	    if (typeof frames === 'function') {
	        frames = {
	            '0': frames
	        };
	    }
	
	    var frameCount = duration / INTERVAL;
	    var framePercent = 1 / frameCount;
	    var frameQueue = [];
	    var frameKeys = Object.keys(frames).map(function (i) {
	        return parseInt(i);
	    });
	
	    for (var i = 0; i < frameCount; i++) {
	        var key = frameKeys[0];
	        var percent = framePercent * i;
	        if (key !== null && key <= percent * 100) {
	            var frame = frames[key.toString()];
	            if (!(frame instanceof Frame)) {
	                frame = new Frame(frame);
	            }
	            frameQueue.push(frame);
	            frameKeys.shift();
	        } else if (frameQueue.length) {
	            frameQueue.push(frameQueue[frameQueue.length - 1].clone());
	        }
	    }
	
	    return frameQueue;
	}
	
	function getBezier(timingFunction) {
	    var bezier;
	    if (typeof timingFunction === 'string' || timingFunction instanceof Array) {
	        if (_amfeCubicbezier.Bezier) {
	            //console.error('require amfe-cubicbezier');
	        } else {
	                if (typeof timingFunction === 'string') {
	                    if (_amfeCubicbezier.Bezier[timingFunction]) {
	                        bezier = _amfeCubicbezier.Bezier[timingFunction];
	                    }
	                } else if (timingFunction instanceof Array && timingFunction.length === 4) {
	                    bezier = _amfeCubicbezier.Bezier.apply(_amfeCubicbezier.Bezier, timingFunction);
	                }
	            }
	    } else if (typeof timingFunction === 'function') {
	        bezier = timingFunction;
	    }
	
	    return bezier;
	}
	
	/**
	 * 构造一个帧对象
	 * @class lib.animation~Frame
	 * @param {Function} fun 当前帧执行的函数
	 */
	function Frame(fun) {
	    var defer;
	    var tick;
	    var isCancel = false;
	
	    /**
	     * 执行帧
	     * @method request
	     * @instance
	     * @memberOf lib.animation~Frame
	     * @return {lib.animation~Frame} 当前实例
	     */
	    this.request = function () {
	        isCancel = false;
	        var args = arguments;
	
	        defer = PromiseDefer();
	        PromiseMixin(defer.promise, this);
	
	        tick = requestAnimationFrame(function () {
	            if (isCancel) {
	                return;
	            }
	            defer && defer.resolve(fun.apply(window, args));
	        });
	
	        return this;
	    };
	
	    /**
	     * 取消执行
	     * @method cancel
	     * @instance
	     * @memberOf lib.animation~Frame
	     * @return {lib.animation~Frame} 当前实例
	     */
	    this.cancel = function () {
	        if (tick) {
	            isCancel = true;
	            cancelAnimationFrame(tick);
	            defer && defer.reject('CANCEL');
	        }
	
	        return this;
	    };
	
	    /**
	     * 复制一个帧实例
	     * @method clone
	     * @instance
	     * @memberOf lib.animation~Frame
	     * @return {lib.animation~Frame} 新实例
	     */
	    this.clone = function () {
	        return new Frame(fun);
	    };
	}
	
	var animation = function () {
	
	    /**
	     * 初始化一个动画实例
	     * @method animation
	     * @memberOf lib
	     * @param {Number} duration       动画时间，单位毫秒
	     * @param {String|Array|Function} timingFunction 时间函数，支持标准的时间函数名、贝塞尔曲线数组（需要lib.cubicbezier库支持）以及自定义函数
	     * @param {Function} frames       每一帧执行的函数
	     * @property {Function} frame 初始化一个帧实例
	     * @property {Function} requestFrame 立即请求帧
	     * @return {lib.animation~Animation}            Animation实例
	     */
	
	    function animation(duration, timingFunction, frames) {
	        _classCallCheck(this, animation);
	
	        var defer;
	        var frameQueue = getFrameQueue(duration, frames);
	        var framePercent = 1 / (duration / INTERVAL);
	        var frameIndex = 0;
	        var bezier = getBezier(timingFunction);
	
	        if (!bezier) {
	            throw new Error('unexcept timing function');
	        }
	
	        var isPlaying = false;
	        /**
	         * 播放动画
	         * @method play
	         * @return {lib.animation~Animation} this 当前实例
	         * @instance
	         * @memberOf lib.animation~Animation
	         */
	        this.play = function () {
	            if (isPlaying) {
	                return;
	            }
	            isPlaying = true;
	
	            if (!defer) {
	                defer = PromiseDefer();
	                PromiseMixin(defer.promise, this);
	            }
	
	            function request() {
	                var percent = framePercent * (frameIndex + 1).toFixed(10);
	                var currentFrame = frameQueue[frameIndex];
	
	                currentFrame.request(percent.toFixed(10), timingFunction(percent).toFixed(10)).then(function () {
	                    if (!isPlaying) {
	                        return;
	                    }
	
	                    if (frameIndex === frameQueue.length - 1) {
	                        isPlaying = false;
	                        defer && defer.resolve('FINISH');
	                        defer = null;
	                    } else {
	                        frameIndex++;
	                        request();
	                    }
	                }, function () {
	                    // CANCEL
	                });
	            }
	
	            request();
	            return this;
	        };
	
	        /**
	         * 暂停动画
	         * @method stop
	         * @return {lib.animation~Animation} this 当前实例
	         * @instance
	         * @memberOf lib.animation~Animation
	         */
	        this.stop = function () {
	            if (!isPlaying) {
	                return;
	            }
	            isPlaying = false;
	
	            if (frameQueue[frameIndex]) {
	                frameQueue[frameIndex].cancel();
	            }
	            return this;
	        };
	    }
	    /**
	     * 构造一个帧对象
	     * @class lib.animation~Frame
	     * @param {Function} fun 当前帧执行的函数
	     */
	
	    _createClass(animation, [{
	        key: 'frame',
	        value: function frame(fun) {
	            return new Frame(fun);
	        }
	    }, {
	        key: 'requestFrame',
	        value: function requestFrame(fun) {
	            var frame = new Frame(fun);
	            return frame.request();
	        }
	    }]);
	
	    return animation;
	}();
	
	exports.default = animation;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTlmM2I3YzU5ZjMwYmIyZDk1OTQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4Lmxlc3M/OTFlYyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgubGVzcyIsIndlYnBhY2s6Ly8vLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9nZXN0dXJlanMvYnVpbGQvZ2VzdHVyZWpzLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2FtZmUtY3ViaWNiZXppZXIvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vYW5pbWF0aW9uLWpzL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRjtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLGlDQUFnQyxVQUFVLEVBQUU7QUFDNUMsRTs7Ozs7O0FDcEJBO0FBQ0E7OztBQUdBO0FBQ0Esd0RBQXVELHVCQUF1Qix1Q0FBdUMsbUNBQW1DLCtCQUErQixHQUFHOztBQUUxTDs7Ozs7Ozs7Ozs7Ozs7QUNGQSxRQUFPLE9BQVAsR0FBaUIsWUFBVztBQUMzQixNQUFJLE9BQU8sRUFBUDs7O0FBRHVCLE1BSTNCLENBQUssUUFBTCxHQUFnQixTQUFT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R0FBa0IsU0FBbEIsQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDE5ZjNiN2M1OWYzMGJiMmQ5NTk0XG4gKiovIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvaW5kZXguanMhLi9pbmRleC5sZXNzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLy4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlci9pbmRleC5qcyEuL2luZGV4Lmxlc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvaW5kZXguanMhLi9pbmRleC5sZXNzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2luZGV4Lmxlc3NcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIltkYXRhLWN0cmwtbmFtZT1cXFwic2xpZGVyXFxcIl0ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMXB4KTtcXG4gIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMXB4KTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWigxcHgpO1xcbn1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vfi9sZXNzLWxvYWRlciEuL3NyYy9pbmRleC5sZXNzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cclxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHJcblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XHJcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcclxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xyXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbnZhciBzdHlsZXNJbkRvbSA9IHt9LFxyXG5cdG1lbW9pemUgPSBmdW5jdGlvbihmbikge1xyXG5cdFx0dmFyIG1lbW87XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRyZXR1cm4gbWVtbztcclxuXHRcdH07XHJcblx0fSxcclxuXHRpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAvbXNpZSBbNi05XVxcYi8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcclxuXHR9KSxcclxuXHRnZXRIZWFkRWxlbWVudCA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG5cdH0pLFxyXG5cdHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsLFxyXG5cdHNpbmdsZXRvbkNvdW50ZXIgPSAwLFxyXG5cdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wID0gW107XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcclxuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcclxuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xyXG5cdH1cclxuXHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XHJcblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xyXG5cclxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgPGhlYWQ+LlxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XHJcblxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XHJcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xyXG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XHJcblx0XHR9XHJcblx0XHRpZihuZXdMaXN0KSB7XHJcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XHJcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcclxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xyXG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKCk7XHJcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucykge1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRpZihkb21TdHlsZSkge1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcclxuXHR2YXIgc3R5bGVzID0gW107XHJcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xyXG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XHJcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xyXG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XHJcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KSB7XHJcblx0dmFyIGhlYWQgPSBnZXRIZWFkRWxlbWVudCgpO1xyXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wW3N0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xyXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XHJcblx0XHRpZighbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcclxuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBoZWFkLmZpcnN0Q2hpbGQpO1xyXG5cdFx0fSBlbHNlIGlmKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AucHVzaChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0Jy4gTXVzdCBiZSAndG9wJyBvciAnYm90dG9tJy5cIik7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XHJcblx0c3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR2YXIgaWR4ID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZUVsZW1lbnQpO1xyXG5cdGlmKGlkeCA+PSAwKSB7XHJcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHRzdHlsZUVsZW1lbnQudHlwZSA9IFwidGV4dC9jc3NcIjtcclxuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KTtcclxuXHRyZXR1cm4gc3R5bGVFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XHJcblx0bGlua0VsZW1lbnQucmVsID0gXCJzdHlsZXNoZWV0XCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmtFbGVtZW50KTtcclxuXHRyZXR1cm4gbGlua0VsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQsIHVwZGF0ZSwgcmVtb3ZlO1xyXG5cclxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcclxuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSk7XHJcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKTtcclxuXHR9IGVsc2UgaWYob2JqLnNvdXJjZU1hcCAmJlxyXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0XHRpZihzdHlsZUVsZW1lbnQuaHJlZilcclxuXHRcdFx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlRWxlbWVudC5ocmVmKTtcclxuXHRcdH07XHJcblx0fSBlbHNlIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShvYmopO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XHJcblx0XHRpZihuZXdPYmopIHtcclxuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZW1vdmUoKTtcclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xyXG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcclxuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcclxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xyXG5cdH07XHJcbn0pKCk7XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xyXG5cclxuXHRpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xyXG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2RlcztcclxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChjc3NOb2RlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblxyXG5cdGlmKG1lZGlhKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXHJcblx0fVxyXG5cclxuXHRpZihzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUxpbmsobGlua0VsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHRpZihzb3VyY2VNYXApIHtcclxuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XHJcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XHJcblx0fVxyXG5cclxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcclxuXHJcblx0dmFyIG9sZFNyYyA9IGxpbmtFbGVtZW50LmhyZWY7XHJcblxyXG5cdGxpbmtFbGVtZW50LmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG5cclxuXHRpZihvbGRTcmMpXHJcblx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCAnZ2VzdHVyZWpzJztcbmltcG9ydCAqIGFzIGN1YmljYmV6aWVyIGZyb20gJ2FtZmUtY3ViaWNiZXppZXInO1xuaW1wb3J0IEFuaW1hdGlvbiBmcm9tICdhbmltYXRpb24tanMnO1xuXG5pZiAodHlwZW9mIGdsb2JhbC53aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjYW4gbm90IGJlIHJ1bm5pbmcgaW4gbm9uLWJyb3dzZXInKTtcbn1cblxuY29uc3Qgd2luID0gZ2xvYmFsLndpbmRvdztcbmNvbnN0IGRvYyA9IHdpbi5kb2N1bWVudDtcbmNvbnN0IHVhID0gd2luLm5hdmlnYXRvci51c2VyQWdlbnQ7XG5jb25zdCBGaXJlZm94ID0gISF1YS5tYXRjaCgvRmlyZWZveC9pKTtcbmNvbnN0IElFTW9iaWxlID0gISF1YS5tYXRjaCgvSUVNb2JpbGUvaSk7XG5jb25zdCBzdHlsZVByZWZpeCA9IEZpcmVmb3ggPyAnTW96JyA6XG4gICAgSUVNb2JpbGUgPyAnbXMnIDogJ3dlYmtpdCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2Zvcm1PZmZzZXQoZWxlbWVudCkge1xuICAgIHZhciBvZmZzZXQgPSB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDBcbiAgICB9O1xuICAgIHZhciB0cmFuc2Zvcm0gPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpW2Ake3N0eWxlUHJlZml4fVRyYW5zZm9ybWBdO1xuICAgIHZhciBtYXRjaGVkO1xuXG4gICAgaWYgKHRyYW5zZm9ybSAhPT0gJ25vbmUnKSB7XG4gICAgICAgIGlmICgobWF0Y2hlZCA9IHRyYW5zZm9ybS5tYXRjaCgvXm1hdHJpeDNkXFwoKD86Wy1cXGQuXSssXFxzKil7MTJ9KFstXFxkLl0rKSxcXHMqKFstXFxkLl0rKSg/OixcXHMqWy1cXGQuXSspezJ9XFwpLykgfHxcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm0ubWF0Y2goL15tYXRyaXhcXCgoPzpbLVxcZC5dKyxcXHMqKXs0fShbLVxcZC5dKyksXFxzKihbLVxcZC5dKylcXCkkLykpKSB7XG4gICAgICAgICAgICBvZmZzZXQueCA9IHBhcnNlRmxvYXQobWF0Y2hlZFsxXSkgfHwgMDtcbiAgICAgICAgICAgIG9mZnNldC55ID0gcGFyc2VGbG9hdChtYXRjaGVkWzJdKSB8fCAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9mZnNldDtcbn1cblxudmFyIENTU01hdHJpeCA9IElFTW9iaWxlID8gJ01TQ1NTTWF0cml4JyA6ICdXZWJLaXRDU1NNYXRyaXgnO1xudmFyIGhhczNkID0gISFGaXJlZm94IHx8IENTU01hdHJpeCBpbiB3aW4gJiYgJ20xMScgaW4gbmV3IHdpbltDU1NNYXRyaXhdKCk7XG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJhbnNsYXRlKHgsIHkpIHtcbiAgICB4ID0gcGFyc2VGbG9hdCh4KTtcbiAgICB5ID0gcGFyc2VGbG9hdCh5KTtcblxuICAgIGlmICh4ICE9PSAwKSB7XG4gICAgICAgIHggKz0gJ3B4JztcbiAgICB9XG5cbiAgICBpZiAoeSAhPT0gMCkge1xuICAgICAgICB5ICs9ICdweCc7XG4gICAgfVxuXG4gICAgaWYgKGhhczNkKSB7XG4gICAgICAgIHJldHVybiBgdHJhbnNsYXRlM2QoJHt4fSwgJHt5fSwgMClgO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBgdHJhbnNsYXRlKCR7eH0sICR7eX0pYDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGZpcmVFdmVudChlbCwgbmFtZSwgZXh0cmEpIHtcbiAgICBjb25zdCBldiA9IGRvYy5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuICAgIGV2LmluaXRFdmVudChuYW1lLCBmYWxzZSwgZmFsc2UpO1xuICAgIGlmIChleHRyYSkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBleHRyYSkge1xuICAgICAgICAgICAgZXZba2V5XSA9IGV4dHJhW2tleV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWwuZGlzcGF0Y2hFdmVudChldik7XG59XG5cbmV4cG9ydCBjbGFzcyBJdGVtcyB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB0aGlzLnBhcmVudFJvb3QgPSBvcHRpb25zLnBhcmVudFJvb3Q7XG4gICAgICAgIHRoaXMucGFyZW50RWxlbWVudCA9IG9wdGlvbnMucGFyZW50RWxlbWVudDtcbiAgICAgICAgdGhpcy5zdGVwID0gb3B0aW9ucy5zdGVwO1xuICAgICAgICB0aGlzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuaW5kZXggPSAwO1xuICAgICAgICB0aGlzLnRyYW5zZm9ybU9mZnNldCA9IDA7XG4gICAgfVxuXG4gICAgYWRkKGh0bWxFbGVtZW50KSB7XG4gICAgICAgIGxldCBpdGVtRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGlmICh0eXBlb2YgaHRtbEVsZW1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpdGVtRWxlbWVudC5pbm5lckhUTUwgPSBodG1sRWxlbWVudDtcbiAgICAgICAgfSBlbHNlIGlmIChodG1sRWxlbWVudC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVsIG9mIGh0bWxFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgaXRlbUVsZW1lbnQuYXBwZW5kQ2hpbGQoZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGh0bWxFbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiZcbiAgICAgICAgICAgIGh0bWxFbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2xpJykge1xuICAgICAgICAgICAgaXRlbUVsZW1lbnQgPSBodG1sRWxlbWVudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW1FbGVtZW50LmFwcGVuZENoaWxkKGh0bWxFbGVtZW50KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaXRlbUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgaXRlbUVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICBpdGVtRWxlbWVudC5pbmRleCA9IHRoaXMubGVuZ3RoO1xuXG4gICAgICAgIGlmIChpdGVtRWxlbWVudC5wYXJlbnROb2RlICE9PSB0aGlzLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChpdGVtRWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgU3RyaW5nKHRoaXMubGVuZ3RoKSwge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtRWxlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5sZW5ndGgrKztcblxuICAgICAgICByZXR1cm4gaXRlbUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgX25vcm1hbGl6ZUluZGV4KGluZGV4KSB7XG4gICAgICAgIHdoaWxlIChpbmRleCA8IDApIHtcbiAgICAgICAgICAgIGluZGV4ICs9IHRoaXMubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKGluZGV4ID49IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpbmRleCAtPSB0aGlzLmxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG5cbiAgICBnZXQoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbU3RyaW5nKHRoaXMuX25vcm1hbGl6ZUluZGV4KGluZGV4KSldO1xuICAgIH1cblxuICAgIF9nZXRDbG9uZWQoaW5kZXgpIHtcbiAgICAgICAgaW5kZXggPSBTdHJpbmcodGhpcy5fbm9ybWFsaXplSW5kZXgoaW5kZXgpKTtcbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcihgW2Nsb25lZD1cImNsb25lZC0ke2luZGV4fVwiXWApO1xuXG4gICAgICAgIGlmICghaXRlbSkge1xuICAgICAgICAgICAgaXRlbSA9IHRoaXNbaW5kZXhdLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdjbG9uZWQnLCBgY2xvbmVkLSR7aW5kZXh9YCk7XG4gICAgICAgICAgICBpdGVtLmluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICBfYWN0aXZhdGUoaW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjdXJJdGVtID0gdGhpcy5nZXQoaW5kZXgpO1xuICAgICAgICBsZXQgcHJldkl0ZW07XG4gICAgICAgIGxldCBuZXh0SXRlbTtcblxuICAgICAgICBpZiAodGhpcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBwcmV2SXRlbSA9IHRoaXMuZ2V0KGluZGV4IC0gMSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIG5leHRJdGVtID0gdGhpcy5fZ2V0Q2xvbmVkKGluZGV4ICsgMSk7XG4gICAgICAgICAgICAgICAgZmlyZUV2ZW50KHRoaXMucGFyZW50Um9vdCwgJ2Nsb25lJywge1xuICAgICAgICAgICAgICAgICAgICBpdGVtOiB0aGlzLmdldChpbmRleCArIDEpLFxuICAgICAgICAgICAgICAgICAgICBjbG9uZWQ6IG5leHRJdGVtXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5leHRJdGVtID0gdGhpcy5nZXQoaW5kZXggKyAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY3VySXRlbS5zdHlsZS5sZWZ0ID0gYCR7LXRoaXMudHJhbnNmb3JtT2Zmc2V0fXB4YDtcbiAgICAgICAgICAgIHByZXZJdGVtLnN0eWxlLmxlZnQgPSBgJHstdGhpcy50cmFuc2Zvcm1PZmZzZXQgLSB0aGlzLnN0ZXB9cHhgO1xuICAgICAgICAgICAgcHJldkl0ZW0uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgICAgbmV4dEl0ZW0uc3R5bGUubGVmdCA9IGAkey10aGlzLnRyYW5zZm9ybU9mZnNldCArIHRoaXMuc3RlcH1weGA7XG4gICAgICAgICAgICBuZXh0SXRlbS5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluZGV4ID0gY3VySXRlbS5pbmRleDtcbiAgICAgICAgY3VySXRlbS5zdHlsZS5kaXNwbGF5ID0gJyc7XG5cbiAgICAgICAgZmlyZUV2ZW50KHRoaXMucGFyZW50Um9vdCwgJ2NoYW5nZScsIHtcbiAgICAgICAgICAgIHByZXZJdGVtLFxuICAgICAgICAgICAgY3VySXRlbSxcbiAgICAgICAgICAgIG5leHRJdGVtXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNsaWRlKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzdGFydE9mZnNldCA9IGdldFRyYW5zZm9ybU9mZnNldCh0aGlzLnBhcmVudEVsZW1lbnQpLng7XG4gICAgICAgIGNvbnN0IGVuZE9mZnNldCA9IHRoaXMudHJhbnNmb3JtT2Zmc2V0ICsgdGhpcy5zdGVwICogKC1pbmRleCk7XG4gICAgICAgIGNvbnN0IGludGVyT2Zmc2V0ID0gZW5kT2Zmc2V0IC0gc3RhcnRPZmZzZXQ7XG5cbiAgICAgICAgaWYgKGludGVyT2Zmc2V0ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhbmltID0gbmV3IEFuaW1hdGlvbig0MDAsIGN1YmljYmV6aWVyLmVhc2UsIChpMSwgaTIpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5zdHlsZVtgJHtzdHlsZVByZWZpeH1UcmFuc2Zvcm1gXSA9IGdldFRyYW5zbGF0ZShzdGFydE9mZnNldCArIGludGVyT2Zmc2V0ICogaTIsIDApO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gYW5pbS5wbGF5KCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybU9mZnNldCA9IGVuZE9mZnNldDtcbiAgICAgICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5zdHlsZVtgJHtzdHlsZVByZWZpeH1UcmFuc2Zvcm1gXSA9IGdldFRyYW5zbGF0ZShlbmRPZmZzZXQsIDApO1xuICAgICAgICAgICAgaW5kZXggJiYgdGhpcy5fYWN0aXZhdGUodGhpcy5pbmRleCArIGluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmV4dCgpIHtcbiAgICAgICAgdGhpcy5zbGlkZSgxKTtcbiAgICB9XG5cbiAgICBwcmV2KCkge1xuICAgICAgICB0aGlzLnNsaWRlKC0xKTtcbiAgICB9XG5cbn1cblxudmFyIGluY0lkID0gMDtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlciB7XG4gICAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgICAgICB0aGlzLl9pbml0RG9tKC4uLmFyZ3MpO1xuICAgICAgICB0aGlzLl9pbml0R2VzdHJ1ZSguLi5hcmdzKTtcblxuICAgICAgICB0aGlzLl9pc1N0YXJ0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzUGxheWluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc1NsaWRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faXNQYW5uaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2Rpc3BsYWNlbWVudDtcblxuICAgICAgICB0aGlzLnBsYXlJbnRlcnZhbCA9IHRoaXMub3B0aW9ucy5wbGF5SW50ZXJ2YWwgfHwgMTUwMDtcblxuICAgICAgICB2YXIgYXV0b3BsYXkgPSBmYWxzZTtcbiAgICAgICAgdmFyIHJlYWR5VG9QbGF5ID0gZmFsc2U7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnYXV0b3BsYXknLCB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF1dG9wbGF5O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCh2KSB7XG4gICAgICAgICAgICAgICAgYXV0b3BsYXkgPSAhIXY7XG4gICAgICAgICAgICAgICAgaWYgKHJlYWR5VG9QbGF5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChyZWFkeVRvUGxheSk7XG4gICAgICAgICAgICAgICAgICAgIHJlYWR5VG9QbGF5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChhdXRvcGxheSkge1xuICAgICAgICAgICAgICAgICAgICByZWFkeVRvUGxheSA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYXV0b3BsYXkgPSAhIXRoaXMub3B0aW9ucy5hdXRvcGxheTtcbiAgICB9XG5cbiAgICBfaW5pdERvbSguLi5hcmdzKSB7XG4gICAgICAgIHRoaXMuaWQgPSBgJHtEYXRlLm5vdygpfS0keysraW5jSWR9YDtcbiAgICAgICAgdGhpcy5yb290ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMSAmJiAhKGFyZ3NbMF0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBhcmdzWzBdIHx8IHt9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gYXJnc1swXTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IGFyZ3NbMV0gfHwge307XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuZWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICAgICAgICAgIHRoaXMucm9vdC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1jdHJsLW5hbWUnLCAnc2xpZGVyJyk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtY3RybC1pZCcsIHRoaXMuaWQpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGVbYCR7c3R5bGVQcmVmaXh9VHJhbnNmb3JtYF0gPSBnZXRUcmFuc2xhdGUoMCwgMCk7XG5cbiAgICAgICAgdGhpcy5pdGVtcyA9IG5ldyBJdGVtcyh7XG4gICAgICAgICAgICBwYXJlbnRSb290OiB0aGlzLnJvb3QsXG4gICAgICAgICAgICBwYXJlbnRFbGVtZW50OiB0aGlzLmVsZW1lbnQsXG4gICAgICAgICAgICBzdGVwOiB0aGlzLm9wdGlvbnMuc3RlcCB8fCB0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgaXRlbUVsZW1lbnRzID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG4gICAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBpdGVtRWxlbWVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMuYWRkKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2luaXRHZXN0cnVlKCkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnVzZUdlc3R1cmUpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdwYW5zdGFydCcsIGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghZS5pc1ZlcnRpY2FsICYmXG4gICAgICAgICAgICAgICAgICAgICEodGhpcy5faXNQYW5uaW5nICYmIHRoaXMuX2lzU2xpZGluZykpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmF1dG9wbGF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rpc3BsYWNlbWVudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzUGFubmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdwYW5tb3ZlJywgZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFlLmlzVmVydGljYWwgJiYgdGhpcy5faXNQYW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kaXNwbGFjZW1lbnQgPSBlLmRpc3BsYWNlbWVudFg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZVtgJHtzdHlsZVByZWZpeH1UcmFuc2Zvcm1gXSA9XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRUcmFuc2xhdGUodGhpcy5pdGVtcy50cmFuc2Zvcm1PZmZzZXQgKyB0aGlzLl9kaXNwbGFjZW1lbnQsIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncGFuZW5kJywgZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFlLmlzVmVydGljYWwgJiYgdGhpcy5faXNQYW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc1Bhbm5pbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5pc2ZsaWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGlzcGxhY2VtZW50IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnByZXYoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLl9kaXNwbGFjZW1lbnQpIDwgdGhpcy5pdGVtcy5zdGVwIC8gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMuc2xpZGUoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMuc2xpZGUodGhpcy5fZGlzcGxhY2VtZW50IDwgMCA/IDEgOiAtMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hdXRvcGxheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZsaWNrJywgZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFlLmlzVmVydGljYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGxheSgpIHtcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9pc1N0YXJ0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9pc1N0YXJ0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLml0ZW1zLl9hY3RpdmF0ZSgwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9pc1BsYXlpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHBsYXlpbmcoKSB7XG4gICAgICAgICAgICB0aGF0Ll9pc1NsaWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhhdC5pdGVtcy5uZXh0KCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGF0Ll9pc1NsaWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgICB0aGF0Ll9pc1BsYXlpbmcgPSBzZXRUaW1lb3V0KHBsYXlpbmcsIDQwMCArIHRoYXQucGxheUludGVydmFsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2lzUGxheWluZyA9IHNldFRpbWVvdXQocGxheWluZywgNDAwICsgdGhpcy5wbGF5SW50ZXJ2YWwpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHN0b3AoKSB7XG4gICAgICAgIGlmICghdGhpcy5faXNQbGF5aW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5faXNQbGF5aW5nKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2lzUGxheWluZyA9IGZhbHNlO1xuICAgICAgICB9LCA1MDApO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGFkZEV2ZW50TGlzdGVuZXIobmFtZSwgaGFuZGxlcikge1xuICAgICAgICB0aGlzLnJvb3QuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgaGFuZGxlcikge1xuICAgICAgICB0aGlzLnJvb3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyIsIih0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgJiYgKHdpbmRvdyA9IHtjdHJsOiB7fSwgbGliOiB7fX0pOyF3aW5kb3cuY3RybCAmJiAod2luZG93LmN0cmwgPSB7fSk7IXdpbmRvdy5saWIgJiYgKHdpbmRvdy5saWIgPSB7fSk7IWZ1bmN0aW9uKGEpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGIoYSxiKXtmb3IodmFyIGM9YTtjOyl7aWYoYy5jb250YWlucyhiKXx8Yz09YilyZXR1cm4gYztjPWMucGFyZW50Tm9kZX1yZXR1cm4gbnVsbH1mdW5jdGlvbiBjKGEsYixjKXt2YXIgZD1pLmNyZWF0ZUV2ZW50KFwiSFRNTEV2ZW50c1wiKTtpZihkLmluaXRFdmVudChiLCEwLCEwKSxcIm9iamVjdFwiPT10eXBlb2YgYylmb3IodmFyIGUgaW4gYylkW2VdPWNbZV07YS5kaXNwYXRjaEV2ZW50KGQpfWZ1bmN0aW9uIGQoYSxiLGMsZCxlLGYsZyxoKXt2YXIgaT1NYXRoLmF0YW4yKGgtZixnLWUpLU1hdGguYXRhbjIoZC1iLGMtYSksaj1NYXRoLnNxcnQoKE1hdGgucG93KGgtZiwyKStNYXRoLnBvdyhnLWUsMikpLyhNYXRoLnBvdyhkLWIsMikrTWF0aC5wb3coYy1hLDIpKSksaz1bZS1qKmEqTWF0aC5jb3MoaSkraipiKk1hdGguc2luKGkpLGYtaipiKk1hdGguY29zKGkpLWoqYSpNYXRoLnNpbihpKV07cmV0dXJue3JvdGF0ZTppLHNjYWxlOmosdHJhbnNsYXRlOmssbWF0cml4OltbaipNYXRoLmNvcyhpKSwtaipNYXRoLnNpbihpKSxrWzBdXSxbaipNYXRoLnNpbihpKSxqKk1hdGguY29zKGkpLGtbMV1dLFswLDAsMV1dfX1mdW5jdGlvbiBlKGEpezA9PT1PYmplY3Qua2V5cyhsKS5sZW5ndGgmJihqLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIixmLCExKSxqLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLGcsITEpLGouYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoY2FuY2VsXCIsaCwhMSkpO2Zvcih2YXIgZD0wO2Q8YS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7ZCsrKXt2YXIgZT1hLmNoYW5nZWRUb3VjaGVzW2RdLGk9e307Zm9yKHZhciBtIGluIGUpaVttXT1lW21dO3ZhciBuPXtzdGFydFRvdWNoOmksc3RhcnRUaW1lOkRhdGUubm93KCksc3RhdHVzOlwidGFwcGluZ1wiLGVsZW1lbnQ6YS5zcmNFbGVtZW50fHxhLnRhcmdldCxwcmVzc2luZ0hhbmRsZXI6c2V0VGltZW91dChmdW5jdGlvbihiLGQpe3JldHVybiBmdW5jdGlvbigpe1widGFwcGluZ1wiPT09bi5zdGF0dXMmJihuLnN0YXR1cz1cInByZXNzaW5nXCIsYyhiLFwibG9uZ3ByZXNzXCIse3RvdWNoOmQsdG91Y2hlczphLnRvdWNoZXMsY2hhbmdlZFRvdWNoZXM6YS5jaGFuZ2VkVG91Y2hlcyx0b3VjaEV2ZW50OmF9KSksY2xlYXJUaW1lb3V0KG4ucHJlc3NpbmdIYW5kbGVyKSxuLnByZXNzaW5nSGFuZGxlcj1udWxsfX0oYS5zcmNFbGVtZW50fHxhLnRhcmdldCxhLmNoYW5nZWRUb3VjaGVzW2RdKSw1MDApfTtsW2UuaWRlbnRpZmllcl09bn1pZigyPT1PYmplY3Qua2V5cyhsKS5sZW5ndGgpe3ZhciBvPVtdO2Zvcih2YXIgbSBpbiBsKW8ucHVzaChsW21dLmVsZW1lbnQpO2MoYihvWzBdLG9bMV0pLFwiZHVhbHRvdWNoc3RhcnRcIix7dG91Y2hlczprLmNhbGwoYS50b3VjaGVzKSx0b3VjaEV2ZW50OmF9KX19ZnVuY3Rpb24gZihhKXtmb3IodmFyIGU9MDtlPGEuY2hhbmdlZFRvdWNoZXMubGVuZ3RoO2UrKyl7dmFyIGY9YS5jaGFuZ2VkVG91Y2hlc1tlXSxnPWxbZi5pZGVudGlmaWVyXTtpZighZylyZXR1cm47Zy5sYXN0VG91Y2h8fChnLmxhc3RUb3VjaD1nLnN0YXJ0VG91Y2gpLGcubGFzdFRpbWV8fChnLmxhc3RUaW1lPWcuc3RhcnRUaW1lKSxnLnZlbG9jaXR5WHx8KGcudmVsb2NpdHlYPTApLGcudmVsb2NpdHlZfHwoZy52ZWxvY2l0eVk9MCksZy5kdXJhdGlvbnx8KGcuZHVyYXRpb249MCk7dmFyIGg9RGF0ZS5ub3coKS1nLmxhc3RUaW1lLGk9KGYuY2xpZW50WC1nLmxhc3RUb3VjaC5jbGllbnRYKS9oLGo9KGYuY2xpZW50WS1nLmxhc3RUb3VjaC5jbGllbnRZKS9oLGs9NzA7aD5rJiYoaD1rKSxnLmR1cmF0aW9uK2g+ayYmKGcuZHVyYXRpb249ay1oKSxnLnZlbG9jaXR5WD0oZy52ZWxvY2l0eVgqZy5kdXJhdGlvbitpKmgpLyhnLmR1cmF0aW9uK2gpLGcudmVsb2NpdHlZPShnLnZlbG9jaXR5WSpnLmR1cmF0aW9uK2oqaCkvKGcuZHVyYXRpb24raCksZy5kdXJhdGlvbis9aCxnLmxhc3RUb3VjaD17fTtmb3IodmFyIG0gaW4gZilnLmxhc3RUb3VjaFttXT1mW21dO2cubGFzdFRpbWU9RGF0ZS5ub3coKTt2YXIgbj1mLmNsaWVudFgtZy5zdGFydFRvdWNoLmNsaWVudFgsbz1mLmNsaWVudFktZy5zdGFydFRvdWNoLmNsaWVudFkscD1NYXRoLnNxcnQoTWF0aC5wb3cobiwyKStNYXRoLnBvdyhvLDIpKTsoXCJ0YXBwaW5nXCI9PT1nLnN0YXR1c3x8XCJwcmVzc2luZ1wiPT09Zy5zdGF0dXMpJiZwPjEwJiYoZy5zdGF0dXM9XCJwYW5uaW5nXCIsZy5pc1ZlcnRpY2FsPSEoTWF0aC5hYnMobik+TWF0aC5hYnMobykpLGMoZy5lbGVtZW50LFwicGFuc3RhcnRcIix7dG91Y2g6Zix0b3VjaGVzOmEudG91Y2hlcyxjaGFuZ2VkVG91Y2hlczphLmNoYW5nZWRUb3VjaGVzLHRvdWNoRXZlbnQ6YSxpc1ZlcnRpY2FsOmcuaXNWZXJ0aWNhbH0pLGMoZy5lbGVtZW50LChnLmlzVmVydGljYWw/XCJ2ZXJ0aWNhbFwiOlwiaG9yaXpvbnRhbFwiKStcInBhbnN0YXJ0XCIse3RvdWNoOmYsdG91Y2hFdmVudDphfSkpLFwicGFubmluZ1wiPT09Zy5zdGF0dXMmJihnLnBhblRpbWU9RGF0ZS5ub3coKSxjKGcuZWxlbWVudCxcInBhbm1vdmVcIix7ZGlzcGxhY2VtZW50WDpuLGRpc3BsYWNlbWVudFk6byx0b3VjaDpmLHRvdWNoZXM6YS50b3VjaGVzLGNoYW5nZWRUb3VjaGVzOmEuY2hhbmdlZFRvdWNoZXMsdG91Y2hFdmVudDphLGlzVmVydGljYWw6Zy5pc1ZlcnRpY2FsfSksZy5pc1ZlcnRpY2FsP2MoZy5lbGVtZW50LFwidmVydGljYWxwYW5tb3ZlXCIse2Rpc3BsYWNlbWVudFk6byx0b3VjaDpmLHRvdWNoRXZlbnQ6YX0pOmMoZy5lbGVtZW50LFwiaG9yaXpvbnRhbHBhbm1vdmVcIix7ZGlzcGxhY2VtZW50WDpuLHRvdWNoOmYsdG91Y2hFdmVudDphfSkpfWlmKDI9PU9iamVjdC5rZXlzKGwpLmxlbmd0aCl7Zm9yKHZhciBxLHI9W10scz1bXSx0PVtdLGU9MDtlPGEudG91Y2hlcy5sZW5ndGg7ZSsrKXt2YXIgZj1hLnRvdWNoZXNbZV0sZz1sW2YuaWRlbnRpZmllcl07ci5wdXNoKFtnLnN0YXJ0VG91Y2guY2xpZW50WCxnLnN0YXJ0VG91Y2guY2xpZW50WV0pLHMucHVzaChbZi5jbGllbnRYLGYuY2xpZW50WV0pfWZvcih2YXIgbSBpbiBsKXQucHVzaChsW21dLmVsZW1lbnQpO3E9ZChyWzBdWzBdLHJbMF1bMV0sclsxXVswXSxyWzFdWzFdLHNbMF1bMF0sc1swXVsxXSxzWzFdWzBdLHNbMV1bMV0pLGMoYih0WzBdLHRbMV0pLFwiZHVhbHRvdWNoXCIse3RyYW5zZm9ybTpxLHRvdWNoZXM6YS50b3VjaGVzLHRvdWNoRXZlbnQ6YX0pfX1mdW5jdGlvbiBnKGEpe2lmKDI9PU9iamVjdC5rZXlzKGwpLmxlbmd0aCl7dmFyIGQ9W107Zm9yKHZhciBlIGluIGwpZC5wdXNoKGxbZV0uZWxlbWVudCk7YyhiKGRbMF0sZFsxXSksXCJkdWFsdG91Y2hlbmRcIix7dG91Y2hlczprLmNhbGwoYS50b3VjaGVzKSx0b3VjaEV2ZW50OmF9KX1mb3IodmFyIGk9MDtpPGEuY2hhbmdlZFRvdWNoZXMubGVuZ3RoO2krKyl7dmFyIG49YS5jaGFuZ2VkVG91Y2hlc1tpXSxvPW4uaWRlbnRpZmllcixwPWxbb107aWYocCl7aWYocC5wcmVzc2luZ0hhbmRsZXImJihjbGVhclRpbWVvdXQocC5wcmVzc2luZ0hhbmRsZXIpLHAucHJlc3NpbmdIYW5kbGVyPW51bGwpLFwidGFwcGluZ1wiPT09cC5zdGF0dXMmJihwLnRpbWVzdGFtcD1EYXRlLm5vdygpLGMocC5lbGVtZW50LFwidGFwXCIse3RvdWNoOm4sdG91Y2hFdmVudDphfSksbSYmcC50aW1lc3RhbXAtbS50aW1lc3RhbXA8MzAwJiZjKHAuZWxlbWVudCxcImRvdWJsZXRhcFwiLHt0b3VjaDpuLHRvdWNoRXZlbnQ6YX0pLG09cCksXCJwYW5uaW5nXCI9PT1wLnN0YXR1cyl7dmFyIHE9RGF0ZS5ub3coKSxyPXEtcC5zdGFydFRpbWUscz0oKG4uY2xpZW50WC1wLnN0YXJ0VG91Y2guY2xpZW50WCkvciwobi5jbGllbnRZLXAuc3RhcnRUb3VjaC5jbGllbnRZKS9yLG4uY2xpZW50WC1wLnN0YXJ0VG91Y2guY2xpZW50WCksdD1uLmNsaWVudFktcC5zdGFydFRvdWNoLmNsaWVudFksdT1NYXRoLnNxcnQocC52ZWxvY2l0eVkqcC52ZWxvY2l0eVkrcC52ZWxvY2l0eVgqcC52ZWxvY2l0eVgpLHY9dT4uNSYmcS1wLmxhc3RUaW1lPDEwMCx3PXtkdXJhdGlvbjpyLGlzZmxpY2s6dix2ZWxvY2l0eVg6cC52ZWxvY2l0eVgsdmVsb2NpdHlZOnAudmVsb2NpdHlZLGRpc3BsYWNlbWVudFg6cyxkaXNwbGFjZW1lbnRZOnQsdG91Y2g6bix0b3VjaGVzOmEudG91Y2hlcyxjaGFuZ2VkVG91Y2hlczphLmNoYW5nZWRUb3VjaGVzLHRvdWNoRXZlbnQ6YSxpc1ZlcnRpY2FsOnAuaXNWZXJ0aWNhbH07YyhwLmVsZW1lbnQsXCJwYW5lbmRcIix3KSx2JiYoYyhwLmVsZW1lbnQsXCJzd2lwZVwiLHcpLHAuaXNWZXJ0aWNhbD9jKHAuZWxlbWVudCxcInZlcnRpY2Fsc3dpcGVcIix3KTpjKHAuZWxlbWVudCxcImhvcml6b250YWxzd2lwZVwiLHcpKX1cInByZXNzaW5nXCI9PT1wLnN0YXR1cyYmYyhwLmVsZW1lbnQsXCJwcmVzc2VuZFwiLHt0b3VjaDpuLHRvdWNoRXZlbnQ6YX0pLGRlbGV0ZSBsW29dfX0wPT09T2JqZWN0LmtleXMobCkubGVuZ3RoJiYoai5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsZiwhMSksai5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIixnLCExKSxqLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGNhbmNlbFwiLGgsITEpKX1mdW5jdGlvbiBoKGEpe2lmKDI9PU9iamVjdC5rZXlzKGwpLmxlbmd0aCl7dmFyIGQ9W107Zm9yKHZhciBlIGluIGwpZC5wdXNoKGxbZV0uZWxlbWVudCk7YyhiKGRbMF0sZFsxXSksXCJkdWFsdG91Y2hlbmRcIix7dG91Y2hlczprLmNhbGwoYS50b3VjaGVzKSx0b3VjaEV2ZW50OmF9KX1mb3IodmFyIGk9MDtpPGEuY2hhbmdlZFRvdWNoZXMubGVuZ3RoO2krKyl7dmFyIG09YS5jaGFuZ2VkVG91Y2hlc1tpXSxuPW0uaWRlbnRpZmllcixvPWxbbl07byYmKG8ucHJlc3NpbmdIYW5kbGVyJiYoY2xlYXJUaW1lb3V0KG8ucHJlc3NpbmdIYW5kbGVyKSxvLnByZXNzaW5nSGFuZGxlcj1udWxsKSxcInBhbm5pbmdcIj09PW8uc3RhdHVzJiZjKG8uZWxlbWVudCxcInBhbmVuZFwiLHt0b3VjaDptLHRvdWNoZXM6YS50b3VjaGVzLGNoYW5nZWRUb3VjaGVzOmEuY2hhbmdlZFRvdWNoZXMsdG91Y2hFdmVudDphfSksXCJwcmVzc2luZ1wiPT09by5zdGF0dXMmJmMoby5lbGVtZW50LFwicHJlc3NlbmRcIix7dG91Y2g6bSx0b3VjaEV2ZW50OmF9KSxkZWxldGUgbFtuXSl9MD09PU9iamVjdC5rZXlzKGwpLmxlbmd0aCYmKGoucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLGYsITEpLGoucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsZywhMSksai5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hjYW5jZWxcIixoLCExKSl9dmFyIGk9YS5kb2N1bWVudCxqPWkuZG9jdW1lbnRFbGVtZW50LGs9QXJyYXkucHJvdG90eXBlLnNsaWNlLGw9e30sbT1udWxsO2ouYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIixlLCExKX0od2luZG93KTs7bW9kdWxlLmV4cG9ydHMgPSB3aW5kb3cubGliWydnZXN0dXJlanMnXTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZ2VzdHVyZWpzL2J1aWxkL2dlc3R1cmVqcy5jb21tb24uanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZ2VuZXJhdGUgPSBnZW5lcmF0ZTtcbmZ1bmN0aW9uIGdlbmVyYXRlKHAxeCwgcDF5LCBwMngsIHAyeSkge1xuICAgIHZhciBaRVJPX0xJTUlUID0gMWUtNjtcbiAgICAvLyBDYWxjdWxhdGUgdGhlIHBvbHlub21pYWwgY29lZmZpY2llbnRzLFxuICAgIC8vIGltcGxpY2l0IGZpcnN0IGFuZCBsYXN0IGNvbnRyb2wgcG9pbnRzIGFyZSAoMCwwKSBhbmQgKDEsMSkuXG4gICAgdmFyIGF4ID0gMyAqIHAxeCAtIDMgKiBwMnggKyAxO1xuICAgIHZhciBieCA9IDMgKiBwMnggLSA2ICogcDF4O1xuICAgIHZhciBjeCA9IDMgKiBwMXg7XG5cbiAgICB2YXIgYXkgPSAzICogcDF5IC0gMyAqIHAyeSArIDE7XG4gICAgdmFyIGJ5ID0gMyAqIHAyeSAtIDYgKiBwMXk7XG4gICAgdmFyIGN5ID0gMyAqIHAxeTtcblxuICAgIGZ1bmN0aW9uIHNhbXBsZUN1cnZlRGVyaXZhdGl2ZVgodCkge1xuICAgICAgICAvLyBgYXggdF4zICsgYnggdF4yICsgY3ggdCcgZXhwYW5kZWQgdXNpbmcgSG9ybmVyICdzIHJ1bGUuXG4gICAgICAgIHJldHVybiAoMyAqIGF4ICogdCArIDIgKiBieCkgKiB0ICsgY3g7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2FtcGxlQ3VydmVYKHQpIHtcbiAgICAgICAgcmV0dXJuICgoYXggKiB0ICsgYngpICogdCArIGN4KSAqIHQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2FtcGxlQ3VydmVZKHQpIHtcbiAgICAgICAgcmV0dXJuICgoYXkgKiB0ICsgYnkpICogdCArIGN5KSAqIHQ7XG4gICAgfVxuXG4gICAgLy8gR2l2ZW4gYW4geCB2YWx1ZSwgZmluZCBhIHBhcmFtZXRyaWMgdmFsdWUgaXQgY2FtZSBmcm9tLlxuICAgIGZ1bmN0aW9uIHNvbHZlQ3VydmVYKHgpIHtcbiAgICAgICAgdmFyIHQyID0geDtcbiAgICAgICAgdmFyIGRlcml2YXRpdmU7XG4gICAgICAgIHZhciB4MjtcblxuICAgICAgICAvLyBodHRwczovL3RyYWMud2Via2l0Lm9yZy9icm93c2VyL3RydW5rL1NvdXJjZS9XZWJDb3JlL3BsYXRmb3JtL2FuaW1hdGlvblxuICAgICAgICAvLyBGaXJzdCB0cnkgYSBmZXcgaXRlcmF0aW9ucyBvZiBOZXd0b24ncyBtZXRob2QgLS0gbm9ybWFsbHkgdmVyeSBmYXN0LlxuICAgICAgICAvLyBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL05ld3RvbidzX21ldGhvZFxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgICAgICAgLy8gZih0KS14PTBcbiAgICAgICAgICAgIHgyID0gc2FtcGxlQ3VydmVYKHQyKSAtIHg7XG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoeDIpIDwgWkVST19MSU1JVCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0MjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlcml2YXRpdmUgPSBzYW1wbGVDdXJ2ZURlcml2YXRpdmVYKHQyKTtcbiAgICAgICAgICAgIC8vID09IDAsIGZhaWx1cmVcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRlcml2YXRpdmUpIDwgWkVST19MSU1JVCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdDIgLT0geDIgLyBkZXJpdmF0aXZlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmFsbCBiYWNrIHRvIHRoZSBiaXNlY3Rpb24gbWV0aG9kIGZvciByZWxpYWJpbGl0eS5cbiAgICAgICAgLy8gYmlzZWN0aW9uXG4gICAgICAgIC8vIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQmlzZWN0aW9uX21ldGhvZFxuICAgICAgICB2YXIgdDEgPSAxO1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICB2YXIgdDAgPSAwO1xuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIHQyID0geDtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgd2hpbGUgKHQxID4gdDApIHtcbiAgICAgICAgICAgIHgyID0gc2FtcGxlQ3VydmVYKHQyKSAtIHg7XG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoeDIpIDwgWkVST19MSU1JVCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0MjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh4MiA+IDApIHtcbiAgICAgICAgICAgICAgICB0MSA9IHQyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0MCA9IHQyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdDIgPSAodDEgKyB0MCkgLyAyO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmFpbHVyZVxuICAgICAgICByZXR1cm4gdDI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc29sdmUoeCkge1xuICAgICAgICByZXR1cm4gc2FtcGxlQ3VydmVZKHNvbHZlQ3VydmVYKHgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc29sdmU7XG59XG5cbnZhciBsaW5lYXIgPSBleHBvcnRzLmxpbmVhciA9IGdlbmVyYXRlKDAsIDAsIDEsIDEpO1xudmFyIGVhc2UgPSBleHBvcnRzLmVhc2UgPSBnZW5lcmF0ZSguMjUsIC4xLCAuMjUsIDEpO1xudmFyIGVhc2VJbiA9IGV4cG9ydHMuZWFzZUluID0gZ2VuZXJhdGUoLjQyLCAwLCAxLCAxKTtcbnZhciBlYXNlT3V0ID0gZXhwb3J0cy5lYXNlT3V0ID0gZ2VuZXJhdGUoMCwgMCwgLjU4LCAxKTtcbnZhciBlYXNlSW5PdXQgPSBleHBvcnRzLmVhc2VJbk91dCA9IGdlbmVyYXRlKC40MiwgMCwgLjU4LCAxKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vYW1mZS1jdWJpY2Jlemllci9zcmMvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9hbWZlQ3ViaWNiZXppZXIgPSByZXF1aXJlKCdhbWZlLWN1YmljYmV6aWVyJyk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBGUFMgPSA2MDtcbnZhciBJTlRFUlZBTCA9IDEwMDAgLyBGUFM7XG5cbmZ1bmN0aW9uIHNldFRpbWVvdXRGcmFtZShjYikge1xuICAgIHJldHVybiBzZXRUaW1lb3V0KGNiLCBJTlRFUlZBTCk7XG59XG5cbmZ1bmN0aW9uIGNsZWFyVGltZW91dEZyYW1lKHRpY2spIHtcbiAgICBjbGVhclRpbWVvdXQodGljayk7XG59XG5cbnZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgc2V0VGltZW91dEZyYW1lO1xuXG52YXIgY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1zQ2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgd2luZG93LndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tb3pDYW5jZWxBbmltYXRpb25GcmFtZSB8fCBjbGVhclRpbWVvdXRGcmFtZTtcblxuaWYgKHJlcXVlc3RBbmltYXRpb25GcmFtZSA9PT0gc2V0VGltZW91dEZyYW1lIHx8IGNhbmNlbEFuaW1hdGlvbkZyYW1lID09PSBjbGVhclRpbWVvdXRGcmFtZSkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHNldFRpbWVvdXRGcmFtZTtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSA9IGNsZWFyVGltZW91dEZyYW1lO1xufVxuXG5mdW5jdGlvbiBQcm9taXNlRGVmZXIoKSB7XG4gICAgdmFyIGRlZmVycmVkID0ge307XG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGRlZmVycmVkLnJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICBkZWZlcnJlZC5yZWplY3QgPSByZWplY3Q7XG4gICAgfSk7XG4gICAgZGVmZXJyZWQucHJvbWlzZSA9IHByb21pc2U7XG4gICAgcmV0dXJuIGRlZmVycmVkO1xufVxuXG5mdW5jdGlvbiBQcm9taXNlTWl4aW4ocHJvbWlzZSwgY29udGV4dCkge1xuICAgIHZhciBfcHJvbWlzZSA9IHByb21pc2U7XG4gICAgWyd0aGVuJywgJ2NhdGNoJ10uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgICAgIGNvbnRleHRbbWV0aG9kXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlW21ldGhvZF0uYXBwbHkoX3Byb21pc2UsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvbnRleHQ7XG59XG5cbmZ1bmN0aW9uIGdldEZyYW1lUXVldWUoZHVyYXRpb24sIGZyYW1lcykge1xuICAgIGlmICh0eXBlb2YgZnJhbWVzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGZyYW1lcyA9IHtcbiAgICAgICAgICAgICcwJzogZnJhbWVzXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIGZyYW1lQ291bnQgPSBkdXJhdGlvbiAvIElOVEVSVkFMO1xuICAgIHZhciBmcmFtZVBlcmNlbnQgPSAxIC8gZnJhbWVDb3VudDtcbiAgICB2YXIgZnJhbWVRdWV1ZSA9IFtdO1xuICAgIHZhciBmcmFtZUtleXMgPSBPYmplY3Qua2V5cyhmcmFtZXMpLm1hcChmdW5jdGlvbiAoaSkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQoaSk7XG4gICAgfSk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZyYW1lQ291bnQ7IGkrKykge1xuICAgICAgICB2YXIga2V5ID0gZnJhbWVLZXlzWzBdO1xuICAgICAgICB2YXIgcGVyY2VudCA9IGZyYW1lUGVyY2VudCAqIGk7XG4gICAgICAgIGlmIChrZXkgIT09IG51bGwgJiYga2V5IDw9IHBlcmNlbnQgKiAxMDApIHtcbiAgICAgICAgICAgIHZhciBmcmFtZSA9IGZyYW1lc1trZXkudG9TdHJpbmcoKV07XG4gICAgICAgICAgICBpZiAoIShmcmFtZSBpbnN0YW5jZW9mIEZyYW1lKSkge1xuICAgICAgICAgICAgICAgIGZyYW1lID0gbmV3IEZyYW1lKGZyYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZyYW1lUXVldWUucHVzaChmcmFtZSk7XG4gICAgICAgICAgICBmcmFtZUtleXMuc2hpZnQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChmcmFtZVF1ZXVlLmxlbmd0aCkge1xuICAgICAgICAgICAgZnJhbWVRdWV1ZS5wdXNoKGZyYW1lUXVldWVbZnJhbWVRdWV1ZS5sZW5ndGggLSAxXS5jbG9uZSgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmcmFtZVF1ZXVlO1xufVxuXG5mdW5jdGlvbiBnZXRCZXppZXIodGltaW5nRnVuY3Rpb24pIHtcbiAgICB2YXIgYmV6aWVyO1xuICAgIGlmICh0eXBlb2YgdGltaW5nRnVuY3Rpb24gPT09ICdzdHJpbmcnIHx8IHRpbWluZ0Z1bmN0aW9uIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgaWYgKF9hbWZlQ3ViaWNiZXppZXIuQmV6aWVyKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUuZXJyb3IoJ3JlcXVpcmUgYW1mZS1jdWJpY2JlemllcicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGltaW5nRnVuY3Rpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfYW1mZUN1YmljYmV6aWVyLkJlemllclt0aW1pbmdGdW5jdGlvbl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlemllciA9IF9hbWZlQ3ViaWNiZXppZXIuQmV6aWVyW3RpbWluZ0Z1bmN0aW9uXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGltaW5nRnVuY3Rpb24gaW5zdGFuY2VvZiBBcnJheSAmJiB0aW1pbmdGdW5jdGlvbi5sZW5ndGggPT09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgYmV6aWVyID0gX2FtZmVDdWJpY2Jlemllci5CZXppZXIuYXBwbHkoX2FtZmVDdWJpY2Jlemllci5CZXppZXIsIHRpbWluZ0Z1bmN0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGltaW5nRnVuY3Rpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgYmV6aWVyID0gdGltaW5nRnVuY3Rpb247XG4gICAgfVxuXG4gICAgcmV0dXJuIGJlemllcjtcbn1cblxuLyoqXG4gKiDmnoTpgKDkuIDkuKrluKflr7nosaFcbiAqIEBjbGFzcyBsaWIuYW5pbWF0aW9ufkZyYW1lXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW4g5b2T5YmN5bin5omn6KGM55qE5Ye95pWwXG4gKi9cbmZ1bmN0aW9uIEZyYW1lKGZ1bikge1xuICAgIHZhciBkZWZlcjtcbiAgICB2YXIgdGljaztcbiAgICB2YXIgaXNDYW5jZWwgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIOaJp+ihjOW4p1xuICAgICAqIEBtZXRob2QgcmVxdWVzdFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBtZW1iZXJPZiBsaWIuYW5pbWF0aW9ufkZyYW1lXG4gICAgICogQHJldHVybiB7bGliLmFuaW1hdGlvbn5GcmFtZX0g5b2T5YmN5a6e5L6LXG4gICAgICovXG4gICAgdGhpcy5yZXF1ZXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpc0NhbmNlbCA9IGZhbHNlO1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcblxuICAgICAgICBkZWZlciA9IFByb21pc2VEZWZlcigpO1xuICAgICAgICBQcm9taXNlTWl4aW4oZGVmZXIucHJvbWlzZSwgdGhpcyk7XG5cbiAgICAgICAgdGljayA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoaXNDYW5jZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZlciAmJiBkZWZlci5yZXNvbHZlKGZ1bi5hcHBseSh3aW5kb3csIGFyZ3MpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIOWPlua2iOaJp+ihjFxuICAgICAqIEBtZXRob2QgY2FuY2VsXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQG1lbWJlck9mIGxpYi5hbmltYXRpb25+RnJhbWVcbiAgICAgKiBAcmV0dXJuIHtsaWIuYW5pbWF0aW9ufkZyYW1lfSDlvZPliY3lrp7kvotcbiAgICAgKi9cbiAgICB0aGlzLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRpY2spIHtcbiAgICAgICAgICAgIGlzQ2FuY2VsID0gdHJ1ZTtcbiAgICAgICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRpY2spO1xuICAgICAgICAgICAgZGVmZXIgJiYgZGVmZXIucmVqZWN0KCdDQU5DRUwnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiDlpI3liLbkuIDkuKrluKflrp7kvotcbiAgICAgKiBAbWV0aG9kIGNsb25lXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQG1lbWJlck9mIGxpYi5hbmltYXRpb25+RnJhbWVcbiAgICAgKiBAcmV0dXJuIHtsaWIuYW5pbWF0aW9ufkZyYW1lfSDmlrDlrp7kvotcbiAgICAgKi9cbiAgICB0aGlzLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IEZyYW1lKGZ1bik7XG4gICAgfTtcbn1cblxudmFyIGFuaW1hdGlvbiA9IGZ1bmN0aW9uICgpIHtcblxuICAgIC8qKlxuICAgICAqIOWIneWni+WMluS4gOS4quWKqOeUu+WunuS+i1xuICAgICAqIEBtZXRob2QgYW5pbWF0aW9uXG4gICAgICogQG1lbWJlck9mIGxpYlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvbiAgICAgICDliqjnlLvml7bpl7TvvIzljZXkvY3mr6vnp5JcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheXxGdW5jdGlvbn0gdGltaW5nRnVuY3Rpb24g5pe26Ze05Ye95pWw77yM5pSv5oyB5qCH5YeG55qE5pe26Ze05Ye95pWw5ZCN44CB6LSd5aGe5bCU5puy57q/5pWw57uE77yI6ZyA6KaBbGliLmN1YmljYmV6aWVy5bqT5pSv5oyB77yJ5Lul5Y+K6Ieq5a6a5LmJ5Ye95pWwXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnJhbWVzICAgICAgIOavj+S4gOW4p+aJp+ihjOeahOWHveaVsFxuICAgICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IGZyYW1lIOWIneWni+WMluS4gOS4quW4p+WunuS+i1xuICAgICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHJlcXVlc3RGcmFtZSDnq4vljbPor7fmsYLluKdcbiAgICAgKiBAcmV0dXJuIHtsaWIuYW5pbWF0aW9ufkFuaW1hdGlvbn0gICAgICAgICAgICBBbmltYXRpb27lrp7kvotcbiAgICAgKi9cblxuICAgIGZ1bmN0aW9uIGFuaW1hdGlvbihkdXJhdGlvbiwgdGltaW5nRnVuY3Rpb24sIGZyYW1lcykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgYW5pbWF0aW9uKTtcblxuICAgICAgICB2YXIgZGVmZXI7XG4gICAgICAgIHZhciBmcmFtZVF1ZXVlID0gZ2V0RnJhbWVRdWV1ZShkdXJhdGlvbiwgZnJhbWVzKTtcbiAgICAgICAgdmFyIGZyYW1lUGVyY2VudCA9IDEgLyAoZHVyYXRpb24gLyBJTlRFUlZBTCk7XG4gICAgICAgIHZhciBmcmFtZUluZGV4ID0gMDtcbiAgICAgICAgdmFyIGJlemllciA9IGdldEJlemllcih0aW1pbmdGdW5jdGlvbik7XG5cbiAgICAgICAgaWYgKCFiZXppZXIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndW5leGNlcHQgdGltaW5nIGZ1bmN0aW9uJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiDmkq3mlL7liqjnlLtcbiAgICAgICAgICogQG1ldGhvZCBwbGF5XG4gICAgICAgICAqIEByZXR1cm4ge2xpYi5hbmltYXRpb25+QW5pbWF0aW9ufSB0aGlzIOW9k+WJjeWunuS+i1xuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICogQG1lbWJlck9mIGxpYi5hbmltYXRpb25+QW5pbWF0aW9uXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBsYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoaXNQbGF5aW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXNQbGF5aW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKCFkZWZlcikge1xuICAgICAgICAgICAgICAgIGRlZmVyID0gUHJvbWlzZURlZmVyKCk7XG4gICAgICAgICAgICAgICAgUHJvbWlzZU1peGluKGRlZmVyLnByb21pc2UsIHRoaXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiByZXF1ZXN0KCkge1xuICAgICAgICAgICAgICAgIHZhciBwZXJjZW50ID0gZnJhbWVQZXJjZW50ICogKGZyYW1lSW5kZXggKyAxKS50b0ZpeGVkKDEwKTtcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudEZyYW1lID0gZnJhbWVRdWV1ZVtmcmFtZUluZGV4XTtcblxuICAgICAgICAgICAgICAgIGN1cnJlbnRGcmFtZS5yZXF1ZXN0KHBlcmNlbnQudG9GaXhlZCgxMCksIHRpbWluZ0Z1bmN0aW9uKHBlcmNlbnQpLnRvRml4ZWQoMTApKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1BsYXlpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChmcmFtZUluZGV4ID09PSBmcmFtZVF1ZXVlLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUGxheWluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXIgJiYgZGVmZXIucmVzb2x2ZSgnRklOSVNIJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFtZUluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENBTkNFTFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXF1ZXN0KCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog5pqC5YGc5Yqo55S7XG4gICAgICAgICAqIEBtZXRob2Qgc3RvcFxuICAgICAgICAgKiBAcmV0dXJuIHtsaWIuYW5pbWF0aW9ufkFuaW1hdGlvbn0gdGhpcyDlvZPliY3lrp7kvotcbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqIEBtZW1iZXJPZiBsaWIuYW5pbWF0aW9ufkFuaW1hdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zdG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFpc1BsYXlpbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpc1BsYXlpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKGZyYW1lUXVldWVbZnJhbWVJbmRleF0pIHtcbiAgICAgICAgICAgICAgICBmcmFtZVF1ZXVlW2ZyYW1lSW5kZXhdLmNhbmNlbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOaehOmAoOS4gOS4quW4p+WvueixoVxuICAgICAqIEBjbGFzcyBsaWIuYW5pbWF0aW9ufkZyYW1lXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuIOW9k+WJjeW4p+aJp+ihjOeahOWHveaVsFxuICAgICAqL1xuXG5cbiAgICBfY3JlYXRlQ2xhc3MoYW5pbWF0aW9uLCBbe1xuICAgICAgICBrZXk6ICdmcmFtZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBmcmFtZShmdW4pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRnJhbWUoZnVuKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVxdWVzdEZyYW1lJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlcXVlc3RGcmFtZShmdW4pIHtcbiAgICAgICAgICAgIHZhciBmcmFtZSA9IG5ldyBGcmFtZShmdW4pO1xuICAgICAgICAgICAgcmV0dXJuIGZyYW1lLnJlcXVlc3QoKTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBhbmltYXRpb247XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGFuaW1hdGlvbjtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vYW5pbWF0aW9uLWpzL3NyYy9pbmRleC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=