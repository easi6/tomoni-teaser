'use strict';

angular.module('homepageApp')
  .controller('MainCtrl', function ($scope, $location, $http) {
    $scope.map = null;
    $scope.show_popups = [false, false, true, false, false];
    $scope.is_scrolling = false;
    $scope.scroll_enable = true;
    $scope.pages_top = [0, 720, 1520, 2320, 3120, 3920];
    $scope.prev_pos = 0;
    $scope.anim_duration = 600;
    $scope.anim_threshold = 30;

    $scope.gotoPage = function(page) {
      $location.hash("page-" + page);
    };

    $scope.getCurPage = function() {
      var scrollTop = $(document).scrollTop();
      console.log('get cur page! scroll top = ' + scrollTop);
      for (var top in $scope.pages_top) {
        if (scrollTop < $scope.pages_top[top]) 
          return top;
      }
      return 6;
    };

    $scope.initialize = function() {
      console.log('initialize!');
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
      $scope.getIP();

      $(document).scroll(function(e) {
        if (!$scope.is_scrolling && $scope.scroll_enable) {
          console.log('prev pos = ' + $scope.prev_pos);
          var cur_page = $scope.getCurPage();
          console.log('cur page = ' + cur_page);
          var top = $(this).scrollTop();
          if (cur_page <= 4 && top > 0 && top > $scope.prev_pos + $scope.anim_threshold) {
            console.log('scroll to next');
            $scope.is_scrolling = true;
            $scope.prev_pos = top;
            $scope.scrollToPage(cur_page % 6);
          } else if (cur_page > 0 && top < $scope.prev_pos - $scope.anim_threshold) {
            console.log('scroll to prev');
            $scope.is_scrolling = true;
            $scope.prev_pos = top;
            $scope.scrollToPage(cur_page - 1);
          }
          //console.log('scroll called!!');
          //console.log(e);
        } else if (!$scope.scroll_enable) {
          console.log('scrol unabled!');
          e.stopPropagation();
          e.preventDefault();
        }
      });
    };

    $scope.scrollToPage = function(to_page) {
      console.log(to_page);
      if (to_page < 0) 
        to_page += 6;
      $('body').animate({scrollTop: $scope.pages_top[to_page]}, $scope.anim_duration, function() {
        console.log("scroll to next complete!"); 
        $scope.is_scrolling = false;
        $scope.prev_pos = $scope.pages_top[to_page];
        $scope.animAfterScroll(to_page);
      });
    };

    $scope.animAfterScroll = function(cur_page) {
      if (cur_page == 1) {
        $scope.scroll_enable = false;
        $('#drop1').animate({top: 33}, 500);
        $('#drop2').animate({top: 171, left:198}, $scope.animFinish);
      } else if (cur_page == 2) {
        $scope.scroll_enable = false;
        $('#illu2_popup').fadeIn(500, $scope.animFinish);
      } else if (cur_page == 3) {
        $scope.scroll_enable = false;
        $('#chat1').fadeIn(500, function(){
          $('#chat2').fadeIn(500, function(){
            $('#chat3').fadeIn(500, $scope.animFinish);
          });
        });
      } else if (cur_page == 4) {
        $scope.scroll_enable = false;
        $('img.illu4_fadein').fadeIn(500, $scope.animFinish);
      }
    };

    $scope.animFinish = function() {
      $scope.scroll_enable = true;
    };

    $scope.getIP = function() {
      $http.get("http://smartbiolab.com:8000").success( function(data) {
        console.log(data.ip);
        $scope.getLocationByIP(data.ip);
      });
    };

    $scope.getLocationByIP = function(ip) {
      $http.get("http://www.geoplugin.net/json.gp?ip=" + ip).success( function(data) {
        console.log(data);
        if (data.geoplugin_status != 404) {
          var new_loc = new google.maps.LatLng(data.geoplugin_latitude, data.geoplugin_longitude);
          $scope.map.setCenter(new_loc);
        }
      }).error(function(err) { console.log(err); return null;});
    };

    $scope.show_popup = function(popup_idx) {
      for (var i=0; i < $scope.show_popups.length; i++) {
        $scope.show_popups[i] = i == popup_idx;
      }
    };
  });
