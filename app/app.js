var app = angular.module("myApp", ['ui.router', 'ui.bootstrap', 'ui.bootstrap.modal','webcam']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
        url: '/home',
        templateUrl: 'views/login/login.html',
        controller: 'testController'
    })

    .state('app', {
        url: '/app',
        templateUrl: 'views/common/header.html',
        controller: 'testController'
    })

    .state('app.dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard/dashboard.html',
        controller: 'testController'
    })

    .state('app.laboratory', {
        url: '/laboratory/:billidh/:billidd/:ptype',
        templateUrl: 'views/dashboard/laboratory.html',
        controller: 'testController'
    })


});


app.controller("testController", ['$scope', '$state', '$http', '$filter', '$stateParams', '$uibModal', '$log', '$document', function($scope, $state, $http, $filter, $stateParams, $uibModal, $log, $document) {
    var WebCamera = require("webcamjs");
    var enabled = false;

    $scope.title = "Desktop Application";
    login = {};
    $scope.doLogin = function() {
        console.log($scope.login);
        var username = $scope.login.username;
        var username = $scope.login.password;
        $state.go('app.dashboard');
    }
    $scope.dateFrom = new Date();
    $scope.dateTo = new Date();


    $scope.open = function() {
        $scope.popup.opened = true;
    };
    $scope.popup = {
        opened: false
    };


    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };
    $scope.popup2 = {
        opened: false
    };

    $scope.apiUrl = "http://106.51.56.235:8081/geopulse/bsdlab/";

    var apiUrl = "http://106.51.56.235:8081/geopulse/bsdlab/api/v1/";

    $scope.getDiagnolist = function(deptid) {
        var ptypesche = $scope.ptypesche;
        console.log(ptypesche);
        console.log(deptid);
        var ddate = $scope.dateFrom;
        var fltdate = $filter('date')(new Date(ddate), 'yyyy-MM-dd');
        var edate = $scope.dateTo;
        var enddate = $filter('date')(new Date(edate), 'yyyy-MM-dd');
        if (angular.isUndefined($scope.q) || $scope.q == '') {
            var search = 0;
        } else {
            var search = $scope.q;
        }


        $http.get(apiUrl + 'getDiagnoPlist/' + ptypesche + '/' + deptid + '/' + fltdate + '/' + enddate + '/' + search).then(function(response) {
            $scope.pdigno = response.data.patdtls;
            console.log(response);
        })

    }

    var lbillidh = $stateParams.billidh;
    var lbillidd = $stateParams.billidd;
    var lbptype = $stateParams.ptype;
    $scope.labentrybillhid = $stateParams.billidh;
    $scope.lbillidd = $stateParams.billidd;
    $scope.lbptype = $stateParams.ptype;

    $scope.labResultinit = function() {
        getresultdata();
    }

    function getresultdata() {
        $http.get(apiUrl + "printResult/" + lbillidh + "/" + lbillidd + '/' + lbptype).then(function(response) {
            $scope.testlis = response.data;
            pdetails(lbillidh, lbptype);
        });
    }


    function pdetails(billidh, ptype) {
        $http.get(apiUrl + 'pdetailsdata/' + billidh + '/' + ptype).then(function(response) {
            $scope.detailp = response.data.pdetails;
        })
    }


    $scope.openModel = function(trid) {
        console.log("CLICKED");
        console.log(trid);
        $scope.newtrid = trid;
         $('#photoModel').modal('show');
     }

    $scope.cls = function() {
        $('#photoModel').modal('hide');
    }


 

// List cameras and microphones.
 
navigator.mediaDevices.enumerateDevices().then(function(devices) {
    console.log(devices);
    $scope.devices2 = devices;

    $scope.devices = $filter('filter')($scope.devices2,{kind:'videoinput'});
})
.catch(function(err) {
  console.log(err.name + ": " + err.message);
});
 

navigator.webkitGetUserMedia(
    {
      audio: false,
      video: {
        mandatory: {
          chromeMediaSourceId: 'the camera source id obtained earlier',
        }
      }
    },
    stream => console.dir(stream),
    error => console.log(error)
  );


  $scope.getMedia=function(mediaData){
    console.log("mediaData");
      console.log(mediaData);
     // $scope.showme=true;
     enabled=false;
       if(!enabled){ // Start the camera !
        enabled = true;
        WebCamera.attach('#camdemo');
        console.log("The camera has been started");
      }else{ // Disable the camera !
        enabled = false;
        WebCamera.reset();
       console.log("The camera has been disabled");
      }
  }


$scope.imagesList=[];

$scope.captureSnap=function(){
    if(enabled){
        WebCamera.snap(function(data_uri) {

            $scope.imagesList.push({"imgUrl":data_uri});


            $scope.newimg = data_uri;
            var imageBuffer = processBase64Image(data_uri);
                console.log(imageBuffer)
            })

        }else{
            console.log("Please enable the camera first to take the snapshot !");

        }
}

// return an object with the processed base64image
function processBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}




$scope.savePhotos=function(imgList,newtrid){

var imgList1 =imgList;
    var lbillidh = $stateParams.billidh;
    var lbillidd = $stateParams.billidd;
    var lbptype = $stateParams.ptype;


 var imgList = {imgList:imgList};
 var newtrid={newtrid:newtrid};
 var lbillidh={lbillidh:lbillidh};
 var lbillidd={lbillidd:lbillidd};
 var lbptype={lbptype:lbptype};

var postData =  angular.extend(imgList,newtrid );
var postData =  angular.extend(postData,lbillidh );
var postData =  angular.extend(postData,lbillidd );
var postData =  angular.extend(postData,lbptype );
console.log(postData);

    if(imgList1.length){
          $http.post("http://localhost:8080/2017/old/salesManager/api/uploadMe",{postData:postData}).then(function(response){
            console.log(response);
                console.log("SUccessFull");
        })
    }

}



 





}]);