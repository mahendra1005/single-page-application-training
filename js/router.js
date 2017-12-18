angular.module('AP2App', ['ui.router', 'ngStorage'])


.constant('config', {
    url: 'http://localhost:3000'
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider, $localStorageProvider) {

    var h = {
        url: '/',
        templateUrl: '/tpl/home.html'
    }

    var c = {
        url: '/contact',
        templateUrl: '/tpl/contact.html'
    }

    var a = {
        url: '/airline',
        templateUrl: '/tpl/airline.html',
        controller: 'AirlineCtrl'
    }

    var airlineForm = {
        url: '/airline-form/:id',
        templateUrl: '/tpl/airline-form.html',
        controller: 'AirlineFormCtrl'
    }

    var login = {
        url: '/login',
        templateUrl: '/tpl/login.html',
        controller: 'LoginCtrl'
    }

    $stateProvider
        .state('home', h)
        .state('contact', c)
        .state('airline', a)
        .state('airlineForm', airlineForm)
        .state('login', login);

    $urlRouterProvider.otherwise('/');

    $httpProvider.interceptors.push(function ($q){
        return {
            'request': function (config){
                var token = $localStorageProvider.get("token");
                config.headers = config.headers || {};
                config.headers["Content-Type"] = "application/json";
                config.headers["Authorization"] = token;
                return config;
            },
            'responseError': function (response){
                if (response.status == 403){
                    alert("Anda tidak memiliki akses");
                    window.location.href = '#!/login';
                }else{
                    alert(response.data.message);
                }
                return $q.reject(response);
            }
        }
    });


});