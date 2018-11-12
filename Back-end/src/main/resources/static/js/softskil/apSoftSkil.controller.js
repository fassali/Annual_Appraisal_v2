(function() {

	var app = angular.module("myApp");
	app.controller("newApSoftSkilsCtrl", newApSoftSkilsCtrl);

	function newApSoftSkilsCtrl($scope, skilsDataService, $http, $location,
			$window) {
		$scope.skils = {};
		$scope.skilSelected = [];
		$scope.skilSelectedd = [];
		$scope.apsoftskil = {};
		$scope.currentPage = 0;
		$scope.size = 3;
		$scope.totalePages = 0;
		$scope.pages = [];
		
		console.log($scope.skilSelectedd)
		$scope.init = function() {

			skilsDataService.getsoftSkill($scope.currentPage, $scope.size)
					.then(function(data) {

						$scope.skils = data.content;
						$scope.skils.forEach(function(elementt) {
							elementt.levels.sort(function (a, b) {
								  return b.degree - a.degree;
								});
							elementt.levels.forEach(function(element) {
								
								  element.skil = elementt.idSoftSkill;
							});
						});
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

			for (var i = 0; i < $scope.skilSelectedd.length; i++) {
				if ($scope.skilSelectedd[i].idLevel == item.idLevel)
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
//
		$scope.selectedVa = function(item) {
		var idx = false;
			$scope.skils.forEach(function(element) {
				if(item.skil == element.idSoftSkill){			
				
				element.levels.forEach(function(element,idex) {
					if (element.idLevel != item.idLevel)  
					{
						for (var i = 0; i < $scope.skilSelectedd.length; i++) {
							if ($scope.skilSelectedd[i].idLevel == element.idLevel) {
								$scope.skilSelectedd.splice(i, 1);
								element.checked = false;
								item.checked = false;
								
							}
						}
					}
					else{
								$scope.skilSelectedd.push(item);
								element.checked = true;
								item.checked = true;
								idx = true;
							}
								
							
								
					
				});
				}
			});
//			if(item.checked){
//				$scope.skilSelectedd.splice(idx, 1);
//				item.checked = false;
//			}
//			else{
//				$scope.skilSelectedd.push(item);
//				item.checked = true;
//			}

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