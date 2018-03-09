var app = angular.module("myApp", ['ui.router', 'ui.bootstrap', 'ui.bootstrap.modal']);

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
        // $scope.photoModelfalse = false;
        // $scope.photoModel = true;

        jQuery('#photoModel').modal('show');



        console.log($scope.photoModel);
    }

    $scope.cls = function() {
        jQuery('#photoModel').modal('hide');
    }










}]);