# Getting Started

## Install

```shell
tnpm install slider-js --save
```

## Usage

```javascript
import from 'slider-js/src/index_css.js'
import Slider from 'slider-js'
```

## Samples

Initializing:

```html
<div style="overflow: hidden; width:200px; height: 200px;">
    <ul id="slider" style="height: 100%;">
        <li style="width:100%;height:100%;">a slider item</li>
        <li style="width:100%;height:100%;">a slider item</li>
        <li style="width:100%;height:100%;">a slider item</li>
    </ul>
</div>
```

```javascript
var slider = new Slider(document.getElementById('slider'));
slider.play();
```


Auto-slide && use gesture to slide:

```javascript
var slider = new Slider(document.getElementById('slider'), {
    autoplay: true,
    useGesture: true
});

slider.play();
```

Do something when change:

```javascript
slider.addEventListener('change', {curItem, nextItem, prevItem} => {
    // TODO
})
```
