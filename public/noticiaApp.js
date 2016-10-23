/**
 * Created by Wizao on 23-09-2016.
 * modified by Jota on 25-09-2016.
 */
var app = angular.module('noticiaApp', ['ui.router', 'ngSanitize', 'angularUtils.directives.dirPagination']);

app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/views/noticias.html',
        })
        .state('detalleNoticias', {
            url: '/detalleNoticias/:noticiaId',
            templateUrl: '/views/detalleNoticia.html',
        })

}]);

app.controller('mainController', function($scope, $http, $window, $stateParams){

    $scope.noticias = [] ;
    $scope.itemsPerPage = 2;
    $scope.i = 0;
    $scope.limitTo = 2 ;

    $scope.noticiaId = $stateParams.noticiaId;

    $scope.cargarNoticias = function(){
        $http({
            method: 'GET',
            url: 'http://localhost:8000/api/Noticias'
        }).then(function successCallback(response) {
            $scope.noticiaObjeto  = response.data;
            for( $scope.i in  $scope.noticiaObjeto){
                $scope.noticias.push($scope.noticiaObjeto[$scope.i]);
            };
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    };

    $scope.detalleNoticia = function(){
        $http({
            method: 'GET',
            url: 'http://localhost:8000/api/Noticias/'+$scope.noticiaId
        }).then(function successCallback(response) {
            $scope.noticiaDetalle  = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    };

}) ;