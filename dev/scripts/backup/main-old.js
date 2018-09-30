
var ww = document.body.clientWidth;
var breakPoint = 569;
var nav = $('.site-menu');
var navOffset = nav.offset().top;
var lastScroll = 0;

$(document).ready(function() {
  adjustMenu();
});


var stickMenu = function() {
  $(window).scroll(function() {
    var winScroll = $(window).scrollTop();
    var navElementState = 'unstuck';
    var diff = winScroll - lastScroll;
    var direction = diff >= 0 ? 'down' : 'up';

    console.log('direction = ' + direction + ' winScroll = ' + winScroll + ' diff = ' + diff);

    lastScroll = winScroll;


    if (winScroll > navOffset && navElementState === 'unstuck') {
      //console.log('navElementState = ' + navElementState);
      //console.log('winScroll = ' + winScroll + ' : navOffset = ' + navOffset);

      nav.addClass('stuck');
      navElementState = 'stuck';
      movePageNav('down');
    }

    if (winScroll <= navOffset && navElementState === 'stuck') {
      //console.log('navElementState = ' + navElementState);
      //console.log('winScroll = ' + winScroll + ' : navOffset = ' + navOffset);

      nav.removeClass('stuck');
      navElementState = 'unstuck';
      movePageNav('up');
    }

  });
};


$(window).bind('popstate', function (event) {
// Safari does not fire document.ready when retrieving page from FBCache
// Side effect of menu fail when clicking on a "#" link
  adjustMenu();
});



// rmenu-script.js


$(".toggleMenu").click(function(e) {
  e.preventDefault();
  $(this).toggleClass("active");
  $(".site-menu__ul").toggle();

  var toggleState = document.getElementsByClassName('site-menu__ul');

  if (toggleState[0].style.display == 'none') {
    $(".toggleMenu").css("color", "#153350");
    $(".toggleMenu").css("border", "solid #153350 1px");
    $(".site-menu__ul li").removeClass("hover");
    $(".search-container").css("display", "block");
    $(".horizontal-menu-outer").css("display", "block");
    $("body").css("overflow", "visible");
  } else {
    setMenuHeight();
    $(".toggleMenu").css("color", "#3783d0");
    $(".toggleMenu").css("border", "solid #3783d0 2px");
    $(".search-container").css("display", "none");
    $(".horizontal-menu-outer").css("display", "none");
    $("body").css("overflow", "hidden");
    toggleState[0].scrollTop = 0;
  }
});


$("ul.site-menu__ul li").click(function(n) {
  if (ww <= breakPoint) {

    event.stopPropagation();

    var nElement = n.target.className;

    if (nElement.search("parent") === -1) {
      $("body").css("overflow", "visible");
      $(".site-menu__ul li").removeClass("hover");
      $(".site-menu__ul").toggle();
      $(".toggleMenu").css("background-color", "white");
      $(".toggleMenu").css("color", "#153350");
    } else {
      setMenuHeight();
    }
  } // if ww <= breakPoint
});


$(window).bind('resize orientationchange', function() {
  var bannerDiv = document.getElementsByClassName("banner");
  navOffset = bannerDiv[0].offsetHeight;

  adjustMenu();
});


var setMenuHeight = function() {
  var viewportHeight = $(window).innerHeight();
  var nMenuOffset = $(".site-menu__ul")[0].getBoundingClientRect().top;
  var menuHeight = $(".site-menu__ul").outerHeight();

  viewportHeight -= nMenuOffset;

  if ( $(".site-menu__ul").innerHeight() > viewportHeight) {
    $(".site-menu__ul").css("height", viewportHeight);
  } else {
    $(".site-menu__ul").css("height", menuHeight);
  }
}


var adjustMenu = function() {
  ww = document.body.clientWidth;


  if (ww < breakPoint) {
    $(".toggleMenu").css("display", "inline-block");
    if (!$(".toggleMenu").hasClass("active")) {
      $(".site-menu__ul").hide();
    } else {
      $(".site-menu__ul").show();
    }
    $(".site-menu__ul li").unbind('mouseenter mouseleave');
    $(".site-menu__ul li a.parent").unbind('click').bind('click', function(e) {
      // must be attached to anchor element to prevent bubbling
      e.preventDefault();
      $(this).parent("li").toggleClass("hover");
    });
  }
  else {
    $(".toggleMenu").css("display", "none");
    $(".site-menu__ul").show();
    $(".site-menu__ul li").removeClass("hover");
    $(".site-menu__ul li a").unbind('click');

    $('.site-menu__ul li').unbind('mouseenter').bind('mouseenter', function() {
      // must be attached to li so that mouseleave is not triggered when hover over submenu
      $(this).addClass('hover');
    });

    $('.site-menu__ul li').unbind('mouseleave').bind('mouseleave', function() {
      // must be attached to li so that mouseleave is not triggered when hover over submenu
      $(this).removeClass('hover');
    });

  }

  stickMenu();
};

// end rmenu-script.js






// site functions

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
          $('.context-menu').animate({top: 75}, 'fast');
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


// end site functions



