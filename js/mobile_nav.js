(function(){
  'use strict';

  var body = document.getElementsByClassName('mobile-nav')[0];
  var navToggle = document.getElementById('mobile-menu-btn');
  var CLASS_NAME = 'mobile-nav-on';
  if (!navToggle) return;
  navToggle.addEventListener('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    if (!body.classList.contains(CLASS_NAME)) {
      body.classList.add(CLASS_NAME);
    }else{
      body.classList.remove(CLASS_NAME);
    };
  });
})();