(function() {

	var app = angular.module("myApp");
	app.controller("syntesisCtrl", syntesisCtrl);

	function syntesisCtrl($scope,  $http, $location,$rootScope) {
		$scope.strengths = null;
		$scope.toBeImproved = null;
		
	}

})();