angular.module('AP2App')

.controller('AirlineCtrl', function ($scope, $http, $state, config){
	
	var init = function (){
		var url = config.url + "/airline";
		$http.get(url).then(function (res){
			$scope.airlines = res.data;
		}, function (res){
			alert(res.data.message);
		});
	}

	init();

	$scope.addAirline = function (){
		$state.go("airlineForm");
	}

	$scope.delete = function (id){
		var confirm = window.confirm("Apakah Anda yakin akan menghapus data Airline?");
		if (confirm){
			var url = config.url + '/airline/' + id;
			$http.delete(url).then(function (res){
				init();
				alert("berhasil delete data");
			});
		}
	}

	$scope.edit = function (id){
		$state.go('airlineForm', {'id': id});
	}


});