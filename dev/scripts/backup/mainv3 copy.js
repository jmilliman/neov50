//
// main.js
//
var ww = document.body.clientWidth;
var breakPoint = 569;
var navElementState = 'unstuck';
var lastScroll = 0;
var touchMoved = false;
var mobileSubNavs = document.querySelectorAll('.sidr ul li ul');
var desktopSubNavs = document.querySelectorAll('.primary-nav__ul li ul');



$(document).ready(function() {
  var primaryNav = document.getElementsByClassName('primary-nav-bar');
  var navBarTitle = document.getElementsByClassName('primary-nav-bar__title');

  $('#js-primary-nav-link').sidr({
    speed: 200,
    onOpenEnd: aniburger,
    onCloseEnd: aniburger,
    displace: true
  });

//  $(window).load( function() {
//      $('#js-kam-slider').smoothSlides();
//  });

  stickMenu(primaryNav, navBarTitle, getNavOffset(primaryNav));

  $('.navParent').click(function(event) {
    $(event.target).next('ul').toggleClass('hide');
  });

  $('.js-navPageJump').click(function(event) {
    refreshNav();
  })
});

//window.onorientationchange = function() { window.location.reload(); };

var refreshNav = function() {
  for (var i = 0; i < desktopSubNavs.length; i++) {
    desktopSubNavs[i].classList.add('hide');
  }

  var timeoutID = window.setTimeout(function() {
  for (var i = 0; i < desktopSubNavs.length; i++) {
    desktopSubNavs[i].classList.remove('hide'); }
  }, 200);
};




$("body").on("touchmove", function(){
      touchMoved = true;
});



$('body').bind('touchend', function(e) {
    var container = $('#sidr');
    var subNavItem = $('.sidr ul li ul li a');

    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $.sidr('close');
    }

    if (subNavItem.is(e.target) && !touchMoved) {
      e.preventDefault();
      $.sidr('close');
      window.location = e.target.attributes.href.value;
    }

    touchMoved = false;
});




$('body').mouseup(function (e) {
    var container = $('#sidr');
    var subNavItem = $('.sidr ul li ul li a');

    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $.sidr('close');
    }

    if (subNavItem.is(e.target) && !touchMoved) {
      e.preventDefault();
      $.sidr('close');
      window.location = e.target.attributes.href.value;
    }

    touchMoved = false;
});




var aniburger = function() {
  $('#js-primary-nav-icon').toggleClass('open');
};



var getNavOffset = function(gNav) {
  var gOffset = 0;

  for (var i = 0; i < gNav.length; i++) {
    //console.log('i = ' + i + ' : gOffset = ' + gOffset + ' : gNav[i] = ' + gNav[i].offsetTop);
    if (gNav[i].offsetTop > gOffset) {
      gOffset = gNav[i].offsetTop;
    }
  }
  return gOffset;
};



var stickMenu = function(nav, navTitle, navOffset) {
  $(window).scroll(function() {
    var winScroll = $(window).scrollTop();

    //console.log('winScroll = ' + winScroll + ' : navOffset = ' + navOffset);

    if (winScroll > navOffset && navElementState === 'unstuck') {
      for (var i = 0; i < nav.length; i++) {
        nav[i].classList.add('stuck');
      }
      for (var i = 0; i < navTitle.length; i++) {
        navTitle[i].classList.add('primary-nav-bar__title--show');
      }
      navElementState = 'stuck';
    }

    if (winScroll <= navOffset && navElementState === 'stuck') {
      for (var i = 0; i < nav.length; i++) {
        nav[i].classList.remove('stuck');
      }
      for (var i = 0; i < navTitle.length; i++) {
        navTitle[i].classList.remove('primary-nav-bar__title--show');
      }
      navElementState = 'unstuck';
    }

  });
};

