(function() {

	var app = angular.module('app');
	app.controller("ApObjController", function($scope, $rootScope, $http,
			ApObjDatasrv, EmployersDatasrv,AppEmployerDatasrv, $window, $compile, $interval,$rootScope) {
		$scope.count = 0;
        $rootScope.objs=[];
        $rootScope.page = [];
        $rootScope.currentPage = 0;
        $rootScope.size = 4;
		$scope.add=0;
        $scope.totalpage = 0;
		
		$scope.session=$rootScope.appEmp.annualSession;
		if($scope.session.status=="C"){
			$scope.session.mode=1;
		}else if($scope.session.status=="E"){
			$scope.session.mode=0;
		}
	    //en tete
		$scope.name=$rootScope.employerSelected.firstName+" "+$rootScope.employerSelected.lastName;
		var d=new Date($rootScope.employerSelected.dateEntry);
		   $scope.day=d.getDate();
		   $scope.month=d.getMonth()+1;
		   $scope.year=d.getFullYear();
		   $scope.date=$scope.day+"/"+$scope.month+"/"+$scope.year;
		  $scope.nameManager=$rootScope.user.firstName+" "+$rootScope.user.lastName;


        $scope.init = function() {
            ApObjDatasrv.appObjs($rootScope.appEmp.idApEmp, $rootScope.currentPage, $rootScope.size)
                .then(function (data) {
                    $rootScope.objs = data.content;
                    for (var j = 0; j < $rootScope.objs.length; j++) {
                        var dObj = new Date($rootScope.objs[j].deadLine);
                        $rootScope.dayObj = dObj.getDate();
                        $rootScope.monthObj = dObj.getMonth() + 1;
                        $rootScope.yearObj = dObj.getFullYear();
                    }
                    $rootScope.pages = new Array(data.totalPages);
                    $scope.totalpage = data.totalPages;
                });

        }
		
		
		$scope.addNewObj=function(){
			ApObjDatasrv.addNewObj($rootScope.employerSelected.idEmp,$rootScope.appEmp.idApEmp,$scope.obj)
				.then(function(response) {
                    ApObjDatasrv.appObjs($rootScope.appEmp.idApEmp,$rootScope.currentPage,$rootScope.size)
                        .then(function(dataF){
                            $rootScope.objs=dataF.content;
                            for(var j = 0; j < $rootScope.objs.length; j++){
                                var dObj = new Date($rootScope.objs[j].deadLine);
                                $rootScope.dayObj=dObj.getDate();
                                $rootScope.monthObj=dObj.getMonth()+1;
                                $rootScope.yearObj=dObj.getFullYear();
                            }
                            $rootScope.pages = new Array(dataF.totalPages);
                            $scope.obj=null;
                        });

            }, function(err) {
                return err.data.message;
            });

			
		}


		
		$scope.addObj=function(){
			$scope.add=1;
		}


        //fonction permet d'incrementer les numero de la page
        $scope.gotonext = function() {

            if ($rootScope.currentPage == $rootScope.totalePages - 1) {

                var d = document.getElementById("linknext");
                d.className = "disabled";

            } else
                $rootScope.currentPage = $rootScope.currentPage + 1;
            $scope.init();
        }

        //désincrémenter  les numero de la page
        $scope.gotoprevious = function() {

            if ($rootScope.currentPage != 0)
                $rootScope.currentPage = $rootScope.currentPage - 1;

            $scope.init();
        }

        //acceder a une page
        $scope.gotopage = function(p) {

            $rootScope.currentPage = p;
            $scope.init();
        }


        $scope.changed = function(){
            $rootScope.isChange = true;
        }
	})

})();