var app = angular.module("myApp",['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'views/login/login.html',
            controller:'testController'
        })

        .state('app', {
            url: '/app',
            templateUrl: 'views/common/header.html',
            controller:'testController'
        })

        .state('app.dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard/dashboard.html',
            controller:'testController'
        })

});


app.controller("testController",['$scope','$state',function($scope,$state){

    $scope.title="Desktop Application";
    login={};
    $scope.doLogin=function(){
        console.log($scope.login);
        var username = $scope.login.username;
        var username = $scope.login.password;
        $state.go('app.dashboard');
    }
}]);
