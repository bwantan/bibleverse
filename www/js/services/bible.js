angular.module('app.services').service('bible', function ($http, $q, $localstorage) {

    var actualDevice = true;

    return (
    {
        getLocalCameraInfo:getLocalCameraInfo,
        getCameraInfo: getCameraInfo,
        resetCameraInfo: resetCameraInfo,
        getTrafficGroupInfo: getTrafficGroupInfo,
        refreshTrafficInfo: refreshTrafficInfo,
        refreshAccidentInfo: refreshAccidentInfo,
        getlocalIncidentSet: getlocalIncidentSet,
        findVerse: findVerse,
        loadChapter: loadChapter

    });

    function findVerse(reference, book, chapter, verseStart, verseEnd, bibleVersion){
        return yourVersion(reference, book, chapter, verseStart, verseEnd, bibleVersion);
    }

    function loadChapter(reference, book, chapter, verseStart, verseEnd, bibleVersion){
        var api = "/bible";
        if (actualDevice) {
            api = "https://www.bible.com/bible";
        }

        bibleUrl = api + "/" + getBibleCode(bibleVersion) + "/" + book + "." + chapter;

        var request = $http({
            method: "GET",
            url: bibleUrl
        });

        return( request.then( function(response, status){

            var parser = new DOMParser()
                , doc = parser.parseFromString(response.data, "text/html");

            var returnText = "";

            if (response.status == 200)
            {
                var selectVerse = verseStart;

                for (var verse = 1; verse <= 500; verse++)
                {
                    var highlight = false;
                    var style = "verse v" + verse;

                    var verseFound = doc.getElementsByClassName(style);

                    if (verseFound.length == 0)
                    {
                        break;
                    }

                    if (verse == selectVerse)
                    {
                        highlight = true;
                    }

                    for(var i = 0, iMax = verseFound.length; i < iMax; i++)
                    {
                        var labelStyle = "label";

                        var labelFound = verseFound[i].getElementsByClassName(labelStyle);

                        if (highlight)
                        {
                            returnText = returnText + "<span class=selected>";
                            if (labelFound.length > 0)
                            {
                                returnText = returnText + labelFound[0].innerText + " ";
                            }

                            var contentStyle = "content";

                            var contentFound = verseFound[i].getElementsByClassName(contentStyle);

                            for(var j = 0, jMax = contentFound.length; j < jMax; j++)
                            {
                                returnText = returnText + contentFound[j].innerText + " ";
                            }
                            returnText = returnText + "</span>";
                        }
                        else
                        {
                            if (labelFound.length > 0)
                            {
                                returnText = returnText + labelFound[0].innerText + " ";
                            }

                            var contentStyle = "content";

                            var contentFound = verseFound[i].getElementsByClassName(contentStyle);

                            for(var j = 0, jMax = contentFound.length; j < jMax; j++)
                            {
                                returnText = returnText + contentFound[j].innerText + " ";
                            }
                        }
                    }

                    if (verse == selectVerse)
                    {
                        if (selectVerse < verseEnd)
                        {
                            selectVerse++;
                        }
                    }
                }
            }

            return returnText;

        }, handleError ) );
    }

    function getBibleCode(bibleVersion)
    {
        var code = 1;
        bibleVersion = angular.lowercase(bibleVersion);
        var mapping = {
            "amp":"8",
            "nkjv":"114",
            "niv":"111",
            "kjv": "1",
            "ccb": "36",
            "bdk": "172"
        };
        code = mapping[bibleVersion];
        return code;
    }

    function yourVersion(reference, book, chapter, verseStart, verseEnd, bibleVersion)
    {
        var reference = "";
        var api = "/bible";
        if (actualDevice) {
            api = "https://www.bible.com/bible";
        }
        if (verseStart == 0)
        {
            bibleUrl = api + "/" + getBibleCode(bibleVersion) + "/" + book + "." + chapter;
        }
        else if (verseStart == verseEnd)
        {
            bibleUrl = api + "/" + getBibleCode(bibleVersion) + "/" + book + "." + chapter + "." + verseStart;
        }
        else{
            bibleUrl = api + "/" + getBibleCode(bibleVersion) + "/" + book + "." + chapter + "." + verseStart + "-" + verseEnd;
        }


        var request = $http({
            method: "GET",
            url: bibleUrl
        });

        return( request.then( function(response, status){

            var parser = new DOMParser()
                , doc = parser.parseFromString(response.data, "text/html");

            var returnText = "";

            if (response.status == 200)
            {
                if (verseStart == 0)
                {
                    var titleFound = doc.getElementById("m_book_chap_btn");

                    reference = titleFound.innerText;

                    for (var verse = 1; verse <= 500; verse++)
                    {

                        var style = "verse v" + verse;

                        var verseFound = doc.getElementsByClassName(style);

                        if (verseFound.length == 0)
                        {
                            break;
                        }

                        for(var i = 0, iMax = verseFound.length; i < iMax; i++)
                        {
                            var labelStyle = "label";

                            var labelFound = verseFound[i].getElementsByClassName(labelStyle);

                            if (labelFound.length > 0)
                            {
                                returnText = returnText + labelFound[0].innerText + " ";
                            }

                            var contentStyle = "content";

                            var contentFound = verseFound[i].getElementsByClassName(contentStyle);

                            for(var j = 0, jMax = contentFound.length; j < jMax; j++)
                            {
                                returnText = returnText + contentFound[j].innerText + " ";
                            }
                        }
                    }
                }
                else
                {
                    var titleFound = doc.getElementById("m_book_chap_btn");

                    reference = titleFound.innerText;

                    for (var verse = verseStart; verse <= verseEnd; verse++)
                    {

                        var style = "verse v" + verse;

                        var verseFound = doc.getElementsByClassName(style);

                        for(var i = 0, iMax = verseFound.length; i < iMax; i++)
                        {
                            var labelStyle = "label";

                            var labelFound = verseFound[i].getElementsByClassName(labelStyle);

                            if (labelFound.length > 0)
                            {
                                returnText = returnText + labelFound[0].innerText + " ";
                            }

                            var contentStyle = "content";

                            var contentFound = verseFound[i].getElementsByClassName(contentStyle);

                            for(var j = 0, jMax = contentFound.length; j < jMax; j++)
                            {
                                returnText = returnText + contentFound[j].innerText + " ";
                            }
                        }
                    }
                }
                returnText = returnText.replace("#",'"');
                console.log(returnText)
            }

            return {
                reference: reference,
                passage: returnText
            };

        }, handleError ) );
    }

    function bibleGateway(reference, book, chapter, bibleVersion)
    {
        var api = "/bgw";
        if (actualDevice) {
            api = "https://" + "www.biblegateway.com/passage";
        }
        reference = reference.replace(" ", "+");
        reference = reference.replace(":", "%3A");
        bibleUrl = api + "/?search=" + reference + "&version=" + bibleVersion;

        var request = $http({
            method: "GET",
            url: bibleUrl
        });

        return( request.then( function(response, status){
            var parser = new DOMParser()
                , doc = parser.parseFromString(response.data, "text/html");

            var returnText = "";
            var mapping = {
                "john":"John",
                "luke":"Luke",
                "matthew": "Matt"
            };

            console.log("test")
            if (response.status == 200)
            {
                var style = "chapter-1";
                var verseFound = doc.getElementsByClassName(style);

                if (verseFound.length > 0)
                {
                    returnText = verseFound[0].innerText;
                    console.log(returnText)
                }

                for (var verse = 1; verse <= 500; verse++)
                {
                    var style = "text " + mapping[angular.lowercase(book)] + "-" + chapter + "-" + verse;

                    var verseFound = doc.getElementsByClassName(style);

                    if (verseFound.length == 0)
                    {
                        break;
                    }

                    for(var i = 0, max = verseFound.length; i < max; i++)
                    {

                        if (verseFound[i].innerHTML.indexOf("chapternum") > -1 || verseFound[i].innerHTML.indexOf("versenum") > -1)
                        {
                            returnText = returnText + verseFound[i].innerText + " ";
                        }
                    }
                }
                console.log(returnText)
            }

            return returnText;

        }, handleError ) );
    }

    function getlocalIncidentSet(){
        return incidentSet;
    }

    function getOSIS()
    {

    }

    function resetCameraInfo(){
        $localstorage.clear();
    }

    function getTrafficGroupInfo(){
        var deferred = $q.defer();

        $http.get('data/groupInfo.json')
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(data) {
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function getLocalCameraInfo(){
        return cameraImageSet;
    }

    function getCameraInfo(){
        var imageUrl = "";

        return $http.get('data/cameraInfo.json').then(function(response) {
            angular.forEach(response.data.camera, function(entry){
                cameraImageSet[entry['camera_id']] = {
                    CameraID: entry['camera_id'],
                    Latitude: entry['latitude'],
                    Longitude: entry['longitude'],
                    ImageURL: entry['image_url'],
                    CreateDate: entry['created_date'],
                    Summary: entry['summary'],
                    Group_Id: entry['group_id']
                };
            })

            return cameraImageSet;
        }, handleError);
    }

    function refreshAccidentInfo(){
        var canceller = $q.defer();

        var request1 = $http({
            method: "GET",
            url: lta + '/IncidentSet',
            headers: {
                'Access-Control-Allow-Origin':'*',
                'accept': '*/*',
                'AccountKey': 'M2UUdy+/ijJavUdeqP6dDA==',
                'UniqueUserID':'51ce5619-5cd8-4113-8a95-492704bf1c06'
            }
        });

        var cancel = function(reason){
            canceller.resolve(reason);
        };

        var promise =
            ( $q.all([request1]).then(function(result){
                var tmp = [];
                angular.forEach(result, function(response){
                    tmp.push(response.data);
                });
                return tmp;
            }).then(function(tmpResult){
                incidentSet = {};


                return incidentSet;
            }, handleError ) );

        return {
            promise: promise,
            cancel: cancel
        };
    };

    function refreshTrafficInfo(){
        var canceller = $q.defer();

        var request1 = $http({
            method: "GET",
            url: lta + '/CameraImageSet',
            headers: {
                'Access-Control-Allow-Origin':'*',
                'accept': '*/*',
                'AccountKey': 'M2UUdy+/ijJavUdeqP6dDA==',
                'UniqueUserID':'51ce5619-5cd8-4113-8a95-492704bf1c06'
            }
        });

        var request2 = $http({
            method: "GET",
            url: lta + '/CameraImageSet?$skip=50',
            headers: {
                'Access-Control-Allow-Origin':'*',
                'accept': '*/*',
                'AccountKey': 'M2UUdy+/ijJavUdeqP6dDA==',
                'UniqueUserID':'51ce5619-5cd8-4113-8a95-492704bf1c06'
            }
        });

        var cancel = function(reason){
            canceller.resolve(reason);
        };

        var promise =
            ( $q.all([request1, request2]).then(function(result){
                var tmp = [];
                angular.forEach(result, function(response){
                    tmp.push(response.data);
                });
                return tmp;
            }).then(function(tmpResult){
                var newcameraImageSet = {};

                angular.forEach(cameraImageSet, function(row){
                    newcameraImageSet[row.CameraID] = {
                        CameraID: row.CameraID,
                        Latitude: row.Latitude,
                        Longitude: row.Longitude,
                        Summary: row.Summary,
                        Group_Id: row.Group_Id,
                        ImageURL: row.ImageURL,
                        CreateDate: row.CreateDate
                    };
                });
                angular.forEach(tmpResult, function(data){
                    var x2js = new X2JS();
                    jsonData  = x2js.xml_str2json(data);
                    angular.forEach(jsonData.feed.entry, function(entry){
                        var properties = entry.content.properties;
                        newcameraImageSet[properties.CameraID.__text] = {
                            CameraID: properties.CameraID.__text,
                            Latitude: cameraImageSet[properties.CameraID.__text].Latitude,
                            Longitude: cameraImageSet[properties.CameraID.__text].Longitude,
                            Summary: cameraImageSet[properties.CameraID.__text].Summary,
                            Group_Id: cameraImageSet[properties.CameraID.__text].Group_Id,
                            ImageURL: properties.ImageURL.__text,
                            CreateDate: properties.CreateDate.__text
                        };
                    });
                });
                cameraImageSet = newcameraImageSet;
                return cameraImageSet;
            }, handleError ) );

        return {
            promise: promise,
            cancel: cancel
        };
    };


    function handleSuccess( response ) {

        return( response.data );

    }

    function handleError( response ) {

        // The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.
        if (
            ! angular.isObject( response.data ) ||
            ! response.data.message
        ) {

            return( $q.reject( "An unknown error occurred." ) );

        }

        // Otherwise, use expected error message.
        return( $q.reject( response.data.message ) );

    }
})
