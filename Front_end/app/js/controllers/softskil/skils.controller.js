(function () {


var app = angular.module("app");
app.controller("skilsCtrl",skilsCtrl);


function skilsCtrl($scope,$rootScope,skilsDataService,$http,$location,$window) {
	$rootScope.user.menu=3;
	$scope.skils = {};
	$scope.currentPage = 0;
	$scope.size = 3;
	$scope.totalePages = 0;
	$scope.pages = [];
	skilsDataService.gestAllSkils().then(function(data) {
		//$scope.skils = data;
		//console.log($scope.skils)

	});
	$scope.init = function() {
		
		skilsDataService.getSkillAll($scope.currentPage,
				$scope.size).then(function(data) {
					$scope.skils
					console.log(data)
			$scope.skils = data.content;
			$scope.totalePages = data.totalPages;
			$scope.pages = new Array(data.totalPages);

		});
	}
	//
	$scope.suppSkil = function(item) {
		item.removed = true;		
		console.log(item)
		skilsDataService.updSkils(item).then(function(data) {
			alert("done")
				});
	}
	
	//fonction permet d'incrementer les numero de la page
	$scope.gotonext = function() {

		if ($scope.currentPage == $scope.totalePages - 1) {

			var d = document.getElementById("linknext");
			d.className = "disabled";

		} else
			$scope.currentPage = $scope.currentPage + 1;
		$scope.init();
	}

	//désincrémenter  les numero de la page
	$scope.gotoprevious = function() {

		if ($scope.currentPage != 0)
			$scope.currentPage = $scope.currentPage - 1;

		$scope.init();
	}

	//acceder a une page
	$scope.gotopage = function(p) {

		$scope.currentPage = p;
		$scope.init();
	}
}

})();