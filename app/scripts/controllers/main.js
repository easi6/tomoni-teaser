'use strict';

angular.module('homepageApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.initialize = function() {
      console.log('initialize!');
      var mapOptions = {
        center: new google.maps.LatLng(37.57, 126.9123),
        zoom: 17,
        mayTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        disableDoubleClickZoom: true,
        draggable: false,
        overviewMapControl: false,
        streetViewControl: false,
        scaleControl: false,
        zoomControl: false
      };

      new google.maps.Map(document.getElementById('mapcanvas'), mapOptions);
    };
  });
