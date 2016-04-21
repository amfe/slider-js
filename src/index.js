import 'gesturejs';
import * as cubicbezier from 'amfe-cubicbezier';
import Animation from 'animation-js';

if (typeof global.window === 'undefined') {
    throw new Error('can not be running in non-browser');
}

const win = global.window;
const doc = win.document;
const ua = win.navigator.userAgent;
const Firefox = !!ua.match(/Firefox/i);
const IEMobile = !!ua.match(/IEMobile/i);
const stylePrefix = Firefox ? 'Moz' :
    IEMobile ? 'ms' : 'webkit';

export function getTransformOffset(element) {
    var offset = {
        x: 0,
        y: 0
    };
    var transform = getComputedStyle(element)[`${stylePrefix}Transform`];
    var matched;

    if (transform !== 'none') {
        if ((matched = transform.match(/^matrix3d\((?:[-\d.]+,\s*){12}([-\d.]+),\s*([-\d.]+)(?:,\s*[-\d.]+){2}\)/) ||
                transform.match(/^matrix\((?:[-\d.]+,\s*){4}([-\d.]+),\s*([-\d.]+)\)$/))) {
            offset.x = parseFloat(matched[1]) || 0;
            offset.y = parseFloat(matched[2]) || 0;
        }
    }

    return offset;
}

var CSSMatrix = IEMobile ? 'MSCSSMatrix' : 'WebKitCSSMatrix';
var has3d = !!Firefox || CSSMatrix in win && 'm11' in new win[CSSMatrix]();
export function getTranslate(x, y) {
    x = parseFloat(x);
    y = parseFloat(y);

    if (x !== 0) {
        x += 'px';
    }

    if (y !== 0) {
        y += 'px';
    }

    if (has3d) {
        return `translate3d(${x}, ${y}, 0)`;
    } else {
        return `translate(${x}, ${y})`;
    }
}

function fireEvent(el, name, extra) {
    const ev = doc.createEvent('HTMLEvents');
    ev.initEvent(name, false, false);
    if (extra) {
        for (const key in extra) {
            ev[key] = extra[key];
        }
    }
    el.dispatchEvent(ev);
}

export class Items {
    constructor(options) {
        this.parentRoot = options.parentRoot;
        this.parentElement = options.parentElement;
        this.step = options.step;
        this.length = 0;
        this.index = 0;
        this.transformOffset = 0;
    }

    add(htmlElement) {
        let itemElement = document.createElement('li');
        if (typeof htmlElement === 'string') {
            itemElement.innerHTML = htmlElement;
        } else if (htmlElement.length > 1) {
            for (const el of htmlElement) {
                itemElement.appendChild(el);
            }
        } else if (htmlElement instanceof HTMLElement &&
            htmlElement.tagName.toLowerCase() === 'li') {
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
            get() {
                return itemElement;
            }
        });

        this.length++;

        return itemElement;
    }

    _normalizeIndex(index) {
        while (index < 0) {
            index += this.length;
        }

        while (index >= this.length) {
            index -= this.length;
        }

        return index;
    }

    get(index) {
        return this[String(this._normalizeIndex(index))];
    }

    _getCloned(index) {
        index = String(this._normalizeIndex(index));
        let item = this.parentElement.querySelector(`[cloned="cloned-${index}"]`);

        if (!item) {
            item = this[index].cloneNode(true);
            item.setAttribute('cloned', `cloned-${index}`);
            item.index = index;
            this.parentElement.appendChild(item);
        }

        return item;
    }

    _activate(index) {
        if (this.length === 0) {
            return;
        }

        const curItem = this.get(index);
        let prevItem;
        let nextItem;

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

            curItem.style.left = `${-this.transformOffset}px`;
            prevItem.style.left = `${-this.transformOffset - this.step}px`;
            prevItem.style.display = '';
            nextItem.style.left = `${-this.transformOffset + this.step}px`;
            nextItem.style.display = '';
        }

        this.index = curItem.index;
        curItem.style.display = '';

        fireEvent(this.parentRoot, 'change', {
            prevItem,
            curItem,
            nextItem
        });
    }

    slide(index) {
        if (this.length === 0) {
            return;
        }

        if (this.length === 1) {
            index = 0;
        }

        const startOffset = getTransformOffset(this.parentElement).x;
        const endOffset = this.transformOffset + this.step * (-index);
        const interOffset = endOffset - startOffset;

        if (interOffset === 0) {
            return;
        }

        const anim = new Animation(400, cubicbezier.ease, (i1, i2) => {
            this.parentElement.style[`${stylePrefix}Transform`] = getTranslate(startOffset + interOffset * i2, 0);
        });

        return anim.play().then(() => {
            this.transformOffset = endOffset;
            this.parentElement.style[`${stylePrefix}Transform`] = getTranslate(endOffset, 0);
            index && this._activate(this.index + index);
        });
    }

    next() {
        this.slide(1);
    }

    prev() {
        this.slide(-1);
    }

}

