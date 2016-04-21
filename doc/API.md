# The API

```javascript
import from 'slider-js/src/index_css.js'
import Slider from 'slider-js'
```

## Constrcutor

### new Slider(element, options)

create a slider

```jsdoc
@param {HTMLElement} element - the root of slider.
@param {object} options
@param {number} [options.playInterval=1500(ms)] - the interval of auto-play, default is 1500ms.
@param {number} [options.step(px)] - the step of width, default is the item's width.
@param {boolean} [options.autoplay] - if can auto-slide after started.
@param {boolean} [options.useGesture] - if can use gesture to slide.
```

## Methods

### play()

start to play.

```jsdoc
@return {Slider} the slider context
```

### stop()

immediately stop.

```jsdoc
@return {Slider} the slider context
```

### addEventListener(name, handler)

listen an event, and fire with the handler.

```jsdoc
@param {string} name - the event name
@param {function} handler - the event handler
@return {Slider} the slider context
```

### removeEventListener(name, handler)

remove the event listener.

```jsdoc
@param {string} name - the event name
@param {function} handler - the event handler
@return {Slider} the slider context
```

## Properties

### items

the items of the slider.

```jsdoc
@var {Items}
```

the methods of items are:

#### add(element)

add a element to the slider items.

```jsdoc
@param {HTMLElement} element - a element for item.
```

#### get(index)

get the item indicated by index.

```jsdoc
@param {number} index - start with 0.
@return {HTMLElement} the item element.
```

#### slide(index)

slide to the item indicated by index.

```jsdoc
@param {number} index - start with 0.
```

#### next()

slide to the next item.

#### prev()

slide to the previous item.

## Events

### change

fire when the slider changed.

the event params:
```jsdoc
@param {HTMLElement} prevItem - the previous item.
@param {HTMLElement} curItem - the current item.
@param {HTMLElement} nextItem - the next item.
```

### clone

fire when a item has been cloning.

the event params:
```jsdoc
@param {HTMLElement} item - the item that be cloning.
@param {HTMLElement} cloned - the cloned item.
```
