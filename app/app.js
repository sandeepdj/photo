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

       

});


app.controller("testController",['$scope',function($scope){

    $scope.title="Desktop Application";


}]);
