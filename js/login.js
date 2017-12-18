angular.module('AP2App')
.controller('LoginCtrl', function ($scope, $http, $state, $localStorage){

	$scope.form = {};

	$scope.login = function (){
		var url = "http://localhost:3000/login";
		$http.post(url, $scope.form).then(function (res){
			$localStorage.token = res.data.data.token;
			$state.go('home');
		});
	}
});