angular.module('app.controllers').controller('settingsCtrl', function ($scope, $rootScope, $ionicLoading, helper, $timeout) {

    $scope.settings = {};

    $scope.init = function(){
        $scope.settings.fontSize = 18;
    }

    $scope.$watch('settings.fontSize', function() {
        $rootScope.$broadcast('verse.fontchange', { 'size' : $scope.settings.fontSize });
    });

    $scope.default = function(){
        $scope.init();
    }
})