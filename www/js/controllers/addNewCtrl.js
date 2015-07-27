angular.module('app.controllers').controller('addNewCtrl', function ($scope, $rootScope, $ionicLoading, bible,
                                                                    helper, $ionicPopover, $cordovaSocialSharing, $timeout, $ionicActionSheet, $cordovaClipboard) {


    $scope.verse = {};
    $scope.settings = {};
    $scope.new = true;
    $scope.bibleLangue = "en";
    $scope.verseSelected = false;
    $scope.newVerses = [];

    $scope.init = function(){
        $scope.verse.chapter = "";
        $scope.verse.book = "John";
        $scope.verse.bibleversion = "NKJV";
        $scope.settings.fontSize = 18;
    }

    $scope.$on('verse.init', function() {
        $scope.init();
    });

    $scope.closeWindow = function(){
        $scope.verse = {};
        $rootScope.$broadcast('modal.close');
        if (window.cordova && cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.close();
        }
    }

    $scope.shareVerse = function(){
        var passage = $scope.verse.passage;
        var subject = "AbidInMe App";
        var link = "http://goo.gl/sGHJLa";
        var file = null;
        var image = null;

        $cordovaSocialSharing
            .share(message, subject, file, link) // Share via native share sheet
            .then(function(result) {
                // Success!
                $timeout(function() {
                    $scope.verse.bibleversion = "NKJV"
                }, 50);
            }, function(err) {
                // An error occured. Show a message to the user
            });
    }

    $scope.changeFont = function($event){
        $scope.popover.show($event);
    }

    $scope.selectBook = function(){
        switch($scope.bibleLangue)
        {
            case "zh":
                var books =[
                    { text: "約翰福音", value: "John" },
                    { text: "路加福音", value: "Luke" },
                    { text: "馬太福音", value: "Matthew" }
                ]
                break;
            default:
                var books = [
                    { text: "John", value: "John" },
                    { text: "Luke", value: "Luke" },
                    { text: "Matthew", value: "Matthew" }
                ]
                break;
        }
        var config = {
            title: "Select Bible Book",
            items: books,
            selectedValue: $scope.verse.book,
            doneButtonLabel: "Done",
            cancelButtonLabel: "Cancel"
        };

// Show the picker
        window.plugins.listpicker.showPicker(config,
            function(item) {
                $timeout(function() {
                    $scope.verse.book = item;
                    console.log(item)
                    console.log("return")
                }, 50);

            },
            function() {

            }
        );
    }

    $scope.selectBibleLanguage = function(){
        var config = {
            title: "Select Bible Version",
            items: [
                { text: "English", value: "en" },
                { text: "Dusun", value: "ds" },
                { text: "简体中文", value: "zh" },
                { text: "繁體中文", value: "tw" },
            ],
            selectedValue: $scope.bibleLangue,
            doneButtonLabel: "Done",
            cancelButtonLabel: "Cancel"
        };
        // Show the picker
        window.plugins.listpicker.showPicker(config,
            function(item) {
                $scope.bibleLangue = item;
                $timeout(function() {
                    $scope.selectBible();
                }, 600);
            },
            function() {

            }
        );
    }

    $scope.selectBible = function(){
        var selectLanguage = false;
        switch($scope.bibleLangue)
        {
            case "ds":
                var bibles =[
                    { text: "Bible Language", value: "BOONWAN" },
                    { text: "Buuk Do Kinorohingan (BDK)", value: "BDK" }
                ]
                break;
            case "tw":
                var bibles =[
                    { text: "圣经语言", value: "BOONWAN" },
                    { text: "新譯本", value: "CNVT" },
                    { text: "中文標準譯本", value: "CSBT" }
                ]
                break;
            case "zh":
                var bibles =[
                    { text: "圣经语言", value: "BOONWAN" },
                    { text: "圣经当代译本修订版", value: "CCB" },
                    { text: "新译本(简体中文)", value: "CNVS" },
                    { text: "中文标准译本(简体中文)", value: "CSBS" },

                ]
                break;
            default:
                var bibles =[

                    { text: "Bible Language", value: "BOONWAN" },
                    { text: "New King James Version", value: "NKJV" },
                    { text: "King James Version", value: "KJV" },
                    { text: "Amplified Version", value: "AMP" },
                    { text: "New International Version", value: "NIV" }
                ]
                break;
        }

        var config = {
            title: "Select Bible Version",
            items: bibles,
            selectedValue: $scope.verse.bibleversion,
            doneButtonLabel: "Done",
            cancelButtonLabel: "Cancel"
        };

        // Show the picker
        window.plugins.listpicker.showPicker(config,
            function(item) {
                if (item == "BOONWAN")
                {
                    $timeout(function() {
                        $scope.selectBibleLanguage();
                    }, 600);
                }
                else
                {
                    $timeout(function() {
                        $scope.verse.bibleversion = item;
                        $scope.findVerse();
                    }, 50);

                }
            },
            function() {

            }
        );


    }

    $scope.vewChapter = function(){
        var reference = $scope.verse.reference;
        var bibleVersion = $scope.verse.bibleversion;
        var array1 = reference.split(" ");
        var array2 = array1[1].split(":");
        var book = array1[0];
        var chapter = array2[0];
        if (array2.length > 1)
        {
            var array3 = array2[1].split("-");
            if (array3.length == 1)
            {

                var verseStart = parseInt(array2[1]);
                var verseEnd = parseInt(array2[1]);

            }
            else
            {
                var verseStart = parseInt(array3[0]);
                var verseEnd = parseInt(array3[1]);
            }
        }

        console.log(verseStart + " " + verseEnd)
        $ionicLoading.show();
        bible.loadChapter(reference, book, chapter, verseStart, verseEnd, bibleVersion)
            .then(
            function(data){
                var wnd = cordova.InAppBrowser.open("templates/bible.html", '_blank', 'location=no,closebuttoncaption=Close,enableViewportScale=yes,toolbarposition=bottom,transitionstyle=fliphorizontal');
                //var wnd = cordova.InAppBrowser.open("bible.html","_blank","directories=no,status=no,menubar=no,scrollbars=no,resizable=no,EnableViewPortScale=yes");
                var scriptheader = 'document.getElementById("chapter").innerHTML="chapterHeader"';
                var scriptDetail = 'document.getElementById("bible").innerHTML="chapterSource"';
                scriptheader = scriptheader.replace("chapterHeader", angular.uppercase(book) + " " + chapter + " (" + bibleVersion + ")");
                scriptDetail = scriptDetail.replace("chapterSource", data);
                wnd.addEventListener( "loadstop", function() {
                    wnd.executeScript({ code: scriptheader });
                    wnd.executeScript({ code: scriptDetail });
                });
                $ionicLoading.hide();

            },
            function( errorMessage ) {

                $ionicLoading.hide();
            }
        );


    }

    $scope.isNumeric = function(input){
        var RE = /^-{0,1}\d*\.{0,1}\d+$/;
        return (RE.test(input));
    }

    // .fromTemplateUrl() method
    $ionicPopover.fromTemplateUrl('templates/changeFont.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover = popover;
    });

    $scope.$on('$destroy', function() {
        $scope.popover.remove();
    });

    // Execute action on hide popover
    $scope.$on('popover.close', function() {
        $scope.popover.hide();
    });

    // Execute action on hide popover
    $scope.$on('popover.hidden', function() {
        // Execute action
    });
    // Execute action on remove popover
    $scope.$on('popover.removed', function() {
        // Execute action
    });

    $scope.$on('verse.fontchange', function(event,message) {
        $scope.settings.fontSize = message.size;
    });

    $scope.closeKeyboard = function(){
        if (window.cordova && cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.close();
        }
    }

    $scope.expandText = function(){
        var element = document.getElementById("passage");
        element.style.height = element.scrollHeight + "px";
    }

    $scope.selectVerse = function(){
        if ($scope.verseSelected == false)
        {
            $scope.verseSelected = true;
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: 'Copy' },
                    { text: 'Share' }
                ],
                titleText: 'Share Verse',
                cancel: function() {
                    $scope.verseSelected = false;
                },
                buttonClicked: function(index) {
                    switch (index)
                    {
                        case 0:
                            $cordovaClipboard
                                .copy($scope.verse.passage)
                                .then(function () {
                                    // success
                                    helper.toast("Passage is copied");
                                }, function () {
                                    // error
                                });
                            break;
                        case 1:
                            break;
                    }
                    $scope.verseSelected = false;
                    return true;
                }
            });



        }
    }

    $scope.findVerse = function(){
        var reference = $scope.verse.reference;
        var bibleVersion = $scope.verse.bibleversion;
        var verseStart = 0;
        var verseEnd = 0;
        var chapter = 0;

        if (reference.length > 0)
        {
            var array1 = reference.split(" ");
            var array2 = array1[1].split(":");
            var book = array1[0];
            var chapter = array2[0];
            if (array2.length > 1)
            {
                var array3 = array2[1].split("-");
                if (array3.length == 1)
                {

                    var verseStart = parseInt(array2[1]);
                    var verseEnd = parseInt(array2[1]);

                }
                else
                {
                    var verseStart = parseInt(array3[0]);
                    var verseEnd = parseInt(array3[1]);
                }
            }


            if (window.cordova && cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.close();
            }

            $ionicLoading.show();
            bible.findVerse(reference, book, chapter, verseStart, verseEnd, bibleVersion)
                .then(
                function(data){
                    $scope.verse.selectedBibleversion = $scope.verse.bibleversion;
                    $scope.newVerses.push({
                        "reference": data.reference,
                        "passage": data.passage
                    })
                    $scope.verse.reference = "";
                    $scope.verse.chapter = chapter;
                    $ionicLoading.hide();

                },
                function( errorMessage ) {

                    $ionicLoading.hide();
                }
            );
        }

    }
})