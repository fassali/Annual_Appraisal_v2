(function() {

	var app = angular.module("app");
	app.controller("newApSoftSkilsCtrl", newApSoftSkilsCtrl);

	function newApSoftSkilsCtrl($scope, skilsDataService, $http, $location,
			$window,$rootScope) {
		$scope.skils = {};
        $scope.managskils = {};
        $scope.softskils = {}
		$scope.skilSelected = [];
		$scope.skilSelectedd = [];
		$scope.apsoftskil = {};
		$scope.currentPage = 0;
		$scope.size = 3;
		$scope.totalePages ={};
		$scope.pages = {};
        console.log($rootScope.appEmp);
		console.log($scope.skilSelectedd)
		$scope.init = function() {
			skilsDataService.getsoftSkill($scope.currentPage, $scope.size)
					.then(function(data) {

						$scope.softskils = data.soft.content;
                        $scope.managskils = data.manag.content;

                            $scope.softskils.forEach(function(elementt) {

                                elementt.levels.sort(function (a, b) {
                                    return b.degree - a.degree;
                                });
                                elementt.levels.forEach(function(element,ind) {
                                		element.skil = elementt.idSoftSkill;
                                    element.skilType = elementt.code;
                                });
                            });
                        $scope.managskils.forEach(function(elementt) {

                            elementt.levels.sort(function (a, b) {
                                return b.degree - a.degree;
                            });
                            elementt.levels.forEach(function(element,ind) {
                                element.skil = elementt.idSoftSkill;
                                element.skilType = elementt.code;
                            });
                        });


                        $scope.pages.soft = new Array(data.soft.totalPages);
                        $scope.pages.manag = new Array(data.manag.totalPages);
                        console.log($scope.pages)
                        console.log($scope.softskils )
                        console.log($scope.managskils )
					});
		}
//		skilsDataService.gestAllSkils().then(function(data) {
//			$scope.skils = data;
//			
//
//		});

        skilsDataService.gestAllSkils().then(function(data){
            //$scope.skils = data;
			console.log($rootScope.appEmp)
            $rootScope.appEmp.apSoftSkills.forEach(function(apsoft,index){
            data.forEach(function(skils) {

                skils.levels.forEach(function(level) {
                    if(level.idLevel == apsoft.level.idLevel)
                    {
                        apsoft.level.skil = skils.idSoftSkill;
                        apsoft.level.skilType = skils.code;
                        $scope.skilSelectedd.push(apsoft.level)
                    }

                });
            });
            });
            console.log($scope.skilSelectedd)
        });

		$scope.exist = function(item) {

			for (var i = 0; i < $scope.skilSelectedd.length; i++) {
				if ($scope.skilSelectedd[i].idLevel == item.idLevel)
					return true;
			}
			return false;

			
		}

		$scope.toggleSelection = function(item) {
            var idx = false;
            $scope.managskils.forEach(function(element) {
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

            console.log($scope.skilSelectedd)

            $rootScope.isChange = true;
        }
//
		$scope.selectedVa = function(item) {
		var idx = false;
			$scope.softskils.forEach(function(element) {
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

			console.log($scope.skilSelectedd)
            $rootScope.isChange = true;
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
            console.log($scope.skilSelectedd)
			var soft = [];
			var manag = [];
			var level = {}
            $scope.skilSelectedd.forEach(function(element){
            	console.log(element)
            	if(element.skilType == "soft")
            		soft.push(element)
				else
                    manag.push(element)
            })
			level.soft = soft;
			level.manag = manag;
console.log(level)
			console.log($scope.skilSelectedd)
          skilsDataService.newApSkils(level,$rootScope.appEmp.idApEmp).then(function(data){

          })
		}

        $scope.changed = function(){
            $rootScope.isChange = true;
        }
	}

})();