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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _amfeCubicbezier = __webpack_require__(7);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2MwNjc2NWU1ZDM1NTA3MDAxYWIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4Lmxlc3M/OTFlYyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgubGVzcyIsIndlYnBhY2s6Ly8vLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9nZXN0dXJlanMvYnVpbGQvZ2VzdHVyZWpzLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2FtZmUtY3ViaWNiZXppZXIvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vYW5pbWF0aW9uLWpzL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRjtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLGlDQUFnQyxVQUFVLEVBQUU7QUFDNUMsRTs7Ozs7O0FDcEJBO0FBQ0E7OztBQUdBO0FBQ0Esd0RBQXVELHVCQUF1Qix1Q0FBdUMsbUNBQW1DLCtCQUErQixHQUFHOztBQUUxTDs7Ozs7Ozs7Ozs7Ozs7QUNGQSxRQUFPLE9BQVAsR0FBaUIsWUFBVztBQUMzQixNQUFJLE9BQU8sRUFBUDs7O0FBRHVCLE1BSTNCLENBQUssUUFBTCxHQUFnQixTQUFT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SSxlQUFlLFdBQVcsTUFBWCxHQUFvQixDQUFwQixFQUF1QjtBQUN0QyxxQ0FBWSxLQUFaLENBRHNDO0FBRXRDLGtDQUFTLE1BQU0sT0FBTixDQUFjLFFBQWQsQ0FBVCxDQUZzQztBQUd0QyxpQ0FBUSxJQUFSLENBSHNDO3NCQUExQyxNQUlPO0FBQ0gsc0NBREc7QUFFSCxtQ0FGRztzQkFKUDtrQkFMRSxFQWFILFlBQU07O2tCQUFOLENBZlAsQ0FKZTtjQUFuQjs7QUF3QkEsdUJBbkNtQjtBQW9DbkIsb0JBQU8sSUFBUCxDQXBDbUI7VUFBWDs7Ozs7Ozs7O0FBbkI4QixhQWlFMUMsQ0FBSyxJQUFMLEdBQVksWUFBVztBQUNuQixpQkFBSSxDQUFDLFNBQUQsRUFBWTtBQUNaLHdCQURZO2NBQWhCO0FBR0EseUJBQVksS0FBWixDQUptQjs7QUFNbkIsaUJBQUksV0FBVyxVQUFYLENBQUosRUFBNEI7QUFDeEIsNEJBQVcsVUFBWCxFQUF1QixNQUF2QixHQUR3QjtjQUE1QjtBQUdBLG9CQUFPLElBQVAsQ0FUbUI7VUFBWCxDQWpFOEI7TUFBOUM7Ozs7Ozs7O2tCQWJpQjs7K0JBK0ZWLEtBQUk7QUFDUCxvQkFBTyxJQUFJLEtBQUosQ0FBVSxHQUFWLENBQVAsQ0FETzs7OztzQ0FJRyxLQUFLO0FBQ2YsaUJBQUksUUFBUSxJQUFJLEtBQUosQ0FBVSxHQUFWLENBQVIsQ0FEVztBQUVmLG9CQUFPLE1BQU0sT0FBTixFQUFQLENBRmU7Ozs7WUFuR0YiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBjYzA2NzY1ZTVkMzU1MDcwMDFhYlxuICoqLyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2luZGV4LmpzIS4vaW5kZXgubGVzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvaW5kZXguanMhLi9pbmRleC5sZXNzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2luZGV4LmpzIS4vaW5kZXgubGVzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9pbmRleC5sZXNzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJbZGF0YS1jdHJsLW5hbWU9XFxcInNsaWRlclxcXCJdIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDFweCk7XFxuICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDFweCk7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVooMXB4KTtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL34vbGVzcy1sb2FkZXIhLi9zcmMvaW5kZXgubGVzc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fSxcclxuXHRtZW1vaXplID0gZnVuY3Rpb24oZm4pIHtcclxuXHRcdHZhciBtZW1vO1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0cmV0dXJuIG1lbW87XHJcblx0XHR9O1xyXG5cdH0sXHJcblx0aXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gL21zaWUgWzYtOV1cXGIvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7XHJcblx0fSksXHJcblx0Z2V0SGVhZEVsZW1lbnQgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuXHR9KSxcclxuXHRzaW5nbGV0b25FbGVtZW50ID0gbnVsbCxcclxuXHRzaW5nbGV0b25Db3VudGVyID0gMCxcclxuXHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XHJcblx0aWYodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XHJcblx0XHRpZih0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcclxuXHR9XHJcblxyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxyXG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcclxuXHJcblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIDxoZWFkPi5cclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xyXG5cclxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xyXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xyXG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcclxuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xyXG5cdFx0fVxyXG5cdFx0aWYobmV3TGlzdCkge1xyXG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QpO1xyXG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XHJcblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcclxuXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspXHJcblx0XHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXSgpO1xyXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpIHtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0aWYoZG9tU3R5bGUpIHtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0KSB7XHJcblx0dmFyIHN0eWxlcyA9IFtdO1xyXG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG5cdFx0dmFyIGlkID0gaXRlbVswXTtcclxuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xyXG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcclxuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xyXG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xyXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXHJcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCkge1xyXG5cdHZhciBoZWFkID0gZ2V0SGVhZEVsZW1lbnQoKTtcclxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcFtzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcclxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xyXG5cdFx0aWYoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgaGVhZC5maXJzdENoaWxkKTtcclxuXHRcdH0gZWxzZSBpZihsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xyXG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcuIE11c3QgYmUgJ3RvcCcgb3IgJ2JvdHRvbScuXCIpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xyXG5cdHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0dmFyIGlkeCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGVFbGVtZW50KTtcclxuXHRpZihpZHggPj0gMCkge1xyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCk7XHJcblx0cmV0dXJuIHN0eWxlRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBsaW5rRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xyXG5cdGxpbmtFbGVtZW50LnJlbCA9IFwic3R5bGVzaGVldFwiO1xyXG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rRWxlbWVudCk7XHJcblx0cmV0dXJuIGxpbmtFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50LCB1cGRhdGUsIHJlbW92ZTtcclxuXHJcblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XHJcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcclxuXHRcdHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpO1xyXG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSk7XHJcblx0fSBlbHNlIGlmKG9iai5zb3VyY2VNYXAgJiZcclxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdFx0aWYoc3R5bGVFbGVtZW50LmhyZWYpXHJcblx0XHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTChzdHlsZUVsZW1lbnQuaHJlZik7XHJcblx0XHR9O1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHR1cGRhdGUob2JqKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xyXG5cdFx0aWYobmV3T2JqKSB7XHJcblx0XHRcdGlmKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcClcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVtb3ZlKCk7XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgdGV4dFN0b3JlID0gW107XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XHJcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XHJcblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcclxuXHR9O1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xyXG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcclxuXHJcblx0aWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcclxuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGVFbGVtZW50LmNoaWxkTm9kZXM7XHJcblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cclxuXHRpZihtZWRpYSkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxyXG5cdH1cclxuXHJcblx0aWYoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0fSBlbHNlIHtcclxuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVMaW5rKGxpbmtFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0aWYoc291cmNlTWFwKSB7XHJcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxyXG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xyXG5cdH1cclxuXHJcblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XHJcblxyXG5cdHZhciBvbGRTcmMgPSBsaW5rRWxlbWVudC5ocmVmO1xyXG5cclxuXHRsaW5rRWxlbWVudC5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuXHJcblx0aWYob2xkU3JjKVxyXG5cdFx0VVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgJ2dlc3R1cmVqcyc7XG5pbXBvcnQgKiBhcyBjdWJpY2JlemllciBmcm9tICdhbWZlLWN1YmljYmV6aWVyJztcbmltcG9ydCBBbmltYXRpb24gZnJvbSAnYW5pbWF0aW9uLWpzJztcblxuaWYgKHR5cGVvZiBnbG9iYWwud2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgIHRocm93IG5ldyBFcnJvcignY2FuIG5vdCBiZSBydW5uaW5nIGluIG5vbi1icm93c2VyJyk7XG59XG5cbmNvbnN0IHdpbiA9IGdsb2JhbC53aW5kb3c7XG5jb25zdCBkb2MgPSB3aW4uZG9jdW1lbnQ7XG5jb25zdCB1YSA9IHdpbi5uYXZpZ2F0b3IudXNlckFnZW50O1xuY29uc3QgRmlyZWZveCA9ICEhdWEubWF0Y2goL0ZpcmVmb3gvaSk7XG5jb25zdCBJRU1vYmlsZSA9ICEhdWEubWF0Y2goL0lFTW9iaWxlL2kpO1xuY29uc3Qgc3R5bGVQcmVmaXggPSBGaXJlZm94ID8gJ01veicgOlxuICAgIElFTW9iaWxlID8gJ21zJyA6ICd3ZWJraXQnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJhbnNmb3JtT2Zmc2V0KGVsZW1lbnQpIHtcbiAgICB2YXIgb2Zmc2V0ID0ge1xuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAwXG4gICAgfTtcbiAgICB2YXIgdHJhbnNmb3JtID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KVtgJHtzdHlsZVByZWZpeH1UcmFuc2Zvcm1gXTtcbiAgICB2YXIgbWF0Y2hlZDtcblxuICAgIGlmICh0cmFuc2Zvcm0gIT09ICdub25lJykge1xuICAgICAgICBpZiAoKG1hdGNoZWQgPSB0cmFuc2Zvcm0ubWF0Y2goL15tYXRyaXgzZFxcKCg/OlstXFxkLl0rLFxccyopezEyfShbLVxcZC5dKyksXFxzKihbLVxcZC5dKykoPzosXFxzKlstXFxkLl0rKXsyfVxcKS8pIHx8XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtLm1hdGNoKC9ebWF0cml4XFwoKD86Wy1cXGQuXSssXFxzKil7NH0oWy1cXGQuXSspLFxccyooWy1cXGQuXSspXFwpJC8pKSkge1xuICAgICAgICAgICAgb2Zmc2V0LnggPSBwYXJzZUZsb2F0KG1hdGNoZWRbMV0pIHx8IDA7XG4gICAgICAgICAgICBvZmZzZXQueSA9IHBhcnNlRmxvYXQobWF0Y2hlZFsyXSkgfHwgMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvZmZzZXQ7XG59XG5cbnZhciBDU1NNYXRyaXggPSBJRU1vYmlsZSA/ICdNU0NTU01hdHJpeCcgOiAnV2ViS2l0Q1NTTWF0cml4JztcbnZhciBoYXMzZCA9ICEhRmlyZWZveCB8fCBDU1NNYXRyaXggaW4gd2luICYmICdtMTEnIGluIG5ldyB3aW5bQ1NTTWF0cml4XSgpO1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zbGF0ZSh4LCB5KSB7XG4gICAgeCA9IHBhcnNlRmxvYXQoeCk7XG4gICAgeSA9IHBhcnNlRmxvYXQoeSk7XG5cbiAgICBpZiAoeCAhPT0gMCkge1xuICAgICAgICB4ICs9ICdweCc7XG4gICAgfVxuXG4gICAgaWYgKHkgIT09IDApIHtcbiAgICAgICAgeSArPSAncHgnO1xuICAgIH1cblxuICAgIGlmIChoYXMzZCkge1xuICAgICAgICByZXR1cm4gYHRyYW5zbGF0ZTNkKCR7eH0sICR7eX0sIDApYDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYHRyYW5zbGF0ZSgke3h9LCAke3l9KWA7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBmaXJlRXZlbnQoZWwsIG5hbWUsIGV4dHJhKSB7XG4gICAgY29uc3QgZXYgPSBkb2MuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcbiAgICBldi5pbml0RXZlbnQobmFtZSwgZmFsc2UsIGZhbHNlKTtcbiAgICBpZiAoZXh0cmEpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZXh0cmEpIHtcbiAgICAgICAgICAgIGV2W2tleV0gPSBleHRyYVtrZXldO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsLmRpc3BhdGNoRXZlbnQoZXYpO1xufVxuXG5leHBvcnQgY2xhc3MgSXRlbXMge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5wYXJlbnRSb290ID0gb3B0aW9ucy5wYXJlbnRSb290O1xuICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQgPSBvcHRpb25zLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIHRoaXMuc3RlcCA9IG9wdGlvbnMuc3RlcDtcbiAgICAgICAgdGhpcy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLmluZGV4ID0gMDtcbiAgICAgICAgdGhpcy50cmFuc2Zvcm1PZmZzZXQgPSAwO1xuICAgIH1cblxuICAgIGFkZChodG1sRWxlbWVudCkge1xuICAgICAgICBsZXQgaXRlbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBpZiAodHlwZW9mIGh0bWxFbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaXRlbUVsZW1lbnQuaW5uZXJIVE1MID0gaHRtbEVsZW1lbnQ7XG4gICAgICAgIH0gZWxzZSBpZiAoaHRtbEVsZW1lbnQubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBlbCBvZiBodG1sRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGl0ZW1FbGVtZW50LmFwcGVuZENoaWxkKGVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChodG1sRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmXG4gICAgICAgICAgICBodG1sRWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdsaScpIHtcbiAgICAgICAgICAgIGl0ZW1FbGVtZW50ID0gaHRtbEVsZW1lbnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtRWxlbWVudC5hcHBlbmRDaGlsZChodG1sRWxlbWVudCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGl0ZW1FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGl0ZW1FbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgaXRlbUVsZW1lbnQuaW5kZXggPSB0aGlzLmxlbmd0aDtcblxuICAgICAgICBpZiAoaXRlbUVsZW1lbnQucGFyZW50Tm9kZSAhPT0gdGhpcy5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoaXRlbUVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFN0cmluZyh0aGlzLmxlbmd0aCksIHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbUVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubGVuZ3RoKys7XG5cbiAgICAgICAgcmV0dXJuIGl0ZW1FbGVtZW50O1xuICAgIH1cblxuICAgIF9ub3JtYWxpemVJbmRleChpbmRleCkge1xuICAgICAgICB3aGlsZSAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgICBpbmRleCArPSB0aGlzLmxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgaW5kZXggLT0gdGhpcy5sZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG4gICAgZ2V0KGluZGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzW1N0cmluZyh0aGlzLl9ub3JtYWxpemVJbmRleChpbmRleCkpXTtcbiAgICB9XG5cbiAgICBfZ2V0Q2xvbmVkKGluZGV4KSB7XG4gICAgICAgIGluZGV4ID0gU3RyaW5nKHRoaXMuX25vcm1hbGl6ZUluZGV4KGluZGV4KSk7XG4gICAgICAgIGxldCBpdGVtID0gdGhpcy5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYFtjbG9uZWQ9XCJjbG9uZWQtJHtpbmRleH1cIl1gKTtcblxuICAgICAgICBpZiAoIWl0ZW0pIHtcbiAgICAgICAgICAgIGl0ZW0gPSB0aGlzW2luZGV4XS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSgnY2xvbmVkJywgYGNsb25lZC0ke2luZGV4fWApO1xuICAgICAgICAgICAgaXRlbS5pbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKGl0ZW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgX2FjdGl2YXRlKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3VySXRlbSA9IHRoaXMuZ2V0KGluZGV4KTtcbiAgICAgICAgbGV0IHByZXZJdGVtO1xuICAgICAgICBsZXQgbmV4dEl0ZW07XG5cbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgcHJldkl0ZW0gPSB0aGlzLmdldChpbmRleCAtIDEpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICBuZXh0SXRlbSA9IHRoaXMuX2dldENsb25lZChpbmRleCArIDEpO1xuICAgICAgICAgICAgICAgIGZpcmVFdmVudCh0aGlzLnBhcmVudFJvb3QsICdjbG9uZScsIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbTogdGhpcy5nZXQoaW5kZXggKyAxKSxcbiAgICAgICAgICAgICAgICAgICAgY2xvbmVkOiBuZXh0SXRlbVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXh0SXRlbSA9IHRoaXMuZ2V0KGluZGV4ICsgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1ckl0ZW0uc3R5bGUubGVmdCA9IGAkey10aGlzLnRyYW5zZm9ybU9mZnNldH1weGA7XG4gICAgICAgICAgICBwcmV2SXRlbS5zdHlsZS5sZWZ0ID0gYCR7LXRoaXMudHJhbnNmb3JtT2Zmc2V0IC0gdGhpcy5zdGVwfXB4YDtcbiAgICAgICAgICAgIHByZXZJdGVtLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICAgIG5leHRJdGVtLnN0eWxlLmxlZnQgPSBgJHstdGhpcy50cmFuc2Zvcm1PZmZzZXQgKyB0aGlzLnN0ZXB9cHhgO1xuICAgICAgICAgICAgbmV4dEl0ZW0uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbmRleCA9IGN1ckl0ZW0uaW5kZXg7XG4gICAgICAgIGN1ckl0ZW0uc3R5bGUuZGlzcGxheSA9ICcnO1xuXG4gICAgICAgIGZpcmVFdmVudCh0aGlzLnBhcmVudFJvb3QsICdjaGFuZ2UnLCB7XG4gICAgICAgICAgICBwcmV2SXRlbSxcbiAgICAgICAgICAgIGN1ckl0ZW0sXG4gICAgICAgICAgICBuZXh0SXRlbVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzbGlkZShpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3RhcnRPZmZzZXQgPSBnZXRUcmFuc2Zvcm1PZmZzZXQodGhpcy5wYXJlbnRFbGVtZW50KS54O1xuICAgICAgICBjb25zdCBlbmRPZmZzZXQgPSB0aGlzLnRyYW5zZm9ybU9mZnNldCArIHRoaXMuc3RlcCAqICgtaW5kZXgpO1xuICAgICAgICBjb25zdCBpbnRlck9mZnNldCA9IGVuZE9mZnNldCAtIHN0YXJ0T2Zmc2V0O1xuXG4gICAgICAgIGlmIChpbnRlck9mZnNldCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYW5pbSA9IG5ldyBBbmltYXRpb24oNDAwLCBjdWJpY2Jlemllci5lYXNlLCAoaTEsIGkyKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQuc3R5bGVbYCR7c3R5bGVQcmVmaXh9VHJhbnNmb3JtYF0gPSBnZXRUcmFuc2xhdGUoc3RhcnRPZmZzZXQgKyBpbnRlck9mZnNldCAqIGkyLCAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGFuaW0ucGxheSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1PZmZzZXQgPSBlbmRPZmZzZXQ7XG4gICAgICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQuc3R5bGVbYCR7c3R5bGVQcmVmaXh9VHJhbnNmb3JtYF0gPSBnZXRUcmFuc2xhdGUoZW5kT2Zmc2V0LCAwKTtcbiAgICAgICAgICAgIGluZGV4ICYmIHRoaXMuX2FjdGl2YXRlKHRoaXMuaW5kZXggKyBpbmRleCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5leHQoKSB7XG4gICAgICAgIHRoaXMuc2xpZGUoMSk7XG4gICAgfVxuXG4gICAgcHJldigpIHtcbiAgICAgICAgdGhpcy5zbGlkZSgtMSk7XG4gICAgfVxuXG59XG5cbnZhciBpbmNJZCA9IDA7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZXIge1xuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgdGhpcy5faW5pdERvbSguLi5hcmdzKTtcbiAgICAgICAgdGhpcy5faW5pdEdlc3RydWUoLi4uYXJncyk7XG5cbiAgICAgICAgdGhpcy5faXNTdGFydGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faXNTbGlkaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzUGFubmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9kaXNwbGFjZW1lbnQ7XG5cbiAgICAgICAgdGhpcy5wbGF5SW50ZXJ2YWwgPSB0aGlzLm9wdGlvbnMucGxheUludGVydmFsIHx8IDE1MDA7XG5cbiAgICAgICAgdmFyIGF1dG9wbGF5ID0gZmFsc2U7XG4gICAgICAgIHZhciByZWFkeVRvUGxheSA9IGZhbHNlO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2F1dG9wbGF5Jywge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhdXRvcGxheTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQodikge1xuICAgICAgICAgICAgICAgIGF1dG9wbGF5ID0gISF2O1xuICAgICAgICAgICAgICAgIGlmIChyZWFkeVRvUGxheSkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQocmVhZHlUb1BsYXkpO1xuICAgICAgICAgICAgICAgICAgICByZWFkeVRvUGxheSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYXV0b3BsYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVhZHlUb1BsYXkgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmF1dG9wbGF5ID0gISF0aGlzLm9wdGlvbnMuYXV0b3BsYXk7XG4gICAgfVxuXG4gICAgX2luaXREb20oLi4uYXJncykge1xuICAgICAgICB0aGlzLmlkID0gYCR7RGF0ZS5ub3coKX0tJHsrK2luY0lkfWA7XG4gICAgICAgIHRoaXMucm9vdCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgICAgICBpZiAoYXJncy5sZW5ndGggPT09IDEgJiYgIShhcmdzWzBdIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gYXJnc1swXSB8fCB7fTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGFyZ3NbMF07XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBhcmdzWzFdIHx8IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgICAgICAgICB0aGlzLnJvb3QuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtY3RybC1uYW1lJywgJ3NsaWRlcicpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWN0cmwtaWQnLCB0aGlzLmlkKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlW2Ake3N0eWxlUHJlZml4fVRyYW5zZm9ybWBdID0gZ2V0VHJhbnNsYXRlKDAsIDApO1xuXG4gICAgICAgIHRoaXMuaXRlbXMgPSBuZXcgSXRlbXMoe1xuICAgICAgICAgICAgcGFyZW50Um9vdDogdGhpcy5yb290LFxuICAgICAgICAgICAgcGFyZW50RWxlbWVudDogdGhpcy5lbGVtZW50LFxuICAgICAgICAgICAgc3RlcDogdGhpcy5vcHRpb25zLnN0ZXAgfHwgdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGl0ZW1FbGVtZW50cyA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpO1xuICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgaXRlbUVsZW1lbnRzKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1zLmFkZChlbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9pbml0R2VzdHJ1ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy51c2VHZXN0dXJlKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncGFuc3RhcnQnLCBlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWUuaXNWZXJ0aWNhbCAmJlxuICAgICAgICAgICAgICAgICAgICAhKHRoaXMuX2lzUGFubmluZyAmJiB0aGlzLl9pc1NsaWRpbmcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hdXRvcGxheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kaXNwbGFjZW1lbnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc1Bhbm5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncGFubW92ZScsIGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghZS5pc1ZlcnRpY2FsICYmIHRoaXMuX2lzUGFubmluZykge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlzcGxhY2VtZW50ID0gZS5kaXNwbGFjZW1lbnRYO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGVbYCR7c3R5bGVQcmVmaXh9VHJhbnNmb3JtYF0gPVxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0VHJhbnNsYXRlKHRoaXMuaXRlbXMudHJhbnNmb3JtT2Zmc2V0ICsgdGhpcy5fZGlzcGxhY2VtZW50LCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BhbmVuZCcsIGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghZS5pc1ZlcnRpY2FsICYmIHRoaXMuX2lzUGFubmluZykge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNQYW5uaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuaXNmbGljaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2Rpc3BsYWNlbWVudCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wcmV2KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy5fZGlzcGxhY2VtZW50KSA8IHRoaXMuaXRlbXMuc3RlcCAvIDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnNsaWRlKDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnNsaWRlKHRoaXMuX2Rpc3BsYWNlbWVudCA8IDAgPyAxIDogLTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYXV0b3BsYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG5cbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdmbGljaycsIGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghZS5pc1ZlcnRpY2FsKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBsYXkoKSB7XG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuXG4gICAgICAgIGlmICghdGhpcy5faXNTdGFydGluZykge1xuICAgICAgICAgICAgdGhpcy5faXNTdGFydGluZyA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5fYWN0aXZhdGUoMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5faXNQbGF5aW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBwbGF5aW5nKCkge1xuICAgICAgICAgICAgdGhhdC5faXNTbGlkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoYXQuaXRlbXMubmV4dCgpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhhdC5faXNTbGlkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICAgICAgdGhhdC5faXNQbGF5aW5nID0gc2V0VGltZW91dChwbGF5aW5nLCA0MDAgKyB0aGF0LnBsYXlJbnRlcnZhbCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9pc1BsYXlpbmcgPSBzZXRUaW1lb3V0KHBsYXlpbmcsIDQwMCArIHRoaXMucGxheUludGVydmFsKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzdG9wKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2lzUGxheWluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2lzUGxheWluZyk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgfSwgNTAwKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBhZGRFdmVudExpc3RlbmVyKG5hbWUsIGhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5yb290LmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgaGFuZGxlciwgZmFsc2UpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIGhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5yb290LnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgaGFuZGxlciwgZmFsc2UpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCIodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpICYmICh3aW5kb3cgPSB7Y3RybDoge30sIGxpYjoge319KTshd2luZG93LmN0cmwgJiYgKHdpbmRvdy5jdHJsID0ge30pOyF3aW5kb3cubGliICYmICh3aW5kb3cubGliID0ge30pOyFmdW5jdGlvbihhKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBiKGEsYil7Zm9yKHZhciBjPWE7Yzspe2lmKGMuY29udGFpbnMoYil8fGM9PWIpcmV0dXJuIGM7Yz1jLnBhcmVudE5vZGV9cmV0dXJuIG51bGx9ZnVuY3Rpb24gYyhhLGIsYyl7dmFyIGQ9aS5jcmVhdGVFdmVudChcIkhUTUxFdmVudHNcIik7aWYoZC5pbml0RXZlbnQoYiwhMCwhMCksXCJvYmplY3RcIj09dHlwZW9mIGMpZm9yKHZhciBlIGluIGMpZFtlXT1jW2VdO2EuZGlzcGF0Y2hFdmVudChkKX1mdW5jdGlvbiBkKGEsYixjLGQsZSxmLGcsaCl7dmFyIGk9TWF0aC5hdGFuMihoLWYsZy1lKS1NYXRoLmF0YW4yKGQtYixjLWEpLGo9TWF0aC5zcXJ0KChNYXRoLnBvdyhoLWYsMikrTWF0aC5wb3coZy1lLDIpKS8oTWF0aC5wb3coZC1iLDIpK01hdGgucG93KGMtYSwyKSkpLGs9W2UtaiphKk1hdGguY29zKGkpK2oqYipNYXRoLnNpbihpKSxmLWoqYipNYXRoLmNvcyhpKS1qKmEqTWF0aC5zaW4oaSldO3JldHVybntyb3RhdGU6aSxzY2FsZTpqLHRyYW5zbGF0ZTprLG1hdHJpeDpbW2oqTWF0aC5jb3MoaSksLWoqTWF0aC5zaW4oaSksa1swXV0sW2oqTWF0aC5zaW4oaSksaipNYXRoLmNvcyhpKSxrWzFdXSxbMCwwLDFdXX19ZnVuY3Rpb24gZShhKXswPT09T2JqZWN0LmtleXMobCkubGVuZ3RoJiYoai5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsZiwhMSksai5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIixnLCExKSxqLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGNhbmNlbFwiLGgsITEpKTtmb3IodmFyIGQ9MDtkPGEuY2hhbmdlZFRvdWNoZXMubGVuZ3RoO2QrKyl7dmFyIGU9YS5jaGFuZ2VkVG91Y2hlc1tkXSxpPXt9O2Zvcih2YXIgbSBpbiBlKWlbbV09ZVttXTt2YXIgbj17c3RhcnRUb3VjaDppLHN0YXJ0VGltZTpEYXRlLm5vdygpLHN0YXR1czpcInRhcHBpbmdcIixlbGVtZW50OmEuc3JjRWxlbWVudHx8YS50YXJnZXQscHJlc3NpbmdIYW5kbGVyOnNldFRpbWVvdXQoZnVuY3Rpb24oYixkKXtyZXR1cm4gZnVuY3Rpb24oKXtcInRhcHBpbmdcIj09PW4uc3RhdHVzJiYobi5zdGF0dXM9XCJwcmVzc2luZ1wiLGMoYixcImxvbmdwcmVzc1wiLHt0b3VjaDpkLHRvdWNoZXM6YS50b3VjaGVzLGNoYW5nZWRUb3VjaGVzOmEuY2hhbmdlZFRvdWNoZXMsdG91Y2hFdmVudDphfSkpLGNsZWFyVGltZW91dChuLnByZXNzaW5nSGFuZGxlciksbi5wcmVzc2luZ0hhbmRsZXI9bnVsbH19KGEuc3JjRWxlbWVudHx8YS50YXJnZXQsYS5jaGFuZ2VkVG91Y2hlc1tkXSksNTAwKX07bFtlLmlkZW50aWZpZXJdPW59aWYoMj09T2JqZWN0LmtleXMobCkubGVuZ3RoKXt2YXIgbz1bXTtmb3IodmFyIG0gaW4gbClvLnB1c2gobFttXS5lbGVtZW50KTtjKGIob1swXSxvWzFdKSxcImR1YWx0b3VjaHN0YXJ0XCIse3RvdWNoZXM6ay5jYWxsKGEudG91Y2hlcyksdG91Y2hFdmVudDphfSl9fWZ1bmN0aW9uIGYoYSl7Zm9yKHZhciBlPTA7ZTxhLmNoYW5nZWRUb3VjaGVzLmxlbmd0aDtlKyspe3ZhciBmPWEuY2hhbmdlZFRvdWNoZXNbZV0sZz1sW2YuaWRlbnRpZmllcl07aWYoIWcpcmV0dXJuO2cubGFzdFRvdWNofHwoZy5sYXN0VG91Y2g9Zy5zdGFydFRvdWNoKSxnLmxhc3RUaW1lfHwoZy5sYXN0VGltZT1nLnN0YXJ0VGltZSksZy52ZWxvY2l0eVh8fChnLnZlbG9jaXR5WD0wKSxnLnZlbG9jaXR5WXx8KGcudmVsb2NpdHlZPTApLGcuZHVyYXRpb258fChnLmR1cmF0aW9uPTApO3ZhciBoPURhdGUubm93KCktZy5sYXN0VGltZSxpPShmLmNsaWVudFgtZy5sYXN0VG91Y2guY2xpZW50WCkvaCxqPShmLmNsaWVudFktZy5sYXN0VG91Y2guY2xpZW50WSkvaCxrPTcwO2g+ayYmKGg9ayksZy5kdXJhdGlvbitoPmsmJihnLmR1cmF0aW9uPWstaCksZy52ZWxvY2l0eVg9KGcudmVsb2NpdHlYKmcuZHVyYXRpb24raSpoKS8oZy5kdXJhdGlvbitoKSxnLnZlbG9jaXR5WT0oZy52ZWxvY2l0eVkqZy5kdXJhdGlvbitqKmgpLyhnLmR1cmF0aW9uK2gpLGcuZHVyYXRpb24rPWgsZy5sYXN0VG91Y2g9e307Zm9yKHZhciBtIGluIGYpZy5sYXN0VG91Y2hbbV09ZlttXTtnLmxhc3RUaW1lPURhdGUubm93KCk7dmFyIG49Zi5jbGllbnRYLWcuc3RhcnRUb3VjaC5jbGllbnRYLG89Zi5jbGllbnRZLWcuc3RhcnRUb3VjaC5jbGllbnRZLHA9TWF0aC5zcXJ0KE1hdGgucG93KG4sMikrTWF0aC5wb3cobywyKSk7KFwidGFwcGluZ1wiPT09Zy5zdGF0dXN8fFwicHJlc3NpbmdcIj09PWcuc3RhdHVzKSYmcD4xMCYmKGcuc3RhdHVzPVwicGFubmluZ1wiLGcuaXNWZXJ0aWNhbD0hKE1hdGguYWJzKG4pPk1hdGguYWJzKG8pKSxjKGcuZWxlbWVudCxcInBhbnN0YXJ0XCIse3RvdWNoOmYsdG91Y2hlczphLnRvdWNoZXMsY2hhbmdlZFRvdWNoZXM6YS5jaGFuZ2VkVG91Y2hlcyx0b3VjaEV2ZW50OmEsaXNWZXJ0aWNhbDpnLmlzVmVydGljYWx9KSxjKGcuZWxlbWVudCwoZy5pc1ZlcnRpY2FsP1widmVydGljYWxcIjpcImhvcml6b250YWxcIikrXCJwYW5zdGFydFwiLHt0b3VjaDpmLHRvdWNoRXZlbnQ6YX0pKSxcInBhbm5pbmdcIj09PWcuc3RhdHVzJiYoZy5wYW5UaW1lPURhdGUubm93KCksYyhnLmVsZW1lbnQsXCJwYW5tb3ZlXCIse2Rpc3BsYWNlbWVudFg6bixkaXNwbGFjZW1lbnRZOm8sdG91Y2g6Zix0b3VjaGVzOmEudG91Y2hlcyxjaGFuZ2VkVG91Y2hlczphLmNoYW5nZWRUb3VjaGVzLHRvdWNoRXZlbnQ6YSxpc1ZlcnRpY2FsOmcuaXNWZXJ0aWNhbH0pLGcuaXNWZXJ0aWNhbD9jKGcuZWxlbWVudCxcInZlcnRpY2FscGFubW92ZVwiLHtkaXNwbGFjZW1lbnRZOm8sdG91Y2g6Zix0b3VjaEV2ZW50OmF9KTpjKGcuZWxlbWVudCxcImhvcml6b250YWxwYW5tb3ZlXCIse2Rpc3BsYWNlbWVudFg6bix0b3VjaDpmLHRvdWNoRXZlbnQ6YX0pKX1pZigyPT1PYmplY3Qua2V5cyhsKS5sZW5ndGgpe2Zvcih2YXIgcSxyPVtdLHM9W10sdD1bXSxlPTA7ZTxhLnRvdWNoZXMubGVuZ3RoO2UrKyl7dmFyIGY9YS50b3VjaGVzW2VdLGc9bFtmLmlkZW50aWZpZXJdO3IucHVzaChbZy5zdGFydFRvdWNoLmNsaWVudFgsZy5zdGFydFRvdWNoLmNsaWVudFldKSxzLnB1c2goW2YuY2xpZW50WCxmLmNsaWVudFldKX1mb3IodmFyIG0gaW4gbCl0LnB1c2gobFttXS5lbGVtZW50KTtxPWQoclswXVswXSxyWzBdWzFdLHJbMV1bMF0sclsxXVsxXSxzWzBdWzBdLHNbMF1bMV0sc1sxXVswXSxzWzFdWzFdKSxjKGIodFswXSx0WzFdKSxcImR1YWx0b3VjaFwiLHt0cmFuc2Zvcm06cSx0b3VjaGVzOmEudG91Y2hlcyx0b3VjaEV2ZW50OmF9KX19ZnVuY3Rpb24gZyhhKXtpZigyPT1PYmplY3Qua2V5cyhsKS5sZW5ndGgpe3ZhciBkPVtdO2Zvcih2YXIgZSBpbiBsKWQucHVzaChsW2VdLmVsZW1lbnQpO2MoYihkWzBdLGRbMV0pLFwiZHVhbHRvdWNoZW5kXCIse3RvdWNoZXM6ay5jYWxsKGEudG91Y2hlcyksdG91Y2hFdmVudDphfSl9Zm9yKHZhciBpPTA7aTxhLmNoYW5nZWRUb3VjaGVzLmxlbmd0aDtpKyspe3ZhciBuPWEuY2hhbmdlZFRvdWNoZXNbaV0sbz1uLmlkZW50aWZpZXIscD1sW29dO2lmKHApe2lmKHAucHJlc3NpbmdIYW5kbGVyJiYoY2xlYXJUaW1lb3V0KHAucHJlc3NpbmdIYW5kbGVyKSxwLnByZXNzaW5nSGFuZGxlcj1udWxsKSxcInRhcHBpbmdcIj09PXAuc3RhdHVzJiYocC50aW1lc3RhbXA9RGF0ZS5ub3coKSxjKHAuZWxlbWVudCxcInRhcFwiLHt0b3VjaDpuLHRvdWNoRXZlbnQ6YX0pLG0mJnAudGltZXN0YW1wLW0udGltZXN0YW1wPDMwMCYmYyhwLmVsZW1lbnQsXCJkb3VibGV0YXBcIix7dG91Y2g6bix0b3VjaEV2ZW50OmF9KSxtPXApLFwicGFubmluZ1wiPT09cC5zdGF0dXMpe3ZhciBxPURhdGUubm93KCkscj1xLXAuc3RhcnRUaW1lLHM9KChuLmNsaWVudFgtcC5zdGFydFRvdWNoLmNsaWVudFgpL3IsKG4uY2xpZW50WS1wLnN0YXJ0VG91Y2guY2xpZW50WSkvcixuLmNsaWVudFgtcC5zdGFydFRvdWNoLmNsaWVudFgpLHQ9bi5jbGllbnRZLXAuc3RhcnRUb3VjaC5jbGllbnRZLHU9TWF0aC5zcXJ0KHAudmVsb2NpdHlZKnAudmVsb2NpdHlZK3AudmVsb2NpdHlYKnAudmVsb2NpdHlYKSx2PXU+LjUmJnEtcC5sYXN0VGltZTwxMDAsdz17ZHVyYXRpb246cixpc2ZsaWNrOnYsdmVsb2NpdHlYOnAudmVsb2NpdHlYLHZlbG9jaXR5WTpwLnZlbG9jaXR5WSxkaXNwbGFjZW1lbnRYOnMsZGlzcGxhY2VtZW50WTp0LHRvdWNoOm4sdG91Y2hlczphLnRvdWNoZXMsY2hhbmdlZFRvdWNoZXM6YS5jaGFuZ2VkVG91Y2hlcyx0b3VjaEV2ZW50OmEsaXNWZXJ0aWNhbDpwLmlzVmVydGljYWx9O2MocC5lbGVtZW50LFwicGFuZW5kXCIsdyksdiYmKGMocC5lbGVtZW50LFwic3dpcGVcIix3KSxwLmlzVmVydGljYWw/YyhwLmVsZW1lbnQsXCJ2ZXJ0aWNhbHN3aXBlXCIsdyk6YyhwLmVsZW1lbnQsXCJob3Jpem9udGFsc3dpcGVcIix3KSl9XCJwcmVzc2luZ1wiPT09cC5zdGF0dXMmJmMocC5lbGVtZW50LFwicHJlc3NlbmRcIix7dG91Y2g6bix0b3VjaEV2ZW50OmF9KSxkZWxldGUgbFtvXX19MD09PU9iamVjdC5rZXlzKGwpLmxlbmd0aCYmKGoucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLGYsITEpLGoucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsZywhMSksai5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hjYW5jZWxcIixoLCExKSl9ZnVuY3Rpb24gaChhKXtpZigyPT1PYmplY3Qua2V5cyhsKS5sZW5ndGgpe3ZhciBkPVtdO2Zvcih2YXIgZSBpbiBsKWQucHVzaChsW2VdLmVsZW1lbnQpO2MoYihkWzBdLGRbMV0pLFwiZHVhbHRvdWNoZW5kXCIse3RvdWNoZXM6ay5jYWxsKGEudG91Y2hlcyksdG91Y2hFdmVudDphfSl9Zm9yKHZhciBpPTA7aTxhLmNoYW5nZWRUb3VjaGVzLmxlbmd0aDtpKyspe3ZhciBtPWEuY2hhbmdlZFRvdWNoZXNbaV0sbj1tLmlkZW50aWZpZXIsbz1sW25dO28mJihvLnByZXNzaW5nSGFuZGxlciYmKGNsZWFyVGltZW91dChvLnByZXNzaW5nSGFuZGxlciksby5wcmVzc2luZ0hhbmRsZXI9bnVsbCksXCJwYW5uaW5nXCI9PT1vLnN0YXR1cyYmYyhvLmVsZW1lbnQsXCJwYW5lbmRcIix7dG91Y2g6bSx0b3VjaGVzOmEudG91Y2hlcyxjaGFuZ2VkVG91Y2hlczphLmNoYW5nZWRUb3VjaGVzLHRvdWNoRXZlbnQ6YX0pLFwicHJlc3NpbmdcIj09PW8uc3RhdHVzJiZjKG8uZWxlbWVudCxcInByZXNzZW5kXCIse3RvdWNoOm0sdG91Y2hFdmVudDphfSksZGVsZXRlIGxbbl0pfTA9PT1PYmplY3Qua2V5cyhsKS5sZW5ndGgmJihqLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIixmLCExKSxqLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLGcsITEpLGoucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoY2FuY2VsXCIsaCwhMSkpfXZhciBpPWEuZG9jdW1lbnQsaj1pLmRvY3VtZW50RWxlbWVudCxrPUFycmF5LnByb3RvdHlwZS5zbGljZSxsPXt9LG09bnVsbDtqLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsZSwhMSl9KHdpbmRvdyk7O21vZHVsZS5leHBvcnRzID0gd2luZG93LmxpYlsnZ2VzdHVyZWpzJ107XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2dlc3R1cmVqcy9idWlsZC9nZXN0dXJlanMuY29tbW9uLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmdlbmVyYXRlID0gZ2VuZXJhdGU7XG5mdW5jdGlvbiBnZW5lcmF0ZShwMXgsIHAxeSwgcDJ4LCBwMnkpIHtcbiAgICB2YXIgWkVST19MSU1JVCA9IDFlLTY7XG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBwb2x5bm9taWFsIGNvZWZmaWNpZW50cyxcbiAgICAvLyBpbXBsaWNpdCBmaXJzdCBhbmQgbGFzdCBjb250cm9sIHBvaW50cyBhcmUgKDAsMCkgYW5kICgxLDEpLlxuICAgIHZhciBheCA9IDMgKiBwMXggLSAzICogcDJ4ICsgMTtcbiAgICB2YXIgYnggPSAzICogcDJ4IC0gNiAqIHAxeDtcbiAgICB2YXIgY3ggPSAzICogcDF4O1xuXG4gICAgdmFyIGF5ID0gMyAqIHAxeSAtIDMgKiBwMnkgKyAxO1xuICAgIHZhciBieSA9IDMgKiBwMnkgLSA2ICogcDF5O1xuICAgIHZhciBjeSA9IDMgKiBwMXk7XG5cbiAgICBmdW5jdGlvbiBzYW1wbGVDdXJ2ZURlcml2YXRpdmVYKHQpIHtcbiAgICAgICAgLy8gYGF4IHReMyArIGJ4IHReMiArIGN4IHQnIGV4cGFuZGVkIHVzaW5nIEhvcm5lciAncyBydWxlLlxuICAgICAgICByZXR1cm4gKDMgKiBheCAqIHQgKyAyICogYngpICogdCArIGN4O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNhbXBsZUN1cnZlWCh0KSB7XG4gICAgICAgIHJldHVybiAoKGF4ICogdCArIGJ4KSAqIHQgKyBjeCkgKiB0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNhbXBsZUN1cnZlWSh0KSB7XG4gICAgICAgIHJldHVybiAoKGF5ICogdCArIGJ5KSAqIHQgKyBjeSkgKiB0O1xuICAgIH1cblxuICAgIC8vIEdpdmVuIGFuIHggdmFsdWUsIGZpbmQgYSBwYXJhbWV0cmljIHZhbHVlIGl0IGNhbWUgZnJvbS5cbiAgICBmdW5jdGlvbiBzb2x2ZUN1cnZlWCh4KSB7XG4gICAgICAgIHZhciB0MiA9IHg7XG4gICAgICAgIHZhciBkZXJpdmF0aXZlO1xuICAgICAgICB2YXIgeDI7XG5cbiAgICAgICAgLy8gaHR0cHM6Ly90cmFjLndlYmtpdC5vcmcvYnJvd3Nlci90cnVuay9Tb3VyY2UvV2ViQ29yZS9wbGF0Zm9ybS9hbmltYXRpb25cbiAgICAgICAgLy8gRmlyc3QgdHJ5IGEgZmV3IGl0ZXJhdGlvbnMgb2YgTmV3dG9uJ3MgbWV0aG9kIC0tIG5vcm1hbGx5IHZlcnkgZmFzdC5cbiAgICAgICAgLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9OZXd0b24nc19tZXRob2RcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgICAgIC8vIGYodCkteD0wXG4gICAgICAgICAgICB4MiA9IHNhbXBsZUN1cnZlWCh0MikgLSB4O1xuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHgyKSA8IFpFUk9fTElNSVQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZXJpdmF0aXZlID0gc2FtcGxlQ3VydmVEZXJpdmF0aXZlWCh0Mik7XG4gICAgICAgICAgICAvLyA9PSAwLCBmYWlsdXJlXG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhkZXJpdmF0aXZlKSA8IFpFUk9fTElNSVQpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHQyIC09IHgyIC8gZGVyaXZhdGl2ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZhbGwgYmFjayB0byB0aGUgYmlzZWN0aW9uIG1ldGhvZCBmb3IgcmVsaWFiaWxpdHkuXG4gICAgICAgIC8vIGJpc2VjdGlvblxuICAgICAgICAvLyBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jpc2VjdGlvbl9tZXRob2RcbiAgICAgICAgdmFyIHQxID0gMTtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgdmFyIHQwID0gMDtcblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICB0MiA9IHg7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIHdoaWxlICh0MSA+IHQwKSB7XG4gICAgICAgICAgICB4MiA9IHNhbXBsZUN1cnZlWCh0MikgLSB4O1xuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHgyKSA8IFpFUk9fTElNSVQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoeDIgPiAwKSB7XG4gICAgICAgICAgICAgICAgdDEgPSB0MjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdDAgPSB0MjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHQyID0gKHQxICsgdDApIC8gMjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZhaWx1cmVcbiAgICAgICAgcmV0dXJuIHQyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNvbHZlKHgpIHtcbiAgICAgICAgcmV0dXJuIHNhbXBsZUN1cnZlWShzb2x2ZUN1cnZlWCh4KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNvbHZlO1xufVxuXG52YXIgbGluZWFyID0gZXhwb3J0cy5saW5lYXIgPSBnZW5lcmF0ZSgwLCAwLCAxLCAxKTtcbnZhciBlYXNlID0gZXhwb3J0cy5lYXNlID0gZ2VuZXJhdGUoLjI1LCAuMSwgLjI1LCAxKTtcbnZhciBlYXNlSW4gPSBleHBvcnRzLmVhc2VJbiA9IGdlbmVyYXRlKC40MiwgMCwgMSwgMSk7XG52YXIgZWFzZU91dCA9IGV4cG9ydHMuZWFzZU91dCA9IGdlbmVyYXRlKDAsIDAsIC41OCwgMSk7XG52YXIgZWFzZUluT3V0ID0gZXhwb3J0cy5lYXNlSW5PdXQgPSBnZW5lcmF0ZSguNDIsIDAsIC41OCwgMSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2FtZmUtY3ViaWNiZXppZXIvc3JjL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge0Jlemllcn0gZnJvbSAnYW1mZS1jdWJpY2Jlemllcic7XG5cbmNvbnN0IEZQUyA9IDYwO1xudmFyIElOVEVSVkFMID0gMTAwMCAvIEZQUztcblxuZnVuY3Rpb24gc2V0VGltZW91dEZyYW1lKGNiKSB7XG4gICAgcmV0dXJuIHNldFRpbWVvdXQoY2IsIElOVEVSVkFMKTtcbn1cblxuZnVuY3Rpb24gY2xlYXJUaW1lb3V0RnJhbWUodGljaykge1xuICAgIGNsZWFyVGltZW91dCh0aWNrKTtcbn1cblxudmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgc2V0VGltZW91dEZyYW1lO1xuXG5cbnZhciBjYW5jZWxBbmltYXRpb25GcmFtZSA9XG4gICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgd2luZG93Lm1zQ2FuY2VsQW5pbWF0aW9uRnJhbWUgfHxcbiAgICB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUgfHxcbiAgICB3aW5kb3cubW96Q2FuY2VsQW5pbWF0aW9uRnJhbWUgfHxcbiAgICBjbGVhclRpbWVvdXRGcmFtZTtcblxuaWYgKHJlcXVlc3RBbmltYXRpb25GcmFtZSA9PT0gc2V0VGltZW91dEZyYW1lIHx8IGNhbmNlbEFuaW1hdGlvbkZyYW1lID09PSBjbGVhclRpbWVvdXRGcmFtZSkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHNldFRpbWVvdXRGcmFtZTtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSA9IGNsZWFyVGltZW91dEZyYW1lO1xufVxuXG5mdW5jdGlvbiBQcm9taXNlRGVmZXIoKSB7XG4gICAgdmFyIGRlZmVycmVkID0ge307XG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGRlZmVycmVkLnJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICBkZWZlcnJlZC5yZWplY3QgPSByZWplY3Q7XG4gICAgfSk7XG4gICAgZGVmZXJyZWQucHJvbWlzZSA9IHByb21pc2U7XG4gICAgcmV0dXJuIGRlZmVycmVkO1xufVxuXG5mdW5jdGlvbiBQcm9taXNlTWl4aW4ocHJvbWlzZSwgY29udGV4dCkge1xuICAgIHZhciBfcHJvbWlzZSA9IHByb21pc2U7XG4gICAgWyd0aGVuJywgJ2NhdGNoJ10uZm9yRWFjaCgobWV0aG9kKSA9PiB7XG4gICAgICAgIGNvbnRleHRbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VbbWV0aG9kXS5hcHBseShfcHJvbWlzZSwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICByZXR1cm4gY29udGV4dDtcbn1cblxuXG5mdW5jdGlvbiBnZXRGcmFtZVF1ZXVlKGR1cmF0aW9uLCBmcmFtZXMpIHtcbiAgICBpZiAodHlwZW9mIGZyYW1lcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBmcmFtZXMgPSB7XG4gICAgICAgICAgICAnMCc6IGZyYW1lc1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHZhciBmcmFtZUNvdW50ID0gZHVyYXRpb24gLyBJTlRFUlZBTDtcbiAgICB2YXIgZnJhbWVQZXJjZW50ID0gMSAvIGZyYW1lQ291bnQ7XG4gICAgdmFyIGZyYW1lUXVldWUgPSBbXTtcbiAgICB2YXIgZnJhbWVLZXlzID0gT2JqZWN0LmtleXMoZnJhbWVzKS5tYXAoaSA9PiBwYXJzZUludChpKSk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZyYW1lQ291bnQ7IGkrKykge1xuICAgICAgICB2YXIga2V5ID0gZnJhbWVLZXlzWzBdO1xuICAgICAgICB2YXIgcGVyY2VudCA9IGZyYW1lUGVyY2VudCAqIGk7XG4gICAgICAgIGlmIChrZXkgIT09IG51bGwgJiYga2V5IDw9IHBlcmNlbnQgKiAxMDApIHtcbiAgICAgICAgICAgIHZhciBmcmFtZSA9IGZyYW1lc1trZXkudG9TdHJpbmcoKV07XG4gICAgICAgICAgICBpZiAoIShmcmFtZSBpbnN0YW5jZW9mIEZyYW1lKSkge1xuICAgICAgICAgICAgICAgIGZyYW1lID0gbmV3IEZyYW1lKGZyYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZyYW1lUXVldWUucHVzaChmcmFtZSk7XG4gICAgICAgICAgICBmcmFtZUtleXMuc2hpZnQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChmcmFtZVF1ZXVlLmxlbmd0aCkge1xuICAgICAgICAgICAgZnJhbWVRdWV1ZS5wdXNoKGZyYW1lUXVldWVbZnJhbWVRdWV1ZS5sZW5ndGggLSAxXS5jbG9uZSgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmcmFtZVF1ZXVlO1xufVxuXG5mdW5jdGlvbiBnZXRCZXppZXIodGltaW5nRnVuY3Rpb24pIHtcbiAgICB2YXIgYmV6aWVyO1xuICAgIGlmICh0eXBlb2YgdGltaW5nRnVuY3Rpb24gPT09ICdzdHJpbmcnIHx8IHRpbWluZ0Z1bmN0aW9uIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgaWYgKEJlemllcikge1xuICAgICAgICAgICAgLy9jb25zb2xlLmVycm9yKCdyZXF1aXJlIGFtZmUtY3ViaWNiZXppZXInKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGltaW5nRnVuY3Rpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaWYgKEJlemllclt0aW1pbmdGdW5jdGlvbl0pIHtcbiAgICAgICAgICAgICAgICAgICAgYmV6aWVyID0gQmV6aWVyW3RpbWluZ0Z1bmN0aW9uXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRpbWluZ0Z1bmN0aW9uIGluc3RhbmNlb2YgQXJyYXkgJiYgdGltaW5nRnVuY3Rpb24ubGVuZ3RoID09PSA0KXtcbiAgICAgICAgICAgICAgICBiZXppZXIgPSBCZXppZXIuYXBwbHkoQmV6aWVyLCB0aW1pbmdGdW5jdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aW1pbmdGdW5jdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBiZXppZXIgPSB0aW1pbmdGdW5jdGlvbjtcbiAgICB9XG5cbiAgICByZXR1cm4gYmV6aWVyO1xufVxuXG4vKipcbiAqIOaehOmAoOS4gOS4quW4p+WvueixoVxuICogQGNsYXNzIGxpYi5hbmltYXRpb25+RnJhbWVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1biDlvZPliY3luKfmiafooYznmoTlh73mlbBcbiAqL1xuZnVuY3Rpb24gRnJhbWUoZnVuKSB7XG4gICAgdmFyIGRlZmVyO1xuICAgIHZhciB0aWNrO1xuICAgIHZhciBpc0NhbmNlbCA9ZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiDmiafooYzluKdcbiAgICAgKiBAbWV0aG9kIHJlcXVlc3RcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAbWVtYmVyT2YgbGliLmFuaW1hdGlvbn5GcmFtZVxuICAgICAqIEByZXR1cm4ge2xpYi5hbmltYXRpb25+RnJhbWV9IOW9k+WJjeWunuS+i1xuICAgICAqL1xuICAgIHRoaXMucmVxdWVzdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpc0NhbmNlbCA9IGZhbHNlO1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcblxuICAgICAgICBkZWZlciA9IFByb21pc2VEZWZlcigpO1xuICAgICAgICBQcm9taXNlTWl4aW4oZGVmZXIucHJvbWlzZSwgdGhpcyk7XG5cbiAgICAgICAgdGljayA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNDYW5jZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZlciAmJiBkZWZlci5yZXNvbHZlKGZ1bi5hcHBseSh3aW5kb3csIGFyZ3MpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIOWPlua2iOaJp+ihjFxuICAgICAqIEBtZXRob2QgY2FuY2VsXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQG1lbWJlck9mIGxpYi5hbmltYXRpb25+RnJhbWVcbiAgICAgKiBAcmV0dXJuIHtsaWIuYW5pbWF0aW9ufkZyYW1lfSDlvZPliY3lrp7kvotcbiAgICAgKi9cbiAgICB0aGlzLmNhbmNlbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGljaykge1xuICAgICAgICAgICAgaXNDYW5jZWwgPSB0cnVlO1xuICAgICAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGljayk7XG4gICAgICAgICAgICBkZWZlciAmJiBkZWZlci5yZWplY3QoJ0NBTkNFTCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIOWkjeWItuS4gOS4quW4p+WunuS+i1xuICAgICAqIEBtZXRob2QgY2xvbmVcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAbWVtYmVyT2YgbGliLmFuaW1hdGlvbn5GcmFtZVxuICAgICAqIEByZXR1cm4ge2xpYi5hbmltYXRpb25+RnJhbWV9IOaWsOWunuS+i1xuICAgICAqL1xuICAgIHRoaXMuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBGcmFtZShmdW4pO1xuICAgIH07XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgYW5pbWF0aW9uIHtcblxuICAgIC8qKlxuICAgICAqIOWIneWni+WMluS4gOS4quWKqOeUu+WunuS+i1xuICAgICAqIEBtZXRob2QgYW5pbWF0aW9uXG4gICAgICogQG1lbWJlck9mIGxpYlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvbiAgICAgICDliqjnlLvml7bpl7TvvIzljZXkvY3mr6vnp5JcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheXxGdW5jdGlvbn0gdGltaW5nRnVuY3Rpb24g5pe26Ze05Ye95pWw77yM5pSv5oyB5qCH5YeG55qE5pe26Ze05Ye95pWw5ZCN44CB6LSd5aGe5bCU5puy57q/5pWw57uE77yI6ZyA6KaBbGliLmN1YmljYmV6aWVy5bqT5pSv5oyB77yJ5Lul5Y+K6Ieq5a6a5LmJ5Ye95pWwXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnJhbWVzICAgICAgIOavj+S4gOW4p+aJp+ihjOeahOWHveaVsFxuICAgICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IGZyYW1lIOWIneWni+WMluS4gOS4quW4p+WunuS+i1xuICAgICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHJlcXVlc3RGcmFtZSDnq4vljbPor7fmsYLluKdcbiAgICAgKiBAcmV0dXJuIHtsaWIuYW5pbWF0aW9ufkFuaW1hdGlvbn0gICAgICAgICAgICBBbmltYXRpb27lrp7kvotcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihkdXJhdGlvbiwgdGltaW5nRnVuY3Rpb24sIGZyYW1lcykge1xuICAgICAgICB2YXIgZGVmZXI7XG4gICAgICAgIHZhciBmcmFtZVF1ZXVlID0gZ2V0RnJhbWVRdWV1ZShkdXJhdGlvbiwgZnJhbWVzKTtcbiAgICAgICAgdmFyIGZyYW1lUGVyY2VudCA9IDEgLyAoZHVyYXRpb24gLyBJTlRFUlZBTCk7XG4gICAgICAgIHZhciBmcmFtZUluZGV4ID0gMDtcbiAgICAgICAgdmFyIGJlemllciA9IGdldEJlemllcih0aW1pbmdGdW5jdGlvbik7XG5cbiAgICAgICAgaWYgKCFiZXppZXIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndW5leGNlcHQgdGltaW5nIGZ1bmN0aW9uJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiDmkq3mlL7liqjnlLtcbiAgICAgICAgICogQG1ldGhvZCBwbGF5XG4gICAgICAgICAqIEByZXR1cm4ge2xpYi5hbmltYXRpb25+QW5pbWF0aW9ufSB0aGlzIOW9k+WJjeWunuS+i1xuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICogQG1lbWJlck9mIGxpYi5hbmltYXRpb25+QW5pbWF0aW9uXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBsYXkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChpc1BsYXlpbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpc1BsYXlpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAoIWRlZmVyKSB7XG4gICAgICAgICAgICAgICAgZGVmZXIgPSBQcm9taXNlRGVmZXIoKTtcbiAgICAgICAgICAgICAgICBQcm9taXNlTWl4aW4oZGVmZXIucHJvbWlzZSwgdGhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlcXVlc3QoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBlcmNlbnQgPSBmcmFtZVBlcmNlbnQgKiAoZnJhbWVJbmRleCArIDEpLnRvRml4ZWQoMTApO1xuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50RnJhbWUgPSBmcmFtZVF1ZXVlW2ZyYW1lSW5kZXhdO1xuXG4gICAgICAgICAgICAgICAgY3VycmVudEZyYW1lXG4gICAgICAgICAgICAgICAgICAgIC5yZXF1ZXN0KHBlcmNlbnQudG9GaXhlZCgxMCksIHRpbWluZ0Z1bmN0aW9uKHBlcmNlbnQpLnRvRml4ZWQoMTApKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzUGxheWluZyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZnJhbWVJbmRleCA9PT0gZnJhbWVRdWV1ZS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXIgJiYgZGVmZXIucmVzb2x2ZSgnRklOSVNIJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmFtZUluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDQU5DRUxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcXVlc3QoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDmmoLlgZzliqjnlLtcbiAgICAgICAgICogQG1ldGhvZCBzdG9wXG4gICAgICAgICAqIEByZXR1cm4ge2xpYi5hbmltYXRpb25+QW5pbWF0aW9ufSB0aGlzIOW9k+WJjeWunuS+i1xuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICogQG1lbWJlck9mIGxpYi5hbmltYXRpb25+QW5pbWF0aW9uXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnN0b3AgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghaXNQbGF5aW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXNQbGF5aW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmIChmcmFtZVF1ZXVlW2ZyYW1lSW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgZnJhbWVRdWV1ZVtmcmFtZUluZGV4XS5jYW5jZWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmnoTpgKDkuIDkuKrluKflr7nosaFcbiAgICAgKiBAY2xhc3MgbGliLmFuaW1hdGlvbn5GcmFtZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1biDlvZPliY3luKfmiafooYznmoTlh73mlbBcbiAgICAgKi9cbiAgICBmcmFtZSAoZnVuKXtcbiAgICAgICAgcmV0dXJuIG5ldyBGcmFtZShmdW4pO1xuICAgIH1cblxuICAgIHJlcXVlc3RGcmFtZSAoZnVuKSB7XG4gICAgICAgIHZhciBmcmFtZSA9IG5ldyBGcmFtZShmdW4pO1xuICAgICAgICByZXR1cm4gZnJhbWUucmVxdWVzdCgpO1xuICAgIH1cbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vYW5pbWF0aW9uLWpzL3NyYy9pbmRleC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=