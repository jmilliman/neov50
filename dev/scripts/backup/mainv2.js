// main.js v3.5

var ww = document.body.clientWidth;
var breakPoint = 569;
var nav = $('.primary-nav-bar');
var navOffset = nav.offset().top;
var lastScroll = 0;
var navElementState = 'unstuck';

$(document).ready(function() {
  stickMenu();

  $('#js-primary-nav-link').sidr({
    speed: 200,
    onOpenEnd: aniburger,
    onCloseEnd: aniburger,
    displace: true
  });

//$('#js-primary-nav-link').sidr();

});


$("body").on("touchmove", function(){
      touchMoved = true;
      console.log('touchMove = true');
});

$('body').bind('touchend', function(e) {
    var container = $('#sidr');
    var subNavItem = $('.sidr ul li ul li a');
    console.log('body.bind');

    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $.sidr('close', 'sidr');
    }

    if (subNavItem.is(e.target) && !touchMoved) {
      e.preventDefault();
      $.sidr('close', 'sidr');
      window.location = e.target.attributes.href.value;
    }

    touchMoved = false;
});

$('body').mouseup(function (e) {
    var container = $('#sidr');
    var subNavItem = $('.sidr ul li ul li a');
    console.log('body.mouseup');

    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $.sidr('close', 'sidr');
      console.log('!container.is->sidr.close');
    }

    if (subNavItem.is(e.target) && !touchMoved) {
      e.preventDefault();
      $.sidr('close', 'sidr');
      console.log('subNavItem.is->sidr.close');
      window.location = e.target.attributes.href.value;
    }

    touchMoved = false;
});









var stickMenu = function() {
  $(window).scroll(function() {
    var winScroll = $(window).scrollTop();
    var diff = winScroll - lastScroll;
    var direction = diff >= 0 ? 'down' : 'up';
    lastScroll = winScroll;

    if (winScroll > navOffset && navElementState === 'unstuck') {
      nav.addClass('stuck');
      navElementState = 'stuck';
      movePageNav('down');
    }

    if (winScroll <= navOffset && navElementState === 'stuck') {
      nav.removeClass('stuck');
      navElementState = 'unstuck';
      movePageNav('up');
    }

  });
};







var aniburger = function() {
  $('#js-primary-nav-icon').toggleClass('open');
};











// neo functions

function hideSearchPanel() {
  $(".search-fail").css({"display":"none"});
  $(".search-container").slideToggle('fast');
  return false;
}

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
      $(".ptext-hmenu").css({"color":"grey"})
    } else {
      $(".search-success").removeClass("show-me");
      $(".search-fail").removeClass("hide-me");
      $(".search-success").addClass("hide-me");
      $(".search-fail").addClass("show-me");
      $(".button--inactive").css({"color":"black"});
    }
  }
}

function resetElements(wipeNSText) {
    var inDiv = document.getElementsByClassName("container-product");
    var inP = document.getElementsByTagName("p");
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

    document.getElementById("clearButton").disabled = false;
    $(".button--inactive").css({"color":"rgb(180, 180, 180)"});
    $(".search-fail").removeClass("show-me");
    $(".search-success").removeClass("show-me");
    $(".search-fail").addClass("hide-me");
    $(".search-success").addClass("hide-me");
    $(".ptext-hmenu").css({"color":""})

    if (wipeNSText) {
      document.getElementsByClassName("ptext-italic")[0].value = "";
      document.getElementById("clearButton").disabled  = true;
    }
}

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
          $('.context-menu').animate({top: 50}, 'fast');
          $('.context-menu--wSearch').animate({top: 135}, 'fast');
        } else {
          $('.context-menu').animate({top: 175}, 'fast');
          $('.context-menu--wSearch').animate({top: 225}, 'fast');
        }
    } else if (mWidth >= mMedium) {
        if (whichWay === 'down') {
          $('.context-menu').animate({top: 55}, 'fast');
          $('.context-menu--wSearch').animate({top: 130}, 'fast');
        } else {
          $('.context-menu').animate({top: 150}, 'fast');
          $('.context-menu--wSearch').animate({top: 215}, 'fast');
        }
    } else {
        if (whichWay === 'down') {
          $('.context-menu').animate({top: 40}, 'fast');
          $('.context-menu--wSearch').animate({top: 110}, 'fast');
        } else {
          $('.context-menu').animate({top: 120}, 'fast');
          $('.context-menu--wSearch').animate({top: 190}, 'fast');
        }
      }
    }

  return true;
}


// end neo functions



