angular.module('AP2App')

.controller('AirlineFormCtrl', function ($scope, $http, $state, 
	$stateParams, config){

	var url = config.url + '/airline';
	$scope.isUpdate = $stateParams.id != "";

	$scope.fruits = ['Anggur', 'Jeruk', 'Mangga'];

	$scope.categories = [
		{id: 1, name: 'Domestik'},
		{id: 2, name: 'International'},
		{id: 3, name: 'Domestik dan International'}
	]

	$scope.form = {
		fruits: []
	};

	if ($stateParams.id){
		$http.get(url + '/' + $stateParams.id).then(function (res){
			$scope.form = res.data;
		})
	}

	$scope.create = function (){
		if ($stateParams.id){
			var urlUpdate = url + '/' +$stateParams.id;
			$http.put(urlUpdate, $scope.form).then(function (res){
				$state.go('airline');
			});
		}else {
			$http.post(url, $scope.form).then(function (res){
				$state.go('airline');
			});
		}
	}

	$scope.toggleFruit = function (f){
		var idx = $scope.form.fruits.indexOf(f);
		if (idx > -1){
			$scope.form.fruits.splice(idx, 1);
		}else{
			$scope.form.fruits.push(f);
		}
	}
});