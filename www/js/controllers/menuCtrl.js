angular.module('app.controllers').controller('menuCtrl', function ($scope,$ionicLoading, $rootScope,$ionicPopup,
                                                                   helper, $timeout) {

    $scope.init = function () {

    };

    $scope.notImplemented = function(){
        var alertPopup = $ionicPopup.alert({
            title: 'Coming soon',
            template: 'Coming soon'
        });
        alertPopup.then(function(res) {

        });
    }

    $scope.ourDailyBread = function(){
        //var today = new Date();
        //var dd = today.getDate();
        //var mm = today.getMonth()+1; //January is 0!
        //var yyyy = today.getFullYear();
        //if(dd<10){
        //    dd='0'+dd
        //}
        //if(mm<10){
        //    mm='0'+mm
        //}
        //var today = yyyy + "-" + mm + "-" + dd;
        //var url = "http://mobi.rbc.org/odb/" + today + ".html";
        var url = "http://odb.org/";
        var ref = cordova.InAppBrowser.open(url, '_blank', 'location=no,closebuttoncaption=Close,enableViewportScale=yes,toolbarposition=bottom,transitionstyle=fliphorizontal');
    }

});