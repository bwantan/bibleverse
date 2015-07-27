angular.module('app.controllers').controller('verseListCtrl', function ($scope, $rootScope, $ionicLoading,
                                                                        $ionicModal, helper, $state, $filter, $timeout) {


    $scope.edit = false;
    $scope.editText = "Edit";
    $scope.shouldShowDelete = false;

    $scope.init = function(){

    }

    $scope.editMode = function(){
        if ($scope.edit == false)
        {
            $scope.editText = "Done";
            $scope.shouldShowDelete = true;
            $scope.edit = true;
        }
        else{
            $scope.shouldShowDelete = false;
            $scope.editText = "Edit";
            $scope.edit = false;
        }

    }

    $scope.translate = function(){

    }

    $scope.verseTap = function(){
        alert("hello");
    }

    $scope.addVerse = function(){
        $state.go("app.new");
    }
})