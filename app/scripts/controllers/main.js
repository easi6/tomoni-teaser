'use strict';

// left: 37, up: 38, right: 39, down: 40,
// // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = [37, 38, 39, 40];

function preventDefault(e) {
 e = e || window.event;
 if (e.preventDefault)
   e.preventDefault();
 e.returnValue = false;  
}

function keydown(e) {
 for (var i = keys.length; i--;) {
   if (e.keyCode === keys[i]) {
     preventDefault(e);
     return;
   }
 }
}

function wheel(e) {
 preventDefault(e);
}

function disable_scroll() {
 if (window.addEventListener) {
   window.addEventListener('DOMMouseScroll', wheel, false);
 }
 window.onmousewheel = document.onmousewheel = wheel;
 document.onkeydown = keydown;
}

function enable_scroll() {
 if (window.removeEventListener) {
   window.removeEventListener('DOMMouseScroll', wheel, false);
 }
 window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
}

angular.module('homepageApp')
  .controller('MainCtrl', function ($scope, $window, $location, $translate, $http) {
    $scope.map = null;
    $scope.show_popups = [false, false, true, false, false];
    $scope.is_scrolling = false;
    $scope.scroll_enable = true;
    $scope.pages_top = [0, 720, 1520, 2320, 3120, 3920];
    $scope.prev_pos = 0;
    $scope.anim_duration = 600;
    $scope.anim_threshold = 40;
    $scope.presskitURL = "/Presskits/Tomoni Press Kit (EN).zip";

    $scope.getCurPage = function() {
      var scrollTop = $(document).scrollTop();
      for (var top in $scope.pages_top) {
        if (scrollTop < $scope.pages_top[top]) 
          return top;
      }
      return 6;
    };

    $scope.initialize = function() {
      var mapOptions = {
        center: new google.maps.LatLng(37.57, 127.12123),
        zoom: 13,
        mayTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        disableDoubleClickZoom: true,
        draggable: false,
        overviewMapControl: false,
        streetViewControl: false,
        scaleControl: false,
        zoomControl: false
      };

      $scope.map = new google.maps.Map(document.getElementById('mapcanvas'), mapOptions);
      if ($window.localStorage) {
        var location = $window.localStorage.getItem("location");
        if (location) {
          $scope.languageChange(location);
        } else {
          $scope.getIP();
        }
      } else {
        $scope.getIP();
      }

      //screen height 사이즈 보정
      var screen_height = $(window).height();
      if (screen_height < 800) {
        //console.log('need to screen size edit');
        var offset = 800 - screen_height; 
        for (var i=1; i< $scope.pages_top.length - 1; i++) {
          $scope.pages_top[i] += offset;
        }
      } else {
        var offset = (screen_height - 800) / 2;
        //console.log(offset);
        for (var i=1; i< $scope.pages_top.length - 1; i++) {
          $scope.pages_top[i] -= offset;
        }
      }
      $scope.pages_top[$scope.pages_top.length - 1] = $(document).height() - screen_height - $scope.anim_threshold;

      $(document).scroll(function(e) {
        if (!$scope.is_scrolling) {
          //console.log('prev pos = ' + $scope.prev_pos);
          var cur_page = $scope.getCurPage();
          //console.log('cur page = ' + cur_page);
          var top = $(this).scrollTop();
          if (cur_page <= 5 && top > 0 && top > $scope.prev_pos + $scope.anim_threshold) {
            $scope.gotoPage(cur_page);
            $scope.prev_pos = top;
          } else if (cur_page > 0 && top < $scope.prev_pos - $scope.anim_threshold) {
            $scope.gotoPage(cur_page - 1);
            $scope.prev_pos = top;
          }
        }
      });
    };

    $scope.goToStoreLink = function() {
      $scope.is_scrolling = true;
      $('body, html').animate({scrollTop: 3920}, $scope.anim_duration, function() {
        $scope.is_scrolling = false;
      });
    };

    $scope.gotoPage = function(page) {
      $scope.is_scrolling = true;
      $scope.prev_pos = top;
      disable_scroll();
      $scope.scrollToPage(page);
    };

    $scope.languageChange = function(language) {
      var lang_str = "english";
      switch(language) {
        case "us" :
          $translate.uses("en_US");
          $scope.presskitURL = "/Presskits/Tomoni Press Kit (EN).zip";
          break;
        case "kr" :
          $translate.uses("ko_KR");
          lang_str = "한국어"
          $scope.presskitURL = "/Presskits/Tomoni Press Kit (KR).zip";
          break;
        case "jp" :
          $translate.uses("ja_JP");
          lang_str = "日本語"
          $scope.presskitURL = "/Presskits/Tomoni Press Kit (JP).zip";
          break;
        case "cn" :
          $translate.uses("zh_TW");
          lang_str = "中文"
          $scope.presskitURL = "/Presskits/Tomoni Press Kit (CN).zip";
          break;
        case "tw" :
          $translate.uses("zh_TW");
          lang_str = "中文"
          $scope.presskitURL = "/Presskits/Tomoni Press Kit (CN).zip";
          break;
        default:
          $translate.uses("en_US");
          $scope.presskitURL = "/Presskits/Tomoni Press Kit (EN).zip";
          break;
      }
      $('a.dropdown-toggle').html(lang_str);
    };

    $scope.scrollToPage = function(to_page) {
      //console.log(to_page);
      if (to_page < 0) 
        to_page += 6;
      $('body, html').animate({scrollTop: $scope.pages_top[to_page]}, $scope.anim_duration, function() {
        //console.log("scroll to page complete!"); 
        $scope.is_scrolling = false;
        $scope.prev_pos = $scope.pages_top[to_page];
        $scope.animAfterScroll(to_page);
      });
    };

    $scope.animAfterScroll = function(cur_page) {
      if (cur_page == 1) {
        $('#drop1').animate({top: 33}, 500);
        $('#drop2').animate({top: 171, left:198}, 500, function(){ return $scope.animFinish(cur_page);});
      } else if (cur_page == 2) {
        $('#illu2_popup').fadeIn(500, function(){ return $scope.animFinish(cur_page);});
      } else if (cur_page == 3) {
        setTimeout(function() { 
          $('#chat1').show();
          setTimeout(function() {
            $('#chat2').show();
            setTimeout(function() {
              $('#chat3').show();
              return $scope.animFinish(cur_page);
            }, 500);
          }, 500);
        }, 250);
      } else if (cur_page == 4) {
        $('img.illu4_fadein').fadeIn(500, function(){ return $scope.animFinish(cur_page);});
      } else {
        $scope.animFinish(cur_page);
      }
    };

    $scope.animFinish = function(cur_page) {
      enable_scroll();
      for (var page=1; page <=4; page++) {
        if (page != cur_page)
          $scope.animReset(page);
      }
    };

    $scope.animReset = function (cur_page) {
      if (cur_page == 1) {
        $('#drop1').css({top: 0});
        $('#drop2').css({top: 151, left:218});
      } else if (cur_page == 2) {
        $('#illu2_popup').hide();
      } else if (cur_page == 3) {
        $('#chat1').hide();
        $('#chat2').hide();
        $('#chat3').hide();
      } else if (cur_page == 4) {
        $('img.illu4_fadein').hide();
      }
    };

    $scope.getIP = function() {
      $http.jsonp("http://jsonip.com?callback=JSON_CALLBACK").success( function(data) {
        $scope.getLocationByIP(data.ip);
      });
    };

    $scope.getLocationByIP = function(ip) {
      $http.jsonp("http://ipinfo.io/" + ip + "/json?callback=JSON_CALLBACK").success( function(data) {
        if (data) 
          var lat = data.loc.split(',')[0];
          var lng = data.loc.split(',')[1];
          var new_loc = new google.maps.LatLng(lat, lng);
          $scope.map.setCenter(new_loc);
          var country = data.country;
          $scope.languageChange(country.toLowerCase());
          if ($window.localStorage) {
            $window.localStorage.setItem("location", country.toLowerCase());
          }
      });
    };

    $scope.show_popup = function(popup_idx) {
      for (var i=0; i < $scope.show_popups.length; i++) {
        $scope.show_popups[i] = i == popup_idx;
      }
    };
  });
