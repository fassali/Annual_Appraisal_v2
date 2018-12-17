(function() {

	var app = angular.module("app");
	app.controller("newApSoftSkilsCtrl", newApSoftSkilsCtrl);

	function newApSoftSkilsCtrl($scope, skilsDataService, $http, $location,
			$window,$rootScope) {
	 $rootScope.user.menu=3;
		$scope.skils = {};
		$scope.skilSelected = [];
		$scope.skilSelectedd = [];
		$scope.apsoftskil = {};
		$scope.currentPage = 0;
		$scope.size = 3;
		$scope.totalePages = 0;
		$scope.pages = [];
		
        console.log($rootScope.appEmp);
		console.log($scope.skilSelectedd)
		$scope.init = function() {

			skilsDataService.getsoftSkill($scope.currentPage, $scope.size)
					.then(function(data) {

						$scope.skils = data.content;


                                //apsoft.level.skil = elementt.idSoftSkill;
                              //  delete apsoft.idApStSkill;
                                //$scope.skilSelectedd.push(apsoft.level)
                            $scope.skils.forEach(function(elementt) {

                                elementt.levels.sort(function (a, b) {
                                    return b.degree - a.degree;
                                });
                                elementt.levels.forEach(function(element,ind) {
                                		element.skil = elementt.idSoftSkill;
                                });
                            });

console.log($scope.skils)

						$scope.totalePages = data.totalPages;
                        $scope.pages = new Array(data.totalPages);
					});
		}
//		skilsDataService.gestAllSkils().then(function(data) {
//			$scope.skils = data;
//			
//
//		});

        skilsDataService.gestAllSkils().then(function(data){

            $rootScope.appEmp.apSoftSkills.forEach(function(apsoft,index){
            data.forEach(function(skils) {

                skils.levels.forEach(function(level) {
                    if(level.idLevel == apsoft.level.idLevel)
                    {
                        apsoft.level.skil = skils.idSoftSkill;
                        $scope.skilSelectedd.push(apsoft.level)
                    }

                });
            });
            });
        });

		$scope.exist = function(item) {

			for (var i = 0; i < $scope.skilSelectedd.length; i++) {
				if ($scope.skilSelectedd[i].idLevel == item.idLevel)
					return true;
			}
			return false;

			
		}

		$scope.toggleSelection = function(item) {
         console.log(item)
			var idx = -1;
			for (var i = 0; i < $scope.skilSelectedd.length; i++) {

				console.log($scope.skilSelectedd[i].idLevel+" / ")
				if ($scope.skilSelectedd[i].idLevel == item.idLevel) {
					idx = i;
				}

			}
			console.log(idx)
			if(idx > -1){
				$scope.skilSelectedd.splice(idx, 1);
			}
			else{
				$scope.skilSelectedd.push(item);
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
        $rootScope.save = function() {
          skilsDataService.newApSkils($scope.skilSelectedd,$rootScope.appEmp.idApEmp).then(function(data){

          })
		}
	}

})();