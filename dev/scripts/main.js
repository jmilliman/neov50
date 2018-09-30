//
//
// neo v3.5
//
// main.js
//
//var ww = document.body.clientWidth;
//var breakPoint = 569;
var navElementState = 'unstuck';
var lastScroll = 0;
var touchMoved = false;
//var mobileSubNavs = document.querySelectorAll('.sidr ul li ul');
var desktopSubNavs = document.querySelectorAll('.primary-nav__ul li ul');



$(document).ready(function() {
  //var primaryNav = document.getElementsByClassName('primary-nav-bar');
  var primaryNav = document.getElementsByClassName('js-primary-nav-sticky');
//  var navBarTitle = document.getElementsByClassName('primary-nav-bar__logo-right');
  var navBarTitle = document.getElementsByClassName('primary-nav-bar--logo');

  $('#js-primary-nav-link').sidr({
//  $('#js-primary-nav-icon').sidr({
    speed: 200,
    onOpenEnd: aniburger,
    onCloseEnd: aniburger,
    displace: true
  });

  $('.sidr').css('display','block');

  stickMenu(primaryNav, navBarTitle, getNavOffset(primaryNav));

//  $('.navParent').click(function(event) {
//    $(event.target).next('ul').toggleClass('hide');
//  });
//
//  $('.js-navPageJump').click(function(event) {
//    refreshNav();
//  })
});





//window.onorientationchange = function() { window.location.reload(); };

//var refreshNav = function() {
//  for (var i = 0; i < desktopSubNavs.length; i++) {
//    desktopSubNavs[i].classList.add('hide');
//  }
//
//  var timeoutID = window.setTimeout(function() {
//  for (var i = 0; i < desktopSubNavs.length; i++) {
//    desktopSubNavs[i].classList.remove('hide'); }
//  }, 200);
//};




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
//  $('#js-primary-nav-link').toggleClass('open');
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
        navTitle[i].classList.remove('fade-out');
        navTitle[i].classList.add('fade-in');
      }
      navElementState = 'stuck';
      movePageNav('down');
    }

    if (winScroll <= navOffset && navElementState === 'stuck') {
      for (var i = 0; i < nav.length; i++) {
        nav[i].classList.remove('stuck');
      }
      for (var i = 0; i < navTitle.length; i++) {
        navTitle[i].classList.add('fade-out');
        navTitle[i].classList.remove('fade-in');
      }
      navElementState = 'unstuck';
      movePageNav('up');
    }

  });
};

function movePageNav(whichWay) {
  var mWidth = $(window).width();
  var mBreakPoint = 569;
  var mLarge = 951;
  var mMedium = 768;
  var mSmall = 569;

  //console.log(whichWay);

  if (mWidth >= mBreakPoint) {

    if (mWidth >= mLarge) {
        if (whichWay === 'down') {
          $('.context-menu').animate({top: 40}, 'fast');
//          $('.context-menu--wSearch').animate({top: 135}, 'fast');
        } else {
          $('.context-menu').animate({top: 170}, 'fast');
//          $('.context-menu--wSearch').animate({top: 225}, 'fast');
        }
    } else if (mWidth >= mMedium) {
        if (whichWay === 'down') {
          $('.context-menu').animate({top: 40}, 'fast');
//          $('.context-menu--wSearch').animate({top: 130}, 'fast');
        } else {
          $('.context-menu').animate({top: 150}, 'fast');
//          $('.context-menu--wSearch').animate({top: 215}, 'fast');
        }
    } else {
        if (whichWay === 'down') {
          $('.context-menu').animate({top: 35}, 'fast');
//          $('.context-menu--wSearch').animate({top: 110}, 'fast');
        } else {
          $('.context-menu').animate({top: 125}, 'fast');
//          $('.context-menu--wSearch').animate({top: 190}, 'fast');
        }
      }
    }

  return true;
}


// ****   store search functions

function findElement(searchTerm) {
  if (searchTerm != "") {
    var inDiv = document.getElementsByClassName("container-product");
    var inPTags = document.getElementsByTagName("p");
    var counter = 0;
    var sub = 0;
    var sstr = "";
    var searchTermRegex = new RegExp(searchTerm , 'gi');
    var pStr = "";
    var oneMatch = false;

    resetElements(false);

    for (counter = 0; counter < inDiv.length; ++counter) {

      sstr = inDiv[counter].innerHTML;

      if (sstr.toLowerCase().search(searchTerm.toLowerCase()) === -1) {
        inDiv[counter].classList.add("hide-me");
      } else {
        oneMatch = true;
      }
    }

    for (sub = 0; sub < inPTags.length; sub++) {
      pStr = inPTags[sub].innerHTML;

      if (pStr.toLowerCase().search(searchTerm.toLowerCase()) != -1) {
        inPTags[sub].innerHTML = pStr.replace(searchTermRegex, '<span class="hilight">$&</span>');
      }
    }

    if (oneMatch) {
      $(".search-success").removeClass("hide-me");
      $(".search-success").addClass("show-me");
      $(".search-fail").removeClass("show-me");
      $(".search-fail").addClass("hide-me");
      $(".button--inactive").css({"color":"black"});
      $(".search-button").removeClass("hide-me");
      $(".ptext-hmenu").css({"color":"grey"})
    } else {
      $(".search-success").removeClass("show-me");
      $(".search-fail").removeClass("hide-me");
      $(".search-success").addClass("hide-me");
      $(".search-button").removeClass("hide-me");
      $(".search-fail").addClass("show-me");
      $(".button--inactive").css({"color":"black"});
    }
  }
}



function resetElements(wipeNSText) {
    var inDiv = document.getElementsByClassName("container-product");
    var inP = document.getElementsByTagName("p");
    var clearButton = document.querySelectorAll('.js-search-button--clear');
    var formField = document.querySelectorAll('.js-form-field');
    var spanStart = new RegExp('<span class="hilight">', 'gi');
    var spanEnd = new RegExp('</span>', 'gi');
    var pStr = "";
    var counter = 0;

    for (counter=0; counter < inDiv.length; ++counter) {
      inDiv[counter].classList.remove("hide-me");
    }

    for (counter = 0; counter < inP.length; counter++) {
      pStr = inP[counter].innerHTML;

      if (pStr.search(spanStart) != -1) {
        pStr = pStr.replace(spanStart, '');
        pStr = pStr.replace(spanEnd, '');
        inP[counter].innerHTML = pStr;
      }
    }

    for (var i = 0; i < clearButton.length; i++) {
      clearButton[i].disabled = false;
    }

    $(".button--inactive").css({"color":"rgb(180, 180, 180)"});
    $(".search-fail").removeClass("show-me");
    $(".search-success").removeClass("show-me");
    $(".search-fail").addClass("hide-me");
    $(".search-success").addClass("hide-me");
    $(".ptext-hmenu").css({"color":""})

    if (wipeNSText) {
      $(".search-button").addClass("hide-me");

      for (var i = 0; i < clearButton.length; i++) {
        clearButton[i].disabled = true;
      }
      for (var i = 0; i < formField.length; i++) {
        formField[i].value = '';
      }
    }
}

