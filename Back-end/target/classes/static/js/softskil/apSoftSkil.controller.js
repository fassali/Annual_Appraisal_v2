(function() {

	var app = angular.module("myApp");
	app.controller("newApSoftSkilsCtrl", newApSoftSkilsCtrl);

	function newApSoftSkilsCtrl($scope, skilsDataService, $http, $location,
			$window) {
		$scope.skils = {};
		$scope.skilSelected = [];
		$scope.apsoftskil = {};
		$scope.currentPage = 0;
		$scope.size = 3;
		$scope.totalePages = 0;
		$scope.pages = [];
		$scope.init = function() {

			skilsDataService.getsoftSkill($scope.currentPage, $scope.size)
					.then(function(data) {

						$scope.skils = data.content;
						$scope.totalePages = data.totalPages;
						$scope.pages = new Array(data.totalPages);

					});
		}
//		skilsDataService.gestAllSkils().then(function(data) {
//			$scope.skils = data;
//			
//
//		});
		$scope.exist = function(item) {

			for (var i = 0; i < $scope.skilSelected.length; i++) {

				if ($scope.skilSelected[i].idLevel == item.idLevel)
					return true;
			}
			return false;

		}

		$scope.toggleSelection = function(item) {

			var idx = -1;
			for (var i = 0; i < $scope.skilSelected.length; i++) {

				if ($scope.skilSelected[i].idLevel == item.idLevel) {
					idx = i;
				}

			}
			if(idx > -1){
				$scope.skilSelected.splice(idx, 1);
			}
			else{
				$scope.skilSelected.push(item);
			}

			
		}

		// fonction permet d'incrementer les numero de la page
		$scope.gotonext = function() {

			if ($scope.currentPage == $scope.totalePages - 1) {

				var d = document.getElementById("linknext");
				d.className = "disabled";

			} else
				$scope.currentPage = $scope.currentPage + 1;
			$scope.init();
		}

		// désincrémenter les numero de la page
		$scope.gotoprevious = function() {

			if ($scope.currentPage != 0)
				$scope.currentPage = $scope.currentPage - 1;

			$scope.init();
		}

		// acceder a une page
		$scope.gotopage = function(p) {

			$scope.currentPage = p;
			$scope.init();
		}
	}

})();