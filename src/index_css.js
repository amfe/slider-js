(function() {
    var cssContent = '[data-ctrl-name="slider"] {   position: relative;   -webkit-transform: translateZ(1px);   -ms-transform: translateZ(1px);   transform: translateZ(1px); } ';
    var injectCssFn = (function (css) {
    var headEl = document.getElementsByTagName('head')[0];
    var styleEl = document.createElement('style');
    headEl.appendChild(styleEl);
    
    if (styleEl.styleSheet) {
        if (!styleEl.styleSheet.disabled) {
            styleEl.styleSheet.cssText = css;
        }
    } else {
        try {
            styleEl.innerHTML = css
        } catch(e) {
            styleEl.innerText = css;
        }
    }
});

    injectCssFn(cssContent);
})();