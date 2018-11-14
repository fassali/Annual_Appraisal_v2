(function() {

	var app = angular.module("app");
	app.controller("syntesisCtrl", syntesisCtrl);

	function syntesisCtrl($scope,  $http, $location,$rootScope) {
		$scope.strengths = null;
		$scope.toBeImproved = null;
		
	}

})();