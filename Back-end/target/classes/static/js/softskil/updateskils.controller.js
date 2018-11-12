(function () {


var app = angular.module("myApp");
app.controller("updateskilsCtrl",updateskilsCtrl);


function updateskilsCtrl($scope,skilsDataService,$http,$state,$stateParams) {
	$scope.skils = {};
	$scope.level = {};
	//,
	skilsDataService.getSkils($stateParams.id).then(
			function(data) {
				$scope.skils = data;
				skilsDataService.getLevel($stateParams.idm).then(
						function(data) {
							$scope.level = data;
							
						})
			})
	$scope.update = function() {
		$scope.skils.levels = [];
		$scope.skils.levels.push($scope.level);
//		$scope.skils.levels.forEach(function(element,idex) {
//			if(element.idLevel == $scope.level.idLevel)
//				$scope.skils.levels[idex]=$scope.level;
//});
		skilsDataService.updateSkils($scope.skils).then(
				function(data) {
					$scope.skils = data;
					$state.go("skils", {}, {
						reload : true
					});
//					console.log($scope.skils);
				})
	}
}

})();