'use strict';

angular.module('homepageApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.map = null;

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
  });