var incId = 0;
export default class Slider {
    constructor(...args) {
        this._initDom(...args);
        this._initGestrue(...args);

        this._isStarting = false;
        this._isPlaying = false;
        this._isSliding = false;
        this._isPanning = false;
        this._displacement;

        this.playInterval = this.options.playInterval || 1500;

        var autoplay = false;
        var readyToPlay = false;
        Object.defineProperty(this, 'autoplay', {
            get() {
                return autoplay;
            },
            set(v) {
                autoplay = !!v;
                if (readyToPlay) {
                    clearTimeout(readyToPlay);
                    readyToPlay = false;
                }
                if (autoplay) {
                    readyToPlay = setTimeout(() => {
                        this.play();
                    }, 2000);
                } else {
                    this.stop();
                }
            }
        });
        this.autoplay = !!this.options.autoplay;
    }

    _initDom(...args) {
        this.id = `${Date.now()}-${++incId}`;
        this.root = document.createDocumentFragment();

        if (args.length === 1 && !(args[0] instanceof HTMLElement)) {
            this.element = null;
            this.options = args[0] || {};
        } else {
            this.element = args[0];
            this.options = args[1] || {};
        }

        if (!this.element) {
            this.element = document.createElement('ul');
            this.root.appendChild(this.element);
        }

        this.element.setAttribute('data-ctrl-name', 'slider');
        this.element.setAttribute('data-ctrl-id', this.id);
        this.element.style.position = 'relative';
        this.element.style[`${stylePrefix}Transform`] = getTranslate(0, 0);

        this.items = new Items({
            parentRoot: this.root,
            parentElement: this.element,
            step: this.options.step || this.element.getBoundingClientRect().width
        });

        const itemElements = this.element.querySelectorAll('li');
        for (const element of itemElements) {
            this.items.add(element);
        }
    }

    _initGestrue() {
        if (this.options.useGesture) {
            this.element.addEventListener('panstart', e => {
                if (!e.isVertical &&
                    !(this._isPanning && this._isSliding)) {
                    e.preventDefault();
                    e.stopPropagation();

                    if (this.autoplay) {
                        this.stop();
                    }

                    this._displacement = 0;
                    this._isPanning = true;
                }
            });

            this.element.addEventListener('panmove', e => {
                if (!e.isVertical && this._isPanning) {
                    e.preventDefault();
                    e.stopPropagation();

                    this._displacement = e.displacementX;
                    this.element.style[`${stylePrefix}Transform`] =
                        getTranslate(this.items.transformOffset + this._displacement, 0);
                }
            });

            this.element.addEventListener('panend', e => {
                if (!e.isVertical && this._isPanning) {
                    e.preventDefault();
                    e.stopPropagation();

                    this._isPanning = false;

                    if (e.isflick) {
                        if (this._displacement < 0) {
                            this.items.next();
                        } else {
                            this.items.prev();
                        }
                    } else {
                        if (Math.abs(this._displacement) < this.items.step / 2) {
                            this.items.slide(0);
                        } else {
                            this.items.slide(this._displacement < 0 ? 1 : -1);
                        }
                    }

                    if (this.autoplay) {
                        setTimeout(() => {
                            this.play();
                        }, 2000);
                    }
                }
            }, false);

            this.element.addEventListener('flick', e => {
                if (!e.isVertical) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        }
    }

    play() {
        const that = this;

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
            setTimeout(() => {
                that._isSliding = false;
            }, 500);
            that._isPlaying = setTimeout(playing, 400 + that.playInterval);
        }

        this._isPlaying = setTimeout(playing, 400 + this.playInterval);

        return this;
    }

    stop() {
        if (!this._isPlaying) {
            return;
        }

        clearTimeout(this._isPlaying);

        setTimeout(() => {
            this._isPlaying = false;
        }, 500);

        return this;
    }

    addEventListener(name, handler) {
        this.root.addEventListener(name, handler, false);
        return this;
    }

    removeEventListener(name, handler) {
        this.root.removeEventListener(name, handler, false);
        return this;
    }
}